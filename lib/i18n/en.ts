import type { Dict } from './ar';

/**
 * English dictionary. Company legal name stays in Arabic script
 * (no official English legal name supplied — do not invent one).
 */
export const en: Dict = {
  locale: 'en',
  dir: 'ltr',
  htmlLang: 'en',
  meta: {
    title: 'TAMKEEN | شركة تمكين الوسطى للمقاولات',
    description: 'TAMKEEN — turning vision into executable reality. (Demo concept)',
  },
  nav: {
    homeAria: 'TAMKEEN home',
    navAria: 'Main navigation',
    story: 'Journey',
    capabilities: 'Capabilities',
    contact: 'Contact',
    demo: 'DEMO CONCEPT',
    switchLabel: 'العربية',
    switchAria: 'التبديل إلى العربية',
  },
  chapters: [
    { n: '01', kicker: 'The Beginning', title: 'Building today for a stronger tomorrow', en: 'VISION', body: 'From the first line on the ground, a journey begins where vision turns into reality.', align: 'right' },
    { n: '02', kicker: 'Engineering', title: 'Turning vision into an executable plan', en: 'ENGINEERING', body: 'Engineering coordination and a digital vision place execution at the heart of every decision.', align: 'right' },
    { n: '03', kicker: 'Execution', title: 'From foundation to delivery', en: 'EXECUTION', body: 'Disciplined execution unites site, engineering and quality in one path.', align: 'right' },
    { n: '04', kicker: 'Systems', title: 'Engineering behind every achievement', en: 'MEP SYSTEMS', body: 'Integrated MEP solutions coordinated with the building — not added to it later.', align: 'engineered' },
    { n: '05', kicker: 'Capabilities', title: 'Integrated project solutions', en: 'CAPABILITIES', body: 'Buildings, infrastructure, facilities and engineering systems within one executive vision.', align: 'center' },
    { n: '06', kicker: 'Outcome', title: 'From vision to reality', en: 'OUTCOME', body: 'The end of the journey is not only a building, but an asset designed and built to endure.', align: 'center' },
  ],
  ctaFirst: { text: 'Explore our capabilities', href: '#capabilities' },
  ctaLast: { text: 'Start your project with us', href: '#contact' },
  play: {
    label: 'PLAY JOURNEY',
    stop: 'STOP',
    ariaPlay: 'Play the journey automatically',
    ariaStop: 'Stop the automatic journey',
  },
  arrow: '→',
  capabilities: {
    eyebrow: 'WHAT WE BUILD',
    heading: 'Integrated capabilities from planning to delivery',
    demoNote: 'Demo content — replaced with approved TAMKEEN data once the company profile and actual service scope are received.',
    rows: [
      { n: '01', tag: 'GENERAL CONTRACTING', title: 'General Contracting', body: 'End-to-end delivery management linking planning to site through handover — one scope, one accountability.' },
      { n: '02', tag: 'MEP SYSTEMS', title: 'Electromechanical Works', body: 'Mechanical, electrical and plumbing systems coordinated with the building from the design stage — not added after it.' },
      { n: '03', tag: 'INFRASTRUCTURE', title: 'Infrastructure', body: 'Utilities, networks and external works within one reading of the project environment.' },
      { n: '04', tag: 'BUILDINGS & FACILITIES', title: 'Buildings & Facilities', body: 'Operational spaces with a clear architectural identity and build quality measured over a lifetime, not handover day.' },
    ],
  },
  approach: {
    eyebrow: 'PROJECT APPROACH',
    aria: 'Project approach',
    stages: [
      { en: 'PLAN', title: 'Planning', body: 'Reading the site and the vision before the first line — written scope and declared risks.' },
      { en: 'COORDINATE', title: 'Coordination', body: 'Engineering disciplines converge in one model before they meet on site.' },
      { en: 'BUILD', title: 'Building', body: 'A disciplined site rhythm: inspectable quality and measurable progress.' },
      { en: 'DELIVER', title: 'Delivery', body: 'A documented, supported handover — an asset that works after us, not paper completion.' },
    ],
  },
  manifesto: {
    eyebrow: 'FROM VISION TO REALITY',
    quote: '“We see the project as one system: a clear engineering decision, disciplined execution, and a result worth keeping.”',
    demoNote: 'Demo positioning statement — reviewed with TAMKEEN before official publication.',
  },
  portfolio: {
    eyebrow: 'SELECTED WORK',
    heading: 'Sample projects',
    heading2: 'built to TAMKEEN standards',
    demoNote: 'Illustrative sample projects reflecting our service scope — replaced with approved TAMKEEN projects once their official data is supplied.',
    aria: 'Sample projects',
    placeholder: 'Sample project — presentation until TAMKEEN data is approved',
    plates: [
      { img: '/media/portfolio/residential.jpg', code: 'PRJ-01', title: 'Integrated Residential Compound', tag: 'RESIDENTIAL COMPOUND', location: 'Riyadh — Al Yasmin District', year: '2024', area: '18,500 m²' },
      { img: '/media/portfolio/commercial.jpg', code: 'PRJ-02', title: 'Commercial & Office Building', tag: 'COMMERCIAL & OFFICE', location: 'Riyadh — King Abdullah Road', year: '2023', area: '9,200 m²' },
      { img: '/media/portfolio/infrastructure.jpg', code: 'PRJ-03', title: 'Infrastructure & Roads Works', tag: 'INFRASTRUCTURE WORKS', location: 'Al Kharj — Al Kharj City', year: '2022', area: '4.5 km' },
    ],
  },
  contact: {
    eyebrow: 'THE NEXT PROJECT',
    heading: 'Let’s build',
    heading2: 'the next project together.',
    body: 'This is an early demo. Contact details, address, registration, projects and clients will be added once approved by TAMKEEN.',
    ctaText: 'Request a project proposal',
    ctaDemoNote: 'DEMO — AWAITING OFFICIAL CONTACT DATA',
    ctaTitle: 'Activated once official contact data is received from TAMKEEN',
  },
  footer: {
    name: 'TAMKEEN | شركة تمكين الوسطى للمقاولات',
    demo: 'Demo concept — not an official company profile.',
  },
};
