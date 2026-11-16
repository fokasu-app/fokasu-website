import './blocks.js?v=20261027-9';
import { icon } from './desktop-icons.js';

class FokasuDDay extends HTMLElement {
  connectedCallback() {
    const days = Array.from({ length: 42 }, (_, index) => {
      const date = index - 1;
      return { value: date < 1 ? date + 30 : date > 31 ? date - 31 : date, muted: date < 1 || date > 31, selected: date === 1 };
    });
    this.innerHTML = `<fokasu-blocks data-all-sites></fokasu-blocks>
      <section class="dday-demo-panel" aria-label="Sample D-Day calendar with December 1, 2026 selected">
        <header><h3>D-Day</h3><span class="dday-demo-save" aria-hidden="true">Save</span></header>
        <p>Choose a date within the next 3 years.</p>
        <div class="dday-demo-calendar-shell">
          <div class="dday-demo-month" aria-hidden="true"><span>‹</span><span>December</span><span>›</span><span class="dday-demo-year">‹</span><span>2026</span><span>›</span></div>
          <table class="dday-demo-calendar"><caption>December 2026</caption><thead><tr>${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => `<th scope="col">${day}</th>`).join('')}</tr></thead><tbody>${Array.from({ length: 6 }, (_, week) => `<tr>${days.slice(week * 7, week * 7 + 7).map(day => `<td class="${day.muted ? 'dday-demo-muted' : ''} ${day.selected ? 'dday-demo-selected' : ''}" ${day.selected ? 'aria-label="December 1, selected"' : ''}>${day.value}</td>`).join('')}</tr>`).join('')}</tbody></table>
        </div>
      </section>`;
    this.querySelector('.dash-days').innerHTML = `${icon('hour')}15 Days`;
  }
}

if (!customElements.get('fokasu-dday')) customElements.define('fokasu-dday', FokasuDDay);
