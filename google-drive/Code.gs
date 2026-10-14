/**
 * Bedtime Stories: family recordings in Google Drive.
 *
 * Paste this whole file into a new Apps Script project and deploy it as a
 * web app (Execute as: Me, Who has access: Anyone). The site sends
 * recordings here and they are saved in a Drive folder named
 * "Bedtime Stories Recordings". Setup steps: google-drive/README.md
 *
 * The web app link works like a password: anyone who has it can listen to,
 * add and delete recordings, so only share it through the site's invite link.
 */

var FOLDER_NAME = "Bedtime Stories Recordings";
var STORY_ID = /^[a-z0-9-]{1,40}$/;
var LANGS = { en: true, ko: true, zh: true };
var MAX_BYTES = 30 * 1024 * 1024;

function doGet() {
  return json_({ ok: true, app: "bedtime-stories" });
}

function doPost(e) {
  try {
    return json_(handle_(JSON.parse(e.postData.contents)));
  } catch (err) {
    return json_({ ok: false, error: String((err && err.message) || err) });
  }
}

function handle_(req) {
  var folder = folder_();
  switch (req.action) {
    case "list":
      return { ok: true, files: list_(folder) };

    case "upload": {
      if (!STORY_ID.test(req.storyId || "")) throw new Error("bad story");
      if (!LANGS[req.lang]) throw new Error("bad language");
      var narrator = String(req.narrator || "").trim().slice(0, 30) || "voice";
      var mime = String(req.mime || "").split(";")[0];
      if (mime.indexOf("audio/") !== 0) throw new Error("not audio");
      var bytes = Utilities.base64Decode(req.data || "");
      if (!bytes.length || bytes.length > MAX_BYTES) throw new Error("bad size");
      var ext = { "audio/mp4": "m4a", "audio/ogg": "ogg" }[mime] || "webm";
      var name = req.storyId + "." + req.lang + "." + narrator + "." + ext;
      var file = folder.createFile(Utilities.newBlob(bytes, mime, name));
      file.setDescription(JSON.stringify({ storyId: req.storyId, lang: req.lang, narrator: narrator }));
      return { ok: true, id: file.getId(), created: file.getDateCreated().getTime() };
    }

    case "get": {
      var f = fileInFolder_(folder, req.id);
      return { ok: true, mime: f.getMimeType(), data: Utilities.base64Encode(f.getBlob().getBytes()) };
    }

    case "delete":
      fileInFolder_(folder, req.id).setTrashed(true);
      return { ok: true };

    default:
      throw new Error("unknown action");
  }
}

function list_(folder) {
  var out = [];
  var it = folder.getFiles();
  while (it.hasNext()) {
    var f = it.next();
    var meta;
    try { meta = JSON.parse(f.getDescription() || "{}"); } catch (e) { continue; }
    if (!meta.storyId) continue;
    out.push({
      id: f.getId(),
      storyId: meta.storyId,
      lang: meta.lang,
      narrator: meta.narrator,
      created: f.getDateCreated().getTime(),
    });
  }
  return out;
}

// Only files inside the recordings folder can be read or deleted.
function fileInFolder_(folder, id) {
  var f = DriveApp.getFileById(String(id || ""));
  var parents = f.getParents();
  while (parents.hasNext()) {
    if (parents.next().getId() === folder.getId() && !f.isTrashed()) return f;
  }
  throw new Error("not found");
}

function folder_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty("FOLDER_ID");
  if (id) {
    try {
      var existing = DriveApp.getFolderById(id);
      if (!existing.isTrashed()) return existing;
    } catch (e) { /* deleted: make a new one */ }
  }
  var folder = DriveApp.createFolder(FOLDER_NAME);
  props.setProperty("FOLDER_ID", folder.getId());
  return folder;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
