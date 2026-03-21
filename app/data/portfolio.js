export const projects = [
  {
    id: 'akon',
    title: 'AKON - Agnostic Key-stream Optimized Network',
    duration: '01/2026 - Present',
    description:
      'Built a P2P security gateway bridging mobile socket messaging with off-grid RF hardware for emergency response and resilient field communication.',
    role: 'Systems + Embedded Engineer',
    impact: 'Offline message relay prototype validated with secure key-stream exchange.',
    outcomes: [
      'Reduced dependency on internet connectivity for field communication paths.',
      'Designed bridge architecture between mobile socket clients and RF edge devices.',
      'Created CI-friendly pipeline for repeatable firmware and gateway updates.',
    ],
    stepper: [
      {
        phase: 'Challenge',
        detail: 'Enable resilient communication in low-connectivity environments for emergency teams.',
      },
      {
        phase: 'Decision',
        detail: 'Bridge mobile socket traffic into an RF-enabled gateway with secure key-stream handling.',
      },
      {
        phase: 'Outcome',
        detail: 'Validated offline relay workflow with repeatable deployment and operational traceability.',
      },
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/Don-Cornelius-B' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/don-cornelius-livi/' },
    ],
    tags: ['Python', 'C++', 'GitHub Actions', 'ESP32', 'Semtech SX1278 RA-02'],
    theme: {
      edge: 'rgba(125, 211, 252, 0.7)',
      nodeBorder: 'rgba(125, 211, 252, 0.45)',
      nodeBg: 'rgba(8, 25, 49, 0.78)',
      nodeText: '#dbeafe',
      panelBg: 'linear-gradient(145deg, rgba(10, 20, 40, 0.72), rgba(17, 47, 76, 0.56))',
      chipBorder: 'rgba(125, 211, 252, 0.48)',
      chipText: '#bae6fd',
    },
    diagram: {
      nodes: [
        { id: 'mobile', label: 'Mobile Socket', x: 11, y: 16 },
        { id: 'gateway', label: 'Secure Gateway', x: 50, y: 16 },
        { id: 'rescue', label: 'Responder Console', x: 89, y: 16 },
        { id: 'crypto', label: 'Key-stream Layer', x: 32, y: 72 },
        { id: 'rf', label: 'RF Transceiver', x: 68, y: 72 },
      ],
      links: [
        { from: 'mobile', to: 'gateway' },
        { from: 'gateway', to: 'rescue' },
        { from: 'gateway', to: 'crypto' },
        { from: 'gateway', to: 'rf' },
      ],
    },
  },
  {
    id: 'multimodal-supply-chain',
    title: 'Multimodal AI Supply Chain Analysis',
    duration: '02/2026 - Present',
    description:
      'Developed a situational awareness system for supply-chain disruption detection by fusing real-time traffic, weather, and social signals into a multimodal AI pipeline.',
    role: 'Full-stack AI Engineer',
    impact: 'Built a multimodal pipeline that surfaces disruption signals into a single operational view.',
    outcomes: [
      'Integrated heterogeneous traffic, weather, and social feeds for unified risk scoring.',
      'Delivered React dashboard views for rapid response and anomaly inspection.',
      'Modularized pipeline components for reproducible model and API deployments.',
    ],
    stepper: [
      {
        phase: 'Challenge',
        detail: 'Detect disruptions early across fragmented, high-volume logistics data streams.',
      },
      {
        phase: 'Decision',
        detail: 'Implement multimodal fusion pipeline with operational dashboard and API-driven services.',
      },
      {
        phase: 'Outcome',
        detail: 'Produced a unified view of risk signals to accelerate response and decision quality.',
      },
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/Don-Cornelius-B' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/don-cornelius-livi/' },
    ],
    tags: ['React', 'FastAPI', 'Python', 'CMU Multimodal SDK', 'TorchGeo', 'GitHub Actions'],
    theme: {
      edge: 'rgba(165, 180, 252, 0.72)',
      nodeBorder: 'rgba(165, 180, 252, 0.42)',
      nodeBg: 'rgba(25, 22, 58, 0.78)',
      nodeText: '#e0e7ff',
      panelBg: 'linear-gradient(145deg, rgba(20, 22, 58, 0.72), rgba(52, 40, 96, 0.52))',
      chipBorder: 'rgba(167, 139, 250, 0.5)',
      chipText: '#ddd6fe',
    },
    diagram: {
      nodes: [
        { id: 'feeds', label: 'Traffic/Weather/Social', x: 11, y: 16 },
        { id: 'fusion', label: 'Fusion Engine', x: 50, y: 16 },
        { id: 'dashboard', label: 'React Dashboard', x: 89, y: 16 },
        { id: 'geo', label: 'TorchGeo Signals', x: 33, y: 72 },
        { id: 'api', label: 'FastAPI Service', x: 67, y: 72 },
      ],
      links: [
        { from: 'feeds', to: 'fusion' },
        { from: 'fusion', to: 'dashboard' },
        { from: 'fusion', to: 'geo' },
        { from: 'fusion', to: 'api' },
      ],
    },
  },
  {
    id: 'usda-marketplace',
    title: 'USDA Talent Mobility Marketplace',
    duration: '03/2026 - Present',
    description:
      'Designed and prototyped an internal gig-economy marketplace to unlock underutilized organizational talent and support fractional work assignments.',
    role: 'Product + Workflow Engineer',
    impact: 'Prototyped an internal marketplace flow for faster talent matching and assignment execution.',
    outcomes: [
      'Mapped low-friction process from employee profile creation to assignment fulfillment.',
      'Automated approval and routing steps with Power Automate flows.',
      'Structured Dataverse records to support scalable reporting and governance.',
    ],
    stepper: [
      {
        phase: 'Challenge',
        detail: 'Improve talent utilization across teams while reducing assignment friction.',
      },
      {
        phase: 'Decision',
        detail: 'Design an internal marketplace backed by Dataverse with automated routing flows.',
      },
      {
        phase: 'Outcome',
        detail: 'Delivered a workable prototype for faster role matching and transparent workflow governance.',
      },
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/Don-Cornelius-B' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/don-cornelius-livi/' },
    ],
    tags: ['Power Apps', 'Power Automate', 'Dataverse', 'Microsoft 365'],
    theme: {
      edge: 'rgba(110, 231, 183, 0.68)',
      nodeBorder: 'rgba(110, 231, 183, 0.45)',
      nodeBg: 'rgba(14, 38, 34, 0.76)',
      nodeText: '#d1fae5',
      panelBg: 'linear-gradient(145deg, rgba(11, 28, 29, 0.74), rgba(23, 65, 58, 0.5))',
      chipBorder: 'rgba(110, 231, 183, 0.5)',
      chipText: '#bbf7d0',
    },
    diagram: {
      nodes: [
        { id: 'staff', label: 'Employee Profiles', x: 11, y: 16 },
        { id: 'market', label: 'Talent Marketplace', x: 50, y: 16 },
        { id: 'admins', label: 'Program Leads', x: 89, y: 16 },
        { id: 'flows', label: 'Power Automate Flows', x: 33, y: 72 },
        { id: 'data', label: 'Dataverse Records', x: 67, y: 72 },
      ],
      links: [
        { from: 'staff', to: 'market' },
        { from: 'market', to: 'admins' },
        { from: 'market', to: 'flows' },
        { from: 'flows', to: 'data' },
      ],
    },
  },
];

