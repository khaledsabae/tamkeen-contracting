'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * CinematicStory V2 — ONE continuous master video scrubbed by scroll.
 * Real timestamp map from the actual master (22.0417s @ 24fps, keyframes 0.5s).
 * Text stays real HTML above the video. Signature moment: construction→MEP.
 */

const CHAPTERS = [
  { n: '01', kicker: 'البداية', title: 'نبني اليوم لغدٍ أقوى', en: 'BUILDING TODAY FOR A STRONGER TOMORROW', body: 'من أول خط على الأرض تبدأ رحلة تتحول فيها الرؤية إلى واقع.', align: 'right' },
  { n: '02', kicker: 'الهندسة', title: 'نحوّل الرؤية إلى خطة قابلة للتنفيذ', en: 'VISION ENGINEERED INTO REALITY', body: 'تنسيق هندسي ورؤية رقمية تضع التنفيذ في قلب القرار.', align: 'right' },
  { n: '03', kicker: 'التنفيذ', title: 'من الأساسات إلى الإنجاز', en: 'FROM FOUNDATION TO DELIVERY', body: 'تنفيذ منضبط يربط الموقع والهندسة والجودة في مسار واحد.', align: 'right' },
  { n: '04', kicker: 'الأنظمة', title: 'هندسة تعمل خلف كل إنجاز', en: 'SYSTEMS BEHIND EVERY STRUCTURE', body: 'حلول MEP متكاملة تُنسّق مع المبنى بدل أن تُضاف إليه لاحقًا.', align: 'engineered' },
  { n: '05', kicker: 'القدرات', title: 'حلول متكاملة للمشاريع', en: 'INTEGRATED PROJECT CAPABILITIES', body: 'مبانٍ، بنية تحتية، مرافق وأنظمة هندسية ضمن رؤية تنفيذية واحدة.', align: 'center' },
  { n: '06', kicker: 'النتيجة', title: 'من الرؤية إلى الواقع', en: 'FROM VISION TO REALITY', body: 'نهاية الرحلة ليست مبنى فقط، بل أصلٌ صُمم ونُفذ ليصمد.', align: 'center' },
] as const;

// Real landmarks from the master video (22.0417s total):
const MASTER_DURATION = 22.0417;
const LANDMARKS = [0, 4.01, 8.02, 12.03, 16.04, 20.07]; // chapter START times in seconds
const SIGNATURE_T = 12.03; // construction → MEP (chapter 4 start)

// Normalized progress value for a given video time
const pOf = (t: number) => t / MASTER_DURATION;
// Chapter i is "settled" between enter and exit; text fully visible in the middle range
const chWindow = (i: number) => {
  const start = pOf(LANDMARKS[i]);
  const end = i === 5 ? 1 : pOf(LANDMARKS[i + 1]);
  return { start, end };
};

const WINDOWS = CHAPTERS.map((_, i) => chWindow(i));

export default function CinematicStory() {
  const wrap = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const raf = useRef<number | null>(null);
  const metaReady = useRef(false);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [mediaFailed, setMediaFailed] = useState(false);
  const reduceRef = useRef(false);

  useEffect(() => {
    reduceRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Scroll → video currentTime, rAF-throttled, error-safe
  useEffect(() => {
    const update = () => {
      raf.current = null;
      if (!wrap.current) return;
      const r = wrap.current.getBoundingClientRect();
      const total = wrap.current.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -r.top / Math.max(1, total)));
      setProgress(p);
      if (reduceRef.current) return;

      const v = videoRef.current;
      if (!v || v.readyState < 1) return;
      const target = Math.min(MASTER_DURATION - 0.05, p * MASTER_DURATION);
      if (Math.abs(v.currentTime - target) > 0.016) {
        try {
          v.currentTime = target;
        } catch {
          /* seek errors are non-fatal */
        }
      }
    };
    const onScroll = () => {
      if (raf.current === null) raf.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Active chapter + per-chapter visual weight from progress
  let active = 0;
  for (let i = 0; i < WINDOWS.length; i++) {
    if (progress >= WINDOWS[i].start) active = i;
  }
  const w = WINDOWS[active];
  const local = Math.max(0, Math.min(1, (progress - w.start) / Math.max(1e-6, w.end - w.start)));
  // Text intensity: fade in during first 25% of window, hold, fade out in last 15%
  const tIn = Math.min(1, local / 0.25);
  const tOut = Math.min(1, (1 - local) / 0.15);
  const intensity = Math.max(0, Math.min(1, Math.min(tIn, tOut)));
  const signature = progress >= pOf(SIGNATURE_T) && progress < pOf(SIGNATURE_T) + 0.09;

  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <section ref={wrap} className="cinematic" id="story">
      <div className="stage">
        {!reduced && !mediaFailed && (
          <video
            ref={el => { videoRef.current = el; }}
            className="masterFilm"
            src="/media/cinematic-master.mp4"
            poster="/media/cinematic-poster.webp"
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onCanPlay={() => setReady(true)}
            onError={() => setMediaFailed(true)}
          />
        )}
        <div className={`mediaFallback ${mediaFailed || reduced ? 'visible' : ''}`} aria-hidden="true" />
        <div className="shade" />
        {signature && <div className="techGrid" aria-hidden="true" />}
        <div className="grain" />

        <header className="nav">
          <a className="brand" href="#story" aria-label="تمكين الرئيسية">
            <BrandLockup />
          </a>
          <nav aria-label="التنقل الرئيسي">
            <a href="#story">رحلتنا</a>
            <a href="#capabilities">قدراتنا</a>
            <a href="#contact">تواصل</a>
          </nav>
          <span className="demo">DEMO CONCEPT</span>
        </header>

        <div className="chapterShell">
          {CHAPTERS.map((c, i) => {
            const I = intensity; // only active chapter animates
            const isActive = i === active;
            return (
              <article
                key={c.n}
                className={`chapter ${c.align} ${isActive ? 'active' : ''}`}
                style={isActive ? { opacity: I, transform: `translateY(${(1 - I) * 26}px)` } : undefined}
                aria-hidden={!isActive}
              >
                <div className="eyebrow"><span>{c.n}</span>{c.kicker}</div>
                <h1>{c.title}</h1>
                <p className="en">{c.en}</p>
                <p>{c.body}</p>
                {i === 0 && <a className="cta" href="#capabilities">اكتشف قدراتنا <span>←</span></a>}
                {i === 5 && <a className="cta" href="#contact">ابدأ مشروعك معنا <span>←</span></a>}
              </article>
            );
          })}
        </div>

        <div className="rail" aria-hidden="true"><span style={{ height: `${progress * 100}%` }} /></div>
        <div className="counter" aria-hidden="true"><b>0{active + 1}</b><i />06</div>
        <div className="scrollHint" aria-hidden="true">SCROLL TO BUILD <span>↓</span></div>
      </div>
    </section>
  );
}

function BrandLockup() {
  return (
    <span className="lockup" aria-hidden="false">
      <svg className="mark" viewBox="0 0 44 44" role="img" aria-label="شعار تمكين">
        <rect x="6" y="6" width="32" height="32" fill="none" stroke="var(--gold)" strokeWidth="1.4" />
        <path d="M14 28 L22 12 L30 28 M17.5 22.5 H26.5" fill="none" stroke="var(--gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="31.5" r="1.2" fill="var(--gold)" />
      </svg>
      <span><b>تمكين</b><small>TAMKEEN</small></span>
    </span>
  );
}