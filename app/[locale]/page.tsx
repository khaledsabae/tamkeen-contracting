import CinematicStory from '@/components/CinematicStory';
import BrandLockup from '@/components/BrandLockup';
import { getDict } from '@/lib/i18n';

/**
 * Cinematic V2 — post-journey sections.
 * Same dark-green/gold architectural language; no generic cards.
 * Demo content clearly marked; replaced when TAMKEEN supplies official data.
 * All copy comes from the locale dictionary (see lib/i18n).
 */

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDict(locale);
  const { capabilities, approach, manifesto, portfolio, contact, footer } = dict;

  return (
    <main>
      <CinematicStory dict={dict} />

      {/* ============ CAPABILITIES — engineering ledger, not cards ============ */}
      <section className="capabilities" id="capabilities">
        <div className="sectionIntro">
          <span>{capabilities.eyebrow}</span>
          <h2>{capabilities.heading}</h2>
          <p className="demoNote">{capabilities.demoNote}</p>
        </div>
        <div className="ledger">
          {capabilities.rows.map((row) => (
            <article className="row" key={row.n}>
              <span className="idx">{row.n}</span>
              <div className="rowBody">
                <small>{row.tag}</small>
                <h3>{row.title}</h3>
                <p>{row.body}</p>
              </div>
              <span className="rowArrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      {/* ============ PROJECT APPROACH — lifecycle as a build sequence ============ */}
      <section className="approach" aria-label={approach.aria}>
        <span className="eyebrowLine">{approach.eyebrow}</span>
        <div className="approachTrack" role="list">
          {approach.stages.map((stage, i) => (
            <div className="stage2" role="listitem" key={stage.en}>
              <span className="stageNo">0{i + 1}</span>
              <span className="stageEn">{stage.en}</span>
              <h3>{stage.title}</h3>
              <p>{stage.body}</p>
              {i < approach.stages.length - 1 && <span className="joint" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </section>

      {/* ============ MANIFESTO ============ */}
      <section className="manifesto">
        <span>{manifesto.eyebrow}</span>
        <blockquote>{manifesto.quote}</blockquote>
        <p className="demoNote">{manifesto.demoNote}</p>
      </section>

      {/* ============ PORTFOLIO — clearly-marked placeholders ============ */}
      <section className="portfolio" aria-label={portfolio.aria}>
        <div className="pfHead">
          <span>{portfolio.eyebrow}</span>
          <h2>{portfolio.heading}<br />{portfolio.heading2}</h2>
          <p className="demoNote">{portfolio.demoNote}</p>
        </div>
        <div className="pfGrid">
          {portfolio.plates.map((plate) => (
            <figure className="plate" key={plate.code}>
              <div className="plateArea" aria-hidden="true">
                <span className="plateCode">{plate.code}</span>
                <span className="plateTag">{plate.tag}</span>
              </div>
              <figcaption>
                <b>{plate.title}</b>
                <p className="plateMeta">
                  <span>{plate.location}</span>
                  <span>{plate.year}</span>
                  <span>{plate.area}</span>
                </p>
                <small>{portfolio.placeholder}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="contact" id="contact">
        <div>
          <small>{contact.eyebrow}</small>
          <h2>{contact.heading}<br />{contact.heading2}</h2>
        </div>
        <div className="contactSide">
          <p>{contact.body}</p>
          <button
            type="button"
            className="cta ctaDisabled"
            disabled
            aria-disabled="true"
            title={contact.ctaTitle}
          >
            {contact.ctaText} <span>{dict.arrow}</span>
            <small className="ctaDemoNote">{contact.ctaDemoNote}</small>
          </button>
        </div>
      </section>

      <footer>
        <div className="brand">
          <BrandLockup inverted />
        </div>
        <p className="footerName">{footer.name}</p>
        <p>{footer.demo}</p>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}
