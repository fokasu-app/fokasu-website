import './dashboard.js?v=20261027-social-14';
import { icon } from './desktop-icons.js';

const friends = [
  { name: 'joi_boi', initials: 'J', streak: 7, today: '1h 30m', progress: 64, minutes: [90, 120, 75, 150, 105, 60, 90] },
  { name: 'sleepyhead', initials: 'S', streak: 5, today: '45m', progress: 38, minutes: [60, 90, 45, 120, 75, 30, 45] },
  { name: 'priyanshu', initials: 'P', streak: 3, today: '1h', progress: null, minutes: [30, 60, 90, 45, 120, 75, 60] },
  { name: 'chaiBiscuit', initials: 'C', streak: 4, today: '30m', progress: 22, minutes: [45, 75, 60, 90, 30, 60, 30] },
].sort((a, b) => Number(b.progress !== null) - Number(a.progress !== null));

function weeklyChart(friend) {
  const days = ['Mon 10', 'Tue 11', 'Wed 12', 'Thu 13', 'Fri 14', 'Sat 15', 'Sun 16'];
  return `<svg class="friends-demo-chart" viewBox="0 0 660 200" role="img" aria-label="${friend.name}’s sample weekly completed minutes">
    <text class="friends-demo-axis-title" transform="translate(14 95) rotate(-90)" text-anchor="middle">Minutes</text>
    ${[0, 60, 120, 180].map(value => {
      const y = 160 - value * .75;
      return `<path class="friends-demo-gridline" d="M55 ${y}H645"/><text x="45" y="${y + 4}" text-anchor="end">${value}</text>`;
    }).join('')}
    ${friend.minutes.map((value, index) => {
      const x = 73 + index * 82;
      return `<rect x="${x}" y="${160 - value * .75}" width="36" height="${value * .75}" rx="4"><title>${days[index]}: ${value} completed minutes</title></rect><text x="${x + 18}" y="184" text-anchor="middle">${days[index]}</text>`;
    }).join('')}
  </svg>`;
}

class FokasuFriends extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="dash-layout friends-demo-layout">
      <fokasu-demo-sidebar selected="Friends" aria-hidden="true"></fokasu-demo-sidebar>
      <div class="dash-main friends-demo-main">
        <fokasu-demo-header aria-hidden="true"></fokasu-demo-header>
        <section class="friends-demo-content" aria-label="Sample friends and shared weekly activity">
          <header class="friends-demo-heading"><div><strong>Friends</strong><p>Your focus circle, at a glance. Click a friend to see stats.</p></div><span>4 FRIENDS</span></header>
          <div class="friends-demo-list">${friends.map((friend, index) => `<details class="friends-demo-card" ${index === 0 ? 'open' : ''}>
            <summary aria-label="Weekly activity for ${friend.name}">
              <span class="friends-demo-avatar" aria-hidden="true">${friend.initials}</span>
              <span class="friends-demo-info"><span class="friends-demo-name">@${friend.name}</span><span class="friends-demo-meta"><span class="friends-demo-streak">${icon('flame')}<span>${friend.streak} days</span></span><span class="friends-demo-today"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><circle cx="8" cy="8" r="6.5"/><path d="M8 4v4l3 2"/></svg> ${friend.today} today</span></span></span>
              <span class="friends-demo-ongoing">Ongoing: ${friend.progress === null ? 'None' : `<span class="friends-demo-track"><span style="width:${friend.progress}%"></span></span><span>${friend.progress}%</span>`}</span>
              <span class="friends-demo-menu" aria-hidden="true">⋮</span>
            </summary>
            <div class="friends-demo-week">${weeklyChart(friend)}</div>
          </details>`).join('')}</div>
        </section>
      </div>
    </div>`;
    // The desktop UI opens one friend's weekly statistics at a time.
    const cards = [...this.querySelectorAll('details')];
    cards.forEach(card => card.addEventListener('toggle', () => {
      if (card.open) cards.forEach(other => { if (other !== card) other.open = false; });
    }));
  }
}

if (!customElements.get('fokasu-friends')) customElements.define('fokasu-friends', FokasuFriends);
