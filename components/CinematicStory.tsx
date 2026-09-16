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
  '/Golden_lines_forming_constructio…_20260916173516.mp4',
  '/BIM_model_becoming_real_construc…_20260916173709.mp4',
  '/Camera_entering_building_reveali…_20260916173950.mp4',
  '/Building_systems_transition_to_i…_20260916174208.mp4',
  '/Creating_architectural_transitio…_20260916174455.mp4',
];

export default function CinematicStory(){
  const wrap = useRef<HTMLElement>(null);
  const videos = useRef<(HTMLVideoElement|null)[]>([]);
  const [active,setActive]=useState(0);
  const [progress,setProgress]=useState(0);
  const [durations,setDurations]=useState<number[]>(Array(clips.length).fill(0));

  useEffect(()=>{
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onScroll=()=>{
      if(!wrap.current) return;
      const r=wrap.current.getBoundingClientRect();
      const total=wrap.current.offsetHeight-window.innerHeight;
      const p=Math.max(0,Math.min(1,-r.top/Math.max(1,total)));
      setProgress(p);
      setActive(Math.min(chapters.length-1,Math.floor(p*chapters.length)));
      if(reduce) return;

      const scaled=p*clips.length;
      const clipIndex=Math.min(clips.length-1,Math.floor(scaled));
      const local=Math.min(1,scaled-clipIndex);
      videos.current.forEach((v,i)=>{
        if(!v || !durations[i]) return;
        const desired=i<clipIndex?Math.max(0,durations[i]-.04):i>clipIndex?0:local*Math.max(0,durations[i]-.04);
        if(Math.abs(v.currentTime-desired)>.025) v.currentTime=desired;
      });
    };
    onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
    return()=>window.removeEventListener('scroll',onScroll);
  },[durations]);

  const currentClip=Math.min(clips.length-1,Math.floor(progress*clips.length));

  return <section ref={wrap} className="cinematic" id="story">
    <div className="stage">
      <div className="filmStack" aria-hidden="true">
        {clips.map((src,i)=><video
          key={src}
          ref={el=>{videos.current[i]=el}}
          className={`film ${i===currentClip?'visible':''}`}
          muted playsInline preload="auto"
          onLoadedMetadata={e=>setDurations(ds=>{const next=[...ds];next[i]=e.currentTarget.duration;return next})}
        ><source src={src} type="video/mp4" /></video>)}
      </div>
      <div className="mediaFallback" aria-hidden="true" />
      <div className="shade"/><div className="grain"/>
      <header className="nav">
        <a className="brand" href="#story" aria-label="تمكين الرئيسية"><span className="mark">ت</span><span><b>تمكين</b><small>TAMKEEN</small></span></a>
        <nav><a href="#story">رحلتنا</a><a href="#capabilities">قدراتنا</a><a href="#contact">تواصل</a></nav>
        <span className="demo">DEMO CONCEPT</span>
      </header>
      <div className="chapterShell">
        {chapters.map((c,i)=><article key={c.n} className={`chapter ${i===active?'active':''}`}>
          <div className="eyebrow"><span>{c.n}</span>{c.kicker}</div>
          <h1>{c.title}</h1><p className="en">{c.en}</p><p>{c.body}</p>
          {i===0&&<a className="cta" href="#capabilities">اكتشف قدراتنا <span>←</span></a>}
          {i===5&&<a className="cta" href="#contact">ابدأ مشروعك معنا <span>←</span></a>}
        </article>)}
      </div>
      <div className="rail" aria-hidden="true"><span style={{height:`${progress*100}%`}}/></div>
      <div className="counter"><b>0{active+1}</b><i/>06</div>
      <div className="scrollHint">SCROLL TO BUILD <span>↓</span></div>
    </div>
  </section>
}
