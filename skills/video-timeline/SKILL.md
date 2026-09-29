---
name: video-timeline
description: 'Video menegak 9:16, 90 saat, gaya NEON TIMELINE SINEMATIK (macam video "THE PHONE — 150 Years") tentang sejarah atau evolusi apa-apa topik. Motion graphics tanpa suara: ikon line-art neon, tahun besar Orbitron, lantai grid, HUD garis masa, glitch pada cut, dan grade warna yang berubah ikut zaman. Muzik 120 BPM dijana sendiri yang makin laju (4s → 2s → 1s → setiap beat, pivot, drop, finale) dengan SFX ikut topik. Guna SETIAP KALI Taufik minta video ''sejarah X'', ''evolusi X'', ''history of X'', ''timeline'', ''gaya phone tu'', ''neon timeline'', atau prompt panjang ala ''make a vertical video about the history of ... cinematic fast-paced''. Engine siap: tulis scenes.js + sfx.json sahaja. BERBEZA daripada video-vox/vector/gorillaz/kartun/kecoh/gempak/remix/lapis (guna suara asal Taufik) dan video-sketch.'
---

# video-timeline — neon cinematic history montage (9:16, 90s)

Taufik picked this style from a test run ("gaya phone ni yang aku cari"). What makes it work, so keep all of it:

- **The colour grade tells the story.** Each era has its own accent colour and the palette slides from one to the next (old era is warm and amber, the modern era is neon). The viewer feels time passing without reading anything.
- **Pace follows the music.** Scenes get shorter as the song builds (4s, then 2s, then 1s, then single-beat word slams). There is one quiet "pivot" moment, then a drop with big numbers, then a bookend finale.
- **Neon line-art icons.** Every scene has a hand-coded icon drawn as a glowing outline that animates (draws on, spins, rings, types). Real photos are never used.
- **The facts are real.** Every year, name and number must be defensible. See the fact rules below.

## Files

```
assets/template/      copy this per video (scripts/new_video.sh does it)
  engine.js           renderer, text, background, HUD, painters. DO NOT EDIT per video
  scenes.js           THE file you write: palette KEYS, CFG, ICON painters, scene list
  sfx.json            topic sound design + key shift for music.py
  music.py            procedural 120 BPM score (reads sfx.json) -> music.wav
  render.js           Playwright -> ffmpeg. `node render.js` or `node render.js stills 1 7 33`
  index.html, fonts/  Orbitron (years), Space Grotesk (titles), Space Mono (labels)
scripts/new_video.sh <dest>          scaffold a project
scripts/contact_sheet.sh <project>   tile stills into one JPG to eyeball
```

The scenes.js shipped in the template is the full phone video (topic mode). `references/scenes-chang-e4-copywriting.js` is a full Malay copywriting-mode example with a gold CTA ending. Read the one that matches the request before writing, because they are the best reference for tone, density and icon style.

## Workflow

1. **Research and outline** (in your head or a scratch note). Build the storyline to fit the fixed slot map below. Chronological order, with the one biggest turning point placed at the PIVOT.
2. `bash scripts/new_video.sh /home/user/<repo>/<topic>-history`
3. **Write scenes.js**: KEYS (era palette), CFG.hud, ICON painters, scene list. Then write sfx.json.
4. `python3 music.py` (about 5s).
5. **Stills QA**: `node render.js stills <one timestamp inside every section>`, then `bash scripts/contact_sheet.sh .`, then Read the JPG. Check the list under "QA checklist" and fix, then re-still only the frames you changed.
6. `node render.js` renders 2,700 frames in about 5–6 min. Run it in the foreground with a long timeout. The result is `<folder>.mp4`, about 50 MB.
7. **Deliver** (see Delivery).

## Fixed structure (120 BPM, 1 bar = 2s, 45 bars = 90s)

engine.js exposes these bar constants and music.py follows the same map. If the video is not the standard 90s, change both files together.

