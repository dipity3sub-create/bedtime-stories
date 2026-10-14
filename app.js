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
      voice: "Voice",
      speed: "Speed",
      deviceVoices: "Device voices",
      recordedVoices: "Recorded on this device",
      studioVoices: "Shared recordings",
      saveFile: "Save file",
      shareHelp: "To share a recording with everyone: tap Save file, then upload that file to the recordings folder on GitHub. Don't rename it. It shows up here for everyone within a few minutes.",
      shareLink: "Open the upload page",
      noVoice: "This device has no English voice installed. Add one in your system's speech settings, or record your own below.",
      recSummary: "🎙 Record your own voice",
      recHelp: "Read the story aloud and save it. Your recording stays on this device and appears in the Voice list for this story.",
      recName: "Narrator name",
      recPlaceholder: "Mom",
      record: "● Record",
      stopRec: "■ Stop",
      del: "Delete",
      confirmDel: "Delete this recording?",
      micError: "Could not access the microphone. Recording needs microphone permission and an https:// (or localhost) address.",
      recorded: "recorded",
    },
    ko: {
      title: "잠자리 동화",
      subtitle: "잠들기 전 함께 읽는 포근한 이야기",
      voice: "목소리",
      speed: "속도",
      deviceVoices: "기기 음성",
      recordedVoices: "이 기기에서 녹음",
      studioVoices: "공유된 녹음",
      saveFile: "파일 저장",
      shareHelp: "녹음을 모두와 공유하려면 '파일 저장'을 누른 뒤 그 파일을 GitHub의 recordings 폴더에 올리세요. 파일 이름은 바꾸지 마세요. 몇 분 안에 모두에게 나타나요.",
      shareLink: "업로드 페이지 열기",
      noVoice: "이 기기에 한국어 음성이 설치되어 있지 않아요. 시스템 음성 설정에서 추가하거나 아래에서 직접 녹음해 보세요.",
      recSummary: "🎙 내 목소리로 녹음하기",
      recHelp: "동화를 소리 내어 읽고 저장하세요. 녹음은 이 기기에만 저장되며 이 동화의 목소리 목록에 나타나요.",
      recName: "읽어 주는 사람",
      recPlaceholder: "엄마",
      record: "● 녹음",
      stopRec: "■ 정지",
      del: "삭제",
      confirmDel: "이 녹음을 삭제할까요?",
      micError: "마이크에 접근할 수 없어요. 녹음하려면 마이크 권한과 https:// (또는 localhost) 주소가 필요해요.",
      recorded: "녹음",
    },
    zh: {
      title: "睡前故事",
      subtitle: "睡前一起读的温柔小故事",
      voice: "声音",
      speed: "语速",
      deviceVoices: "设备语音",
      recordedVoices: "在此设备上录制",
      studioVoices: "共享的录音",
      saveFile: "保存文件",
      shareHelp: "要和大家分享录音：点“保存文件”，再把文件上传到 GitHub 的 recordings 文件夹。请不要改文件名。几分钟后所有人都能看到。",
      shareLink: "打开上传页面",
      noVoice: "此设备没有安装中文语音。请在系统语音设置中添加，或在下方录制您自己的声音。",
      recSummary: "🎙 录制自己的声音",
      recHelp: "大声朗读故事并保存。录音只保存在此设备上，并会出现在这个故事的声音列表中。",
      recName: "朗读者",
      recPlaceholder: "妈妈",
      record: "● 录音",
      stopRec: "■ 停止",
      del: "删除",
      confirmDel: "删除这段录音吗？",
      micError: "无法使用麦克风。录音需要麦克风权限以及 https://（或 localhost）地址。",
      recorded: "录音",
    },
  };

  const $ = (id) => document.getElementById(id);
  const els = {
    title: $("site-title"),
    subtitle: $("site-subtitle"),
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
  };

  const store = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* ignore */ } },
  };

  const state = {
    lang: store.get("lang") || guessLang(),
    story: null,
    recordings: [],     // recordings for the open story + language
    shared: [],         // shared recordings for the open story + language
    recordingCounts: {}, // "storyId:lang" -> count, for list badges
  };

  function guessLang() {
    const nav = (navigator.language || "en").toLowerCase();
    if (nav.startsWith("ko")) return "ko";
    if (nav.startsWith("zh")) return "zh";
    return "en";
  }

  const t = (key) => UI[state.lang][key];

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
  // Story list

  function renderChrome() {
    document.documentElement.lang = state.lang;
    document.title = t("title");
    els.title.textContent = t("title");
    els.subtitle.textContent = t("subtitle");
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
      title.textContent = story.title[state.lang];
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
    state.recordingCounts = {};
    for (const r of [...all, ...shared]) {
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
    els.storyTitle.textContent = `${story.emoji} ${story.title[lang]}`;
    els.storyTitle.lang = lang;
    els.storyText.lang = lang;
    els.storyText.replaceChildren(...story.text[lang].map((para) => {
      const p = document.createElement("p");
      p.textContent = para;
      return p;
    }));
    if (!els.dialog.open) els.dialog.showModal();
    els.dialog.querySelector(".dialog-inner").scrollTop = 0;
    const [mine, shared] = await Promise.all([db.forStory(story.id, lang), loadShared()]);
    if (state.story !== story || state.lang !== lang) return; // user moved on
    state.recordings = mine;
    state.shared = shared.filter((r) => r.storyId === story.id && r.lang === lang);
    renderNarrators();
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

  function renderNarrators() {
    const story = state.story;
    if (!story) return;
    const lang = state.lang;
    const sel = els.narrator;
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
    addGroup(t("recordedVoices"), state.recordings.map((r) => [`rec:${r.id}`, `🎙 ${r.narrator}`]));
    const voices = voicesFor(lang);
    addGroup(t("deviceVoices"), voices.map((v) => [`tts:${v.voiceURI}`, `🔊 ${v.name}`]));

    // Restore the narrator last used for this language, by name for recordings.
    const pref = store.get(`narrator:${lang}`) || "";
    const prefName = pref.startsWith("name:") ? pref.slice(5) : null;
    const prefRec = prefName && state.recordings.find((r) => r.narrator === prefName);
    const prefShared = prefName && state.shared.find((r) => r.narrator === prefName);
    if (prefRec) sel.value = `rec:${prefRec.id}`;
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
    if (v.startsWith("rec:") || v.startsWith("shared:")) {
      const rec = state.recordings.find((r) => `rec:${r.id}` === v) ||
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

    function audioSrc() {
      const v = els.narrator.value;
      if (v.startsWith("file:")) return v.slice(5);
      if (v.startsWith("shared:")) return `${SHARED_DIR}/${encodeURIComponent(v.slice(7))}`;
      const rec = state.recordings.find((r) => `rec:${r.id}` === v);
      if (!rec) return null;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      objectUrl = URL.createObjectURL(rec.blob);
      return objectUrl;
    }

    function play() {
      if (!state.story || !els.narrator.value) return;
      rememberNarrator();
      if (els.narrator.value.startsWith("tts:")) {
        mode = "tts";
        setPlaying(true);
        speakFrom(paraIndex);
      } else {
        if (mode !== "audio") {
          const src = audioSrc();
          if (!src) return;
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
    els.recList.replaceChildren(...state.recordings.map((rec) => {
      const li = document.createElement("li");
      const name = document.createElement("strong");
      name.textContent = rec.narrator;
      const audio = document.createElement("audio");
      audio.controls = true;
      audio.preload = "metadata";
      audio.src = URL.createObjectURL(rec.blob);
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
        await db.remove(rec.id);
        state.recordings = state.recordings.filter((r) => r.id !== rec.id);
        renderNarrators();
        renderRecordings();
        refreshCounts();
      });
      const save = document.createElement("a");
      save.className = "save";
      save.textContent = t("saveFile");
      save.download = sharedFileName(rec);
      save.href = audio.src;
      li.append(name, audio, save, del);
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

  renderChrome();
  renderList();
  refreshCounts();
})();
