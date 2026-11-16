import './dashboard.js?v=20261027-social-14';
import { icon } from './desktop-icons.js';

const crest = new URL('./clan-assets/clan-logo-crown.svg', import.meta.url).href;

class FokasuUserSummary extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="user-summary-backdrop" aria-hidden="true" inert>
        <div class="dash-layout"><fokasu-demo-sidebar selected="Stats"></fokasu-demo-sidebar><div class="dash-main"><fokasu-demo-header></fokasu-demo-header></div></div>
      </div>
      <section class="user-summary-dialog" aria-label="Sample user summary for joi_boi">
        <header class="user-summary-heading"><span class="user-summary-avatar" aria-hidden="true">J</span><strong>joi_boi</strong><span class="user-summary-streak">${icon('flame')}<span>3</span></span><span class="user-summary-close" aria-hidden="true">×</span></header>
        <div class="user-summary-grid">
          <div class="user-summary-left">
            <div class="user-summary-clan"><div class="user-summary-crest"><img src="${crest}" width="64" height="64" alt="Crown clan crest"><span>17</span></div><div><h3>STUDYTOGETHER</h3><p>Clan Contribution: <strong>196h 47m</strong></p></div></div>
            <div class="user-summary-chart-shell">
              <svg class="user-summary-chart" viewBox="0 0 430 144" role="img" aria-label="Completed study time: three weeks ago, 1 hour; two weeks ago, 4 hours 3 minutes; last week, 25 hours">
                <defs><linearGradient id="user-summary-area" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#a5bed8" stop-opacity=".18"/><stop offset="1" stop-color="#a5bed8" stop-opacity=".01"/></linearGradient></defs>
                <path class="user-summary-axis" d="M45 108H385"/>
                <path fill="url(#user-summary-area)" d="M45 105 215 97 385 42V108H45Z"/>
                <path class="user-summary-line" d="M45 105 215 97 385 42"/>
                <g class="user-summary-points"><circle cx="45" cy="105" r="3"/><circle cx="215" cy="97" r="3"/><circle cx="385" cy="42" r="3"/></g>
                <g class="user-summary-values"><text x="45" y="91">1h 00m</text><text x="215" y="83">4h 03m</text><text x="385" y="28">25h 00m</text></g>
                <g class="user-summary-labels"><text x="45" y="126">3 weeks ago</text><text x="215" y="126">2 weeks ago</text><text x="385" y="126">Last week</text></g>
              </svg>
            </div>
          </div>
          <div class="user-summary-records">
            <div><span class="user-summary-record-icon" aria-hidden="true">◷</span><dl><dt>Total Hours</dt><dd>223h 02m</dd></dl></div>
            <div><span class="user-summary-record-icon" aria-hidden="true">▦</span><dl><dt>Best Week</dt><dd>44h 38m</dd></dl></div>
            <div><span class="user-summary-record-icon" aria-hidden="true">☼</span><dl><dt>Best Day</dt><dd>11h 00m</dd></dl></div>
            <div><span class="user-summary-record-icon" aria-hidden="true">✓</span><dl><dt>Last todo</dt><dd class="user-summary-date">15 Nov 2026</dd></dl></div>
          </div>
        </div>
      </section>`;
  }
}

if (!customElements.get('fokasu-user-summary')) customElements.define('fokasu-user-summary', FokasuUserSummary);
