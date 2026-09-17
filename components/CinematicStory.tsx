'use client';

import { useEffect, useRef, useState } from 'react';
import BrandLockup from '@/components/BrandLockup';

/**
 * CinematicStory V2.1 — performance sprint.
 * - Poster-first: video mounts only after device classification + idle point.
 * - No desktop video download on mobile (source decided before mount).
 * - Scrub capped at ~24Hz, quantized to real frame intervals (video is 24fps).
 * - React state only for chapter changes; scroll progress lives in refs + CSS var.
 * - PLAY JOURNEY = native video.play(); page scroll follows currentTime (sequential
 *   decode, no seek storm). Manual input cancels, pauses video, returns to scrub.
 */

const CHAPTERS = [
  { n: '01', kicker: 'البداية', title: 'نبني اليوم لغدٍ أقوى', en: 'BUILDING TODAY FOR A STRONGER TOMORROW', body: 'من أول خط على الأرض تبدأ رحلة تتحول فيها الرؤية إلى واقع.', align: 'right' },
  { n: '02', kicker: 'الهندسة', title: 'نحوّل الرؤية إلى خطة قابلة للتنفيذ', en: 'VISION ENGINEERED INTO REALITY', body: 'تنسيق هندسي ورؤية رقمية تضع التنفيذ في قلب القرار.', align: 'right' },
  { n: '03', kicker: 'التنفيذ', title: 'من الأساسات إلى الإنجاز', en: 'FROM FOUNDATION TO DELIVERY', body: 'تنفيذ منضبط يربط الموقع والهندسة والجودة في مسار واحد.', align: 'right' },
  { n: '04', kicker: 'الأنظمة', title: 'هندسة تعمل خلف كل إنجاز', en: 'SYSTEMS BEHIND EVERY STRUCTURE', body: 'حلول MEP متكاملة تُنسّق مع المبنى بدل أن تُضاف إليه لاحقًا.', align: 'engineered' },
  { n: '05', kicker: 'القدرات', title: 'حلول متكاملة للمشاريع', en: 'INTEGRATED PROJECT CAPABILITIES', body: 'مبانٍ، بنية تحتية، مرافق وأنظمة هندسية ضمن رؤية تنفيذية واحدة.', align: 'center' },
  { n: '06', kicker: 'النتيجة', title: 'من الرؤية إلى الواقع', en: 'FROM VISION TO REALITY', body: 'نهاية الرحلة ليست مبنى فقط، بل أصلٌ صُمم ونُفذ ليصمد.', align: 'center' },
] as const;

const MASTER_DURATION = 22.0417;
const VIDEO_FPS = 24;
const FRAME = 1 / VIDEO_FPS;
const SEEK_MIN_INTERVAL = 1000 / 24; // manual scrub seeks capped at 24Hz
const LANDMARKS = [0, 4.01, 8.02, 12.03, 16.04, 20.07];

const pOf = (t: number) => t / MASTER_DURATION;
const WINDOWS = CHAPTERS.map((_, i) => ({
  start: pOf(LANDMARKS[i]),
  end: i === 5 ? 1 : pOf(LANDMARKS[i + 1]),
}));

// Compact masters (generated in the perf sprint; see asset-manifest)
const DESKTOP_SRC = '/media/cinematic-master-1080-compact.mp4';
const MOBILE_SRC = '/media/cinematic-master-720-compact.mp4';

