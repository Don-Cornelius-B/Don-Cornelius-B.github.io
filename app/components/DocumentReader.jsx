'use client';
import { vt323 } from '../fonts/fonts';
import styles from '../css/terminal.module.css';
import readerStyles from '../css/documentreader.module.css';

const FILE_CONTENTS = {
  'multimodal-ai.txt': `<div style="line-height: 1.4;">================================================================================
PROJECT: MULTIMODAL AI SUPPLY CHAIN ANALYSIS
AWARD:   George Mason University ChallengeX Winner (2nd Place)
TECH:    React, Python, GitHub Actions, Multimodal AI, CMU SDK, TorchGeo
================================================================================

<div style="margin-bottom: 16px;">
OVERVIEW:
<div style="text-align: justify; text-justify: inter-word; width: 100%; white-space: normal;">Situational awareness platform built for large-scale logistics operations. Detects acute supply chain choke points and routing disruptions by fusing real-time satellite traffic feeds, severe weather telemetry, and predictive social media signal streams into a unified situational map.</div>
</div>

<div style="margin-bottom: 16px;">
CONTRIBUTIONS & ARCHITECTURE:
* Multimodal Ingestion Engine: Implemented Python processing pipelines leveraging CMU SDK and TorchGeo for spatio-temporal satellite data analysis.
* Disruption Modeling: Combined historical transit delays with active weather and transit event streams to compute dynamic risk indices.
* Frontend Visualization: Engineered reactive mapping dashboards with automated alert triggers for critical route diversions.
* CI/CD & Delivery: Built GitHub Actions workflows verifying data ingestion pipelines and model scoring logic on every merge.
</div>

<div style="margin-bottom: 16px;">
REPOSITORY: <a href="https://github.com/tanmaya-kamma/multimodal_ai" target="_blank" style="text-decoration: underline; color: #8be9fd;">https://github.com/tanmaya-kamma/multimodal_ai</a>
</div>
================================================================================</div>`,
  'smart-rental.txt': `<div style="line-height: 1.4;">================================================================================
PROJECT: SMART RENTAL TRACKING SYSTEM
AWARD:   Caterpillar Hackathon Winner (2nd Place / 24h Hackathon)
TECH:    React, Node.js/Express, Three.js, Tailwind CSS, Python
================================================================================

<div style="margin-bottom: 16px;">
OVERVIEW:
<div style="text-align: justify; text-justify: inter-word; width: 100%; white-space: normal;">Industrial equipment lifecycle and rental telemetry tracking system engineered for continuous fleet monitoring, usage telemetry, and automated maintenance scheduling across heavy construction machinery.</div>
</div>

<div style="margin-bottom: 16px;">
CONTRIBUTIONS & ARCHITECTURE:
* Real-Time Telemetry Streaming: Integrated WebSocket protocols and Python data generators for continuous engine hour, vibration, and fuel burn analysis.
* 3D Digital Twin Viewer: Built an interactive machine visualizer in Three.js allowing remote field technicians to inspect equipment structural components and wear points.
* Telemetry Diagnostics: Implemented threshold alert listeners flagging maintenance anomalies before mechanical failure.
* Backend Service: Architected Node.js/Express REST APIs handling asset check-in, checkout lifecycle state machines, and billing logs.
</div>

<div style="margin-bottom: 16px;">
REPOSITORY: <a href="https://github.com/Don-Cornelius-B/Smart_Rental_Tracking_System_SDD" target="_blank" style="text-decoration: underline; color: #8be9fd;">https://github.com/Don-Cornelius-B/Smart_Rental_Tracking_System_SDD</a>
</div>
================================================================================</div>`,
  'portfolio.txt': `<div style="line-height: 1.4;">================================================================================
PROJECT: INTERACTIVE DEVELOPER PORTFOLIO PLATFORM
TRACK:   Cloud Systems & DevOps Engineer Portfolio
TECH:    Next.js 15, React 19, Tailwind CSS, Framer Motion, GitHub Actions
================================================================================

<div style="margin-bottom: 16px;">
OVERVIEW:
<div style="text-align: justify; text-justify: inter-word; width: 100%; white-space: normal;">A high-performance, retro 1-bit terminal workstation interface featuring custom CLI buffer emulation, audio synthesis and playback decks, and interactive IDE file exploration, fully compiled and deployed via automated CI/CD pipelines.</div>
</div>

<div style="margin-bottom: 16px;">
CONTRIBUTIONS & ARCHITECTURE:
* Monospace Audio & Visualizer Engine: Engineered an authentic spinning vinyl player and real-time ASCII block frequency equalizer synchronized via decoupled browser events.
* CLI Shell Emulation: Built non-blocking buffer dispatchers supporting keyboard commands, interactive macro keys, and deep-link routing.
* Hardware Drawer Transitions: Implemented state-synchronized accordion sliding layouts switching from raw terminal shell to full NerdTree code editing modes.
* Automated Delivery: Configured static-export GitHub Actions workflows verifying zero-error deployments directly to GitHub Pages.
</div>

<div style="margin-bottom: 16px;">
REPOSITORY: <a href="https://github.com/Don-Cornelius-B/Don-Cornelius-B.github.io" target="_blank" style="text-decoration: underline; color: #8be9fd;">https://github.com/Don-Cornelius-B/Don-Cornelius-B.github.io</a>
</div>
================================================================================</div>`,
  'skills.txt': `<div style="line-height: 1.4;">================================================================================
SKILLS & COMPETENCIES
================================================================================

CORE COMPETENCIES:
* Containerization & Orchestration: Kubernetes, Docker
* CI/CD & Delivery: Argo CD, Jenkins, GitHub Actions
* Policy & Security: Kyverno
* Programming & Scripting: Python, Bash
* Operating Systems & Environments: Linux, WSL2
================================================================================</div>`,
  'bio.txt': `<div style="line-height: 1.4;">================================================================================
BIOGRAPHY
================================================================================

BACKGROUND:
<div style="text-align: justify; text-justify: inter-word; width: 100%; white-space: normal; margin-bottom: 16px;">Cloud Systems & DevOps Engineer focused on building robust, scalable infrastructure and automated delivery pipelines.</div>

LOCATION: Chennai, IN
================================================================================</div>`,
  'github.txt': `<div style="line-height: 1.4;">================================================================================
GITHUB PROFILE
================================================================================

Check out my latest open-source projects, contributions, and repositories:
<a href="https://github.com/Don-Cornelius-B" target="_blank" style="text-decoration: underline; color: #8be9fd;">https://github.com/Don-Cornelius-B</a>
================================================================================</div>`,
  'linkedin.txt': `<div style="line-height: 1.4;">================================================================================
LINKEDIN PROFILE
================================================================================

Connect with me professionally:
<a href="https://linkedin.com/in/don-cornelius-livi/" target="_blank" style="text-decoration: underline; color: #8be9fd;">https://linkedin.com/in/don-cornelius-livi/</a>
================================================================================</div>`,
  'contact.txt': `<div style="line-height: 1.4;">================================================================================
CONTACT INFORMATION
================================================================================

Email: doncorneliuslivi@gmail.com
Phone: +91 6374760469
Location: Chennai, IN
================================================================================</div>`
};

