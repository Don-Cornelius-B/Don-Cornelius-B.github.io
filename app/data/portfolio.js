/* ═══════════════════════════════════════════════════════════
   VERIFIED PORTFOLIO DATA — Don Cornelius B
   Source of truth aligned with resume (Sep 2026)
   ═══════════════════════════════════════════════════════════ */

export const identity = {
  name: 'Don Cornelius B',
  role: 'Cloud Systems & DevOps Engineer',
  specialization: 'Cloud Computing & DevOps Engineering',
  tagline: 'Engineering resilient cloud-native systems, real-time fleet telemetry, and multimodal AI.',
  bio: 'Computer Science and Engineering undergraduate at Sathyabama Institute of Science and Technology (2023–2027) with an active specialization in Cloud Computing, DevOps Engineering, and cloud-native systems for future scaling.',
  location: 'Chennai, Tamil Nadu, India',
  email: 'doncorneliuslivi@gmail.com',
  phone: '+91 6374760469',
  resumePath: '/Don_Cornelius_B_Resume.pdf',
  socials: {
    github: 'https://github.com/Don-Cornelius-B',
    linkedin: 'https://linkedin.com/in/don-cornelius-livi/',
    portfolio: 'https://don-cornelius-b.github.io',
  },
};

export const projects = [
  {
    id: 'multimodal-supply-chain',
    title: 'Multimodal AI Supply Chain Analysis',
    duration: '02/2026 – 04/2026',
    description:
      'Developed a situational awareness application to detect supply chain disruptions by fusing real-time traffic, weather, and social media data into a multimodal AI pipeline.',
    role: 'Full-stack AI Engineer',
    impact: 'Built a multimodal pipeline that surfaces disruption signals into a single operational view.',
    outcomes: [
      'Integrated heterogeneous traffic, weather, and social feeds for unified risk scoring.',
      'Delivered React dashboard views for rapid response and anomaly inspection.',
      'Modularized pipeline components for reproducible model and API deployments.',
    ],
    honor: {
      title: 'ChallengeX Winner — 2nd Place',
      org: 'George Mason University',
      detail: '8-week federal & industry hackathon with CNA & USDA.',
    },
    stepper: [
      { phase: 'Challenge', detail: 'Detect disruptions early across fragmented, high-volume logistics data streams.' },
      { phase: 'Decision', detail: 'Implement multimodal fusion pipeline with operational dashboard and API-driven services.' },
      { phase: 'Outcome', detail: 'Produced a unified view of risk signals to accelerate response and decision quality.' },
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/tanmaya-kamma/multimodal_ai' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/don-cornelius-livi/' },
    ],
    tags: ['React', 'Python', 'GitHub Actions', 'Multimodal AI', 'CMU SDK', 'TorchGeo'],
    category: 'Multimodal AI',
    diagram: {
      nodes: [
        { id: 'feeds', label: 'Traffic / Weather / Social', x: 10, y: 20 },
        { id: 'fusion', label: 'Multimodal Fusion Engine', x: 50, y: 20 },
        { id: 'dashboard', label: 'React Dashboard', x: 90, y: 20 },
        { id: 'risk', label: 'Risk Scoring Model', x: 30, y: 75 },
        { id: 'api', label: 'Python API Service', x: 70, y: 75 },
      ],
      links: [
        { from: 'feeds', to: 'fusion' },
        { from: 'fusion', to: 'dashboard' },
        { from: 'fusion', to: 'risk' },
        { from: 'risk', to: 'api' },
        { from: 'api', to: 'dashboard' },
      ],
    },
  },
  {
    id: 'smart-rental-tracking',
    title: 'Smart Rental Tracking System',
    duration: '08/2026',
    description:
      'Developed an end-to-end telemetry and fleet intelligence portal for heavy machinery tracking, combining real-time IoT signal streaming, predictive maintenance modeling, and 3D digital twin rendering.',
    role: 'Systems + Full-stack Engineer',
    impact: 'Built and demonstrated a functional Smart Rental Tracking System featuring automated alert routing, AI health insights, and operational KPI dashboards.',
    outcomes: [
      'Built a functional Smart Rental Tracking System featuring automated alert routing, AI health insights, and operational KPI dashboards.',
      'Secured 2nd place in a high-intensity 24-hour university hackathon conducted by Caterpillar.',
      'Co-engineered production-ready prototypes and multimodal AI architectures within a multidisciplinary team.',
    ],
    honor: {
      title: 'Caterpillar Hackathon Winner — 2nd Place',
      org: 'Sathyabama Institute of Science and Technology',
      detail: '24-hour university hackathon at Sathyabama IST.',
    },
    stepper: [
      { phase: 'Challenge', detail: 'Enable real-time fleet monitoring with predictive maintenance for heavy rental machinery.' },
      { phase: 'Decision', detail: 'Build a full-stack telemetry portal with Three.js digital twin, Node.js API, and AI health engine.' },
      { phase: 'Outcome', detail: 'Delivered a working prototype with automated alerts, fleet KPIs, and 3D asset visualization.' },
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/Don-Cornelius-B/Smart_Rental_Tracking_System_SDD' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/don-cornelius-livi/' },
    ],
    tags: ['React', 'Node.js/Express', 'Three.js', 'Tailwind CSS', 'Python'],
    category: 'Telemetry/IoT',
    diagram: {
      nodes: [
        { id: 'sensors', label: 'IoT Sensor Fleet', x: 10, y: 20 },
        { id: 'api', label: 'Node.js / Express API', x: 50, y: 20 },
        { id: 'dashboard', label: 'React Dashboard', x: 90, y: 20 },
        { id: 'twin', label: 'Three.js Digital Twin', x: 30, y: 75 },
        { id: 'ai', label: 'Python AI Health Engine', x: 70, y: 75 },
      ],
      links: [
        { from: 'sensors', to: 'api' },
        { from: 'api', to: 'dashboard' },
        { from: 'api', to: 'twin' },
        { from: 'api', to: 'ai' },
        { from: 'ai', to: 'dashboard' },
      ],
    },
  },
  {
    id: 'portfolio-platform',
    title: 'Interactive Developer Portfolio Platform',
    duration: '06/2026 – Present',
    description:
      'Engineered a high-performance Next.js portfolio platform featuring interactive 3D particle systems, a custom skill orbit visualizer, dynamic modal projections, and automated CI/CD deployment pipelines.',
    role: 'Design Engineer',
    impact: 'Shipped a production-grade portfolio with interactive telemetry canvas, Web Audio synthesis, and automated GitHub Pages deployment.',
    outcomes: [
      'Engineered a high-performance Next.js portfolio with interactive particle systems and dynamic modal projections.',
      'Built automated CI/CD deployment pipelines with GitHub Actions for zero-downtime static exports.',
      'Implemented a custom skill orbit visualizer and tactile Web Audio feedback system.',
    ],
    honor: null,
    stepper: [
      { phase: 'Challenge', detail: 'Create a portfolio that demonstrates systems engineering craft, not just lists projects.' },
      { phase: 'Decision', detail: 'Build an interactive Systems Deck with telemetry canvas, sound synthesis, and live diagnostics.' },
      { phase: 'Outcome', detail: 'Production static export deployed to GitHub Pages with automated CI/CD and zero hydration errors.' },
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/Don-Cornelius-B/Don-Cornelius-B.github.io' },
      { label: 'Live', href: 'https://don-cornelius-b.github.io' },
    ],
    tags: ['Next.js 15', 'React 19', 'Tailwind CSS', 'Framer Motion', 'GitHub Actions'],
    category: 'Cloud/DevOps',
    diagram: {
      nodes: [
        { id: 'code', label: 'Next.js 15 Source', x: 10, y: 20 },
        { id: 'ci', label: 'GitHub Actions CI', x: 50, y: 20 },
        { id: 'pages', label: 'GitHub Pages CDN', x: 90, y: 20 },
        { id: 'canvas', label: 'Telemetry Canvas', x: 30, y: 75 },
        { id: 'audio', label: 'Web Audio Engine', x: 70, y: 75 },
      ],
      links: [
        { from: 'code', to: 'ci' },
        { from: 'ci', to: 'pages' },
        { from: 'code', to: 'canvas' },
        { from: 'code', to: 'audio' },
      ],
    },
  },
];

