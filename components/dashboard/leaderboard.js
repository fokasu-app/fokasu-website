import './dashboard.js?v=20261027-social-14';

// Illustrative daily rankings, ordered by completed focus time.
const rankings = [
 { name: 'Iamparca', minutes: 981, completed: 18 },
 { name: 'Girish', minutes: 960, completed: 16 },
 { name: 'FIGHTMODE', minutes: 613, completed: 13 },
 { name: 'chaiBiscuit', minutes: 245, completed: 11 },
 { name: 'sarah.k', minutes: 218, completed: 10 },
 { name: 'Rishav', minutes: 196, completed: 9 },
 { name: 'notagain', minutes: 172, completed: 8 },
];
const focusedTime = minutes => `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
const crown = '<svg class="leaderboard-crown" viewBox="0 0 24 24" aria-hidden="true"><path d="m3 6 5 4 4-7 4 7 5-4-3 12H6zM6 21h12"/></svg>';
const chevron = direction => `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="${direction === 'left' ? 'm10 3-5 5 5 5' : 'm6 3 5 5-5 5'}"/></svg>`;

class FokasuLeaderboard extends HTMLElement {
 connectedCallback() {
  this.stopPodiumReveal?.();
  this.innerHTML = `<div class="dash-layout leaderboard-layout">
   <fokasu-demo-sidebar selected="Leaderboard" aria-hidden="true"></fokasu-demo-sidebar>
   <div class="dash-main leaderboard-main">
    <fokasu-demo-header aria-hidden="true"></fokasu-demo-header>
    <div class="leaderboard-viewport" role="region" aria-label="Leaderboard rankings"><div class="leaderboard-content">
    <div class="leaderboard-heading"><h3>Leaderboard</h3><span class="leaderboard-kind" aria-label="Users leaderboard"><span class="is-selected">Users</span><span>Clans</span></span><span class="leaderboard-period">Daily <svg viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 6 5-6z"/></svg></span></div>
    <div class="leaderboard-meta"><span>Top 7</span><span class="leaderboard-date">${chevron('left')}<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 4.5h10V13H3zM5 2.5V6m6-3.5V6M3 7h10"/></svg><span>Oct 24, 2026</span>${chevron('right')}</span></div>
    <ol class="leaderboard-podium" aria-label="Top three users">
     ${rankings.slice(0, 3).map((person, index) => `<li class="leaderboard-place leaderboard-place-${index + 1}"><div class="leaderboard-podium-info"><span class="leaderboard-podium-name">${index === 0 ? crown : ''}${person.name}</span><span class="leaderboard-podium-time">${focusedTime(person.minutes)} focused</span></div><div class="leaderboard-step"><span>${index + 1}</span></div></li>`).join('')}
    </ol>
    <table class="leaderboard-table" aria-label="Daily leaderboard ranks 4 through 7">
     <thead><tr><th scope="col">Rank</th><th scope="col">User</th><th scope="col">Focused</th><th scope="col">Completed</th></tr></thead>
     <tbody>${rankings.slice(3).map((person, index) => `<tr><td class="leaderboard-rank">#${index + 4}</td><th scope="row">@${person.name}</th><td>${focusedTime(person.minutes)}</td><td>${person.completed}</td></tr>`).join('')}</tbody>
    </table>
    </div></div>
   </div>
   <span class="dash-edge-tab" aria-hidden="true">‹</span>
  </div>`;
  this.preparePodiumReveal();
 }

 preparePodiumReveal() {
  const podium = this.querySelector('.leaderboard-podium');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (this.podiumHasPlayed || motion.matches || !window.IntersectionObserver) {
   this.podiumHasPlayed = true;
   return;
  }

  const lastName = podium.querySelector('.leaderboard-place-3 .leaderboard-podium-info');
  podium.classList.add('leaderboard-podium-pending');
  const finish = () => {
   this.podiumObserver?.disconnect();
   this.podiumObserver = null;
   podium.classList.remove('leaderboard-podium-pending', 'leaderboard-podium-revealing');
   podium.removeEventListener('animationend', onEnd);
   motion.removeEventListener('change', onMotionChange);
   this.stopPodiumReveal = null;
  };
  const onEnd = event => {
   if (event.animationName === 'leaderboard-name-drop' && event.target === lastName) finish();
  };
  const onMotionChange = event => {
   if (event.matches) {
    this.podiumHasPlayed = true;
    finish();
   }
  };
  this.stopPodiumReveal = finish;
  podium.addEventListener('animationend', onEnd);
  motion.addEventListener('change', onMotionChange);
  this.podiumObserver = new window.IntersectionObserver(entries => {
   if (this.podiumHasPlayed || !entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= .35)) return;
   this.podiumHasPlayed = true;
   podium.classList.remove('leaderboard-podium-pending');
   podium.classList.add('leaderboard-podium-revealing');
   this.podiumObserver.disconnect();
   this.podiumObserver = null;
  }, { threshold: .35 });
  this.podiumObserver.observe(podium);
 }

 disconnectedCallback() {
  this.stopPodiumReveal?.();
 }
}

customElements.define('fokasu-leaderboard', FokasuLeaderboard);
