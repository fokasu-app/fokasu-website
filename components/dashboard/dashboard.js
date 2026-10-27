import { icon } from './desktop-icons.js';
import { progressModeControl, progressModeDemo } from './dashboard-progress.js?v=20261027-4';
import { dashboardSocial } from './dashboard-social.js?v=20261027-10';

let dashboardCount = 0;

// Shared shell components: use these on other website demo screens with dashboard.css.
class FokasuDemoSidebar extends HTMLElement {
 connectedCallback() {
  const selected = this.getAttribute('selected') || 'Dashboard';
  this.innerHTML = `<aside class="dash-sidebar" aria-label="Desktop app preview sidebar"><div class="dash-brand"><i></i><strong>Fokasu</strong><small>33.4 hrs</small></div><nav aria-label="Sample app navigation">${[['grid','Dashboard'],['plus','Create'],['check','Todos'],['habit','Habits'],['shield','Clan'],['user','Friends'],['stats','Stats'],['leaderboard','Leaderboard'],['chat','Community'],['block','Block']].map(([glyph,label]) => `<div class="dash-nav-item ${label === selected ? 'selected' : ''}" ${label === selected ? 'aria-current="page"' : ''}>${icon(glyph)}<span>${label}</span></div>`).join('')}</nav><div class="dash-sidebar-bottom"><div class="dash-account">${icon('account')}<span class="dash-streak">${icon('flame')}<b>1</b></span>${icon('settings')}</div></div></aside>`;
 }
}
class FokasuDemoHeader extends HTMLElement {
 connectedCallback() {
  this.innerHTML = `<header class="dash-header"><div class="dash-welcome">${icon('search')}<span>Welcome, @joi_boi</span></div><span class="dash-days">${icon('hour')}716 Days</span><span class="dash-lock">${icon('lock')}</span><span class="dash-bell">${icon('bell')}</span></header>`;
 }
}
class FokasuDashboard extends HTMLElement {
 connectedCallback() {
  this.setProgressFrame(false);
  this.classList.remove('dash-show-social', 'dash-mode-active');
  this.progressMode = false;
  const id = `dashboard-preview-${++dashboardCount}`;
  this.remaining = 59 * 60 + 28;
  this.deadline = Date.now() + this.remaining * 1000;
  this.innerHTML = `<div class="dash-layout"><fokasu-demo-sidebar aria-hidden="true"></fokasu-demo-sidebar><div class="dash-main dash-dashboard-main"><fokasu-demo-header aria-hidden="true"></fokasu-demo-header><div class="dash-content-viewport" id="${id}"><div class="dash-content-track"><div class="dash-overview" role="group" aria-label="A study session timer and two sample tasks."><div class="dash-timer-area"><div class="dash-dial"><svg class="dash-ring" viewBox="0 0 240 240" aria-hidden="true"><circle class="ring-track" cx="120" cy="120" r="113"/><circle class="ring-progress" cx="120" cy="120" r="113" pathLength="100"/></svg><div class="dash-time-content"><span class="dash-time">59:28</span><span class="dash-session">Study Session</span></div></div><div class="dash-controls"><span class="dash-control">${icon('minus')}</span><span class="dash-control primary-control">${icon('pause')}</span>${progressModeControl(id)}<span class="dash-control">${icon('bolt')}</span></div></div><section class="dash-tasks" aria-label="Today's Tasks"><h2>Today's Tasks</h2>${['Revision Session','Study Session'].map((name,i) => `<div class="dash-task" data-task="${i}"><span class="task-play">${icon('play')}</span><div class="task-description"><h3>${name}</h3><p><span class="task-status"></span><span class="task-meta">Expires in 6 hours <i>|</i> 1 hour</span></p></div><div class="task-progress" aria-hidden="true"><span></span></div><span class="task-menu">${icon('more')}</span></div>`).join('')}<div class="dash-end">That's everything for today</div></section></div>${dashboardSocial()}</div></div><span class="dash-edge-tab" aria-hidden="true">‹</span></div></div>${progressModeDemo(id)}<button class="dash-scroll-toggle demo-scroll-toggle" type="button" aria-controls="${id}" aria-label="Scroll Down to study together and activity">Scroll Down <span aria-hidden="true">↓</span></button>`;
  this.setAttribute('role', 'group');
  this.setAttribute('aria-label', 'Fokasu desktop app preview');
  this.querySelector('.dash-progress-mode-control').addEventListener('click', () => this.setProgressMode(true));
  this.querySelector('.dash-floating-progress').addEventListener('click', () => this.setProgressMode(false));
  this.querySelector('.dash-progress-demo').addEventListener('keydown', event => {
   if (event.key === 'Escape' && this.progressMode) {
    event.preventDefault();
    this.setProgressMode(false);
   }
  });
  this.querySelector('.dash-social-view').inert = true;
  this.querySelector('.dash-scroll-toggle').addEventListener('click', () => {
   const lower = this.classList.toggle('dash-show-social');
   const button = this.querySelector('.dash-scroll-toggle');
   button.innerHTML = `Scroll ${lower ? 'Up' : 'Down'} <span aria-hidden="true">${lower ? '↑' : '↓'}</span>`;
   button.setAttribute('aria-label', lower ? 'Scroll Up to timer and tasks' : 'Scroll Down to study together and activity');
   this.querySelector('.dash-overview').inert = lower;
   this.querySelector('.dash-social-view').inert = !lower;
  });
  this.render();
  // Decorative animation only. Reduced-motion users see a still preview.
  this.motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  this.updateAnimation = () => {
   clearInterval(this.interval);
   this.deadline = Date.now() + this.remaining * 1000;
   this.renderProgressMode();
   if (!this.motion.matches) this.interval = setInterval(() => {
    this.remaining = Math.max(0, Math.ceil((this.deadline - Date.now()) / 1000));
    this.render();
    if (!this.remaining) clearInterval(this.interval);
   }, 1000);
  };
  this.motion.addEventListener('change', this.updateAnimation);
  this.updateAnimation();
 }
 setProgressMode(active) {
  this.progressMode = active;
  this.setProgressFrame(active);
  this.classList.toggle('dash-mode-active', active);
  this.querySelector('.dash-layout').inert = active;
  this.querySelector('.dash-scroll-toggle').inert = active;
  this.querySelector('.dash-progress-demo').hidden = !active;
  if (active) {
   this.modeStarted = Date.now();
   this.modeProgress = .18;
   this.renderProgressMode();
   this.querySelector('.dash-floating-progress').focus({ preventScroll: true });
  } else {
   this.querySelector('.dash-progress-mode-control').focus({ preventScroll: true });
  }
 }
 setProgressFrame(active) {
  if (active && !this.progressFrame) {
   const frame = this.closest('.app-window');
   const title = frame?.querySelector(':scope > .window-bar .window-title');
   if (title) {
    this.progressFrame = { frame, title, originalTitle: title.innerHTML };
    frame.classList.add('dash-progress-window');
    title.textContent = 'New Tab — Google Chrome';
   }
  } else if (!active && this.progressFrame) {
   const { frame, title, originalTitle } = this.progressFrame;
   frame.classList.remove('dash-progress-window');
   title.innerHTML = originalTitle;
   this.progressFrame = null;
  }
 }
 renderProgressMode() {
  if (!this.progressMode) return;
  if (!this.motion?.matches) {
   // Accelerated preview: grow gradually from 18% to 90% over a minute.
   this.modeProgress = .18 + Math.min(1, Math.max(0, Date.now() - this.modeStarted) / 60000) * .72;
  }
  this.querySelector('.dash-floating-progress-fill').style.setProperty('--mode-progress', this.modeProgress);
 }
 render() {
  this.renderProgressMode();
  this.querySelector('.dash-time').textContent = `${String(Math.floor(this.remaining / 60)).padStart(2,'0')}:${String(this.remaining % 60).padStart(2,'0')}`;
  this.querySelector('.ring-progress').style.strokeDasharray = `${Math.max(1,(3600-this.remaining)/36)} 100`;
  this.querySelectorAll('.dash-task').forEach((row,i) => {
   row.classList.toggle('active', i === 1);
   row.querySelector('.task-status').textContent = i === 0 ? 'Not Started' : this.remaining ? 'In progress' : 'Completed';
   row.querySelector('.task-progress span').style.width = i === 1 ? `${(3600-this.remaining)/36}%` : '0%';
  });
 }
 disconnectedCallback() {
  this.setProgressFrame(false);
  clearInterval(this.interval);
  this.motion?.removeEventListener('change', this.updateAnimation);
 }
}
customElements.define('fokasu-demo-sidebar',FokasuDemoSidebar);
customElements.define('fokasu-demo-header',FokasuDemoHeader);
customElements.define('fokasu-dashboard',FokasuDashboard);
