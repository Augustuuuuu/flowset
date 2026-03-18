// ── Constants ──────────────────────────────────────────────
const EMOJIS = ['🚀','💻','🎮','🎵','🌐','💬','🎥','🎨','📝','⚡','🔥','🛠️','📊','🧩','🎯','📁','🗂️','☕','🧪','🤖'];

const COLORS = ['#7c6ff7','#34d399','#f87171','#fbbf24','#60a5fa','#f472b6','#a3e635','#fb923c'];

const ICON_MAP = {
  chrome: '🌐', firefox: '🌐', edge: '🌐', brave: '🌐', opera: '🌐', vivaldi: '🌐',
  code: '💻', vscode: '💻', 'visual studio': '💻', sublime: '💻', notepad: '💻', atom: '💻',
  spotify: '🎵', 'windows media': '🎵', vlc: '🎵', itunes: '🎵', foobar: '🎵',
  discord: '💬', slack: '💬', telegram: '💬', whatsapp: '💬', teams: '💬', skype: '💬',
  steam: '🎮', epic: '🎮', 'battle.net': '🎮', origin: '🎮', 'riot client': '🎮',
  obs: '🎥', streamlabs: '🎥', 'obs64': '🎥', 'obs32': '🎥',
  figma: '🎨', photoshop: '🎨', illustrator: '🎨', gimp: '🎨', paint: '🎨', canva: '🎨', blender: '🎨',
  notion: '📝', obsidian: '📝', evernote: '📝', onenote: '📝',
  terminal: '⚡', cmd: '⚡', powershell: '⚡', 'windows terminal': '⚡', git: '⚡',
  explorer: '📁', 'file explorer': '📁',
  excel: '📊', word: '📝', powerpoint: '📊', outlook: '📧',
  postman: '🛠️', insomnia: '🛠️', docker: '🛠️',
};

// ── State ──────────────────────────────────────────────────
let profiles = [];
let launchCount = 0;
let editingId = null;
let selectedEmoji = '🚀';
let selectedColor = COLORS[0];
let currentApps = [];

// ── DOM refs ───────────────────────────────────────────────
const $grid = document.getElementById('profiles-grid');
const $empty = document.getElementById('empty-state');
const $statProfiles = document.getElementById('stat-profiles');
const $statApps = document.getElementById('stat-apps');
const $statLaunches = document.getElementById('stat-launches');
const $modalProfile = document.getElementById('modal-profile');
const $modalLaunch = document.getElementById('modal-launch');
const $modalTitle = document.getElementById('modal-profile-title');
const $inputName = document.getElementById('input-name');
const $inputDesc = document.getElementById('input-desc');
const $emojiGrid = document.getElementById('emoji-grid');
const $colorPicker = document.getElementById('color-picker');
const $appsList = document.getElementById('apps-list');
const $btnDelete = document.getElementById('btn-delete-profile');

// ── Init ───────────────────────────────────────────────────
async function init() {
  profiles = (await window.api.store.get('profiles')) || [];
  launchCount = (await window.api.store.get('launchCount')) || 0;
  buildEmojiGrid();
  buildColorPicker();
  render();
  bindEvents();
}

// ── Render ──────────────────────────────────────────────────
function render() {
  renderStats();
  renderGrid();
  $empty.classList.toggle('visible', profiles.length === 0);
  $grid.style.display = profiles.length ? 'grid' : 'none';
}

function renderStats() {
  $statProfiles.textContent = profiles.length;
  const totalApps = profiles.reduce((s, p) => s + p.apps.length, 0);
  $statApps.textContent = totalApps;
  $statLaunches.textContent = launchCount;
}

function renderGrid() {
  $grid.innerHTML = profiles.map(p => `
    <div class="profile-card" data-id="${p.id}">
      <div class="card-stripe" style="background:${p.color}"></div>
      <div class="card-body">
        <div class="card-top">
          <span class="card-emoji">${p.emoji}</span>
          <button class="card-edit" data-edit="${p.id}" title="Edit">✏️</button>
        </div>
        <div class="card-name">${escapeHtml(p.name)}</div>
        <div class="card-desc">${escapeHtml(p.description || '')}</div>
        <div class="card-apps">
          ${p.apps.map(a => `<span class="app-pill"><span class="app-pill-emoji">${a.emoji}</span>${escapeHtml(a.name)}</span>`).join('')}
          ${p.apps.length === 0 ? '<span class="app-pill" style="opacity:0.4">No apps added</span>' : ''}
        </div>
        <button class="btn-launch" data-launch="${p.id}" ${p.apps.length === 0 ? 'disabled style="opacity:0.4;cursor:not-allowed"' : ''}>
          ▶ Launch ${escapeHtml(p.name)}
        </button>
      </div>
    </div>
  `).join('');
}

