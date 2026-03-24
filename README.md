<p align="center">
  <img src="https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=electron&logoColor=white" alt="Electron" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/platform-Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white" alt="Windows" />
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="MIT License" />
</p>

<h1 align="center">🚀 Flowset</h1>

<p align="center">
  <strong>Switch context instantly. Launch all your apps in one click.</strong>
</p>

<p align="center">
  A desktop productivity tool for Windows that lets you create custom workspace profiles<br/>
  and launch groups of applications simultaneously — no more opening apps one by one.
</p>

---

## 💡 The Problem

Every time you switch between work, study, or gaming, you open the same set of apps manually — your code editor, browser, Slack, Spotify, and so on. It's repetitive, time-consuming, and breaks your flow.

**Flowset solves this** by letting you define reusable profiles that launch all your apps in sequence with a single click.

## ✨ Key Features

| Feature | Description |
|---|---|
| **Custom Profiles** | Create named profiles with emoji icons, accent colors, and descriptions |
| **One-Click Launch** | Launch all apps in a profile sequentially with a live progress indicator |
| **Smart Icon Detection** | Automatically assigns emoji icons based on app names (VS Code → 💻, Chrome → 🌐, Discord → 💬) |
| **Persistent Storage** | Profiles and launch stats are saved locally using `electron-store` |
| **Launch Counter** | Tracks how many times you've launched profiles — a small productivity metric |
| **Dark UI** | Sleek dark-themed interface with modern typography (Syne + JetBrains Mono) |

## 🛠️ Tech Stack

- **Electron** — cross-platform desktop framework (main + renderer process architecture)
- **Vanilla JavaScript** — no frameworks, full control over DOM and state management
- **HTML5 + CSS3** — custom UI with CSS animations, glassmorphism, and responsive grid layouts
- **electron-store** — lightweight JSON-based local persistence
- **electron-builder** — packaging into Windows `.exe` installer (NSIS)

## 🏗️ Architecture

```
flowset/
├── main.js            # Electron main process (window, IPC handlers, store)
├── preload.js         # Context bridge (secure API exposure to renderer)
├── renderer/
│   ├── index.html     # App shell with modals and semantic structure
│   ├── app.js         # UI logic, state management, event delegation
│   └── style.css      # Complete design system (dark theme, animations)
├── package.json       # Dependencies, build config, electron-builder setup
└── .gitignore
```

**Design decisions:**
- `contextIsolation: true` + `preload.js` for secure IPC between main and renderer
- Event delegation pattern for dynamic DOM elements (profile cards, app items)
- `crypto.randomUUID()` for profile IDs — no external dependencies needed

## 🚀 Getting Started

**Prerequisites:** [Node.js](https://nodejs.org/) (v16+)

```bash
# Clone the repository
git clone https://github.com/Augustuuuuu/flowset.git
cd flowset

# Install dependencies
npm install

# Run in development mode
npm start
```

### Build the executable

```bash
npm run build
```

The `.exe` installer will be generated in the `dist/` folder.

## 📖 How It Works

1. **Create a profile** — choose a name, emoji, accent color, and optional description
2. **Add applications** — browse for `.exe`, `.bat`, `.lnk`, or `.cmd` files on your system
3. **Launch** — click the launch button and watch Flowset open each app sequentially with a progress animation

### Example profiles

| Profile | Apps |
|---|---|
| 💻 **Work** | VS Code, Chrome, Slack, Outlook |
| 📝 **Study** | Notion, Anki, YouTube, Terminal |
| 🎮 **Gaming** | Steam, Discord, Spotify |

## 📬 Contact

Built by **Augusto Saboia** — [LinkedIn](https://www.linkedin.com/in/augustosaboia/)

---

<p align="center">
  <sub>If you found this useful, consider giving it a ⭐</sub>
</p>
