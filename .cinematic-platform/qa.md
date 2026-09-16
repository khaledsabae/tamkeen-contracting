# TAMKEEN — QA Evidence

## Automated checks
- GitHub Actions workflow added: `.github/workflows/ci.yml`
- Required checks: `npm run typecheck`, `npm run build`
- Status at creation: workflow has not yet produced a run result; do not mark build as passed until GitHub reports success.

## Static review completed
- Five supplied MP4 clips are now stored with stable semantic names under `public/media/`.
- Cinematic component references only those stable public paths.
- Scroll updates are requestAnimationFrame-throttled.
- Each clip is scrubbed using its real metadata duration.
- Adjacent clips are preloaded around the active clip.
- Main copy/buttons remain semantic HTML above media.
- `prefers-reduced-motion` disables the scrub experience and keeps a stable fallback.
- Demo claims remain explicitly marked as demo content.

## Runtime checks still required
- [ ] Production build passes in CI.
- [ ] Typecheck passes in CI.
- [ ] Forward scroll across all five boundaries is visually stable.
- [ ] Reverse scroll across all five boundaries is visually stable.
- [ ] Phone 360–430px checked.
- [ ] Tablet checked.
- [ ] Laptop checked.
- [ ] Wide desktop checked.
- [ ] Keyboard navigation checked.
- [ ] Reduced-motion checked in a browser.
- [ ] No severe console/runtime errors.
- [ ] Media loading acceptable on throttled connection.

No deployment has been performed or claimed.
