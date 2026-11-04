const mascot = new URL('./focus-guard.svg', import.meta.url).href;

// The third timer control retains the original solid progress-bar icon.
export function progressModeControl(id) {
 return `<button class="dash-control dash-progress-mode-control" type="button" aria-label="Try progress bar mode" aria-controls="${id}-progress-mode" title="Progress bar mode"><svg class="desktop-icon icon-progress-mode" viewBox="0 0 10 17" aria-hidden="true" fill="currentColor" fill-rule="evenodd"><path d="M0 0H10V17H0Z"/></svg></button>`;
}

export function progressModeDemo(id) {
 return `<div class="dash-progress-demo" id="${id}-progress-mode" role="group" aria-label="Progress bar mode demonstration" hidden>
  <div class="dash-mode-workspace" aria-hidden="true">
   <div class="dash-chrome-tabs"><div class="dash-chrome-tab"><span class="dash-chrome-google-icon">G</span>New Tab<span class="dash-chrome-tab-close">×</span></div><span class="dash-chrome-new-tab">+</span></div>
   <div class="dash-chrome-toolbar"><span>‹</span><span class="dash-chrome-disabled">›</span><span>⟳</span><div class="dash-chrome-address"><span>⌕</span><span>Search Google or type a URL</span><span class="dash-chrome-star">☆</span></div><span class="dash-chrome-profile">J</span><span>⋮</span></div>
   <div class="dash-chrome-links"><span>Gmail</span><span>Images</span><span class="dash-chrome-apps">⠿</span><span class="dash-chrome-profile">J</span></div>
   <div class="dash-chrome-home"><div class="dash-chrome-wordmark">Google</div><div class="dash-chrome-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><span>Search Google or type a URL</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8"/></svg></div><div class="dash-chrome-shortcut"><span>+</span>Add shortcut</div></div>
  </div>
  <button class="dash-floating-progress" type="button" aria-label="Progress bar mode. Tap to return to the dashboard." title="Tap to return to the dashboard"><span class="dash-floating-progress-track"><span class="dash-floating-progress-fill"></span></span></button>
  <svg class="dash-bar-arrow" viewBox="-2 -2 50 54" fill="currentColor" stroke="#133b31" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><polygon points="0,25 26,0 26,12 46,12 46,38 26,38 26,50"/></svg>
  <div class="dash-mode-coach">
   <img class="dash-mode-mascot" src="${mascot}" width="124" height="144" alt="Fokasu's smiling focus guard, waving in a mint helmet with a gold feather and shield">
   <div class="dash-mode-speech"><h3>You're in progress bar mode!</h3><p>In the desktop app, this slim bar stays above any app you use. Keep studying while your progress grows.</p><p class="dash-mode-return-hint">Tap the progress bar on the left to switch back.</p></div>
  </div>
 </div>`;
}
