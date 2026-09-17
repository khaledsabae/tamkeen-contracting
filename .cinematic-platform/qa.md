# TAMKEEN Cinematic V2 — QA Evidence (final, housekept 2026-09-17)

> Single source of truth. The old "Pending (next milestones)" section was removed —
> every item in it is now verified below.
> Functional implementation commit: `04d4407` — review-ready HEAD: `a8ea164`.

## 1. Baseline & build
| Check | Result | Evidence |
|---|---|---|
| Baseline typecheck (main@30c6762) | PASS | `tsc --noEmit` clean |
| Baseline production build (main) | PASS | static prerender, 104kB first load |
| Current typecheck (04d4407) | PASS | `tsc --noEmit` clean |
| Current production build | PASS | static prerender |
| Next.js version | PASS | 15.5.25 (patched 15.5 line; full regression re-run) |

## 2. Cinematic scrub (single master video)
| Check | Result |
|---|---|
| `video.masterFilm` mounted | PASS |
| Forward scrub @50% | PASS — 12.79–12.80s (expected ≈12.81) |
| Forward scrub @90% | PASS — 21.99s (master 22.04s) |
| Reverse scrub @20% | PASS — 5.12s |
| Console errors | PASS — 0 |
| Chapter activation @50% | PASS — ch04 (الأنظمة = signature zone) |
| Signature techGrid in construction→MEP zone | PASS |

## 3. PLAY JOURNEY auto-scroll (04d4407)
| Check | Result |
|---|---|
| Ride from mid-journey (40%) | PASS — continues forward, in sync (t=11s @ y2792) |
| STOP freezes position | PASS — y2803 held |
| Restart continues from stop point | PASS — y3350 forward |
| Wheel/touch/key cancels auto-play | PASS — manual control restored |
| Full ride completion | PASS — ch06 @ 21.98s, button auto-stops |
| Absolute sectionTop offset | PASS — robust to content added above the section |
| rAF cleanup on unmount | PASS — no orphaned animation frame |

## 4. Responsive matrix (all: no overflow-x, all sections present, 0 console errors)
| Viewport | Scrub @50% | Result |
|---|---|---|
| Mobile 390×844 | 13.23s (960w master) | PASS |
| Tablet 768×1024 | 13.22s | PASS |
| Tablet 1024×768 | 12.79s | PASS |
| Laptop 1440×900 | 12.80s | PASS |
| Wide 1920×1080 | 12.79s | PASS |

## 5. Accessibility
| Check | Result |
|---|---|
| Keyboard path (brand → nav ×3 → CTA → contact CTA) | PASS — logical order |
| Focus-visible outlines | PASS — solid gold outline verified programmatically |
| Reduced motion | PASS — masterFilm hidden, fallback visible, ch1 stable |
| Arabic aria-labels on controls | PASS |

## 6. Manual visual verification
- Frame spot-checks at chapter starts (0.1/4.1/8.1/12.1/16.1/20.1s): land → BIM →
  construction → MEP engineer+services → capabilities → completed HQ at dusk — all correct
- Post-journey sections screenshots reviewed: capabilities ledger, approach track,
  portfolio plates, final CTA — same dark-green/gold architectural language
- Phone screenshot through tunnel (390px): PLAY JOURNEY button visible, composition intact

## 7. Video specs
- Desktop master: 22.0417s, 1280×720, h264 yuv420p, CFR 24fps, GOP 0.5s, faststart, no audio, 20.6MB
- Mobile master: same timeline, 960w, CRF22, 8.1MB (served ≤1024px)
- Posters: cinematic-poster.webp (107KB), cinematic-poster-mobile.webp (39KB)
- Preload: metadata + HTTP range streaming (app shell never blocked)

## 8. Preview
- Tunnel: https://evanescence-supporting-encounter-outstanding.trycloudflare.com
  (temporary — dies if the laptop sleeps; serves build 04d4407 with the play button)

## 9. Known limitations
- Video is 720p (source clips' native resolution)
- Demo content only — no invented company facts; placeholders clearly marked
- Auto-play ride duration (~25s) is slightly longer than the video (1.15× factor) so text is readable
- Production deployment NOT performed — awaiting owner visual approval