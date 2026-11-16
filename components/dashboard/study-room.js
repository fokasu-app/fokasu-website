import './dashboard.js?v=20261027-social-14';
import { dashboardSocial } from './dashboard-social.js?v=20261116-goal-label-11';
import { icon } from './desktop-icons.js';

// A still frame from the desktop app’s study_room_bg.gif.
const roomFrame = new URL('./study-room-frame.webp', import.meta.url).href;
const roomScene = `<img class="study-room-scene" src="${roomFrame}" alt="" width="540" height="292">`;

class FokasuStudyRoom extends HTMLElement {
  connectedCallback() {
    const content = document.createElement('div');
    content.innerHTML = dashboardSocial();
    content.querySelector('.dash-activity').remove();
    content.querySelector('.dash-study-legend').remove();
    content.querySelectorAll('.dash-social-card:not(.dash-room-card)').forEach(card => card.remove());
    content.querySelector('.dash-social-heading h2').textContent = 'Focus Together • Keep It Going';
    const card = content.querySelector('.dash-room-card');
    card.querySelector('h3').textContent = 'Study Session';
    card.querySelector('.dash-social-copy p').innerHTML = `<span class="dash-social-status">Study</span><span>Session 1/2</span><span>1 hr</span><span>${icon('user')}<span class="study-room-count">4 Clanmates</span></span>`;
    card.querySelector('.dash-social-progress i').style.width = '13%';
    card.querySelector('.dash-room-action').outerHTML = '<button class="study-room-membership" type="button" aria-label="Leave sample study room">Leave <span aria-hidden="true">↪</span></button>';
    this.innerHTML = `<div class="dash-layout"><fokasu-demo-sidebar selected="Dashboard" aria-hidden="true"></fokasu-demo-sidebar><div class="dash-main study-room-main"><fokasu-demo-header aria-hidden="true"></fokasu-demo-header><div class="study-room-canvas"><section class="study-room-stage" aria-label="Sample study session with an illustrated desk background">${roomScene}<div class="study-room-shade"></div><div class="study-room-controls"><button type="button" class="study-room-pause" aria-label="Pause sample timer" aria-pressed="false">${icon('pause')}</button><button type="button" class="study-room-exit" aria-label="Leave sample study room">↪</button></div><div class="study-room-participants" aria-label="Study room participants"><span class="study-room-member"><i></i>joi_boi</span><span class="study-room-member"><i></i>sleepyhead</span><span class="study-room-member"><i></i>priyanshu</span><span class="study-room-member"><i></i>chaiBiscuit</span></div><div class="study-room-session"><span class="study-room-phase">Study</span><span>·</span><strong>Session 1/2</strong></div><div class="study-room-remaining"><span>REMAINING</span><strong>52:13</strong></div></section>${content.innerHTML}</div></div></div>`;
    let joined = true;
    let paused = false;
    const pause = this.querySelector('.study-room-pause');
    const phase = this.querySelector('.study-room-phase');
    const member = this.querySelector('.study-room-member');
    const membership = this.querySelector('.study-room-membership');
    const exit = this.querySelector('.study-room-exit');
    const update = () => {
      phase.textContent = joined ? (paused ? 'Paused' : 'Study') : 'Room preview';
      pause.disabled = !joined;
      pause.setAttribute('aria-pressed', String(paused));
      pause.setAttribute('aria-label', paused ? 'Resume sample timer' : 'Pause sample timer');
      pause.innerHTML = icon(paused ? 'play' : 'pause');
      member.hidden = !joined;
      this.querySelector('.study-room-count').textContent = joined ? '4 Clanmates' : '3 Clanmates';
      membership.innerHTML = `${joined ? 'Leave' : 'Join'} <span aria-hidden="true">↪</span>`;
      for (const button of [membership, exit]) button.setAttribute('aria-label', `${joined ? 'Leave' : 'Join'} sample study room`);
      this.querySelector('.dash-social-status').textContent = joined ? (paused ? 'Paused' : 'Study') : 'Study';
    };
    pause.addEventListener('click', () => { paused = !paused; update(); });
    for (const button of [membership, exit]) button.addEventListener('click', () => { joined = !joined; paused = false; update(); });
    // Only animate the sample timer while its preview is on screen.
    let visible = false;
    let remaining = 52 * 60 + 13;
    this.observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; });
    this.observer.observe(this);
    this.timer = setInterval(() => {
      if (!visible || document.hidden || !joined || paused || remaining === 0) return;
      remaining--;
      this.querySelector('.study-room-remaining strong').textContent = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`;
    }, 1000);
  }
  disconnectedCallback() { clearInterval(this.timer); this.observer?.disconnect(); }
}
customElements.define('fokasu-study-room', FokasuStudyRoom);
