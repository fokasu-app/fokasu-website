import './dashboard.js?v=20261027-social-14';
import { icon } from './desktop-icons.js';

const members = [
 { name: 'joi_boi', role: 'admin', minutes: 180 },
 { name: 'sleepyhead', role: 'veteran', minutes: 150 },
 { name: 'priyanshu', role: 'newbie', minutes: 120 },
 { name: 'chaiBiscuit', role: 'newbie', minutes: 90 },
 { name: 'sarah.k', role: 'newbie', minutes: 80 },
 { name: 'Rishav', role: 'newbie', minutes: 70 },
 { name: 'notagain', role: 'newbie', minutes: 60 },
 { name: 'zoya_21', role: 'newbie', minutes: 45 },
 { name: 'haruto', role: 'newbie', minutes: 30 },
 { name: 'bluehour', role: 'newbie', minutes: 15 },
];
const time = minutes => minutes < 60 ? `${minutes}m` : `${Math.floor(minutes / 60)}h${minutes % 60 ? ` ${minutes % 60}m` : ''}`;
const asset = name => new URL(`./clan-assets/${name}`, import.meta.url).href;
const copyIcon = '<svg viewBox="0 0 18 18" aria-hidden="true"><path d="M6 5V3q0-1 1-1h8q1 0 1 1v8q0 1-1 1h-2M4 6h8q1 0 1 1v8q0 1-1 1H4q-1 0-1-1V7q0-1 1-1z"/></svg>';
const announcementIcon = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m3 8 10-4v12L3 12zM3 8v4m3 1 1 4h3l-1-3m7-7 2-2m-2 6h3"/></svg>';

let clanDemoId = 0;

class FokasuClan extends HTMLElement {
 connectedCallback() {
  const chatId = `clan-chat-${++clanDemoId}`;
  const totalMinutes = members.reduce((total, member) => total + member.minutes, 0);
  const details = [['Total hours', `${totalMinutes / 60}h`], ['Week average', time(Math.round(totalMinutes / 7))], ["Today's hours", '1h 40m'], ['Admission', 'Request to join'], ['Category', 'General study'], ['Location', 'International'], ['Language', 'English']];
  this.innerHTML = `<div class="dash-layout clan-demo-layout">
   <fokasu-demo-sidebar selected="Clan" aria-hidden="true"></fokasu-demo-sidebar>
   <div class="dash-main clan-demo-main">
    <fokasu-demo-header aria-hidden="true"></fokasu-demo-header>
    <div class="clan-demo-viewport" role="region" aria-label="Clan profile and members">
     <section class="clan-demo-profile" aria-label="Focus Together clan profile">
      <div class="clan-demo-art" aria-hidden="true"><div class="clan-demo-crest"><img src="${asset('default-clan-logo.svg')}" width="112" height="112" alt=""><span class="clan-demo-level">2</span></div><img class="clan-demo-quest" src="${asset('clan-quest-icon.svg')}" width="72" height="72" alt=""></div>
      <h3>FOCUS TOGETHER</h3>
      <div class="clan-demo-toolbar" aria-hidden="true"><span class="clan-demo-code">#FOC8TEAM ${copyIcon}</span>${announcementIcon}${icon('settings')}</div>
      <p class="clan-demo-description">A little focus, a little encouragement. Study with friends, share your progress, and keep each other going.</p>
      <dl class="clan-demo-details">${details.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl>
     </section>
     <div class="clan-demo-member-actions"><span class="clan-demo-action">Invite</span><span>Members ${members.length}/10</span><span class="clan-demo-action">Leave</span></div>
     <table class="clan-demo-members" aria-label="Top four clan members by focused time this week">
      <thead><tr><th scope="col">Rank</th><th scope="col">Member</th><th scope="col">This week</th><th scope="col"><span class="clan-demo-sr-only">Actions</span></th></tr></thead>
      <tbody>${members.slice(0, 4).map((member, index) => `<tr><td class="clan-demo-rank">#${index + 1}</td><th scope="row"><span>${member.name}</span><span class="clan-demo-role">${member.role}</span></th><td>${time(member.minutes)}</td><td class="clan-demo-menu">${index ? icon('more') : ''}</td></tr>`).join('')}</tbody>
     </table>
    </div>
   </div>
   <button class="dash-edge-tab clan-chat-toggle" type="button" aria-label="Open clan chat" aria-expanded="false" aria-controls="${chatId}">‹</button>
   <svg class="clan-chat-arrow" viewBox="-2 -2 50 54" fill="currentColor" stroke="#133b31" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><polygon points="46,25 20,0 20,12 0,12 0,38 20,38 20,50"/></svg>
   <section class="clan-chat-panel" id="${chatId}" aria-label="Focus Together clan chat" hidden>
    <header class="clan-chat-heading"><img src="${asset('default-clan-logo.svg')}" width="32" height="32" alt=""><h3>FOCUS TOGETHER</h3></header>
    <div class="clan-chat-messages" role="log" aria-label="Clan messages" aria-live="polite">
     <article class="clan-chat-message"><div><strong>@sleepyhead</strong><span>veteran</span><time>12m ago</time></div><p>Finally finished that chapter. Taking a quick break before the next one!</p></article>
     <article class="clan-chat-message"><div><strong>@priyanshu</strong><span>newbie</span><time>9m ago</time></div><p>Nice! Anyone up for another hour of focus?</p></article>
     <article class="clan-chat-message"><div><strong>@joi_boi</strong><span>admin</span><time>5m ago</time></div><p>I'm in. One task at a time — we've got this.</p></article>
     <article class="clan-chat-message"><div><strong>@chaiBiscuit</strong><span>newbie</span><time>2m ago</time></div><p>Tea ready, distractions off. Let's go ☕</p></article>
    </div>
    <form class="clan-chat-compose"><label class="clan-demo-sr-only" for="${chatId}-message">Message your clan</label><textarea id="${chatId}-message" rows="2" maxlength="500" placeholder="Message your clan..."></textarea><button type="submit">Send</button></form>
   </section>
  </div>`;
  const toggle = this.querySelector('.clan-chat-toggle');
  const panel = this.querySelector('.clan-chat-panel');
  const input = this.querySelector('.clan-chat-compose textarea');
  const setChatOpen = open => {
   this.classList.toggle('clan-chat-open', open);
   panel.hidden = !open;
   toggle.setAttribute('aria-expanded', String(open));
   toggle.setAttribute('aria-label', open ? 'Close clan chat' : 'Open clan chat');
   toggle.textContent = open ? '›' : '‹';
   if (open) input.focus({ preventScroll: true });
   else toggle.focus({ preventScroll: true });
  };
  toggle.addEventListener('click', () => setChatOpen(panel.hidden));
  panel.addEventListener('keydown', event => {
   if (event.key === 'Escape') {
    event.preventDefault();
    setChatOpen(false);
   }
  });
  this.querySelector('.clan-chat-compose').addEventListener('submit', event => {
   event.preventDefault();
   const message = input.value.trim();
   if (!message) return;
   const entry = document.createElement('article');
   entry.className = 'clan-chat-message';
   entry.innerHTML = '<div><strong>@joi_boi</strong><span>admin</span><time>Just now</time></div><p></p>';
   entry.querySelector('p').textContent = message;
   const messages = this.querySelector('.clan-chat-messages');
   messages.append(entry);
   messages.scrollTop = messages.scrollHeight;
   input.value = '';
   input.focus({ preventScroll: true });
  });
 }
}

customElements.define('fokasu-clan', FokasuClan);
