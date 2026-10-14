(() => {
  "use strict";

  const LANGS = {
    en: { bcp47: "en-US", prefix: "en" },
    ko: { bcp47: "ko-KR", prefix: "ko" },
    zh: { bcp47: "zh-CN", prefix: "zh" },
  };

  // Interface text, shown in the currently selected language.
  const UI = {
    en: {
      title: "Bedtime Stories",
      subtitle: "Gentle stories to read together before sleep",
      addNames: "Add your children's names",
      editNames: "Edit names",
      namesTitle: "Your children's names",
      namesHelp: "Shown at the top of the page. Saved on this phone only; the invite link passes them to your partner's phone. Korean and Chinese spellings are optional.",
      child: "Child",
      save: "Save",
      cancel: "Cancel",
      voice: "Voice",
      speed: "Speed",
      deviceVoices: "Device voices",
      recordedVoices: "Recorded on this device",
      studioVoices: "Public recordings",
      saveFile: "Save file",
      shareHelp: "To share a recording with everyone: tap Save file, then upload that file to the recordings folder on GitHub. Don't rename it. It shows up here for everyone within a few minutes.",
      shareLink: "Open the upload page",
      noVoice: "This device has no English voice installed. Add one in your system's speech settings, or record your own below.",
      recSummary: "🎙 Record your own voice",
      recHelp: "Read the story aloud and save it. It appears in the Voice list for this story. With family sharing connected, it also appears on your other phones.",
      recName: "Narrator name",
      recPlaceholder: "Mom",
      record: "● Record",
      stopRec: "■ Stop",
      del: "Delete",
      confirmDel: "Delete this recording?",
      micError: "Could not access the microphone. Recording needs microphone permission and an https:// (or localhost) address.",
      recorded: "recorded",
      fam: {
        title: "Share recordings with family",
        intro: "Connect a Google Drive so recordings made on one phone show up on your other phones too. Setup takes about 10 minutes, once.",
        howTo: "Setup instructions",
        urlLabel: "Google Apps Script link",
        connect: "Connect",
        connecting: "Connecting…",
        badUrl: "That isn't an Apps Script link. It should start with https://script.google.com/",
        failed: "Couldn't reach the script. Check the link, and that the deployment's access is set to Anyone.",
        connected: "Connected to Google Drive. New recordings are shared automatically.",
        invite: "Copy invite link",
        copied: "Invite link copied. Send it to your partner to open on their phone.",
        copyFallback: "Copy this link and send it to your partner:",
        disconnect: "Disconnect",
        confirmDisconnect: "Tap again to disconnect",
        joined: "This phone is now connected to your family's recordings.",
      },
      ourVoices: "Our recordings",
      synced: "☁ Shared",
      notSynced: "Only on this phone",
      loadError: "Couldn't load this recording. Check your internet connection.",
      delError: "Couldn't delete it from Google Drive. Check your internet connection and try again.",
    },
    ko: {
      title: "잠자리 동화",
      subtitle: "잠들기 전 함께 읽는 포근한 이야기",
      addNames: "아이 이름 입력하기",
      editNames: "이름 수정",
      namesTitle: "아이 이름",
      namesHelp: "페이지 맨 위에 표시돼요. 이 휴대폰에만 저장되며, 초대 링크로 배우자 휴대폰에도 전달돼요. 한국어와 중국어 표기는 선택 사항이에요.",
      child: "아이",
      save: "저장",
      cancel: "취소",
      voice: "목소리",
      speed: "속도",
      deviceVoices: "기기 음성",
      recordedVoices: "이 기기에서 녹음",
      studioVoices: "공개 녹음",
      saveFile: "파일 저장",
      shareHelp: "녹음을 모두와 공유하려면 '파일 저장'을 누른 뒤 그 파일을 GitHub의 recordings 폴더에 올리세요. 파일 이름은 바꾸지 마세요. 몇 분 안에 모두에게 나타나요.",
      shareLink: "업로드 페이지 열기",
      noVoice: "이 기기에 한국어 음성이 설치되어 있지 않아요. 시스템 음성 설정에서 추가하거나 아래에서 직접 녹음해 보세요.",
      recSummary: "🎙 내 목소리로 녹음하기",
      recHelp: "동화를 소리 내어 읽고 저장하세요. 이 동화의 목소리 목록에 나타나요. 가족 공유가 연결되어 있으면 다른 휴대폰에도 나타나요.",
      recName: "읽어 주는 사람",
      recPlaceholder: "엄마",
      record: "● 녹음",
      stopRec: "■ 정지",
      del: "삭제",
      confirmDel: "이 녹음을 삭제할까요?",
      micError: "마이크에 접근할 수 없어요. 녹음하려면 마이크 권한과 https:// (또는 localhost) 주소가 필요해요.",
      recorded: "녹음",
      fam: {
        title: "가족과 녹음 공유하기",
        intro: "Google 드라이브를 연결하면 한 휴대폰에서 녹음한 내용이 다른 휴대폰에도 나타나요. 처음 한 번만 10분 정도 설정하면 돼요.",
        howTo: "설정 방법",
        urlLabel: "Google Apps Script 링크",
        connect: "연결",
        connecting: "연결 중…",
        badUrl: "Apps Script 링크가 아니에요. https://script.google.com/ 으로 시작해야 해요.",
        failed: "스크립트에 연결할 수 없어요. 링크를 확인하고, 배포의 액세스 권한이 '모든 사용자'로 되어 있는지 확인해 주세요.",
        connected: "Google 드라이브에 연결됨. 새 녹음은 자동으로 공유돼요.",
        invite: "초대 링크 복사",
        copied: "초대 링크를 복사했어요. 배우자에게 보내서 휴대폰에서 열게 하세요.",
        copyFallback: "이 링크를 복사해서 보내세요:",
        disconnect: "연결 해제",
        confirmDisconnect: "한 번 더 누르면 연결이 해제돼요",
        joined: "이 휴대폰이 가족 녹음에 연결되었어요.",
      },
      ourVoices: "우리 가족 녹음",
      synced: "☁ 공유됨",
      notSynced: "이 휴대폰에만 있음",
      loadError: "녹음을 불러올 수 없어요. 인터넷 연결을 확인해 주세요.",
      delError: "Google 드라이브에서 삭제하지 못했어요. 인터넷 연결을 확인하고 다시 시도해 주세요.",
    },
    zh: {
      title: "睡前故事",
      subtitle: "睡前一起读的温柔小故事",
      addNames: "添加孩子的名字",
      editNames: "修改名字",
      namesTitle: "孩子的名字",
      namesHelp: "显示在页面顶部。只保存在这部手机上；邀请链接会把名字带到伴侣的手机上。韩文和中文写法可以不填。",
      child: "孩子",
      save: "保存",
      cancel: "取消",
      voice: "声音",
      speed: "语速",
      deviceVoices: "设备语音",
      recordedVoices: "在此设备上录制",
      studioVoices: "公开录音",
      saveFile: "保存文件",
      shareHelp: "要和大家分享录音：点“保存文件”，再把文件上传到 GitHub 的 recordings 文件夹。请不要改文件名。几分钟后所有人都能看到。",
      shareLink: "打开上传页面",
      noVoice: "此设备没有安装中文语音。请在系统语音设置中添加，或在下方录制您自己的声音。",
      recSummary: "🎙 录制自己的声音",
      recHelp: "大声朗读故事并保存。录音会出现在这个故事的声音列表中。连接家人分享后，也会出现在其他手机上。",
      recName: "朗读者",
      recPlaceholder: "妈妈",
      record: "● 录音",
      stopRec: "■ 停止",
      del: "删除",
      confirmDel: "删除这段录音吗？",
      micError: "无法使用麦克风。录音需要麦克风权限以及 https://（或 localhost）地址。",
      recorded: "录音",
      fam: {
        title: "和家人分享录音",
        intro: "连接 Google 云端硬盘后，在一部手机上录的音也会出现在其他手机上。只需设置一次，大约 10 分钟。",
        howTo: "设置说明",
        urlLabel: "Google Apps Script 链接",
        connect: "连接",
        connecting: "正在连接…",
        badUrl: "这不是 Apps Script 链接。链接应以 https://script.google.com/ 开头。",
        failed: "无法连接到脚本。请检查链接，并确认部署的访问权限设置为“任何人”。",
        connected: "已连接 Google 云端硬盘。新录音会自动分享。",
        invite: "复制邀请链接",
        copied: "邀请链接已复制。发给您的伴侣，让对方在手机上打开。",
        copyFallback: "复制这个链接并发送：",
        disconnect: "断开连接",
        confirmDisconnect: "再点一次即可断开",
        joined: "这部手机已连接到家人的录音。",
      },
      ourVoices: "我们的录音",
      synced: "☁ 已分享",
      notSynced: "仅在这部手机上",
      loadError: "无法加载这段录音。请检查网络连接。",
      delError: "无法从 Google 云端硬盘删除。请检查网络连接后重试。",
    },
  };

  const $ = (id) => document.getElementById(id);
  const els = {
    title: $("site-title"),
    subtitle: $("site-subtitle"),
    namesBtn: $("names-btn"),
    namesDialog: $("names-dialog"),
    namesForm: $("names-form"),
    namesTitle: $("names-title"),
    namesHelp: $("names-help"),
    namesSave: $("names-save"),
    namesCancel: $("names-cancel"),
    list: $("story-list"),
    dialog: $("story-dialog"),
    close: $("close-btn"),
    storyTitle: $("story-title"),
    storyText: $("story-text"),
    play: $("play-btn"),
    stop: $("stop-btn"),
    narrator: $("narrator-select"),
    narratorLabel: $("narrator-label"),
    rateRow: $("rate-row"),
    rate: $("rate-input"),
    rateLabel: $("rate-label"),
    audio: $("audio-player"),
    warning: $("voice-warning"),
    recSummary: $("rec-summary"),
    recHelp: $("rec-help"),
    recNameLabel: $("rec-name-label"),
    recName: $("rec-name"),
    recBtn: $("rec-btn"),
    recTimer: $("rec-timer"),
    recList: $("rec-list"),
    shareHelp: $("share-help"),
    famTitle: $("fam-title"),
    famOff: $("fam-off"),
    famOn: $("fam-on"),
    famIntro: $("fam-intro"),
    famForm: $("fam-form"),
    famUrlLabel: $("fam-url-label"),
    famUrl: $("fam-url"),
    famConnect: $("fam-connect"),
    famHowTo: $("fam-howto"),
    famConnected: $("fam-connected"),
    famInvite: $("fam-invite"),
    famInviteText: $("fam-invite-text"),
    famDisconnect: $("fam-disconnect"),
    famMsg: $("fam-msg"),
    pinyinBtn: $("pinyin-btn"),
  };

  const store = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* ignore */ } },
    remove(key) { try { localStorage.removeItem(key); } catch { /* ignore */ } },
  };

  const state = {
    lang: store.get("lang") || guessLang(),
    story: null,
    recordings: [],     // recordings for the open story + language
    remote: [],         // Drive recordings from other phones, not yet on this one
    shared: [],         // public recordings (repo folder) for the open story + language
    recordingCounts: {}, // "storyId:lang" -> count, for list badges
  };

  function guessLang() {
    const nav = (navigator.language || "en").toLowerCase();
    if (nav.startsWith("ko")) return "ko";
    if (nav.startsWith("zh")) return "zh";
    return "en";
  }

  const t = (key) => UI[state.lang][key];
  const tf = (key) => UI[state.lang].fam[key];

  // ---------------------------------------------------------------------------
  // Recordings database (IndexedDB, stays on this device)

  const db = (() => {
    let dbPromise = null;
    function open() {
      if (!("indexedDB" in window)) return Promise.reject(new Error("no indexedDB"));
      dbPromise ??= new Promise((resolve, reject) => {
        const req = indexedDB.open("bedtime-stories", 1);
        req.onupgradeneeded = () => {
          const os = req.result.createObjectStore("recordings", { keyPath: "id", autoIncrement: true });
          os.createIndex("storyLang", ["storyId", "lang"]);
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
      return dbPromise;
    }
    function tx(mode, fn) {
      return open().then((d) => new Promise((resolve, reject) => {
        const tr = d.transaction("recordings", mode);
        const result = fn(tr.objectStore("recordings"));
        tr.oncomplete = () => resolve(result.result);
        tr.onerror = () => reject(tr.error);
      }));
    }
    return {
      add: (rec) => tx("readwrite", (os) => os.add(rec)),
      put: (rec) => tx("readwrite", (os) => os.put(rec)),
      remove: (id) => tx("readwrite", (os) => os.delete(id)),
      forStory: (storyId, lang) =>
        tx("readonly", (os) => os.index("storyLang").getAll([storyId, lang])).catch(() => []),
      all: () => tx("readonly", (os) => os.getAll()).catch(() => []),
    };
  })();

  // ---------------------------------------------------------------------------
  // Shared recordings: audio files in the repo's recordings/ folder, named
  // <story-id>.<lang>.<narrator>.<ext>, e.g. sleepy-moon.ko.엄마.m4a

  const SHARED_DIR = "recordings";
  const SHARED_LIST_URL =
    "https://api.github.com/repos/dipity3sub-create/bedtime-stories/contents/" + SHARED_DIR;
  const UPLOAD_URL =
    "https://github.com/dipity3sub-create/bedtime-stories/upload/main/" + SHARED_DIR;
  const AUDIO_EXT = { "audio/mp4": "m4a", "audio/ogg": "ogg", "audio/webm": "webm" };

  function parseSharedName(file) {
    const m = file.match(/^([a-z0-9-]+)\.(en|ko|zh)\.(.+)\.(m4a|mp4|webm|ogg|mp3|wav|aac)$/i);
    if (!m) return null;
    // Browsers add " (1)" to repeated downloads; it isn't part of the name.
    const narrator = m[3].replace(/\s*\(\d+\)$/, "").trim();
    return { file, storyId: m[1], lang: m[2].toLowerCase(), narrator };
  }

  function sharedFileName(rec) {
    const name = rec.narrator.replace(/[\\/:*?"<>|.#%]+/g, "-").trim() || "voice";
    const ext = AUDIO_EXT[(rec.blob.type || "").split(";")[0]] || "webm";
    return `${rec.storyId}.${rec.lang}.${name}.${ext}`;
  }

  let sharedPromise = null;
  function loadShared() {
    sharedPromise ??= (async () => {
      try {
        const cached = JSON.parse(sessionStorage.getItem("shared") || "null");
        if (cached && Date.now() - cached.at < 5 * 60 * 1000) return cached.list;
      } catch { /* ignore */ }
      try {
        const res = await fetch(SHARED_LIST_URL, { headers: { Accept: "application/vnd.github+json" } });
        if (!res.ok) return [];
        const files = await res.json();
        const list = files
          .filter((f) => f.type === "file")
          .map((f) => parseSharedName(f.name))
          .filter(Boolean);
        try { sessionStorage.setItem("shared", JSON.stringify({ at: Date.now(), list })); } catch { /* ignore */ }
        return list;
      } catch {
        return [];
      }
    })();
    return sharedPromise;
  }

  // ---------------------------------------------------------------------------
  // Family sharing: recordings synced through the family's own Google Apps
  // Script (google-drive/Code.gs), which keeps them in a Google Drive folder.
  // The script link is stored on each phone and passed on by invite link.

  const drive = (() => {
    let files = [];        // recordings on Drive: {id, storyId, lang, narrator, created}
    let chain = Promise.resolve();

    const url = () => store.get("driveUrl");
    const validUrl = (u) => /^https:\/\/script\.google\.com\/\S+\/exec$/.test(u);

    async function call(action, body = {}, scriptUrl = url()) {
      // text/plain keeps this a "simple" request, which Apps Script accepts.
      const res = await fetch(scriptUrl, { method: "POST", body: JSON.stringify({ action, ...body }) });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "request failed");
      return json;
    }

    function toBase64(blob) {
      return new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result).split(",")[1] || "");
        r.onerror = () => reject(r.error);
        r.readAsDataURL(blob);
      });
    }

    function fromBase64(data, type) {
      const bin = atob(data);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return new Blob([bytes], { type });
    }

    async function sync() {
      const scriptUrl = url();
      if (!scriptUrl) { files = []; return; }
      const startedAt = Date.now();
      files = (await call("list", {}, scriptUrl)).files;
      const onDrive = new Set(files.map((f) => f.id));
      for (const rec of await db.all()) {
        const mine = rec.driveId && rec.driveUrl === scriptUrl;
        if (mine && !onDrive.has(rec.driveId) && (rec.syncedAt || 0) < startedAt) {
          // Deleted on another phone.
          await db.remove(rec.id);
        } else if (!mine) {
          // Recorded before connecting, or while offline.
          const { id, created } = await call("upload", {
            storyId: rec.storyId, lang: rec.lang, narrator: rec.narrator,
            mime: rec.blob.type, data: await toBase64(rec.blob),
          }, scriptUrl);
          Object.assign(rec, { driveId: id, driveUrl: scriptUrl, syncedAt: Date.now() });
          await db.put(rec);
          files.push({ id, storyId: rec.storyId, lang: rec.lang, narrator: rec.narrator, created });
        }
      }
    }

    return {
      url,
      validUrl,
      get files() { return files; },
      // Runs one sync at a time; resolves true when it succeeded.
      sync() {
        const run = chain.then(sync).then(() => true, () => false);
        chain = run;
        return run;
      },
      async test(scriptUrl) { await call("list", {}, scriptUrl); },
      async download(file) {
        const { mime, data } = await call("get", { id: file.id });
        const rec = {
          storyId: file.storyId, lang: file.lang, narrator: file.narrator,
          blob: fromBase64(data, mime), createdAt: file.created,
          driveId: file.id, driveUrl: url(), syncedAt: Date.now(),
        };
        rec.id = await db.add(rec);
        return rec;
      },
      async remove(driveId) {
        await call("delete", { id: driveId });
        files = files.filter((f) => f.id !== driveId);
      },
      connect(scriptUrl) { store.set("driveUrl", scriptUrl); },
      disconnect() { store.remove("driveUrl"); files = []; },
    };
  })();

  function isSynced(rec) {
    return Boolean(rec.driveId && rec.driveUrl === drive.url());
  }

  async function syncAndRefresh() {
    if (!drive.url()) return;
    await drive.sync();
    refreshCounts();
    if (els.dialog.open) reloadStoryRecordings({ keep: true });
  }

  function renderFamily(message = "") {
    const connected = Boolean(drive.url());
    els.famTitle.textContent = tf("title");
    els.famIntro.textContent = tf("intro");
    els.famHowTo.textContent = tf("howTo");
    els.famUrlLabel.textContent = tf("urlLabel");
    els.famConnect.textContent = tf("connect");
    els.famConnected.textContent = tf("connected");
    els.famInvite.textContent = tf("invite");
    els.famDisconnect.textContent = tf("disconnect");
    delete els.famDisconnect.dataset.armed;
    els.famOff.hidden = connected;
    els.famOn.hidden = !connected;
    els.famInviteText.hidden = true;
    els.famMsg.textContent = message;
    els.shareHelp.hidden = connected;
  }

  function inviteLink() {
    const params = new URLSearchParams({ drive: drive.url() });
    const kids = getKids();
    if (kids.length) params.set("kids", JSON.stringify(kids));
    return `${location.origin}${location.pathname}#${params}`;
  }

  // ---------------------------------------------------------------------------
  // Pinyin under Chinese characters (data in pinyin.js, see tools/make_pinyin.py)

  const pinyinOn = () => state.lang === "zh" && store.get("pinyin") !== "off";

  function pinyinFor(storyId, part, index) {
    if (!pinyinOn()) return null;
    const entry = window.PINYIN?.[storyId];
    return (part === "title" ? entry?.title : entry?.text?.[index]) || null;
  }

  // Fills el with text, as ruby annotations when pinyin matches the text.
  function setText(el, text, pinyin) {
    if (!pinyin || pinyin.map((x) => x[0]).join("") !== text) {
      el.textContent = text;
      return;
    }
    el.replaceChildren(...pinyin.map(([chars, py]) => {
      if (!py) return document.createTextNode(chars);
      const ruby = document.createElement("ruby");
      const rt = document.createElement("rt");
      rt.textContent = py;
      ruby.append(chars, rt);
      return ruby;
    }));
  }

  function renderPinyinToggle() {
    els.pinyinBtn.hidden = state.lang !== "zh";
    els.pinyinBtn.setAttribute("aria-pressed", String(pinyinOn()));
  }

  // ---------------------------------------------------------------------------
  // Children's names: kept on this phone only (and passed on by invite link),
  // never in the site's code. Stored as [{en, ko, zh}, ...].

  function getKids() {
    try {
      const kids = JSON.parse(store.get("kids") || "[]");
      return Array.isArray(kids) ? kids.filter((k) => k && k.en) : [];
    } catch {
      return [];
    }
  }

  function setKids(kids) {
    const clean = kids
      .map((k) => Object.fromEntries(["en", "ko", "zh"].map((l) => [l, String(k[l] || "").trim().slice(0, 30)])))
      .filter((k) => k.en);
    if (clean.length) store.set("kids", JSON.stringify(clean));
    else store.remove("kids");
  }

  // Korean "and": 와 after a vowel sound, 과 after a consonant.
  function koAnd(name) {
    const last = name.charCodeAt(name.length - 1);
    if (last >= 0xac00 && last <= 0xd7a3) return (last - 0xac00) % 28 ? "과" : "와";
    return /[b-df-hj-np-tv-xz]$/i.test(name) ? "과" : "와";
  }

  function namesLine(lang) {
    const names = getKids().map((k) => k[lang] || k.en);
    if (!names.length) return "";
    const [a, b] = names;
    if (lang === "ko") return b ? `${a}${koAnd(a)} ${b}에게` : `${a}에게`;
    if (lang === "zh") {
      const sp = /[a-z]/i.test(names.join("")) ? " " : "";
      return b ? `给${sp}${a}${sp}和${sp}${b}` : `给${sp}${a}`;
    }
    return b ? `for ${a} and ${b}` : `for ${a}`;
  }

  function renderSubtitle() {
    const line = namesLine(state.lang);
    els.subtitle.textContent = line || t("subtitle");
    els.namesBtn.textContent = line ? "✎" : `✎ ${t("addNames")}`;
    els.namesBtn.classList.toggle("only-icon", Boolean(line));
    els.namesBtn.setAttribute("aria-label", line ? t("editNames") : t("addNames"));
  }

  function openNames() {
    const kids = getKids();
    els.namesForm.querySelectorAll("fieldset").forEach((fs, i) => {
      for (const l of ["en", "ko", "zh"]) fs.querySelector(`[data-l="${l}"]`).value = kids[i]?.[l] || "";
    });
    els.namesDialog.showModal();
  }

  function saveNames() {
    setKids([...els.namesForm.querySelectorAll("fieldset")].map((fs) =>
      Object.fromEntries(["en", "ko", "zh"].map((l) => [l, fs.querySelector(`[data-l="${l}"]`).value]))));
    els.namesDialog.close();
    renderSubtitle();
  }

  // ---------------------------------------------------------------------------
  // Story list

  function renderChrome() {
    document.documentElement.lang = state.lang;
    document.title = t("title");
    els.title.textContent = t("title");
    renderSubtitle();
    els.namesTitle.textContent = t("namesTitle");
    els.namesHelp.textContent = t("namesHelp");
    els.namesSave.textContent = t("save");
    els.namesCancel.textContent = t("cancel");
    els.namesForm.querySelectorAll("legend").forEach((l, i) => { l.textContent = `${t("child")} ${i + 1}`; });
    els.narratorLabel.textContent = t("voice");
    els.rateLabel.textContent = t("speed");
    els.recSummary.textContent = t("recSummary");
    els.recHelp.textContent = t("recHelp");
    els.recNameLabel.textContent = t("recName");
    const link = document.createElement("a");
    link.href = UPLOAD_URL;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = t("shareLink");
    els.shareHelp.replaceChildren(t("shareHelp") + " ", link);
    els.recName.placeholder = t("recPlaceholder");
    if (!recorder.active) els.recBtn.textContent = t("record");
    renderFamily();
    renderPinyinToggle();
    document.querySelectorAll(".lang-switch button").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.lang === state.lang));
    });
  }

  function renderList() {
    els.list.replaceChildren(...window.STORIES.map((story) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.lang = state.lang;
      const emoji = document.createElement("span");
      emoji.className = "emoji";
      emoji.textContent = story.emoji;
      const title = document.createElement("span");
      setText(title, story.title[state.lang], pinyinFor(story.id, "title"));
      btn.append(emoji, title);
      const count = state.recordingCounts[`${story.id}:${state.lang}`];
      if (count) {
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = `🎙 ${count} ${t("recorded")}`;
        btn.append(badge);
      }
      btn.addEventListener("click", () => openStory(story));
      li.append(btn);
      return li;
    }));
  }

  async function refreshCounts() {
    const [all, shared] = await Promise.all([db.all(), loadShared()]);
    const local = new Set(all.map((r) => r.driveId).filter(Boolean));
    const remote = drive.files.filter((f) => !local.has(f.id));
    state.recordingCounts = {};
    for (const r of [...all, ...remote, ...shared]) {
      const key = `${r.storyId}:${r.lang}`;
      state.recordingCounts[key] = (state.recordingCounts[key] || 0) + 1;
    }
    renderList();
  }

  function setLang(lang) {
    if (!LANGS[lang] || lang === state.lang) return;
    state.lang = lang;
    store.set("lang", lang);
    renderChrome();
    renderList();
    if (els.dialog.open && state.story) openStory(state.story);
  }

  // ---------------------------------------------------------------------------
  // Story view

  async function openStory(story) {
    player.stop();
    state.story = story;
    const lang = state.lang;
    setText(els.storyTitle, story.title[lang], pinyinFor(story.id, "title"));
    els.storyTitle.prepend(`${story.emoji} `);
    els.storyTitle.lang = lang;
    els.storyText.lang = lang;
    els.storyText.replaceChildren(...story.text[lang].map((para, i) => {
      const p = document.createElement("p");
      setText(p, para, pinyinFor(story.id, "text", i));
      return p;
    }));
    if (!els.dialog.open) els.dialog.showModal();
    els.dialog.querySelector(".dialog-inner").scrollTop = 0;
    await reloadStoryRecordings();
  }

  async function reloadStoryRecordings({ keep = false } = {}) {
    const story = state.story;
    const lang = state.lang;
    if (!story) return;
    const [mine, shared] = await Promise.all([db.forStory(story.id, lang), loadShared()]);
    if (state.story !== story || state.lang !== lang) return; // user moved on
    const local = new Set(mine.map((r) => r.driveId).filter(Boolean));
    state.recordings = mine;
    state.remote = drive.files.filter((f) =>
      f.storyId === story.id && f.lang === lang && !local.has(f.id));
    state.shared = shared.filter((r) => r.storyId === story.id && r.lang === lang);
    renderNarrators({ keep });
    renderRecordings();
  }

  function closeStory() {
    player.stop();
    if (recorder.active) recorder.stop();
    if (els.dialog.open) els.dialog.close();
    state.story = null;
  }

  // ---------------------------------------------------------------------------
  // Narrator choice: device text-to-speech voices, studio files, own recordings

  function voicesFor(lang) {
    if (!("speechSynthesis" in window)) return [];
    const { bcp47, prefix } = LANGS[lang];
    const quality = (v) =>
      (v.lang.replace("_", "-") === bcp47 ? 4 : 0) +
      (/natural|neural|premium|enhanced|google/i.test(v.name) ? 2 : 0) +
      (v.localService ? 1 : 0);
    return speechSynthesis.getVoices()
      .filter((v) => v.lang.toLowerCase().replace("_", "-").startsWith(prefix))
      .sort((a, b) => quality(b) - quality(a));
  }

  function renderNarrators({ keep = false } = {}) {
    const story = state.story;
    if (!story) return;
    const lang = state.lang;
    const sel = els.narrator;
    const current = sel.value;
    sel.replaceChildren();

    const addGroup = (label, items) => {
      if (!items.length) return;
      const group = document.createElement("optgroup");
      group.label = label;
      for (const [value, text] of items) group.append(new Option(text, value));
      sel.append(group);
    };

    const studio = story.audio?.[lang];
    addGroup(t("studioVoices"), [
      ...(studio ? [[`file:${studio}`, "🎧 Studio"]] : []),
      ...state.shared.map((r) => [`shared:${r.file}`, `🎧 ${r.narrator}`]),
    ]);
    addGroup(drive.url() ? t("ourVoices") : t("recordedVoices"), [
      ...state.recordings.map((r) => [`rec:${r.id}`, `🎙 ${r.narrator}`]),
      ...state.remote.map((f) => [`drive:${f.id}`, `🎙 ${f.narrator}`]),
    ]);
    const voices = voicesFor(lang);
    addGroup(t("deviceVoices"), voices.map((v) => [`tts:${v.voiceURI}`, `🔊 ${v.name}`]));

    // Restore the narrator last used for this language, by name for recordings.
    const pref = store.get(`narrator:${lang}`) || "";
    const prefName = pref.startsWith("name:") ? pref.slice(5) : null;
    const prefRec = prefName && state.recordings.find((r) => r.narrator === prefName);
    const prefRemote = prefName && state.remote.find((f) => f.narrator === prefName);
    const prefShared = prefName && state.shared.find((r) => r.narrator === prefName);
    if (keep && [...sel.options].some((o) => o.value === current)) sel.value = current;
    else if (prefRec) sel.value = `rec:${prefRec.id}`;
    else if (prefRemote) sel.value = `drive:${prefRemote.id}`;
    else if (prefShared) sel.value = `shared:${prefShared.file}`;
    else if (pref.startsWith("tts:") && voices.some((v) => `tts:${v.voiceURI}` === pref)) sel.value = pref;
    else if (sel.options.length) sel.selectedIndex = 0;

    const nothing = !sel.options.length;
    els.warning.hidden = !nothing;
    els.warning.textContent = nothing ? t("noVoice") : "";
    els.play.disabled = nothing;
    updateRateVisibility();
  }

  function updateRateVisibility() {
    els.rateRow.hidden = !els.narrator.value.startsWith("tts:");
  }

  function rememberNarrator() {
    const v = els.narrator.value;
    if (/^(rec|drive|shared):/.test(v)) {
      const rec = state.recordings.find((r) => `rec:${r.id}` === v) ||
        state.remote.find((f) => `drive:${f.id}` === v) ||
        state.shared.find((r) => `shared:${r.file}` === v);
      if (rec) store.set(`narrator:${state.lang}`, `name:${rec.narrator}`);
    } else if (v.startsWith("tts:")) {
      store.set(`narrator:${state.lang}`, v);
    }
  }

  // ---------------------------------------------------------------------------
  // Player

  const player = (() => {
    let mode = null;      // "tts" | "audio" | null
    let playing = false;
    let paraIndex = 0;
    let token = 0;        // invalidates callbacks from cancelled utterances
    let objectUrl = null;

    function setPlaying(value) {
      playing = value;
      els.play.textContent = value ? "❚❚" : "▶";
      els.play.setAttribute("aria-label", value ? "Pause" : "Play");
    }

    function highlight(i) {
      [...els.storyText.children].forEach((p, j) => p.classList.toggle("reading", j === i));
      const p = els.storyText.children[i];
      if (p) p.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }

    function speakFrom(i) {
      const paras = state.story.text[state.lang];
      const voice = speechSynthesis.getVoices().find((v) => `tts:${v.voiceURI}` === els.narrator.value);
      const myToken = ++token;
      const next = (k) => {
        if (myToken !== token) return;
        if (k >= paras.length) { finish(); return; }
        paraIndex = k;
        highlight(k);
        // One utterance per paragraph: lets us highlight, and avoids some
        // browsers cutting off long utterances.
        const u = new SpeechSynthesisUtterance(paras[k]);
        u.lang = voice?.lang || LANGS[state.lang].bcp47;
        if (voice) u.voice = voice;
        u.rate = Number(els.rate.value);
        u.pitch = 1.05;
        u.onend = () => setTimeout(() => next(k + 1), 350);
        u.onerror = (e) => {
          if (myToken === token && e.error !== "interrupted" && e.error !== "canceled") finish();
        };
        speechSynthesis.speak(u);
      };
      speechSynthesis.cancel();
      next(i);
    }

    async function audioSrc() {
      const v = els.narrator.value;
      if (v.startsWith("file:")) return v.slice(5);
      if (v.startsWith("shared:")) return `${SHARED_DIR}/${encodeURIComponent(v.slice(7))}`;
      let rec = state.recordings.find((r) => `rec:${r.id}` === v);
      const file = state.remote.find((f) => `drive:${f.id}` === v);
      if (file) {
        // First play of a recording from another phone: keep a copy here.
        rec = await drive.download(file);
        await reloadStoryRecordings({ keep: true });
        els.narrator.value = `rec:${rec.id}`;
      }
      if (!rec) return null;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      objectUrl = URL.createObjectURL(rec.blob);
      return objectUrl;
    }

    let loading = false;

    async function play() {
      if (!state.story || !els.narrator.value || loading) return;
      rememberNarrator();
      if (els.narrator.value.startsWith("tts:")) {
        mode = "tts";
        setPlaying(true);
        speakFrom(paraIndex);
      } else {
        if (mode !== "audio") {
          const story = state.story;
          let src;
          loading = true;
          els.play.textContent = "…";
          try {
            src = await audioSrc();
          } catch {
            els.warning.textContent = t("loadError");
            els.warning.hidden = false;
          } finally {
            loading = false;
            setPlaying(false);
          }
          if (!src || state.story !== story) return;
          els.audio.src = src;
          mode = "audio";
        }
        setPlaying(true);
        els.audio.play().catch(() => setPlaying(false));
      }
    }

    function pause() {
      if (mode === "tts") { token++; speechSynthesis.cancel(); }
      if (mode === "audio") els.audio.pause();
      setPlaying(false);
    }

    function finish() {
      paraIndex = 0;
      highlight(-1);
      setPlaying(false);
      mode = null;
    }

    function stop() {
      token++;
      if ("speechSynthesis" in window) speechSynthesis.cancel();
      els.audio.pause();
      els.audio.removeAttribute("src");
      els.audio.load();
      finish();
    }

    els.audio.addEventListener("ended", finish);

    return {
      toggle: () => (playing ? pause() : play()),
      stop,
      // Called when the narrator or speed changes mid-story.
      restartIfPlaying() {
        const was = playing;
        const keepPara = mode === "tts" && els.narrator.value.startsWith("tts:");
        const p = paraIndex;
        stop();
        if (keepPara) paraIndex = p;
        if (was) play();
      },
    };
  })();

  // ---------------------------------------------------------------------------
  // Recorder (MediaRecorder -> IndexedDB)

  const recorder = (() => {
    let media = null;
    let chunks = [];
    let started = 0;
    let timer = null;

    function pickMime() {
      // mp4 first: it plays on iPhones as well as Android and computers.
      const types = ["audio/mp4", "audio/webm;codecs=opus", "audio/ogg;codecs=opus", "audio/webm"];
      return types.find((m) => window.MediaRecorder?.isTypeSupported?.(m)) || "";
    }

    async function start() {
      player.stop();
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: true, noiseSuppression: true },
        });
      } catch {
        els.recTimer.textContent = t("micError");
        return;
      }
      const story = state.story;
      const lang = state.lang;
      const narrator = els.recName.value.trim() || t("recPlaceholder");
      const mimeType = pickMime();
      chunks = [];
      media = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      media.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      media.onstop = async () => {
        stream.getTracks().forEach((tr) => tr.stop());
        clearInterval(timer);
        els.recTimer.textContent = "";
        els.recBtn.classList.remove("recording");
        els.recBtn.textContent = t("record");
        const blob = new Blob(chunks, { type: media.mimeType || "audio/webm" });
        media = null;
        if (!blob.size) return;
        const id = await db.add({ storyId: story.id, lang, narrator, blob, createdAt: Date.now() });
        store.set(`narrator:${lang}`, `name:${narrator}`);
        refreshCounts();
        syncAndRefresh();
        if (state.story === story && state.lang === lang) {
          state.recordings = await db.forStory(story.id, lang);
          renderNarrators();
          els.narrator.value = `rec:${id}`;
          updateRateVisibility();
          renderRecordings();
        }
      };
      media.start();
      started = Date.now();
      els.recBtn.classList.add("recording");
      els.recBtn.textContent = t("stopRec");
      const tick = () => {
        const s = Math.floor((Date.now() - started) / 1000);
        els.recTimer.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
      };
      tick();
      timer = setInterval(tick, 500);
    }

    return {
      get active() { return media !== null; },
      toggle() { media ? media.stop() : start(); },
      stop() { media?.stop(); },
    };
  })();

  function renderRecordings() {
    els.recList.querySelectorAll("audio").forEach((a) => URL.revokeObjectURL(a.src));
    const connected = Boolean(drive.url());
    const rows = [
      ...state.recordings.map((rec) => ({ rec })),
      ...state.remote.map((file) => ({ file })),
    ];
    els.recList.replaceChildren(...rows.map(({ rec, file }) => {
      const li = document.createElement("li");
      const name = document.createElement("strong");
      name.textContent = (rec || file).narrator;
      li.append(name);
      if (connected) {
        const status = document.createElement("span");
        status.className = "sync";
        status.textContent = !rec || isSynced(rec) ? t("synced") : t("notSynced");
        li.append(status);
      }
      let audio = null;
      if (rec) {
        audio = document.createElement("audio");
        audio.controls = true;
        audio.preload = "metadata";
        audio.src = URL.createObjectURL(rec.blob);
        li.append(audio);
      }
      const del = document.createElement("button");
      del.type = "button";
      del.className = "del";
      del.textContent = t("del");
      del.addEventListener("click", async () => {
        // Two-step delete: first tap asks, second tap deletes.
        if (!del.dataset.armed) {
          del.dataset.armed = "1";
          del.textContent = t("confirmDel");
          setTimeout(() => { delete del.dataset.armed; del.textContent = t("del"); }, 4000);
          return;
        }
        player.stop();
        const driveId = file ? file.id : rec.driveId;
        if (driveId && (file || isSynced(rec))) {
          try {
            await drive.remove(driveId);
          } catch {
            els.recTimer.textContent = t("delError");
            return;
          }
        }
        if (rec) await db.remove(rec.id);
        await reloadStoryRecordings();
        refreshCounts();
      });
      if (rec && !connected) {
        const save = document.createElement("a");
        save.className = "save";
        save.textContent = t("saveFile");
        save.download = sharedFileName(rec);
        save.href = audio.src;
        li.append(save);
      }
      li.append(del);
      return li;
    }));
  }

  // ---------------------------------------------------------------------------
  // Wiring

  document.querySelectorAll(".lang-switch button").forEach((b) => {
    b.addEventListener("click", () => setLang(b.dataset.lang));
  });
  els.close.addEventListener("click", closeStory);
  els.dialog.addEventListener("close", closeStory);
  els.dialog.addEventListener("click", (e) => { if (e.target === els.dialog) closeStory(); });
  els.play.addEventListener("click", () => player.toggle());
  els.stop.addEventListener("click", () => player.stop());
  els.narrator.addEventListener("change", () => {
    updateRateVisibility();
    rememberNarrator();
    player.restartIfPlaying();
  });
  els.rate.value = store.get("rate") || els.rate.value;
  els.rate.addEventListener("change", () => {
    store.set("rate", els.rate.value);
    player.restartIfPlaying();
  });
  els.recBtn.addEventListener("click", () => recorder.toggle());
  els.pinyinBtn.addEventListener("click", () => {
    store.set("pinyin", pinyinOn() ? "off" : "on");
    renderPinyinToggle();
    renderList();
    if (state.story) {
      // Re-render the text without interrupting playback.
      const story = state.story;
      const reading = [...els.storyText.children].findIndex((p) => p.classList.contains("reading"));
      setText(els.storyTitle, story.title.zh, pinyinFor(story.id, "title"));
      els.storyTitle.prepend(`${story.emoji} `);
      [...els.storyText.children].forEach((p, i) => setText(p, story.text.zh[i], pinyinFor(story.id, "text", i)));
      if (reading >= 0) els.storyText.children[reading].classList.add("reading");
    }
  });
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    $("recorder").hidden = true;
  }

  // Voices load asynchronously in most browsers.
  if ("speechSynthesis" in window) {
    speechSynthesis.addEventListener?.("voiceschanged", () => {
      if (els.dialog.open) renderNarrators();
    });
    speechSynthesis.getVoices();
  }

  els.famForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const scriptUrl = els.famUrl.value.trim();
    if (!drive.validUrl(scriptUrl)) { els.famMsg.textContent = tf("badUrl"); return; }
    els.famConnect.disabled = true;
    els.famConnect.textContent = tf("connecting");
    try {
      await drive.test(scriptUrl);
      drive.connect(scriptUrl);
      els.famUrl.value = "";
      renderFamily();
      syncAndRefresh();
    } catch {
      renderFamily(tf("failed"));
    } finally {
      els.famConnect.disabled = false;
      els.famConnect.textContent = tf("connect");
    }
  });
  els.famInvite.addEventListener("click", async () => {
    const link = inviteLink();
    try {
      await navigator.clipboard.writeText(link);
      els.famMsg.textContent = tf("copied");
    } catch {
      els.famMsg.textContent = tf("copyFallback");
      els.famInviteText.value = link;
      els.famInviteText.hidden = false;
      els.famInviteText.select();
    }
  });
  els.famDisconnect.addEventListener("click", () => {
    if (!els.famDisconnect.dataset.armed) {
      els.famDisconnect.dataset.armed = "1";
      els.famDisconnect.textContent = tf("confirmDisconnect");
      return;
    }
    drive.disconnect();
    renderFamily();
    refreshCounts();
  });

  els.namesBtn.addEventListener("click", openNames);
  els.namesCancel.addEventListener("click", () => els.namesDialog.close());
  els.namesForm.addEventListener("submit", (e) => { e.preventDefault(); saveNames(); });

  // Invite link: #drive=<script link>&kids=<names>
  let joinedMessage = "";
  if (location.hash.startsWith("#drive=")) {
    const params = new URLSearchParams(location.hash.slice(1));
    const scriptUrl = params.get("drive") || "";
    if (drive.validUrl(scriptUrl)) {
      drive.connect(scriptUrl);
      joinedMessage = tf("joined");
    }
    try {
      const kids = JSON.parse(params.get("kids") || "null");
      if (Array.isArray(kids)) setKids(kids);
    } catch { /* ignore */ }
    history.replaceState(null, "", location.pathname + location.search);
  }

  // Pick up recordings from other phones when the site comes back into view.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") syncAndRefresh();
  });

  renderChrome();
  renderFamily(joinedMessage);
  renderList();
  refreshCounts();
  syncAndRefresh();
})();