| Bars | Const | Section | Cut length | What goes here |
|---|---|---|---|---|
| 0–1 | — | Cold open | 4s | A sensory hook tied to the topic (the phone used a ringing bell plus "INCOMING CALL"), and the start year fading in |
| 2–3 | — | Title | 4s | Big title, underline, `N YEARS · start — end`, one-line promise |
| 4–15 | ACT1 | Act 1: origins | 6 × 2 bars | The earliest milestones, one per scene |
| 16–25 | ACT2 | Act 2: acceleration | 10 × 1 bar | Milestones come faster |
| 26–27 | PIVOT | Pivot | 2 bars | THE turning point. Music drops out, dark screen, an icon draws on slowly, "EVERYTHING CHANGED"-type line |
| 28–33 | ACT3 | Act 3: explosion | 12 × half bar | Modern era, rapid fire, glitch on each cut |
| 34–35.75 | WORDS | Word slams | 7 beats | 7 single verbs or adjectives, one per beat |
| 35.75–36 | BREATH | Breath | half beat | Dark screen with one growing dot. The music is silent here |
| 36–41 | DROP | Drop | 2+2+2 bars | Big stat with a count-up, a mind-blowing comparison, then 8-beat evolution recap ("FROM X / TO Y") |
| 42–45 | FINALE | Finale | 6s | Title again, tagline, one-line meaning; at bar 44 a callback to the cold open (sfx + small icon + question), fade out |

Want 60s? Remove Act 1 scenes and shift the constants, and cut the same bars in music.py. Do this only when Taufik asks, because 90s is the approved default.

## Writing scenes.js

Scene API (from engine.js):

```js
sc(b0, b1, fn, year)      // scene from bar b0 to b1; fn(lt, d) gets local time + duration; year feeds the HUD
era(year, icon, title, sub, {place, titleSize, subOff, arg, s})   // standard card; use for Act 1/2
htext(str, y, size, {font:'Orb'|'Grot', weight, alpha, track, glow, scale})  // glowing headline, centred, '\n' ok
ptext(str, y, size, alpha, {weight, color})   // body text, centred
mono(str, y, size, alpha, color, track)       // Space Mono label in accent colour, centred on CX
neon(w, blur, a) / neonA / fillA(a, blur) / fillB / rr(x,y,w,h,r) / waves(x,y,n,t,dir,r0,spread) / slab(w,h,r,glass) / keypad(...)
ca(a) / cb(a)             // current primary / secondary grade colour as rgba()
eo, eback, lerp, clamp, mulberry(seed), beatPulse(curT), TAU, CX, IY (icon centre y = 860)
useImage('name', 'file.png')   // top level of scenes.js; preloaded before any frame, then ctx.drawImage(IMG.name, ...)
```

**Watermark / handle**: `CFG.watermark = {text: '@taufik.pg', y: 1700, alpha: 0.6, fromBar: 0.5, toBar: FINALE}`. When Taufik asks for his handle on the video, add it. It is drawn after the vignette, so it stays readable, and it stops at the finale because the CTA shows the handle big there.

**Photo CTA finale**: when he supplies his photo, which is usually a transparent PNG cutout:
- Crop it to the alpha bounding box, downscale it to 1000px wide, and save it as `taufik.png` in the project.
- Check the cutout for stray fringe pixels, e.g. a purple hair wisp. Remove them by colour inside a small region.
- In the finale, slide the photo up from the bottom (width about 900, top edge about y 700) inside a glowing ring with a gold halo.
- Fade the bottom to black and stack the CTA on top: `SHARE. / LIKE. / FOLLOW` (Orbitron 118, one slam per word), `@taufik.pg` (Grot 88), `DEALER PUBLIC GOLD` (mono).
- The full example is in `references/scenes-emas-penyelamat-cta-photo.js`.

Act 3 scenes and word slams use custom `sc()` bodies. Copy the patterns from the phone scenes.js (the `smart.forEach` and `words.forEach` blocks).

