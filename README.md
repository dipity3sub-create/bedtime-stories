# Bedtime Stories

A single-page library of infant bedtime stories in **English, 한국어 and 中文**.

- Pick a language, then tap a story title to open its text.
- Press ▶ to have it read aloud. The paragraph being read is highlighted.
- Choose the narrator in the **Voice** menu:
  - **Device voices**: the native text-to-speech voices installed on the phone/computer for that language (Web Speech API).
  - **Recorded voices**: your own recordings (see below).
  - **Studio recordings**: optional audio files shipped with the site.

## Recording your own voices

Open a story, expand **🎙 Record your own voice**, enter a narrator name (e.g. "Mom", "할머니", "爸爸") and record yourself reading it.
Each language keeps its own recordings, so a different person can narrate each language. The last narrator you picked
for a language is chosen automatically for other stories in that language when they have a recording by the same name.

Recordings are saved in the browser's IndexedDB on that device only. Microphone access needs `https://` or `localhost`.

## Sharing recordings with family (Google Drive)

Connect the site to a Google Drive folder once, and recordings made on any connected phone show up on the others
automatically. Setup steps: [`google-drive/README.md`](google-drive/README.md). Then use **Copy invite link** on the
site to connect your partner's phone.

## Public recordings

Audio files in the [`recordings`](recordings/) folder are offered to everyone who opens the site.
The repository is public, so anyone with the link can hear them. See [`recordings/README.md`](recordings/README.md).

## Adding stories

Add an entry to `window.STORIES` in `stories.js` with `title` and `text` (an array of paragraphs) for `en`, `ko` and `zh`.

## Running locally

It's a static site with no build step:

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

Hosted with GitHub Pages at https://dipity3sub-create.github.io/bedtime-stories/ (Settings → Pages → Deploy from a branch → main, / (root)).
