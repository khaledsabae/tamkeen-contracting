# TAMKEEN Cinematic V2 — QA Evidence (final, housekept 2026-09-17)

> Single source of truth. The old "Pending (next milestones)" section was removed —
> every item in it is now verified below.
> Functional implementation commit: `04d4407` · performance sprint: `fecf56e`
> Review-fix regressions (PLAY JOURNEY midpoint + CSS-var intensity): `90e9e4e`
> Production-footprint cleanup (public/media = serving assets only, 15.1MB): `c12034d` — review-ready HEAD: `c12034d`.

## 1. Baseline & build
| Check | Result | Evidence |
|---|---|---|
| Baseline typecheck (main@30c6762) | PASS | `tsc --noEmit` clean |
| Baseline production build (main) | PASS | static prerender, 104kB first load |
| Current typecheck (HEAD) | PASS | `tsc --noEmit` clean |
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
| Mobile 390×844 | 13.21s (mobile-compact master) | PASS |
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

## 6b. Performance sprint (fecf56e + 90e9e4e)
| Check | Result |
|---|---|
| Mobile first-load | 0.76MB shell + poster only; video attaches at idle |
| Mobile video selection | PASS — requests ONLY the mobile-compact master (verified locally AND via tunnel; zero desktop bytes) |
| Desktop compact master | 10.09MB (CRF24, GOP 0.5s, faststart) — target 8-12MB PASS |
| Mobile compact 854w | 4.47MB (CRF26, quality frame-checked) — target 3-5MB PASS |
| Manual scrub seek rate | 24Hz cap + frame-quantized targets (video is 24fps) |
| Scrub state | refs + CSS vars; React state only on chapter change |
| PLAY JOURNEY architecture | native video.play(); scroll follows currentTime; scrub suspended during playback |
| PLAY JOURNEY start 0/40/75% | PASS — video starts at matching timestamp, ends at section end in ch06 |
| Text intensity continuity | PASS - computed opacity 0.02-0.97-1.0-0.67 across a window (CSS vars) |
| Fonts | next/font self-hosted (render-blocking @import removed) |
| Mobile grain / below-fold | grain off on mobile; content-visibility:auto |

## 7. Video specs
- Desktop compact: 22.0417s, 1280×720, h264 CRF24, GOP 0.5s, faststart, no audio, 10.09MB
- Mobile compact: same timeline, 854w, CRF26, 4.47MB (served ≤1024px)
- Posters: cinematic-poster.webp (107KB), cinematic-poster-mobile.webp (39KB)
- Preload: metadata + HTTP range streaming (app shell never blocked)

## 8. Preview
- Tunnel: https://evanescence-supporting-encounter-outstanding.trycloudflare.com
  (temporary — dies if the laptop sleeps; serves build 04d4407 with the play button)

## 9. Known limitations
- Video is 720p (source clips' native resolution)
- Demo content only — no invented company facts; placeholders clearly marked
- Production deployment NOT performed — awaiting owner visual approval