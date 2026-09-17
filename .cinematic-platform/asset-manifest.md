# Asset Manifest — Cinematic V2 (final)

| Asset | Status | Source | Specs |
|---|---|---|---|
| clip-01-vision-to-bim.mp4 | KEEP (original) | supplied | 1280x720 h264 24fps, 4.01s |
| clip-02-bim-to-construction.mp4 | KEEP (original) | supplied | 1280x720 h264 24fps, 4.01s |
| clip-03-construction-to-mep.mp4 | KEEP (original) | supplied | 1280x720 h264 24fps, 4.01s |
| clip-04-mep-to-capabilities.mp4 | KEEP (original) | supplied | 1280x720 h264 24fps, 4.01s |
| clip-05-capabilities-to-completion.mp4 | KEEP (original) | supplied | 1280x720 h264 24fps, 6.02s |
| cinematic-master.mp4 | GENERATED | concat lossless → x264 CRF18 re-encode (GOP 0.5s for scrub) | 22.04s, CFR24, faststart, no audio, 20.6MB |
| cinematic-master-960.mp4 | GENERATED | master → scale 960w, CRF22 | same timeline, 8.1MB, served ≤1024px |
| cinematic-poster.webp | GENERATED | master @0.5s | 107KB |
| cinematic-poster-mobile.webp | GENERATED | master @0.5s scale 720w | 39KB |
| BrandLockup (inline SVG) | CODE — replaceable | gold geometric mark | swap with official client vector when supplied |

Naming rule kept: stable semantic names; no `final2.png`-style strays.