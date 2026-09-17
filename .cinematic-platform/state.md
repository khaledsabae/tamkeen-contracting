# TAMKEEN Cinematic Platform — State

## Status — V2 review-ready (2026-09-17, Milestone 2)
- Phase 0: baseline main@30c6762 — green
- Phase 6 (V2): master video built (720p desktop + 960w mobile), posters webp
- Phase 7: single <video> scroll scrub — verified forward/reverse, 0 console errors
- Phase 8: chapters with real timestamp map + per-chapter alignment + signature techGrid
- Post-journey: capabilities ledger + approach track + manifesto + portfolio plates + CTA (architectural language)
- A11y: focus-visible outlines; keyboard path verified
- Performance: mobile master 8.1MB (≤1024px) vs desktop 20.6MB; preload=metadata + range streaming
- Next.js: 15.5.3 → 15.5.25 (patched line); full regression green
- QA matrix: 768/1024/1440/1920 + 390 mobile + reduced-motion — all PASS
- Phase 14: NOT deployed. Branch cinematic-v2 awaiting owner visual review.

## Timestamp map (master 22.0417s)
ch1 0.000 | ch2 0.182 | ch3 0.364 | ch4 0.545 (SIGNATURE) | ch5 0.727 | ch6 0.911

## Videos
- public/media/cinematic-master.mp4 — 22.04s 1280x720 h264 CFR24 GOP0.5 faststart 20.6MB
- public/media/cinematic-master-960.mp4 — same timeline 960w CRF22 8.1MB (≤1024px)
- posters: cinematic-poster.webp (107KB) / cinematic-poster-mobile.webp (39KB)
