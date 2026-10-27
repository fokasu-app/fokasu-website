import { icon } from './desktop-icons.js';

// Rank colors and sinusoidal trail match the desktop's ClanQuestPath.
const contributors = [
 { name: 'joi_boi', minutes: 54, color: '#A9C9AD' },
 { name: 'sleepyhead', minutes: 43, color: '#B5D96A' },
 { name: 'priyanshu', minutes: 32, color: '#42C879' },
 { name: 'chaiBiscuit', minutes: 21, color: '#20a880' },
];
const goalMinutes = 300;
function activityGrid() {
 // Irregular sample activity across seven extra weeks and the recent cluster.
 const recentDays = [
  [34, 2, 1], [34, 5, 2],
  [36, 0, 2], [36, 3, 1], [36, 6, 3],
  [38, 1, 1], [38, 4, 2],
  [40, 2, 3], [40, 6, 1],
  [43, 0, 1], [43, 2, 2], [43, 5, 3],
  [45, 1, 2], [45, 4, 1],
  [47, 0, 2], [47, 3, 3], [47, 6, 1],
  [48, 1, 1], [48, 3, 2], [49, 2, 1], [49, 4, 2],
  [50, 0, 2], [50, 1, 3], [50, 3, 2], [50, 5, 1],
  [51, 1, 2], [51, 2, 3], [51, 4, 1], [51, 6, 2],
  [52, 0, 2], [52, 1, 3], [52, 3, 2], [52, 4, 3], [52, 5, 4], [52, 6, 4],
 ];
 const levels = new Map(recentDays.map(([week, day, level]) => [week * 7 + day, level]));
 return `<div class="dash-activity-grid" role="img" aria-label="Sample study activity over 53 weeks, with ${levels.size} active days. Brighter green indicates more study time.">${Array.from({ length: 53 * 7 }, (_, index) => `<i data-level="${levels.get(index) || 0}"></i>`).join('')}</div>`;
}

const trailPoint = fraction => ({ x: 2 + 640 * fraction, y: 52 - 20 * Math.sin(2 * Math.PI * fraction) });
function trailPoints(from, to) {
 const steps = Math.max(2, Math.ceil((to - from) * 160));
 return Array.from({ length: steps + 1 }, (_, i) => {
  const point = trailPoint(from + (to - from) * i / steps);
  return `${point.x.toFixed(3)},${point.y.toFixed(3)}`;
 }).join(' ');
}
function studyTrail() {
 let from = 0;
 const segments = contributors.map(person => {
  const to = from + person.minutes / goalMinutes;
  const segment = `<polyline class="study-road-progress" points="${trailPoints(from, to)}" stroke="${person.color}"/>`;
  from = to;
  return segment;
 }).join('');
 const position = trailPoint(from);
 const color = contributors[contributors.length - 1].color;
 const total = contributors.reduce((sum, person) => sum + person.minutes, 0);
 return `<svg class="dash-study-road" viewBox="0 0 660 100" role="img" aria-label="Shared study goal: ${total} of ${goalMinutes} minutes completed. ${contributors.map(person => `${person.name}: ${person.minutes} minutes`).join('; ')}.">
  <polyline class="study-road-track" points="${trailPoints(0, 1)}"/>
  ${segments}
  <circle class="study-road-marker" cx="${position.x}" cy="${position.y}" r="5.5" style="stroke:${color}"/><circle class="study-road-dot" cx="${position.x}" cy="${position.y}" r="1.8" style="fill:${color}"/>
  <text x="162" y="17">1.3h</text><text x="322" y="77">2.5h</text><text x="482" y="59">3.8h</text><text x="642" y="78">5h</text>
  <path class="study-road-pole" d="M642 52V22"/><path class="study-road-flag" d="m643 22 15 6-15 6z"/>
 </svg>
 <div class="dash-study-legend">${contributors.map(person => `<span><i style="background:${person.color}"></i><span>${person.name}</span><span class="dash-contribution-time">${person.minutes}m</span></span>`).join('')}</div>`;
}

export function dashboardSocial() {
 const roomIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5q5-2 9 1 4-3 9-1v15q-5-2-9 1-4-3-9-1zM12 6v15"/></svg>';
 const lampIcon = '<svg viewBox="-6 -2 36 30" aria-hidden="true"><path d="M-1.25 12 A1.25 1.25 0 1 1 -3.75 12 A1.25 1.25 0 1 1 -1.25 12 Z M-1.75 11 L5 3.5 M-3 13.25 L-.75 19 M-3.75 21 Q-3.75 19 -1.75 19 H1.75 Q3.75 19 3.75 21 Z M5 4 Q4 2.5 5.25 1.75 Q6.5 1 7.5 3 M5.5 9.75 Q3.5 6 6.5 4 Q9.5 2 12 5.5 Z M9 16 Q12 14.5 16 17 Q19 13.5 23 14 L25 20 Q19 19.5 14 23 Q10 20.5 5.5 22 Z M16 17 L14 23"/></svg>';
 const people = [
  { title: 'Locking In', duration: '2 hours', user: 'You', progress: 24 },
  { title: 'Study Session', duration: '1 hour', user: 'sleepyhead', progress: 42 },
 ];
 return `<section class="dash-social-view" aria-label="Study together and activity">
  <section class="dash-together" aria-label="Study Together">
   <div class="dash-social-heading"><h2>Study Together • Keep It Going</h2><span class="dash-info" aria-hidden="true">ⓘ</span><span class="dash-study-lamp">${lampIcon}</span></div>
   ${studyTrail()}
   <div class="dash-social-cards">
    <div class="dash-social-card dash-room-card"><span class="dash-social-avatar dash-room-icon">${roomIcon}</span><div class="dash-social-copy"><h3>Study Room</h3><p><span class="dash-social-status">Study</span><span>Session 1/3</span><span>1 hr</span><span>${icon('user')}2 Clanmates</span></p></div><span class="dash-social-progress"><i style="width:38%"></i></span><span class="dash-room-action"><span>Join</span><svg viewBox="0 0 18 18" aria-hidden="true"><path d="M10 2 H13 Q15 2 15 4 V14 Q15 16 13 16 H10 M7 5 L11 9 L7 13 M2 9 H11"/></svg></span></div>
    ${people.map(person => `<div class="dash-social-card"><span class="dash-social-avatar">${icon('play')}</span><div class="dash-social-copy"><h3>${person.title}</h3><p><span class="dash-social-status">In progress</span><span>Expires in 19 hours</span><span>${person.duration}</span><span class="dash-social-user">${icon('user')}${person.user}</span></p></div><span class="dash-social-progress"><i style="width:${person.progress}%"></i></span><span class="dash-social-menu">${icon('more')}</span></div>`).join('')}
   </div>
  </section>
  <section class="dash-activity" aria-label="Activity"><h2>Activity</h2>${activityGrid()}</section>
 </section>`;
}
