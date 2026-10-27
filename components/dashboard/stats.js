import './dashboard.js?v=20261027-social-14';

// Illustrative data only. All totals and chart geometry derive from these values.
const tags = [
  { name: 'maths', minutes: 135, color: '#20a880' },
  { name: 'science', minutes: 60, color: '#70a5d5' },
  { name: 'gk', minutes: 59, color: '#a58ace' },
  { name: 'chem', minutes: 20, color: '#d8b367' },
  { name: 'physics', minutes: 17, color: '#cc8294' },
  { name: 'No Tag', minutes: 30, color: '#7c8591' },
  { name: 'Others', minutes: 0, color: '#d57c4e' },
];
const week = [185, 60, 60, 120, 90, 260, 170];
const weekDates = ['Aug 31', 'Sep 1', 'Sep 2', 'Sep 3', 'Sep 4', 'Sep 5', 'Sep 6'];
let previewCount = 0;
const chevron = (direction) => `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="${direction === 'left' ? 'M10 3 5 8l5 5' : 'm6 3 5 5-5 5'}"/></svg>`;
const calendar = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 4.5h10V13H3zM5 2.5V6m6-3.5V6M3 7h10"/></svg>';
const clock = '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6"/><path d="M8 4v4l3 2"/></svg>';
const period = (text) => `<span class="stats-date">${chevron('left')}${calendar}<span>${text}</span>${chevron('right')}</span>`;

function donut() {
  const total = tags.reduce((sum, tag) => sum + tag.minutes, 0);
  let offset = 0;
  const segments = tags.filter(tag => tag.minutes).map(tag => {
    const length = tag.minutes / total * 100;
    const segment = `<circle class="stats-donut-segment" cx="126" cy="126" r="113" pathLength="100" stroke="${tag.color}" stroke-dasharray="${length - .55} ${100 - length + .55}" stroke-dashoffset="${-offset}" style="--segment-length:${length - .55};--segment-gap:${100 - length + .55};--segment-duration:${length * 8}ms;--segment-delay:${offset * 8}ms"/>`;
    offset += length;
    return segment;
  }).join('');
  return `<div class="stats-donut" role="img" aria-label="Daily study time: ${Math.floor(total / 60)} hours ${total % 60} minutes. ${tags.map(tag => `${tag.name}: ${tag.minutes} minutes`).join('; ')}."><svg viewBox="0 0 252 252" aria-hidden="true"><circle class="stats-donut-track" cx="126" cy="126" r="113"/>${segments}</svg><span>${Math.floor(total / 60)}hr ${total % 60}min</span></div>`;
}

function trend(id) {
  const points = week.map((minutes, i) => ({ x: 4 + i * 108, y: 345 - minutes / 300 * 325 }));
  // Horizontal tangents at the data points reproduce the desktop's smooth curve.
  let line = `M${points[0].x},${points[0].y}`;
  points.slice(1).forEach((point, i) => {
    const previous = points[i];
    const middle = (previous.x + point.x) / 2;
    line += ` C${middle},${previous.y} ${middle},${point.y} ${point.x},${point.y}`;
  });
  return `<svg class="stats-trend" viewBox="0 0 656 350" role="img" aria-label="Weekly completed minutes, Monday to Sunday: ${week.join(', ')}."><defs><linearGradient id="${id}-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#20a880" stop-opacity=".27"/><stop offset="100%" stop-color="#20a880" stop-opacity="0"/></linearGradient></defs><path class="stats-area" fill="url(#${id}-fill)" d="${line} L652,350 L4,350 Z"/><path class="stats-line" d="${line}"/>${points.map((point, i) => `<circle cx="${point.x}" cy="${point.y}" r="3.4"/><text x="${point.x + (i === 0 ? -4 : i === 6 ? 4 : 0)}" y="${point.y - 14}" text-anchor="${i === 0 ? 'start' : i === 6 ? 'end' : 'middle'}">${week[i]} min</text>`).join('')}</svg>`;
}

