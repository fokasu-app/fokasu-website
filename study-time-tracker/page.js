import '/components/dashboard/stats.js?v=20261027-18';
import '/components/dashboard/user-summary.js?v=20261116-1';
import { dashboardSocial } from '/components/dashboard/dashboard-social.js?v=20261116-goal-label-11';

// Reuse the Stats component's weekly chart and summary view.
for (const preview of document.querySelectorAll('[data-weekly-preview]')) {
  preview.querySelector('.stats-scroll-toggle').click();
}

for (const preview of document.querySelectorAll('[data-activity-heatmap]')) {
  const source = document.createElement('template');
  source.innerHTML = dashboardSocial();
  preview.prepend(source.content.querySelector('.dash-activity-grid'));
}
