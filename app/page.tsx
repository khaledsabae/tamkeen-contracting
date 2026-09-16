import CinematicStory from '@/components/CinematicStory';

const services=[
 ['01','المقاولات العامة','GENERAL CONTRACTING','تنفيذ متكامل يربط التخطيط بالموقع حتى التسليم.'],
 ['02','الأعمال الكهروميكانيكية','MEP SYSTEMS','تنسيق وتنفيذ الأنظمة الميكانيكية والكهربائية والصحية.'],
 ['03','البنية التحتية','INFRASTRUCTURE','حلول للمرافق والشبكات والأعمال الخارجية ضمن بيئة المشروع.'],
 ['04','المنشآت والمرافق','BUILDINGS & FACILITIES','مساحات عملية بهوية معمارية وجودة تنفيذية واضحة.'],
];

export default function Home(){return <main>
  <CinematicStory/>
  <section className="capabilities" id="capabilities">
    <div className="sectionIntro"><span>WHAT WE BUILD</span><h2>قدرات تمتد عبر<br/>دورة حياة المشروع</h2><p>محتوى تجريبي سيُستبدل ببيانات تمكين المعتمدة عند استلام ملف الشركة ونطاق خدماتها الفعلي.</p></div>
    <div className="serviceGrid">{services.map(s=><article className="service" key={s[0]}><span>{s[0]}</span><div><small>{s[2]}</small><h3>{s[1]}</h3><p>{s[3]}</p></div><b>↗</b></article>)}</div>
  </section>
  <section className="manifesto"><span>FROM VISION TO REALITY</span><blockquote>«نرى المشروع كمنظومة واحدة؛ قرار هندسي واضح، تنفيذ منضبط، ونتيجة تستحق أن تبقى.»</blockquote><p>عبارة تعريفية تجريبية — تُراجع مع تمكين قبل النشر الرسمي.</p></section>
  <section className="contact" id="contact"><div><small>THE NEXT PROJECT</small><h2>لنَبْنِ المشروع<br/>القادم معًا.</h2></div><div className="contactSide"><p>هذه نسخة عرض أولية. بيانات التواصل والعنوان والسجل والمشاريع والعملاء ستُضاف بعد اعتمادها من تمكين.</p><a href="mailto:hello@example.com">طلب عرض مشروع <span>←</span></a></div></section>
  <footer><div className="brand"><span className="mark">ت</span><span><b>تمكين</b><small>TAMKEEN</small></span></div><p>Demo concept — not an official company profile.</p><span>© {new Date().getFullYear()}</span></footer>
</main>}