class FokasuStats extends HTMLElement {
  connectedCallback() {
    this.stopDonutReveal?.();
    this.classList.remove('stats-show-weekly');
    const id = `stats-preview-${++previewCount}`;
    const total = week.reduce((sum, minutes) => sum + minutes, 0);
    const bestDay = week.indexOf(Math.max(...week));
    const summary = [['Total Hours', `${total / 60} hr`], ['Total Todo', '11'], ['Daily average', `${Math.round(total / week.length)} min`], ['Best day', weekDates[bestDay]], ['Active days', `${week.filter(Boolean).length} of ${week.length}`]];
    this.innerHTML = `<div class="dash-layout stats-layout">
      <fokasu-demo-sidebar selected="Stats" aria-hidden="true"></fokasu-demo-sidebar>
      <div class="dash-main stats-main">
        <fokasu-demo-header aria-hidden="true"></fokasu-demo-header>
        <div class="stats-viewport" id="${id}">
          <div class="stats-stack">
            <div class="stats-intro"><h3>Stats</h3><p>Explore your completed task hours over a week or month.</p></div>
            <section class="stats-card stats-breakdown" aria-label="Daily breakdown by tag">
              <div class="stats-card-heading"><h4>Daily Breakdown by Tag</h4><span class="stats-muted stats-advanced">Advanced</span>${period('Oct 24, 2026')}</div>
              <div class="stats-breakdown-body">
                ${donut()}
                <div class="stats-details">
                  <div class="stats-legend">${tags.map(tag => `<span><i style="background:${tag.color}"></i>${tag.name}</span>`).join('')}</div>
                  <div class="stats-todos">${[['Revise algebra', '1 min', 'Add Tag'], ['Review general knowledge', '30 mins', 'gk']].map(([title, time, tag]) => `<div class="stats-todo"><span class="stats-todo-mark" aria-hidden="true">➤</span><div class="stats-todo-copy"><p>${title}</p><div class="stats-todo-meta"><span>${clock}${time}</span><span class="stats-tag">${tag}</span></div></div></div>`).join('')}</div>
                  <div class="stats-pagination" aria-label="Sample task page 1 of 6">${chevron('left')}<span>1 / 6</span>${chevron('right')}</div>
                </div>
              </div>
            </section>
            <section class="stats-card stats-weekly" aria-label="Weekly data">
              <div class="stats-card-heading"><h4>Weekly data</h4><span class="stats-period"><span class="is-selected">Week</span><span>Month</span></span></div>
              <div class="stats-weekly-options"><span class="stats-muted">View &amp; Filter</span>${period('Aug 31 – Sep 6, 2026')}</div>
              <div class="stats-chart">${trend(id)}</div>
            </section>
            <section class="stats-card stats-summary" aria-label="Weekly summary"><h4>Summary</h4><dl>${summary.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl></section>
          </div>
        </div>
      </div>
      <span class="dash-edge-tab" aria-hidden="true">‹</span>
    </div>
    <button class="stats-scroll-toggle demo-scroll-toggle" type="button" aria-controls="${id}" aria-label="Scroll Down to weekly data and summary">Scroll Down <span aria-hidden="true">↓</span></button>`;
    // This is a translated track, not a scroll container: wheel/touch scroll the page.
    this.querySelector('.stats-scroll-toggle').addEventListener('click', () => {
      const lower = this.classList.toggle('stats-show-weekly');
      const button = this.querySelector('.stats-scroll-toggle');
      button.innerHTML = `Scroll ${lower ? 'Up' : 'Down'} <span aria-hidden="true">${lower ? '↑' : '↓'}</span>`;
      button.setAttribute('aria-label', lower ? 'Scroll Up to daily breakdown' : 'Scroll Down to weekly data and summary');
      // Keep clipped content out of the accessibility tree in either view.
      this.querySelector('.stats-intro').inert = lower;
      this.querySelector('.stats-breakdown').inert = lower;
      this.querySelector('.stats-summary').inert = !lower;
    });
    this.querySelector('.stats-summary').inert = true;
    this.prepareDonutReveal();
  }

  prepareDonutReveal() {
    const chart = this.querySelector('.stats-donut');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (this.donutHasPlayed || motion.matches || !window.IntersectionObserver) {
      this.donutHasPlayed = true;
      return;
    }

    // Six native SVG animations; no scroll handler, rendering loop, or library.
    chart.classList.add('stats-donut-pending');
    const finish = () => {
      this.donutObserver?.disconnect();
      this.donutObserver = null;
      chart.classList.remove('stats-donut-pending', 'stats-donut-revealing');
      chart.removeEventListener('animationend', onEnd);
      motion.removeEventListener('change', onMotionChange);
      this.stopDonutReveal = null;
    };
    const onEnd = event => {
      if (event.animationName === 'stats-donut-total') finish();
    };
    const onMotionChange = event => {
      if (event.matches) {
        this.donutHasPlayed = true;
        finish();
      }
    };
    this.stopDonutReveal = finish;
    chart.addEventListener('animationend', onEnd);
    motion.addEventListener('change', onMotionChange);
    this.donutObserver = new window.IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= .35)) return;
      this.donutHasPlayed = true;
      chart.classList.remove('stats-donut-pending');
      chart.classList.add('stats-donut-revealing');
      this.donutObserver.disconnect();
      this.donutObserver = null;
    }, { threshold: .35 });
    this.donutObserver.observe(chart);
  }

  disconnectedCallback() {
    this.stopDonutReveal?.();
  }
}

customElements.define('fokasu-stats', FokasuStats);
