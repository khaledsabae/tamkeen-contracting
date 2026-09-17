# TAMKEEN Cinematic Platform — State (final, housekept 2026-09-17)

Branch: `cinematic-v2` — review-ready HEAD `a8ea164` (pushed; main untouched; no merge, no deploy)
Functional implementation commit: `04d4407` (V2 core + review-note fixes; docs follow in later commits)

## Phases
- 0 Baseline: main@30c6762 green (ci/typecheck/build)
- 1–4 Reference/story/assets: approved direction + real timestamp map
- 5–6 Video architecture: 5 clips → ONE master (lossless concat + scrub-optimized re-encode) + mobile 960w variant
- 7 Scroll scrub: single <video>, rAF-throttled, forward+reverse verified, 0 console errors
- 8 Choreography: real-landmark chapter windows, per-chapter alignment, signature construction→MEP techGrid
- 8b PLAY JOURNEY auto-scroll: video-synced ride, manual-cancel, STOP state, absolute sectionTop offset, rAF cleanup on unmount (review notes 04d4407)
- Post-journey: capabilities ledger + approach track + manifesto + portfolio plates + CTA (architectural language, demo copy marked)
- A11y: keyboard path + focus-visible outlines + reduced-motion fallback
- Performance: mobile master 8.1MB (≤1024px) vs desktop 20.6MB; preload=metadata + range streaming
- 13 QA: full matrix (768/1024/1440/1920/390) + regression after Next 15.5.25 — all PASS (see qa.md)
- 14 Deployment: NOT authorized/performed — awaiting owner visual review

## Timestamp map (master 22.0417s)
ch1 0.000 · ch2 0.182 · ch3 0.364 · ch4 0.545 (SIGNATURE) · ch5 0.727 · ch6 0.911

## Videos
- public/media/cinematic-master.mp4 — 22.04s 1280x720 h264 CFR24 GOP0.5 faststart 20.6MB
- public/media/cinematic-master-960.mp4 — same timeline 960w CRF22 8.1MB (≤1024px)
- posters: cinematic-poster.webp (107KB) / cinematic-poster-mobile.webp (39KB)

## Next step (owner)
Visual review via tunnel → approve → merge cinematic-v2 to main → production deploy (explicit order only).