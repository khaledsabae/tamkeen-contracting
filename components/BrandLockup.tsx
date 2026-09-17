/**
 * BrandLockup — the single reusable TAMKEEN brand mark.
 * Gold geometric architectural mark + bilingual lockup.
 * Replace the SVG contents with the official client vector when supplied.
 */
export default function BrandLockup({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className={`lockup ${inverted ? 'inverted' : ''}`}>
      <svg className="mark" viewBox="0 0 44 44" role="img" aria-label="شعار تمكين">
        <rect x="6" y="6" width="32" height="32" fill="none" stroke="var(--gold)" strokeWidth="1.4" />
        <path
          d="M14 28 L22 12 L30 28 M17.5 22.5 H26.5"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="22" cy="31.5" r="1.2" fill="var(--gold)" />
      </svg>
      <span>
        <b>تمكين</b>
        <small>TAMKEEN</small>
      </span>
    </span>
  );
}