import './dashboard.js?v=20261027-social-14';
import { icon } from './desktop-icons.js';

// Illustrative community posts for the website preview.
const posts = [
  { name: 'joi_boi', initial: 'J', date: 'Nov 16, 2026 · 9:30 AM', text: 'Finished my Physics revision and kept my study streak going. What are you working on today?', comments: 3 },
  { name: 'admin_fokasu', initial: 'A', date: 'Nov 15, 2026 · 12:58 PM', text: 'Have an idea for Fokasu? Share your feature requests here. Found a bug? Tell us what happened so we can help.', comments: 5 },
  { name: 'sleepyhead', initial: 'S', date: 'Nov 15, 2026 · 4:15 PM', text: 'Our clan reached its weekly goal! A little encouragement from everyone made it easier to show up each day.', comments: 2 },
];

class FokasuCommunity extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="dash-layout community-demo-layout">
      <fokasu-demo-sidebar selected="Community" aria-hidden="true"></fokasu-demo-sidebar>
      <div class="dash-main community-demo-main"><fokasu-demo-header aria-hidden="true"></fokasu-demo-header>
        <section class="community-demo-content" aria-label="Sample community feed">
          <header class="community-demo-heading"><strong>Community</strong></header>
          <div class="community-demo-composer" aria-hidden="true"><span>›</span> Create a post</div>
          <div class="community-demo-feed">${posts.map(post => `<article class="community-demo-post">
            <header><span class="community-demo-avatar" aria-hidden="true">${post.initial}</span><span class="community-demo-author">@${post.name}</span><time>${post.date}</time><span class="community-demo-menu" aria-hidden="true">⋮</span></header>
            <p>${post.text}</p>
            <div class="community-demo-comments"><span class="community-demo-count">${icon('chat')}<span>${post.comments}</span><span class="community-demo-sr">sample comments</span></span><span class="community-demo-comment-input" aria-hidden="true">Add a comment…</span></div>
          </article>`).join('')}</div>
        </section>
      </div>
    </div>`;
  }
}

if (!customElements.get('fokasu-community')) customElements.define('fokasu-community', FokasuCommunity);