export const honors = [
  {
    title: 'ChallengeX Winner — 2nd Place',
    org: 'George Mason University',
    period: '02/2026 – 04/2026',
    points: [
      'Selected for an 8-week high-impact hackathon focused on federal and private sector challenges.',
      'Developed specialized solutions for Supply Chain Situational Awareness (CNA).',
      'Co-engineered production-ready prototypes and multimodal AI architectures within a multidisciplinary team.',
    ],
  },
  {
    title: 'Caterpillar Hackathon Winner — 2nd Place',
    org: 'Sathyabama Institute of Science and Technology',
    period: '08/2026',
    points: [
      'Secured 2nd place in a high-intensity 24-hour university hackathon conducted by Caterpillar.',
      'Built and demonstrated a functional Smart Rental Tracking System featuring automated alert routing, AI health insights, and operational KPI dashboards.',
    ],
  },
];

export const education = [
  {
    institution: 'Sathyabama Institute of Science and Technology',
    degree: 'B.E. Computer Science and Engineering',
    period: '2023 – 2027',
    location: 'Chennai, India',
    detail: 'Currently pursuing Computer Science and Engineering with a specialized focus on Cloud Computing and DevOps Engineering.',
  },
  {
    institution: 'Zion Matriculation Higher Secondary School',
    degree: 'Higher Secondary',
    period: '2021 – 2023',
    location: 'India',
    detail: 'Completed Higher Secondary education with a focus on Mathematics and Computer Science. Developed a foundational interest in software logic and creative technology.',
  },
];

