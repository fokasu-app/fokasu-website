import '/components/dashboard/dashboard.js?v=20261027-social-14';

// Start the shared dashboard at its existing study activity view.
for (const preview of document.querySelectorAll('[data-social-preview]')) {
  preview.querySelector('.dash-scroll-toggle').click();
}
