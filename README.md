# 🖥️ Don Cornelius B — Interactive 1-Bit Developer Workstation

An authentic, high-performance 1-bit terminal workstation and interactive IDE environment built with **Next.js 15**, **React 19**, and **Tailwind CSS**. Deployed continuously to GitHub Pages via automated GitHub Actions workflows.

🔗 **Live Deployment:** [https://don-cornelius-b.github.io/](https://don-cornelius-b.github.io/)

---

## ⚡ Key Architectural Features

### 1. 🛡️ 1-Bit Knight ASCII Monogram & Quick Direct Commands
* **Custom Knight Insignia**: Line-calibrated 1-bit medieval knight ASCII graphic aligned alongside system operational telemetry without horizontal wrapping.
* **Streamlined Command Directory**: Consolidated primary system navigation triggers (`github`, `linkedin`, `resume`, `projects`, `help`) into an index directly above the prompt divider.

### 2. 💽 Embedded Vinyl Audio Deck & Decoupled State Sync
* **1-Bit Retro Media Deck**: Interactive turntable visualizer with spinning vinyl record graphics, track scrubbing slider, volume controls, and track metadata readout (`Above the Clouds`).
* **Hardware Event Synchronization**: Broadcasts audio playback lifecycle hooks via custom window events (`portfolio-audio-state`) to coordinate visualizer reactive loops without re-rendering parent tree layouts.

### 3. 🎛️ Dual-Mode Hardware AuxConsole (`[ EQ | KEYS ]`)
* **8-Band ASCII EQ Spectrum**: Visualizes multi-band frequencies (60Hz to 16kHz) reacting dynamically to audio playback using authentic Unicode block tiers (` `, `▂`, `▃`, `▄`, `▅`, `▆`, `▇`, `█`).
* **Tactile Macro Dispatcher**: 4 hardware macro triggers (`[ ? help ]`, `[ * projects ]`, `[ @ bio ]`, `[ ! clear ]`) dispatching non-blocking buffer executions directly to the terminal engine.

### 4. 📂 Sliding NerdTree Explorer & Read-Only Document Reader (`OVERALL VIEW`)
* **Choreographed IDE Transition**:
  1. Triggering `[ OVERALL VIEW ]` smoothly slides the audio player and AuxConsole modules off-screen (`translateX(120%)`).
  2. The top pane expands downward to fill the right column with a collapsible Vim NerdTree directory structure.
  3. The main stage smoothly transitions into a **60/40 IDE layout ratio**, swapping the terminal shell for a read-only document editor.
* **Document Viewer**: Formats structured repository overviews and an edge-to-edge bordered text recreation of the engineering resume with direct PDF access.

---

## 🛠️ Tech Stack & Tooling

* **Framework**: [Next.js 15](https://nextjs.org/) (Static Export / App Router)
* **Library**: React 19
* **Styling**: Tailwind CSS & Vanilla CSS Modules
* **Typography**: Monospace VT323 (`--font-vt323`)
* **Animation & State**: Custom CSS transitions, custom DOM event buses, decoupled buffer refs
* **CI/CD**: GitHub Actions deploying automatically to GitHub Pages

---

## 📁 Repository Directory Structure

```text
don-cornelius-b/
├── app/
│   ├── components/
│   │   ├── AuxConsole.jsx       # Dual-mode EQ & macro hardware console
│   │   ├── DocumentReader.jsx   # Read-only project README & resume viewer
│   │   ├── NerdTree.jsx         # Collapsible directory tree browser
│   │   ├── Terminal.jsx         # Custom CLI execution buffer & ASCII header
│   │   └── Visualizer.jsx       # 1-bit vinyl audio player deck
│   ├── css/
│   │   ├── auxconsole.module.css
│   │   ├── documentreader.module.css
│   │   ├── nerdtree.module.css
│   │   ├── page.module.css
│   │   └── terminal.module.css
│   ├── data/
│   │   └── english.json         # Systems, projects, and bio data records
│   ├── layout.jsx
│   └── page.jsx                 # Master 3-box rail and IDE transition orchestrator
├── public/
│   ├── Don_Cornelius_B_Resume.pdf
│   └── audio/
└── next.config.mjs
```

---

## 🚀 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Don-Cornelius-B/Don-Cornelius-B.github.io.git
   cd Don-Cornelius-B.github.io
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) (or http://localhost:3001) in your browser.

4. **Build static production export:**
   ```bash
   npm run build
   ```

---

## 👤 Author

**Don Cornelius Barnabas**
* **Role**: Cloud Systems & DevOps Engineer | CSE Technologist
* **Location**: Chennai, IN
* **GitHub**: [@Don-Cornelius-B](https://github.com/Don-Cornelius-B)
* **LinkedIn**: [don-cornelius-livi](https://linkedin.com/in/don-cornelius-livi/)
