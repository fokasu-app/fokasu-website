import './dashboard.js?v=20261027-social-14';
import { icon } from './desktop-icons.js';

const habits = [
  { name: 'Practice Maths', done: 3, remaining: 4, missed: 0, progress: 43 },
  { name: 'Revise Physics', done: 2, remaining: 5, missed: 0, progress: 29 },
  { name: 'Read for 30 minutes', done: 4, remaining: 3, missed: 0, progress: 57 },
  { name: 'Practice Spanish', done: 0, remaining: 7, missed: 0, progress: 0 },
];
const schedule = ['Nov 10', 'Nov 12', 'Nov 14', 'Nov 16', 'Nov 18', 'Nov 20', 'Nov 23'];
const clock = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="8" cy="9" r="5.5"/><path d="M6 1h4M8 5v4l2 1"/></svg>';
const eye = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M1 8q7-10 14 0Q8 18 1 8Z"/><circle cx="8" cy="8" r="2"/></svg>';

class FokasuHabits extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="dash-layout habits-demo-layout">
      <fokasu-demo-sidebar selected="Habits" aria-hidden="true"></fokasu-demo-sidebar>
      <div class="dash-main habits-demo-main"><fokasu-demo-header aria-hidden="true"></fokasu-demo-header>
        <section class="habits-demo-content" aria-label="Sample habits and schedules">
          <header class="habits-demo-heading"><div><strong>Habits</strong><p>Build routines that keep your focus moving.</p></div><span class="habits-demo-filter" aria-hidden="true">Incomplete <span>▾</span></span><span class="habits-demo-add" aria-hidden="true">+</span></header>
          <div class="habits-demo-list">${habits.map((habit, index) => `<details class="habits-demo-card" ${index === 0 ? 'open' : ''}>
            <summary aria-label="Show schedule for ${habit.name}"><span class="habits-demo-icon" aria-hidden="true">${icon('habit')}</span><span class="habits-demo-title"><span>${habit.name}</span><span class="habits-demo-meta">Next up · Nov 16 <span class="habits-demo-done" title="Completed todos">${habit.done}</span><span class="habits-demo-remaining" title="Remaining todos">${habit.remaining}</span><span class="habits-demo-missed" title="Missed todos">${habit.missed}</span></span></span><strong class="habits-demo-percent">${habit.progress}%</strong><span class="habits-demo-view" aria-hidden="true">${eye}<span>›</span></span><span class="habits-demo-menu" aria-hidden="true">⋮</span></summary>
            <div class="habits-demo-schedule" aria-label="Scheduled todos">${schedule.map((date, i) => `<span class="${i < habit.done ? 'habits-demo-finished' : ''}">${i < habit.done ? '<span aria-label="Completed">✓</span>' : clock}${date}</span>`).join('')}</div>
          </details>`).join('')}</div>
        </section>
        <div class="habits-demo-pagination" aria-hidden="true"><span>Previous</span><span>1 / 1</span><span>Next</span></div>
      </div>
    </div>`;
    const cards = [...this.querySelectorAll('details')];
    cards.forEach(card => card.addEventListener('toggle', () => {
      if (card.open) cards.forEach(other => { if (other !== card) other.open = false; });
    }));
  }
}

if (!customElements.get('fokasu-habits')) customElements.define('fokasu-habits', FokasuHabits);