// ── Emoji & Color pickers ──────────────────────────────────
function buildEmojiGrid() {
  $emojiGrid.innerHTML = EMOJIS.map(e =>
    `<button class="emoji-btn${e === selectedEmoji ? ' selected' : ''}" data-emoji="${e}">${e}</button>`
  ).join('');
}

function buildColorPicker() {
  $colorPicker.innerHTML = COLORS.map(c =>
    `<div class="color-dot${c === selectedColor ? ' selected' : ''}" data-color="${c}" style="background:${c}"></div>`
  ).join('');
}

// ── Auto-detect emoji ──────────────────────────────────────
function detectEmoji(filePath) {
  const name = filePath.split(/[\\/]/).pop().replace(/\.\w+$/, '').toLowerCase();
  for (const [key, emoji] of Object.entries(ICON_MAP)) {
    if (name.includes(key)) return emoji;
  }
  return '📦';
}

function getAppName(filePath) {
  return filePath.split(/[\\/]/).pop().replace(/\.\w+$/, '');
}

// ── Modal helpers ──────────────────────────────────────────
function openProfileModal(profile = null) {
  editingId = profile ? profile.id : null;
  $modalTitle.textContent = profile ? 'Edit Profile' : 'New Profile';
  $inputName.value = profile ? profile.name : '';
  $inputDesc.value = profile ? (profile.description || '') : '';
  selectedEmoji = profile ? profile.emoji : '🚀';
  selectedColor = profile ? profile.color : COLORS[0];
  currentApps = profile ? [...profile.apps] : [];
  $btnDelete.style.display = profile ? 'inline-flex' : 'none';
  buildEmojiGrid();
  buildColorPicker();
  renderAppsList();
  $modalProfile.classList.add('visible');
  $inputName.focus();
}

function closeProfileModal() {
  $modalProfile.classList.remove('visible');
  editingId = null;
  currentApps = [];
}

function renderAppsList() {
  $appsList.innerHTML = currentApps.map((a, i) => `
    <div class="app-item">
      <span class="app-item-emoji">${a.emoji}</span>
      <div class="app-item-info">
        <div class="app-item-name">${escapeHtml(a.name)}</div>
        <div class="app-item-path">${escapeHtml(a.path)}</div>
      </div>
      <button class="app-item-remove" data-remove="${i}" title="Remove">✕</button>
    </div>
  `).join('');
}

// ── Save / Delete ──────────────────────────────────────────
async function saveProfile() {
  const name = $inputName.value.trim();
  if (!name) { $inputName.focus(); return; }

  const profile = {
    id: editingId || crypto.randomUUID(),
    name,
    description: $inputDesc.value.trim(),
    emoji: selectedEmoji,
    color: selectedColor,
    apps: currentApps
  };

  if (editingId) {
    const idx = profiles.findIndex(p => p.id === editingId);
    if (idx !== -1) profiles[idx] = profile;
  } else {
    profiles.push(profile);
  }

  await persist();
  closeProfileModal();
  render();
}

async function deleteProfile() {
  if (!editingId) return;
  profiles = profiles.filter(p => p.id !== editingId);
  await persist();
  closeProfileModal();
  render();
}

async function persist() {
  await window.api.store.set('profiles', profiles);
  await window.api.store.set('launchCount', launchCount);
}

