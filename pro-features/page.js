import '/components/dashboard/dashboard.js?v=20261027-social-14';
import '/components/dashboard/leaderboard.js?v=20261102-1';
import '/components/dashboard/blocks.js?v=20261117-pro-blocks-1';
import { icon } from '/components/dashboard/desktop-icons.js';
import { dashboardSocial } from '/components/dashboard/dashboard-social.js?v=20261116-goal-label-11';

const task = `<div class="dash-task"><span class="task-play">${icon('play')}</span><div class="task-description"><h3>Study Session</h3><p><span class="task-status">Paused</span><span class="task-meta">Expires in 1 hour <i>|</i> 1 hour</span></p></div><div class="task-progress"><span></span></div><span class="task-menu">${icon('more')}</span></div>`;

class FokasuGlassDashboard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="dash-layout glass-demo">
      <fokasu-demo-sidebar></fokasu-demo-sidebar>
      <div class="dash-main">
        <fokasu-demo-header></fokasu-demo-header>
        <div class="glass-timer-view">
          <div class="dash-timer-area">
            <div class="dash-dial"><svg class="dash-ring" viewBox="0 0 240 240" aria-hidden="true"><circle class="ring-track" cx="120" cy="120" r="113"/><circle class="ring-progress" cx="120" cy="120" r="113" pathLength="100" stroke-dasharray=".2 100"/></svg><div class="dash-time-content"><span class="dash-time">59:58</span><span class="dash-session">Study Session</span></div></div>
            <div class="dash-controls" aria-hidden="true"><span class="dash-control">${icon('minus')}</span><span class="dash-control primary-control">${icon('play')}</span><span class="dash-control" title="Progress bar mode"><svg class="desktop-icon icon-progress-mode" viewBox="0 0 10 17" fill="currentColor" fill-rule="evenodd"><path d="M0 0H10V17H0Z"/></svg></span><span class="dash-control">${icon('bolt')}</span></div>
          </div>
          <section class="dash-tasks"><h2>Today's Tasks</h2>${task}<div class="dash-end">that's everything for today</div></section>
          <div class="glass-next-heading">Study Together • Deeper Commitment</div>
        </div>
        <div class="glass-activity-view" hidden>${dashboardSocial()}</div>
        <span class="dash-edge-tab" aria-hidden="true">‹</span>
      </div>
    </div>`;
    this.querySelector('.dash-brand small').textContent = '207.8 hrs';
    this.querySelector('.dash-days').innerHTML = `${icon('hour')}14 Days`;
    const social = this.querySelector('.dash-social-view');
    social.querySelector('h2').textContent = 'Study Together • Deeper Commitment';
    social.querySelector('.dash-study-legend')?.remove();
    social.querySelector('.dash-activity-grid').setAttribute('aria-label', 'Sample yearly study activity. Brighter blue indicates more study time.');
    this.querySelector('.dash-account > svg').outerHTML = '<span class="glass-avatar">J</span>';
  }

  showView(view) {
    this.querySelector('.glass-timer-view').hidden = view !== 'timer';
    this.querySelector('.glass-activity-view').hidden = view !== 'activity';
  }
}
customElements.define('fokasu-glass-dashboard', FokasuGlassDashboard);

// App avatar artwork with web versions of Orbit, Stardust, and Ripple effects.
const profileIcons = ['43-little-knight', '14-leaf-spirit', '01-moon-cat', '03-cloud-dreamer', '27-koala', '12-sun-lion', '59-ufo'];
const profileEffects = ['orbit', 'stardust', 'ripple'];
function profileAvatar(index) {
  const label = profileIcons[index].slice(3).replaceAll('-', ' ');
  return `<span class="pro-avatar pro-effect-${profileEffects[index % 3]}"><img src="/pro-features/avatars/${profileIcons[index]}.svg" alt="${label} profile icon" width="48" height="48" loading="lazy"><span class="pro-avatar-effect" aria-hidden="true"><i></i><i></i><i></i><i></i></span></span>`;
}
const leaderboard = document.querySelector('.glass-leaderboard');
leaderboard.querySelector('.dash-layout').classList.add('glass-demo');
leaderboard.querySelector('.dash-brand small').textContent = '207.8 hrs';
leaderboard.querySelector('.dash-days').innerHTML = `${icon('hour')}14 Days`;
const names = ['Iamparca', 'Girish', 'FIGHTMODE', 'chaiBiscuit', 'sarah.k', 'Rishav', 'notagain'];
leaderboard.querySelectorAll('.leaderboard-podium-name').forEach((el, index) => {
  const crown = el.querySelector('.leaderboard-crown')?.outerHTML || '';
  el.innerHTML = `${profileAvatar(index)}<span>${crown}${names[index]}</span>`;
});
leaderboard.querySelector('.leaderboard-table thead th').textContent = 'Icon';
leaderboard.querySelectorAll('.leaderboard-table tbody tr').forEach((row, index) => {
  row.querySelector('.leaderboard-rank').innerHTML = profileAvatar(index + 3);
  row.querySelector('th').textContent = `@${names[index + 3]}`;
});
leaderboard.querySelector('.dash-account > svg').outerHTML = profileAvatar(0);

const blocks = document.querySelector('.glass-blocks');
blocks.querySelector('.dash-layout').classList.add('glass-demo');
blocks.querySelector('.dash-brand small').textContent = '207.8 hrs';
blocks.querySelector('.dash-days').innerHTML = `${icon('hour')}14 Days`;
blocks.querySelector('.dash-account > svg').outerHTML = profileAvatar(0);
blocks.querySelector('.block-demo-lock-arrow').remove();
blocks.querySelector('.block-demo-tour').remove();
blocks.querySelector('.block-demo-intro p').textContent = 'Choose the websites and applications this profile will block when you start a focus block.';
blocks.querySelector('.block-demo-items li span').textContent = 'example.com';
blocks.querySelector('.block-demo-items li:last-child').remove();
blocks.querySelector('.block-demo-intro').insertAdjacentHTML('beforeend', `
 <div class="glass-profile-picker" aria-label="Sample block profile menu">
  <div class="glass-profile-current">Default <span>▾</span></div>
  <div class="glass-profile-menu"><div><span>✓</span> Default</div><div><span></span> Social <span class="glass-profile-edit" aria-hidden="true">✎</span></div>
   <div class="glass-profile-new" aria-label="Create a new block profile"><span aria-hidden="true">+</span><svg class="glass-profile-arrow" viewBox="0 0 54 50" aria-hidden="true"><path d="M52 25 28 2v12H2v22h26v12Z"/></svg></div>
  </div>
 </div>`);

const scheduledBackground = document.querySelector('.glass-scheduled-background');
scheduledBackground.querySelector('.dash-layout').classList.add('glass-demo');
scheduledBackground.querySelector('.dash-brand small').textContent = '207.8 hrs';
scheduledBackground.querySelector('.dash-days').innerHTML = `${icon('hour')}14 Days`;
scheduledBackground.querySelector('.block-demo-lock-arrow').remove();
scheduledBackground.querySelector('.block-demo-tour').remove();
scheduledBackground.querySelector('.dash-account > svg').outerHTML = profileAvatar(0);
document.querySelectorAll('.glass-scheduled-trash').forEach(el => {
  el.innerHTML = blocks.querySelector('.block-demo-trash').innerHTML;
});

const sampleTracks = ['Midnight Study Club', 'Sunlight on the Desk', 'Slow Sunday Sketches', 'Letters from the Moon'];
const musicNote = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 17V5l11-2v12M9 8l11-2"/><ellipse cx="6" cy="18" rx="3" ry="2.5"/><ellipse cx="17" cy="16" rx="3" ry="2.5"/></svg>';
document.querySelector('.glass-music-tracks').innerHTML = sampleTracks.map((name, index) => `
 <div class="glass-music-track${index === 0 ? ' is-playing' : ''}">${musicNote}<span>${name}${index === 0 ? '<small>Now playing</small>' : ''}</span><span class="glass-music-track-action" aria-hidden="true">${index === 0 ? 'Ⅱ' : icon('play')}</span><span class="glass-music-track-action" aria-hidden="true">${blocks.querySelector('.block-demo-trash').innerHTML}</span></div>`).join('');
document.querySelector('.glass-music-stage fokasu-glass-dashboard').showView('activity');

const offline = document.querySelector('.glass-offline-dashboard');
offline.querySelector('.dash-brand small').remove();
offline.querySelector('.dash-account').remove();
offline.querySelector('.dash-edge-tab').remove();
offline.querySelectorAll('.dash-nav-item svg').forEach(el => el.remove());
offline.querySelector('.dash-nav-item.selected').classList.remove('selected');
offline.querySelector('.dash-nav-item:last-child').insertAdjacentHTML('afterend', '<div class="dash-nav-item">Settings</div>');
offline.querySelector('fokasu-demo-header').outerHTML = `<div class="glass-offline-header"><h3>Dashboard</h3><span class="glass-offline-badge">Offline</span><div class="glass-offline-tools" aria-hidden="true">${musicNote}<span>↻</span><span>+</span></div></div>`;
offline.querySelector('.dash-time').textContent = '59:55';
offline.querySelector('.dash-session').textContent = 'Study Session';
offline.querySelector('.primary-control').innerHTML = 'Ⅱ';
offline.querySelector('.dash-controls .dash-control:last-child').remove();
offline.querySelector('.glass-next-heading').remove();
offline.querySelector('.glass-activity-view').remove();
offline.querySelector('.dash-tasks').innerHTML = `<h2>Your Todos</h2>
 <div class="dash-task active"><span class="task-play">Ⅱ</span><div class="task-description"><h3>Study Session</h3><p><span class="task-status">In progress</span><span class="task-meta">Due Nov 17 <i>|</i> 60 min</span></p></div><div class="task-progress"><span></span></div><span class="task-menu">${icon('more')}</span></div>
 <div class="dash-task glass-offline-completed"><span class="task-play">${icon('check')}</span><div class="task-description"><h3>Revision Session</h3><p><span class="task-status">Completed</span><span class="task-meta">30 min <i>|</i> Not synced</span></p></div><span class="task-menu">${icon('more')}</span></div>`;

const glassPreview = document.querySelector('#glass-preview');
const scrollViewport = document.createElement('div');
scrollViewport.className = 'glass-scroll-viewport';
scrollViewport.id = 'glass-scroll-content';
const timerView = glassPreview.querySelector('.glass-timer-view');
const activityView = glassPreview.querySelector('.glass-activity-view');
timerView.before(scrollViewport);
scrollViewport.append(timerView, activityView);
activityView.hidden = false;
activityView.inert = true;
activityView.setAttribute('aria-hidden', 'true');
glassPreview.insertAdjacentHTML('beforeend', '<button class="demo-scroll-toggle glass-scroll-toggle" type="button" aria-controls="glass-scroll-content" aria-label="Scroll Down to study together and activity">Scroll Down <span aria-hidden="true">↓</span></button>');
glassPreview.querySelector('.glass-scroll-toggle').addEventListener('click', event => {
  const lower = glassPreview.classList.toggle('glass-show-activity');
  event.currentTarget.innerHTML = `Scroll ${lower ? 'Up' : 'Down'} <span aria-hidden="true">${lower ? '↑' : '↓'}</span>`;
  event.currentTarget.setAttribute('aria-label', lower ? 'Scroll Up to timer and tasks' : 'Scroll Down to study together and activity');
  timerView.inert = lower;
  activityView.inert = !lower;
  timerView.setAttribute('aria-hidden', String(lower));
  activityView.setAttribute('aria-hidden', String(!lower));
  trackGlassTransition();
});

// Mirror the desktop GlassBackdrop's wallpaper alignment instead of sampling
// live browser backdrops, which can produce seams during repainting.
const glassWallpaper = new Image();
const glassPanels = [...document.querySelectorAll('.glass-demo')].map(root => ({
  root,
  panels: [...root.querySelectorAll('.dash-welcome,.dash-days,.dash-task,.dash-end,.dash-account,.dash-edge-tab,.dash-social-card,.block-demo-tabs > span,.block-demo-input,.block-demo-items li,.block-demo-wildcard-note,.glass-profile-current,.leaderboard-kind,.leaderboard-period,.leaderboard-table tbody tr')],
}));
function alignGlassWallpaper() {
  if (!glassWallpaper.naturalWidth) return;
  for (const {root, panels} of glassPanels) {
    const canvas = root.getBoundingClientRect();
    const scale = Math.max(canvas.width / glassWallpaper.naturalWidth, canvas.height / glassWallpaper.naturalHeight);
    const width = glassWallpaper.naturalWidth * scale;
    const height = glassWallpaper.naturalHeight * scale;
    for (const panel of panels) {
      const bounds = panel.getBoundingClientRect();
      panel.style.setProperty('--glass-wallpaper-size', `${width}px ${height}px`);
      panel.style.setProperty('--glass-wallpaper-position', `${canvas.left + (canvas.width - width) / 2 - bounds.left}px ${canvas.top + (canvas.height - height) / 2 - bounds.top}px`);
      panel.classList.add('glass-wallpaper-panel');
    }
  }
}
let glassTransitionFrame;
function trackGlassTransition() {
  cancelAnimationFrame(glassTransitionFrame);
  const until = performance.now() + 650;
  const update = () => {
    alignGlassWallpaper();
    if (performance.now() < until) glassTransitionFrame = requestAnimationFrame(update);
  };
  update();
}
glassWallpaper.onload = () => {
  alignGlassWallpaper();
  const observer = new ResizeObserver(alignGlassWallpaper);
  glassPanels.forEach(({root}) => observer.observe(root));
};
glassWallpaper.src = '/pro-features/tree-background-blurred.jpg';