export const capabilities = [
  {
    category: 'Languages',
    accent: 'cyan',
    skills: ['Python', 'Bash', 'JavaScript/TypeScript', 'C++'],
    projectIds: ['multimodal-supply-chain', 'smart-rental-tracking', 'portfolio-platform'],
  },
  {
    category: 'Cloud & DevOps',
    accent: 'amber',
    skills: ['Docker', 'Containers', 'GitHub Actions', 'CI/CD Pipelines', 'Microsoft Azure', 'Linux'],
    projectIds: ['multimodal-supply-chain', 'portfolio-platform'],
  },
  {
    category: 'Web & 3D',
    accent: 'cyan',
    skills: ['React', 'Next.js', 'Node.js/Express', 'Three.js', 'Tailwind CSS'],
    projectIds: ['smart-rental-tracking', 'portfolio-platform'],
  },
];

export const principles = [
  {
    title: 'Systems First',
    text: 'Every product choice starts from reliability, observability, and predictable behavior under load.',
  },
  {
    title: 'Ship with Confidence',
    text: 'CI/CD pipelines and automated validation ensure every deployment is repeatable and traceable.',
  },
  {
    title: 'Measure, Then Optimize',
    text: 'Performance gains are validated with benchmarks, not assumptions. Data drives architecture decisions.',
  },
];

export const timeline = [
  {
    year: '2021 – 2023',
    stage: 'Zion Matriculation Higher Secondary',
    text: 'Completed Higher Secondary with a focus on Mathematics and Computer Science.',
    type: 'education',
  },
  {
    year: '2023 – 2027',
    stage: 'Sathyabama IST — B.E. CSE',
    text: 'Pursuing Computer Science and Engineering with Cloud Computing & DevOps specialization.',
    type: 'education',
  },
  {
    year: '08/2026',
    stage: 'Caterpillar Hackathon — 2nd Place',
    text: 'Built Smart Rental Tracking System with IoT telemetry, digital twin, and fleet intelligence in a 24-hour sprint.',
    type: 'honor',
  },
  {
    year: '02/2026 – 04/2026',
    stage: 'GMU ChallengeX — 2nd Place',
    text: 'Developed multimodal AI supply chain situational awareness system in an 8-week federal hackathon.',
    type: 'honor',
  },
  {
    year: '06/2026 – Present',
    stage: 'Interactive Portfolio Platform',
    text: 'Engineered a high-performance Next.js Systems Deck with telemetry canvas, Web Audio, and automated CI/CD.',
    type: 'project',
  },
];