**KEYS (colour grade)**: `[timeSec, [r,g,b] primary, [r,g,b] secondary]`, interpolated between keys. Give each era a clearly different hue and keep the final era the most saturated neon. Pick hues that suit the topic. Some examples:
- Aviation: brass/amber, then sky blue, then white-hot plus cyan.
- Internet: phosphor green, then electric blue, then cyan/magenta.
- Money: copper, then emerald, then gold plus violet.
- Cars: rust orange, then chrome teal, then electric lime.

**CFG.hud**: `{fromBar, toBar, start, end, startLabel?, endLabel?, levels?: [5 years], tag?: bars => 'LABEL'}`. The levels are the 5 year thresholds that light up the signal-style bars. Use them for something meaningful: network generations, speed tiers, engine types. Omit `levels` to show only the timeline. For BC dates, set `year` to a number (negative for BC) and `startLabel` to the display text.

**Icons**: each painter is `name(lt, arg)`, centred at 0,0 with radius about 300. Stroke with `neon()`, and use `neonA`/`fillA` for highlights. Animate from `lt` so the icon draws on, spins, pulses or types. Aim for about 30 icons per video. They can be simple, but each must be recognisable within 1 second. Reuse `slab()` for any device/card, `waves()` for any signal or sound, and `keypad()` for grids.

**Text rules** (learned the hard way):
- Headline width: Orbitron 900 at 150px fits only about 8 characters. Keep titles ≤ 16 chars at 76–88px Grot, or split with `\n`. Always check the widest title in stills.
- `mono()`/`ptext()` are centred on CX in *screen* space. Inside an ICON painter (translated context), draw text with `ctx.fillText(..., 0, y)` instead, or it lands off-screen.
- Keep text out of the bottom 280px (TikTok UI). Titles sit around y 1390, subs around y 1500–1550.
- Flash and glow effects: cap full-screen white at about 0.75 alpha, otherwise frames blow out.
- On-screen language follows the input. A topic given as a prompt in English means English. A Malay copywriting post means Malay on-screen (keep technical and proper names as they are). Malay words run longer, so use `yearSize` 120–140 for word-labels like `ZON MATI` and keep titles at 68–84px.

**Fact rules**: use only milestones you're confident in: well-documented dates, names and numbers. Prefer the safer phrasing ("the richest gold field on Earth" over a contested percentage). For "today" stats, use round, widely published figures and phrase them with "+" or "more than". In the final message, list the numeric claims you used so Taufik can sanity-check them.

## Input: a copywriting post instead of a topic

Taufik may paste one of his FB posts. There are two common shapes:
- **Story post**: hook question → story → "Tiga pengajaran" → gold analogy → question CTA → sign-off. The example is Chang'e-4, in `references/scenes-chang-e4-copywriting.js`.
- **Argument / segmentation post**: contrarian hook ("tak semua orang perlu emas") → N groups or reasons → formula → comment prompt → punchline → CTA. The example is "3 golongan", in `references/scenes-emas-penyelamat-cta-photo.js`. That one mapped as follows:
  - Act 1 = groups 01–02, with 2–3 cards each.
  - Act 2 = the most dramatic group told through real history. The post's Titanic metaphor became 1912 facts, plus the Cyprus 2013 bail-in and the Lebanon 2019 withdrawal limits for "akaun dibekukan".
  - Act 3 = the formula steps, then the "drop di komen: kumpulan mana?" prompt.
  - Drop = the post's punchline, split across the beat ("BOT…" then "PENYELAMAT!").
  - Give each group its own grade colour so the viewer feels the section change.

For a story post, map it onto the same slots:

