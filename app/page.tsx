import CinematicStory from '@/components/CinematicStory';

/**
 * Cinematic V2 — post-journey sections.
 * Same dark-green/gold architectural language; no generic cards.
 * Demo content clearly marked; replaced when TAMKEEN supplies official data.
 */

const CAPABILITIES = [
  ['01', 'المقاولات العامة', 'GENERAL CONTRACTING',
    'إدارة تنفيذ متكاملة تربط التخطيط بالموقع حتى التسليم — نطاق واحد، مسؤولية واحدة.'],
  ['02', 'الأعمال الكهروميكانيكية', 'MEP SYSTEMS',
    'أنظمة ميكانيكية وكهربائية وصحية تُنسَّق مع المبنى من مرحلة التصميم، لا تُضاف عليه.'],
  ['03', 'البنية التحتية', 'INFRASTRUCTURE',
    'مرافق وشبكات وأعمال خارجية ضمن قراءة واحدة لمحيط المشروع.'],
  ['04', 'المنشآت والمرافق', 'BUILDINGS & FACILITIES',
    'مساحات تشغيلية بهوية معمارية واضحة وجودة تنفيذ تُقاس على مدى العمر لا يوم التسليم.'],
] as const;

const APPROACH = [
  ['PLAN', 'التخطيط', 'قراءة الموقع والرؤية قبل أول خط — نطاق مكتوب ومخاطر معلنة.'],
  ['COORDINATE', 'التنسيق', 'هندسة وتخصصات تلتقي في نموذج واحد قبل أن تلتقي في الموقع.'],
  ['BUILD', 'التنفيذ', 'إيقاع موقع منضبط: جودة قابلة للفحص، وتقدم قابل للقياس.'],
  ['DELIVER', 'التسليم', 'تسليم موثق ومدعوم — أصل يعمل بعدنا لا مجرد إنجاز ورقي.'],
] as const;

const PORTFOLIO = [
  ['مشروع تجريبي — مباني', 'RESIDENTIAL / MIXED-USE'],
  ['مشروع تجريبي — بنية تحتية', 'INFRASTRUCTURE'],
  ['مشروع تجريبي — مرافق', 'FACILITIES'],
] as const;

export default function Home() {
  return (
    <main>
      <CinematicStory />

      {/* ============ CAPABILITIES — engineering ledger, not cards ============ */}
      <section className="capabilities" id="capabilities">
        <div className="sectionIntro">
          <span>WHAT WE BUILD</span>
          <h2>قدرات تمتد عبر<br />دورة حياة المشروع</h2>
          <p className="demoNote">
            محتوى تجريبي — يُستبدل ببيانات تمكين المعتمدة عند استلام ملف الشركة ونطاق خدماتها الفعلي.
          </p>
        </div>
        <div className="ledger">
          {CAPABILITIES.map(([n, ar, en, body]) => (
            <article className="row" key={n}>
              <span className="idx">{n}</span>
              <div className="rowBody">
                <small>{en}</small>
                <h3>{ar}</h3>
                <p>{body}</p>
              </div>
              <span className="rowArrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      {/* ============ PROJECT APPROACH — lifecycle as a build sequence ============ */}
      <section className="approach" aria-label="منهجية العمل">
        <span className="eyebrowLine">PROJECT APPROACH</span>
        <div className="approachTrack" role="list">
          {APPROACH.map(([en, ar, body], i) => (
            <div className="stage2" role="listitem" key={en}>
              <span className="stageNo">0{i + 1}</span>
              <span className="stageEn">{en}</span>
              <h3>{ar}</h3>
              <p>{body}</p>
              {i < APPROACH.length - 1 && <span className="joint" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </section>

      {/* ============ MANIFESTO ============ */}
      <section className="manifesto">
        <span>FROM VISION TO REALITY</span>
        <blockquote>«نرى المشروع كمنظومة واحدة؛ قرار هندسي واضح، تنفيذ منضبط، ونتيجة تستحق أن تبقى.»</blockquote>
        <p className="demoNote">عبارة تعريفية تجريبية — تُراجع مع تمكين قبل النشر الرسمي.</p>
      </section>

      {/* ============ PORTFOLIO — clearly-marked placeholders ============ */}
      <section className="portfolio" aria-label="المشاريع (placeholders)">
        <div className="pfHead">
          <span>FUTURE PROJECTS</span>
          <h2>مشاريع ستُضاف<br />بعد الاعتماد</h2>
          <p className="demoNote">
            مساحات محفوظة لمشاريع تمكين الفعلية — لا تُعرض أي مشاريع مكتملة قبل توفير بياناتها الرسمية.
          </p>
        </div>
        <div className="pfGrid">
          {PORTFOLIO.map(([ar, en]) => (
            <figure className="plate" key={en}>
              <div className="plateArea" aria-hidden="true">
                <span>{en}</span>
              </div>
              <figcaption>
                <b>{ar}</b>
                <small>PLACEHOLDER — AWAITING OFFICIAL DATA</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="contact" id="contact">
        <div>
          <small>THE NEXT PROJECT</small>
          <h2>لنَبْنِ المشروع<br />القادم معًا.</h2>
        </div>
        <div className="contactSide">
          <p>
            هذه نسخة عرض أولية. بيانات التواصل والعنوان والسجل والمشاريع والعملاء ستُضاف بعد اعتمادها من تمكين.
          </p>
          <a href="mailto:hello@example.com">طلب عرض مشروع <span>←</span></a>
        </div>
      </section>

      <footer>
        <div className="brand">
          <span className="mark">ت</span>
          <span><b>تمكين</b><small>TAMKEEN</small></span>
        </div>
        <p>Demo concept — not an official company profile.</p>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}