// ── Launch sequence ────────────────────────────────────────
async function launchProfile(id) {
  const profile = profiles.find(p => p.id === id);
  if (!profile || !profile.apps.length) return;

  const $emoji = document.getElementById('launch-emoji');
  const $title = document.getElementById('launch-title');
  const $apps = document.getElementById('launch-apps');
  const $bar = document.getElementById('launch-progress-bar');
  const $close = document.getElementById('btn-launch-close');

  $emoji.textContent = profile.emoji;
  $title.textContent = `Launching ${profile.name}…`;
  $bar.style.width = '0%';
  $close.disabled = true;
  $close.style.opacity = '0.4';

  $apps.innerHTML = profile.apps.map((a, i) => `
    <div class="launch-app-row" id="launch-row-${i}">
      <span class="launch-app-emoji">${a.emoji}</span>
      <span class="launch-app-name">${escapeHtml(a.name)}</span>
      <span class="launch-app-status" id="launch-status-${i}">pending</span>
    </div>
  `).join('');

  $modalLaunch.classList.add('visible');

  for (let i = 0; i < profile.apps.length; i++) {
    const row = document.getElementById(`launch-row-${i}`);
    const status = document.getElementById(`launch-status-${i}`);

    row.classList.add('active');
    status.textContent = 'opening…';
    status.classList.add('active');

    await window.api.launchApp(profile.apps[i].path);

    row.classList.remove('active');
    row.classList.add('done');
    status.textContent = '✓ done';
    status.classList.remove('active');
    status.classList.add('done');

    $bar.style.width = `${((i + 1) / profile.apps.length) * 100}%`;

    if (i < profile.apps.length - 1) {
      await delay(800);
    }
  }

  launchCount++;
  await persist();
  renderStats();

  $title.textContent = `${profile.name} launched!`;
  $close.disabled = false;
  $close.style.opacity = '1';
}

// ── Events ─────────────────────────────────────────────────
function bindEvents() {
  // New profile
  document.getElementById('btn-new-profile').addEventListener('click', () => openProfileModal());
  document.getElementById('btn-empty-create').addEventListener('click', () => openProfileModal());

  // Modal close / cancel
  document.getElementById('modal-profile-close').addEventListener('click', closeProfileModal);
  document.getElementById('btn-cancel-profile').addEventListener('click', closeProfileModal);

  // Save & delete
  document.getElementById('btn-save-profile').addEventListener('click', saveProfile);
  document.getElementById('btn-delete-profile').addEventListener('click', deleteProfile);

  // Add app
  document.getElementById('btn-add-app').addEventListener('click', async () => {
    const paths = await window.api.openFileDialog();
    if (!paths || !paths.length) return;
    for (const p of paths) {
      currentApps.push({
        name: getAppName(p),
        path: p,
        emoji: detectEmoji(p)
      });
    }
    renderAppsList();
  });

  // Remove app (delegated)
  $appsList.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-remove]');
    if (!btn) return;
    const idx = parseInt(btn.dataset.remove);
    currentApps.splice(idx, 1);
    renderAppsList();
  });

  // Emoji select (delegated)
  $emojiGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-emoji]');
    if (!btn) return;
    selectedEmoji = btn.dataset.emoji;
    $emojiGrid.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });

  // Color select (delegated)
  $colorPicker.addEventListener('click', (e) => {
    const dot = e.target.closest('[data-color]');
    if (!dot) return;
    selectedColor = dot.dataset.color;
    $colorPicker.querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
    dot.classList.add('selected');
  });

  // Grid: edit & launch (delegated)
  $grid.addEventListener('click', (e) => {
    const editBtn = e.target.closest('[data-edit]');
    if (editBtn) {
      const p = profiles.find(p => p.id === editBtn.dataset.edit);
      if (p) openProfileModal(p);
      return;
    }
    const launchBtn = e.target.closest('[data-launch]');
    if (launchBtn && !launchBtn.disabled) {
      launchProfile(launchBtn.dataset.launch);
    }
  });

  // Launch modal close
  document.getElementById('btn-launch-close').addEventListener('click', () => {
    $modalLaunch.classList.remove('visible');
  });

  // Close modals on overlay click
  $modalProfile.addEventListener('click', (e) => {
    if (e.target === $modalProfile) closeProfileModal();
  });
  $modalLaunch.addEventListener('click', (e) => {
    if (e.target === $modalLaunch) $modalLaunch.classList.remove('visible');
  });

  // Keyboard: Escape closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if ($modalLaunch.classList.contains('visible')) $modalLaunch.classList.remove('visible');
      else if ($modalProfile.classList.contains('visible')) closeProfileModal();
    }
  });
}

// ── Utilities ──────────────────────────────────────────────
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

// ── Go! ────────────────────────────────────────────────────
init();