| Copy part | Slot |
|---|---|
| Hook question ("Tahu tak…?") | Cold open: sensory icon plus the question, with the answer held back until the title |
| Topic / answer | Title card, with one line promising the money angle |
| Background context (earlier history the post implies) | Act 1. Add real prior milestones so the timeline has depth, e.g. Luna 3 1959 and Apollo 8 1968 for a Moon story |
| Story beats | Act 2, one fact per bar |
| "Tiga pengajaran" | Pivot = "3 PENGAJARAN", then Act 3 slots 1–6 (two cuts per lesson: `01` + headline, then the payoff line) |
| Gold analogy / cash vs gold | Act 3 slots 7–12, with the grade shifting to gold here |
| Word slams | 7 verbs that summarise the lessons plus gold (SEDIA, SAMBUNG, SIMPAN, LINDUNG…) |
| Core analogy line ("Emas = X anda") | Drop part 1 |
| Question CTA ("kenapa biarkan…?") | Drop part 2 |
| Recap | "DARI … / KE …" from the story's milestones ending on EMAS, ANDA |
| Sign-off | Finale: tagline, "Moga perkongsian ini bermanfaat", TAUFIK MUSA, DEALER PUBLIC GOLD, simpanemasfizikal.com, then the bar-44 callback question |

Fact-check the post itself before animating it, because his copy sometimes carries viral-article errors. Correct them on-screen and tell him what you changed and why, since he may also want to fix the post. Examples from the Chang'e-4 post:
- It was cotton that sprouted, not potato.
- The biosphere carried fruit-fly eggs, not silkworm eggs.
- The South Pole–Aitken basin is about 6–8 km deep, not 13 km.
- Chang'e-6 also landed on the far side in 2024, so China is the only *country*, but Chang'e-4 is not the only *robot*.
- From "3 golongan": the post said Titanic sailed "tanpa bot penyelamat". In fact it had 20 lifeboats for about 1,178 people, with about 2,224 on board. The true version is more powerful on-screen: show it as "not enough".

The gold palette for the money section: `[255,204,96]` / `[255,140,60]`. The shared helper `goldbar()` from the Chang'e-4 scenes.js is worth copying (a 999.9 trapezoid bar with a gradient).

## sfx.json

```json
{"key_shift": 0, "events": [{"type": "ring", "bar": 0, "beat": 0.3}, {"type": "clicks", "bar": 8, "beat": 0.5, "count": 7}]}
```

Types: `ring` (old phone bell), `clicks` (dial/mechanical), `typing`, `dtmf` (8 keypad tones in 8ths), `beep2` (double beep), `shutter`, `coin`, `whoosh`, `boom`, `bell` (note). Put 5–9 events on the scenes they illustrate, plus one at bar 0 (hook) and one at bar 44 (callback). `key_shift` transposes the whole score: use −2 or +1 for variety between videos.

## QA checklist (stills)

Check these on the contact sheet before the full render:
- No text clipped at the edges. Titles, years and the finale title are the usual offenders.
- Icons read clearly and nothing overlaps the year or title.
- Icon-local labels sit where intended.
- The grade progression is visible across the sheet.
- The HUD marker moves forward.
- Frames exactly on a cut show the white flash. That is expected, so sample 0.3s into a scene for layout checks.

## Delivery

- Commit the project folder (sources plus mp4) and push, usually to `taufikmusa/randomvideo` (his test sandbox).
- Keep `*/stills/` and `*/music.wav` git-ignored.
- Give Taufik the raw download link: `https://github.com/<owner>/<repo>/raw/<branch>/<folder>/<folder>.mp4`. SendUserFile caps at 30 MB, so the link is the delivery.
- The mp4 must stay under GitHub's 100 MB limit. The renderer uses crf 20 with maxrate 7M, about 55 MB for 90s.
- Reply in casual Malay with:
  - the link
  - a section-by-section table (time, content, cut pace)
  - the director's idea (the grade story)
  - the facts used
  - any honest limitation (no voiceover, line-art rather than footage)
- When Taufik says he has downloaded it and asks to delete: `git rm` the mp4 only, keep the sources, and push. Deleted videos remain in git history. Offer a history cleanup, but never force-push without his explicit yes.
