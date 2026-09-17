# TAMKEEN Cinematic V2 — QA Evidence (2026-09-17)

## Automated verification (Playwright headless Chromium)
| Check | Result | Evidence |
|---|---|---|
| Baseline typecheck (main@30c6762) | PASS | `tsc --noEmit` clean |
| Baseline production build (main) | PASS | static prerender, 104kB first load |
| Master video presence | PASS | `video.masterFilm` mounted |
| Forward scrub @50% | PASS | currentTime 12.79s (expected ≈12.81) |
| Forward scrub @90% | PASS | 21.99s (master 22.04s) |
| Reverse scrub @20% | PASS | 5.12s |
| Console errors | PASS | 0 |
| Mobile 390px scrub | PASS | 13.23s at 50% |
| Mobile 390px overflow-x | PASS | none |
| Reduced motion | PASS | masterFilm hidden, fallback visible, ch1 stable |
| Chapter activation @50% | PASS | chapter 04 (الأنظمة = signature zone) |

## Manual/video verification
- Frame spot-checks at chapter starts (0.1/4.1/8.1/12.1/16.1/20.1s): all render correctly
  (land→BIM→construction→MEP engineer+services→capabilities→completed HQ at dusk)
- Signature moment: techGrid overlay active during construction→MEP (12.03s zone)

## Pending (next milestones)
- Post-cinematic sections redesign (capabilities/approach/manifesto/portfolio/CTA)
- Tablet 768/1024 matrix
- Keyboard navigation audit
- Temporary tunnel preview for owner review

## Video specs (cinematic-master.mp4)
- 22.0417s, 1280x720, h264 yuv420p, CFR 24fps, GOP 0.5s, faststart, no audio, 21.6MB
- Posters: cinematic-poster.webp (107KB), cinematic-poster-mobile.webp (39KB)


## Milestone 2 (post-journey + matrix + upgrade) — 2026-09-17
| Check | Result |
|---|---|
| Sections ledger/approach/portfolio/CTA render | PASS (screenshots reviewed) |
| Tablet 768 scrub/overflow/sections/errors | PASS (13.22s, no ovf, 0 errs) |
| Tablet 1024 | PASS (12.79s) |
| Laptop 1440 | PASS (12.80s) |
| Wide 1920 | PASS (12.79s) |
| Mobile 390 (960w master) | PASS (13.23s, no ovf) |
| Keyboard path | PASS (brand→nav→CTAs, logical) |
| Focus-visible outlines | PASS (solid gold outline verified) |
| Reduced-motion (new build) | PASS (fallback visible, ch1 stable) |
| Next 15.5.25 regression | PASS (ci/typecheck/build/scrub/mobile) |
