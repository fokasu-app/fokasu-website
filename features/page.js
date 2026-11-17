// Templates keep shared custom-element definitions from mounting distant previews.
const modules = {
  'create-todo': 'create-todo.js?v=20261116-no-strict-icon-4',
  dashboard: 'dashboard.js?v=20261027-social-14',
  habits: 'habits.js?v=20261116-1',
  clan: 'clan.js?v=20261027-12',
  'study-room': 'study-room.js?v=20261116-gif-frame-2',
  friends: 'friends.js?v=20261116-1',
  stats: 'stats.js?v=20261027-18',
  leaderboard: 'leaderboard.js?v=20261102-1',
  community: 'community.js?v=20261116-1',
  'user-summary': 'user-summary.js?v=20261116-1',
  'focus-lock': 'focus-lock.js?v=20261116-1',
  blocks: 'blocks.js?v=20261027-9',
  dday: 'dday.js?v=20261116-1',
  heatmap: 'dashboard-social.js?v=20261116-goal-label-11',
};

async function loadPreview(slot) {
  if (slot.dataset.previewState) return;
  slot.dataset.previewState = 'loading';
  slot.setAttribute('aria-busy', 'true');
  try {
    const module = await import(`/components/dashboard/${modules[slot.dataset.preview]}`);
    if (slot.dataset.preview === 'heatmap') {
      const source = document.createElement('template');
      source.innerHTML = module.dashboardSocial();
      slot.append(source.content.querySelector('.dash-activity-grid'));
    } else {
      const template = slot.querySelector('template');
      slot.append(template.content.cloneNode(true));
      template.remove();
      // Apply each preview's initial view after its element has connected.
      slot.querySelector('[data-social-preview] .dash-scroll-toggle')?.click();
      slot.querySelector('[data-weekly-preview] .stats-scroll-toggle')?.click();
    }
    slot.dataset.previewState = 'loaded';
  } catch (error) {
    slot.dataset.previewState = 'error';
    const message = document.createElement('p');
    message.className = 'feature-preview-error';
    message.textContent = 'This preview could not load. ';
    const reload = document.createElement('button');
    reload.type = 'button';
    reload.textContent = 'Reload page';
    reload.addEventListener('click', () => window.location.reload());
    message.append(reload);
    slot.replaceChildren(message);
    console.warn('Could not load feature preview:', slot.dataset.preview, error);
  } finally {
    slot.removeAttribute('aria-busy');
  }
}

const previews = document.querySelectorAll('[data-preview]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      loadPreview(entry.target);
    }
  }, { rootMargin: '400px 0px' });
  previews.forEach(preview => observer.observe(preview));
} else {
  previews.forEach(loadPreview);
}
