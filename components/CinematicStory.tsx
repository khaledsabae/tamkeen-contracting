'use client';

import { useEffect, useRef, useState } from 'react';

const chapters = [
  { n:'01', kicker:'البداية', title:'نبني اليوم لغدٍ أقوى', en:'Building today for a stronger tomorrow', body:'من أول خط على الأرض تبدأ رحلة تتحول فيها الرؤية إلى واقع.' },
  { n:'02', kicker:'الهندسة', title:'نحوّل الرؤية إلى خطة قابلة للتنفيذ', en:'Vision engineered into reality', body:'تنسيق هندسي ورؤية رقمية تضع التنفيذ في قلب القرار.' },
  { n:'03', kicker:'التنفيذ', title:'من الأساسات إلى الإنجاز', en:'From foundation to delivery', body:'تنفيذ منضبط يربط الموقع والهندسة والجودة في مسار واحد.' },
  { n:'04', kicker:'الأنظمة', title:'هندسة تعمل خلف كل إنجاز', en:'Systems behind every structure', body:'حلول MEP متكاملة تُنسّق مع المبنى بدل أن تُضاف إليه لاحقًا.' },
  { n:'05', kicker:'القدرات', title:'حلول متكاملة للمشاريع', en:'Integrated project capabilities', body:'مبانٍ، بنية تحتية، مرافق وأنظمة هندسية ضمن رؤية تنفيذية واحدة.' },
  { n:'06', kicker:'النتيجة', title:'من الرؤية إلى الواقع', en:'From vision to reality', body:'نهاية الرحلة ليست مبنى فقط، بل أصلٌ صُمم ونُفذ ليصمد.' },
];

const clips = [
  '/media/clip-01-vision-to-bim.mp4',
  '/media/clip-02-bim-to-construction.mp4',
  '/media/clip-03-construction-to-mep.mp4',
  '/media/clip-04-mep-to-capabilities.mp4',
  '/media/clip-05-capabilities-to-completion.mp4',
];

export default function CinematicStory(){
  const wrap = useRef<HTMLElement>(null);
  const videos = useRef<(HTMLVideoElement|null)[]>([]);
  const raf = useRef<number|null>(null);
  const [active,setActive]=useState(0);
  const [progress,setProgress]=useState(0);
  const [durations,setDurations]=useState<number[]>(Array(clips.length).fill(0));
  const [mediaFailed,setMediaFailed]=useState(false);

  useEffect(()=>{
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const update=()=>{
      raf.current=null;
      if(!wrap.current) return;
      const r=wrap.current.getBoundingClientRect();
      const total=wrap.current.offsetHeight-window.innerHeight;
      const p=Math.max(0,Math.min(1,-r.top/Math.max(1,total)));
      setProgress(p);
      setActive(Math.min(chapters.length-1,Math.floor(Math.min(.999999,p)*chapters.length)));
      if(reduce) return;
      const scaled=Math.min(.999999,p)*clips.length;
      const clipIndex=Math.min(clips.length-1,Math.floor(scaled));
      const local=scaled-clipIndex;
      videos.current.forEach((v,i)=>{
        if(!v || !durations[i]) return;
        const end=Math.max(0,durations[i]-.035);
        const desired=i<clipIndex?end:i>clipIndex?0:local*end;
        if(Math.abs(v.currentTime-desired)>.018){
          try{v.currentTime=desired}catch{}
        }
      });
    };
    const onScroll=()=>{if(raf.current===null) raf.current=requestAnimationFrame(update)};
    update();
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll,{passive:true});
    return()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);if(raf.current!==null) cancelAnimationFrame(raf.current)};
  },[durations]);

  const scaled=Math.min(.999999,progress)*clips.length;
  const currentClip=Math.min(clips.length-1,Math.floor(scaled));
  const localProgress=scaled-currentClip;

  return <section ref={wrap} className="cinematic" id="story">
    <div className="stage">
      <div className={`filmStack ${mediaFailed?'failed':''}`} aria-hidden="true">
        {clips.map((src,i)=>{
          const distance=Math.abs(i-currentClip);
          const near=i===currentClip || (i===currentClip+1 && localProgress>.82) || (i===currentClip-1 && localProgress<.18);
          return <video key={src} ref={el=>{videos.current[i]=el}} className={`film ${near?'visible':''}`} style={{opacity:i===currentClip?1:distance===1?.12:0}} muted playsInline preload={Math.abs(i-currentClip)<=1?'auto':'metadata'} onError={()=>setMediaFailed(true)} onLoadedMetadata={e=>setDurations(ds=>{if(ds[i]===e.currentTarget.duration)return ds;const next=[...ds];next[i]=e.currentTarget.duration;return next})}><source src={src} type="video/mp4" /></video>
        })}
      </div>
      <div className="mediaFallback" aria-hidden="true" />
      <div className="shade"/><div className="grain"/>
      <header className="nav">
        <a className="brand" href="#story" aria-label="تمكين الرئيسية"><span className="mark">ت</span><span><b>تمكين</b><small>TAMKEEN</small></span></a>
        <nav><a href="#story">رحلتنا</a><a href="#capabilities">قدراتنا</a><a href="#contact">تواصل</a></nav>
        <span className="demo">DEMO CONCEPT</span>
      </header>
      <div className="chapterShell">
        {chapters.map((c,i)=><article key={c.n} className={`chapter ${i===active?'active':''}`} aria-hidden={i!==active}>
          <div className="eyebrow"><span>{c.n}</span>{c.kicker}</div>
          <h1>{c.title}</h1><p className="en">{c.en}</p><p>{c.body}</p>
          {i===0&&<a className="cta" href="#capabilities">اكتشف قدراتنا <span>←</span></a>}
          {i===5&&<a className="cta" href="#contact">ابدأ مشروعك معنا <span>←</span></a>}
        </article>)}
      </div>
      <div className="rail" aria-hidden="true"><span style={{height:`${progress*100}%`}}/></div>
      <div className="counter" aria-hidden="true"><b>0{active+1}</b><i/>06</div>
      <div className="scrollHint" aria-hidden="true">SCROLL TO BUILD <span>↓</span></div>
    </div>
  </section>
}