export const principles = [
  {
    title: 'Systems First',
    text: 'Every product choice starts from reliability, observability, and predictable behavior under load.',
  },
  {
    title: 'Motion with Meaning',
    text: 'Animation is used to signal structure and intent, never to distract from content clarity.',
  },
  {
    title: 'Build-to-Ship',
    text: 'Each project is designed with CI-friendly workflows and practical deployment paths from day one.',
  },
];

export const capabilities = [
  ['Programming & APIs', 'Python', 'C++', 'Bash', 'FastAPI'],
  ['Cloud & Delivery', 'Docker', 'GitHub Actions', 'Git', 'GitHub'],
  ['Applied Platforms', 'ESP32', 'TorchGeo', 'Power Apps', 'Dataverse'],
];

export const timeline = [
  { year: '2019 - 2021', stage: 'ZION', text: 'Higher Secondary foundation with strong focus on computing logic.' },
  {
    year: '2023 - Present',
    stage: 'Sathyabama B.E CSE',
    text: '3rd Year CSE building cloud-native systems, creative technology products, and automation-first workflows.',
  },
];

export const honors = [
  {
    title: 'ChallengeX Participant | George Mason University',
    period: '02/2026 - Present',
    points: [
      'Selected for an 8-week high-impact hackathon focused on federal and private-sector challenges.',
      'Built focused solutions for Supply Chain Situational Awareness (CNA) and Talent Mobility (USDA).',
      'Collaborating in a multidisciplinary team to ship production-ready prototypes and multimodal AI architectures.',
    ],
  },
];

export const techProjectionLanes = [
  {
    title: 'Languages',
    accent: 'border-cyan-300/35 bg-cyan-500/5',
    skills: ['Python', 'Bash', 'C++'],
  },
  {
    title: 'Version Control + CI/CD',
    accent: 'border-sky-300/35 bg-sky-500/5',
    skills: ['Git', 'GitHub', 'GitHub Actions', 'Docker'],
  },
  {
    title: 'AI + Application',
    accent: 'border-indigo-300/35 bg-indigo-500/5',
    skills: ['React', 'FastAPI', 'CMU Multimodal SDK', 'TorchGeo'],
  },
  {
    title: 'Hardware + Enterprise',
    accent: 'border-emerald-300/35 bg-emerald-500/5',
    skills: ['ESP32', 'Semtech SX1278 RA-02', 'Power Apps', 'Power Automate', 'Dataverse', 'Microsoft 365 Integration'],
  },
];
