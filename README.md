# 🚀 Flowset

Desktop app launcher with custom profiles — group your favorite apps and launch them all in one click.

Built with **Electron** + vanilla HTML/CSS/JS.

---

## Prerequisites

- [Node.js LTS](https://nodejs.org/) (v18+)

## Install

```bash
npm install
```

## Run (dev)

```bash
npm start
```

## Build Windows Installer

```bash
npm run build
```

The `.exe` installer will be generated in the `dist/` folder.

---

## Features

- Create, edit and delete profiles with name, description, emoji and accent color
- Add `.exe`, `.bat`, `.lnk`, `.cmd` apps via native file picker
- Auto-detect emoji icon from app name (Chrome → 🌐, VS Code → 💻, Steam → 🎮, …)
- Launch all apps in a profile sequentially with animated progress
- Stats bar tracking total profiles, apps, and launches
- Dark minimalist UI with smooth animations