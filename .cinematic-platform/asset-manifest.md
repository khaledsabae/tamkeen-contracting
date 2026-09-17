# Asset Manifest — Cinematic V2 (final)

| Asset | Status | Source | Specs |
|---|---|---|---|
| clip-01-vision-to-bim.mp4 | ARCHIVED (non-public) | supplied | 1280x720 h264 24fps, 4.01s |
| clip-02-bim-to-construction.mp4 | ARCHIVED (non-public) | supplied | 1280x720 h264 24fps, 4.01s |
| clip-03-construction-to-mep.mp4 | ARCHIVED (non-public) | supplied | 1280x720 h264 24fps, 4.01s |
| clip-04-mep-to-capabilities.mp4 | ARCHIVED (non-public) | supplied | 1280x720 h264 24fps, 4.01s |
| clip-05-capabilities-to-completion.mp4 | ARCHIVED (non-public) | supplied | 1280x720 h264 24fps, 6.02s |
| cinematic-master.mp4 | ARCHIVED (non-public source, 20.6MB) | concat lossless + CRF18 | kept at tamkeen-contracting-source-media/ outside public/ |
| cinematic-master-desktop-compact.mp4 | SERVING | x264 CRF24 re-encode | 22.04s, GOP 0.5s, faststart, 10.09MB — desktop |
| cinematic-master-mobile-compact.mp4 | SERVING | 854w CRF26 | same timeline, 4.47MB — mobile ≤1024px |
| cinematic-poster.webp | GENERATED | desktop-compact @0.5s | 107KB |
| cinematic-poster-mobile.webp | GENERATED | desktop-compact @0.5s scale 720w | 39KB |
| BrandLockup (inline SVG) | CODE — replaceable | gold geometric mark | swap with official client vector when supplied |

Naming rule kept: stable semantic names; no `final2.png`-style strays.
Archived originals live at `tamkeen-contracting-source-media/` (non-public) and in git history.
## Portfolio plates (added 2026-09-17, owner-authorized sample projects)
- public/media/portfolio/residential.jpg — 800x600 q70 ~96KB (Unsplash, free license)
- public/media/portfolio/commercial.jpg — 800x600 q70 ~113KB (Unsplash, free license)
- public/media/portfolio/infrastructure.jpg — 800x600 q70 ~92KB (Unsplash, free license)
- loaded lazy (loading=lazy), below the fold — zero impact on first paint / video payload