export default function CinematicStory() {
  const wrap = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const raf = useRef<number | null>(null);
  const lastSeek = useRef(0);
  const lastSetTime = useRef(-1);
  const activeChapterRef = useRef(0);
  const autoPlayingRef = useRef(false);
  const autoRaf = useRef<number | null>(null);
  const progressRef = useRef(0); // scroll progress in a ref, not state
  const [autoPlaying, setAutoPlaying] = useState(false);
  const [mediaFailed, setMediaFailed] = useState(false);
  const [mountVideo, setMountVideo] = useState(false); // poster-first
  const [chapter, setChapter] = useState(0); // React state ONLY on chapter change
  const [device, setDevice] = useState<'mobile' | 'desktop' | null>(null); // null = unclassified
  const reduceRef = useRef(false);

  // Device classification BEFORE any video source is decided
  useEffect(() => {
    reduceRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setDevice(window.matchMedia('(max-width: 1024px)').matches ? 'mobile' : 'desktop');
    if (!reduceRef.current) {
      // Attach the video after the shell is interactive (idle), never during first paint
      const go = () => setMountVideo(true);
      if ('requestIdleCallback' in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(go);
      } else {
        setTimeout(go, 1200);
      }
    }
  }, []);

  // Manual scrub: 24Hz cap + frame quantization + refs/CSS var (no setState per frame)
  useEffect(() => {
    const update = () => {
      raf.current = null;
      if (!wrap.current) return;
      const r = wrap.current.getBoundingClientRect();
      const total = wrap.current.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -r.top / Math.max(1, total)));
      progressRef.current = p;
      // CSS custom property drives the rail without React re-render
      document.documentElement.style.setProperty('--journey-progress', p.toFixed(4));
      if (reduceRef.current) return;

      let ch = 0;
      for (let i = 0; i < WINDOWS.length; i++) if (p >= WINDOWS[i].start) ch = i;
      if (ch !== activeChapterRef.current) {
        activeChapterRef.current = ch;
        setChapter(ch); // React re-render ONLY on chapter change
      }
      if (autoPlayingRef.current) return; // native playback drives scroll; no seeking

      const v = videoRef.current;
      if (!v || v.readyState < 1) return;
      const now = performance.now();
      if (now - lastSeek.current < SEEK_MIN_INTERVAL) return; // 24Hz cap
      lastSeek.current = now;
      // Quantize target to actual video frame intervals
      const target = Math.min(
        MASTER_DURATION - FRAME,
        Math.round((p * MASTER_DURATION) / FRAME) * FRAME,
      );
      if (Math.abs(v.currentTime - target) >= FRAME * 0.9 && target !== lastSetTime.current) {
        lastSetTime.current = target;
        try { v.currentTime = target; } catch { /* seek errors are non-fatal */ }
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

  // ===== PLAY JOURNEY v2: native playback; page scroll follows currentTime =====
  const stopAuto = () => {
    autoPlayingRef.current = false;
    if (autoRaf.current !== null) cancelAnimationFrame(autoRaf.current);
    autoRaf.current = null;
    setAutoPlaying(false);
    const v = videoRef.current;
    if (v) { try { v.pause(); } catch {} }
  };
  const startAuto = () => {
    const v = videoRef.current;
    if (!v || !wrap.current || autoPlayingRef.current) return;
    autoPlayingRef.current = true;
    setAutoPlaying(true);
    // Sync scroll to the CURRENT video time ONCE, then hand off to native decode
    const total = wrap.current.offsetHeight - window.innerHeight;
    const sectionTop = window.scrollY + wrap.current.getBoundingClientRect().top;
    const from = Math.max(sectionTop, Math.min(sectionTop + total, window.scrollY));
    const p0 = Math.max(0, Math.min(1, (window.scrollY - from) / Math.max(1, total)));
    try { v.currentTime = Math.min(MASTER_DURATION - FRAME, p0 * MASTER_DURATION); } catch {}
    const drive = () => {
      const p = Math.min(0.999, v.currentTime / MASTER_DURATION);
      const y = from + p * total;
      if (Math.abs(window.scrollY - y) > 1.5) {
        window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
      }
      document.documentElement.style.setProperty('--journey-progress', p.toFixed(4));
      let ch = 0;
      for (let i = 0; i < WINDOWS.length; i++) if (p >= WINDOWS[i].start) ch = i;
      if (ch !== activeChapterRef.current) {
        activeChapterRef.current = ch;
        setChapter(ch);
      }
      if (v.ended || v.paused) { stopAuto(); return; }
      autoRaf.current = requestAnimationFrame(drive);
    };
    v.play().then(() => { autoRaf.current = requestAnimationFrame(drive); }).catch(() => stopAuto());
  };
  // Manual input cancels playback, pauses video, returns to scrub mode
  useEffect(() => {
    if (!autoPlaying) return;
    const cancel = () => stopAuto();
    window.addEventListener('wheel', cancel, { passive: true });
    window.addEventListener('touchstart', cancel, { passive: true });
    window.addEventListener('keydown', cancel);
    return () => {
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
      window.removeEventListener('keydown', cancel);
    };
  }, [autoPlaying]);
  // Cancel any in-flight animation when the component unmounts
  useEffect(() => () => {
    if (autoRaf.current !== null) cancelAnimationFrame(autoRaf.current);
  }, []);

  const w = WINDOWS[chapter];
  const local = Math.max(0, Math.min(1, (progressRef.current - w.start) / Math.max(1e-6, w.end - w.start)));
  const tIn = Math.min(1, local / 0.25);
  const tOut = Math.min(1, (1 - local) / 0.15);
  const intensity = Math.max(0, Math.min(1, Math.min(tIn, tOut)));
  const reduced = reduceRef.current;
  const src = device === 'mobile' ? MOBILE_SRC : DESKTOP_SRC;

  return (
    <section ref={wrap} className="cinematic" id="story">
      <div className="stage">
        {mountVideo && device !== null && !reduced && !mediaFailed && (
          <video
            ref={el => { videoRef.current = el; }}
            className="masterFilm"
            src={src}
            poster={device === 'mobile' ? '/media/cinematic-poster-mobile.webp' : '/media/cinematic-poster.webp'}
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            onError={() => setMediaFailed(true)}
          />
        )}
        <div className={`mediaFallback ${mediaFailed || reduced ? 'visible' : ''}`} aria-hidden="true" />
        <div className="shade" />
        {chapter === 3 && <div className="techGrid" aria-hidden="true" />}
        <div className="grain grainLight" />

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
            const isActive = i === chapter;
            const I = isActive ? intensity : 0;
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

        <div className="rail" aria-hidden="true"><span className="railFill" /></div>
        <div className="counter" aria-hidden="true"><b>0{chapter + 1}</b><i />06</div>
        <button
          type="button"
          className={`playCtrl ${autoPlaying ? 'playing' : ''}`}
          onClick={autoPlaying ? stopAuto : startAuto}
          aria-label={autoPlaying ? 'إيقاف الرحلة التلقائية' : 'تشغيل الرحلة تلقائيًا'}
        >
          <span className="playIco" aria-hidden="true">{autoPlaying ? '❚❚' : '▶'}</span>
          {autoPlaying ? 'STOP' : 'PLAY JOURNEY'}
        </button>
      </div>
    </section>
  );
}