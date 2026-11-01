import { dashboardSocial } from '/components/dashboard/dashboard-social.js?v=20261027-10';

// This page places the clan's quests and activity beneath its member overview.
customElements.whenDefined('fokasu-clan').then(() => {
 const clan = document.querySelector('#study-together fokasu-clan');
 const viewport = clan.querySelector('.clan-demo-viewport');
 const track = document.createElement('div');
 track.className = 'dash-content-track';
 const overview = document.createElement('div');
 overview.className = 'study-clan-overview';
 overview.append(...viewport.childNodes);
 track.append(overview);
 track.insertAdjacentHTML('beforeend', dashboardSocial());
 const social = track.querySelector('.dash-social-view');
 social.inert = true;
 viewport.append(track);
 viewport.id = 'study-clan-activity';
 const button = document.createElement('button');
 button.className = 'study-clan-scroll demo-scroll-toggle';
 button.type = 'button';
 button.setAttribute('aria-controls', viewport.id);
 button.innerHTML = 'Scroll Down <span aria-hidden="true">↓</span>';
 button.setAttribute('aria-label', 'Scroll Down to clan quests and activity');
 button.addEventListener('click', () => {
  const lower = clan.classList.toggle('dash-show-social');
  overview.inert = lower;
  social.inert = !lower;
  button.innerHTML = `Scroll ${lower ? 'Up' : 'Down'} <span aria-hidden="true">${lower ? '↑' : '↓'}</span>`;
  button.setAttribute('aria-label', lower ? 'Scroll Up to clan profile and members' : 'Scroll Down to clan quests and activity');
 });
 clan.append(button);
});
