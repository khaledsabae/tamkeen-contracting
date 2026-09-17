# TAMKEEN Cinematic Platform — State (final, housekept 2026-09-17)

Branch: `cinematic-v2` — review-ready HEAD: legibility scrim pass (see git log; supersedes the SHAs below) (pushed; main untouched; no merge, no deploy)
Functional implementation commit: `04d4407` · performance sprint: `fecf56e` · review-fix regressions: `90e9e4e` · footprint cleanup: `0ae73d5` · production-footprint cleanup: `0ae73d5`→`c12034d` · visual polish: `b51ca6f` · headline copy fix: `de142bd` · cinematic text legibility (local scrim): see HEAD

## Phases
- 0 Baseline: main@30c6762 green (ci/typecheck/build)
- 1–4 Reference/story/assets: approved direction + real timestamp map
- 5–6 Video architecture: 5 clips → ONE master (lossless concat + scrub-optimized re-encode) + mobile compact variant
- 7 Scroll scrub: single <video>, rAF-throttled, forward+reverse verified, 0 console errors
- 8 Choreography: real-landmark chapter windows, per-chapter alignment, signature construction→MEP techGrid
- 8b PLAY JOURNEY auto-scroll: video-synced ride, manual-cancel, STOP state, absolute sectionTop offset, rAF cleanup on unmount (review notes 04d4407)
- Post-journey: capabilities ledger + approach track + manifesto + portfolio plates + CTA (architectural language, demo copy marked)
- A11y: keyboard path + focus-visible outlines + reduced-motion fallback
- Performance: desktop compact 10.09MB / mobile compact 4.47MB (≤1024px); 24Hz quantized scrub;
  native-playback PLAY JOURNEY; poster-first idle attach; no mobile double-download (verified local+tunnel)
- 13 QA: full matrix (768/1024/1440/1920/390) + regression after Next 15.5.25 — all PASS (see qa.md)
- 14 Cinematic text legibility (post-polish): LOCAL radial dark-green scrim (.chapter::before,
  rgba(6,26,22,.62) core, feathered, synced to chapter intensity) + text shadows on en/body/headline/eyebrow
  + counter plate — first-scene clarity preserved, no full-screen re-darkening (see qa.md §10)
- 15 Deployment: NOT authorized/performed — awaiting owner visual review

## Timestamp map (master 22.0417s)
ch1 0.000 · ch2 0.182 · ch3 0.364 · ch4 0.545 (SIGNATURE) · ch5 0.727 · ch6 0.911

## Videos (serving assets)
- public/media/cinematic-master-desktop-compact.mp4 — 22.04s 1280x720 CRF24 GOP0.5 faststart 10.09MB (desktop)
- public/media/cinematic-master-mobile-compact.mp4 — same timeline 854w CRF26 4.47MB (≤1024px)
- posters: cinematic-poster.webp (107KB) / cinematic-poster-mobile.webp (39KB)
- public/media contains ONLY serving assets (15.1MB total): 2 compact masters + 2 posters
- originals (5 clips) + full-quality master + superseded 960 archived at tamkeen-contracting-source-media/ (non-public, 48MB)

## Next step (owner)
Visual review via tunnel → approve → merge cinematic-v2 to main → production deploy (explicit order only).