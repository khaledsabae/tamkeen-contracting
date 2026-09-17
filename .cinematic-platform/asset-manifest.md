# Asset Manifest — Cinematic V2

| Asset | Status | Source | Specs |
|---|---|---|---|
| clip-01..05.mp4 | KEEP (originals) | supplied | 1280x720 h264 24fps |
| cinematic-master.mp4 | GENERATED | concat lossless → x264 CRF18 re-encode | 22.04s, CFR24, GOP 0.5s, faststart, no audio, 20.6MB |
| cinematic-master-960.mp4 | GENERATED | master scale 960w CRF22 | same timeline, 8.1MB, ≤1024px clients |
| cinematic-poster.webp | GENERATED | master @0.5s | 107KB |
| cinematic-poster-mobile.webp | GENERATED | master @0.5s scale 720w | 39KB |
| BrandLockup | CODE (replaceable) | inline SVG gold mark | swap with client vector when supplied |
