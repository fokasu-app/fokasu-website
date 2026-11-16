import '/components/dashboard/dashboard.js?v=20261027-social-14';
import '/components/dashboard/friends.js?v=20261116-1';
import '/components/dashboard/study-room.js?v=20261116-gif-frame-2';
import '/components/dashboard/stats.js?v=20261027-18';
import '/components/dashboard/leaderboard.js?v=20261102-1';
import '/components/dashboard/community.js?v=20261116-1';
import '/components/dashboard/user-summary.js?v=20261116-1';
import '/components/dashboard/focus-lock.js?v=20261116-1';
import '/components/dashboard/dday.js?v=20261116-1';
import { dashboardSocial } from '/components/dashboard/dashboard-social.js?v=20261116-goal-label-11';

for (const preview of document.querySelectorAll('[data-social-preview]')) {
  preview.querySelector('.dash-scroll-toggle').click();
}

for (const preview of document.querySelectorAll('[data-weekly-preview]')) {
  preview.querySelector('.stats-scroll-toggle').click();
}

// Reuse just the dashboard heatmap, without the surrounding app window.
for (const preview of document.querySelectorAll('[data-activity-heatmap]')) {
  const source = document.createElement('template');
  source.innerHTML = dashboardSocial();
  preview.prepend(source.content.querySelector('.dash-activity-grid'));
}