const ResumeComponent = ({ styles }) => (
  <div className={styles.resumeContainer}>
    <section className={styles.docBox}>
      <h1 className={styles.resumeTitle}>DON CORNELIUS BARNABAS</h1>
      <p className={styles.resumeSubtitle}>Cloud Systems & DevOps Engineer | CSE Technologist</p>
      <p className={styles.resumeContact}>Chennai, IN | doncorneliuslivi@gmail.com | +91 6374760469</p>
    </section>

    <section className={styles.docBox}>
      <h2 className={styles.sectionHeader}>// CORE COMPETENCIES</h2>
      <div className={styles.gridList}>
        <p><span className={styles.bulletTag}>* Orchestration & Cloud:</span> Kubernetes, Docker, Argo CD, Kyverno, Linux (WSL2)</p>
        <p><span className={styles.bulletTag}>* CI/CD & Automation:</span> GitHub Actions, Jenkins, Git, Python, Bash</p>
        <p><span className={styles.bulletTag}>* Systems & Frameworks:</span> React, Node.js, FastAPI, WebSockets</p>
      </div>
    </section>

    <section className={styles.docBox}>
      <h2 className={styles.sectionHeader}>// VERIFIED ACCOLADES & HACKATHONS</h2>
      <p><span className={styles.bulletTag}>* Challenge+X (George Mason University):</span> 2nd Place Winner (Multimodal AI)</p>
      <p><span className={styles.bulletTag}>* Caterpillar 24-Hour Hackathon:</span> 2nd Place Winner (Smart Rental Operations)</p>
    </section>

    <section className={styles.docBox}>
      <h2 className={styles.sectionHeader}>// RELEVANT PROJECT HIGHLIGHTS</h2>
      <p><span className={styles.bulletTag}>[1] Multimodal AI Supply Chain:</span> Situational map fusing spatial, satellite, and logistics anomaly streams</p>
      <p><span className={styles.bulletTag}>[2] Smart Rental Tracking System:</span> Heavy fleet real-time IoT telemetry streaming with 3D digital twin</p>
      <p><span className={styles.bulletTag}>[3] Interactive Portfolio Platform:</span> 1-bit terminal workstation with dynamic IDE drawer transitions</p>
    </section>

    <section className={`${styles.docBox} ${styles.downloadBox}`}>
      <span>OFFICIAL PDF RESUME:</span>
      <a href="/Don_Cornelius_B_Resume.pdf" target="_blank" rel="noreferrer" className={styles.pdfLink}>
        [ DOWNLOAD / VIEW OFFICIAL PDF ]
      </a>
    </section>
  </div>
);

const DocumentReader = ({ selectedFile, setIsExplorerOpen }) => {
  const isResume = selectedFile === 'resume.txt';
  const content = FILE_CONTENTS[selectedFile] || 'File not found.';
  
  const titleString = `┌──[ 📄 ${selectedFile} ]`;
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <div className={`${styles.tabHeader} ${vt323.className}`}>
        <div className={styles.tabTitle}>
          {titleString}
        </div>
        <button 
          type="button" 
          onClick={() => setIsExplorerOpen(false)}
          className={styles.exitBtn}
        >
          [ :q EXIT ]──┐
        </button>
      </div>
      <div 
        className={`${readerStyles.contentContainer} ${vt323.className}`}
        style={{ whiteSpace: isResume ? 'normal' : 'pre-wrap', wordBreak: 'break-word' }}
      >
        {isResume ? (
          <ResumeComponent styles={readerStyles} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </div>
    </div>
  );
};

export default DocumentReader;
