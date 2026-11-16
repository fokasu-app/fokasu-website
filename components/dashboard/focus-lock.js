import './blocks.js?v=20261027-9';

class FokasuFocusLock extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="focus-lock-backdrop" aria-hidden="true" inert><fokasu-blocks></fokasu-blocks></div>
      <section class="focus-lock-dialog" aria-label="Sample Focus Lock configuration with a two-hour focus goal">
        <header><h3>Focus Lock</h3><span class="focus-lock-close" aria-hidden="true">×</span></header>
        <p class="focus-lock-intro">Set the focus goal and break reward. Only completed todos contribute to the focus goal.</p>
        <div class="focus-lock-fields">
          <div><span class="focus-lock-label">FOCUS TIME</span><div class="focus-lock-time"><span>2</span><span class="focus-lock-spinner" aria-hidden="true"><span>▴</span><span>▾</span></span><span class="focus-lock-unit">hr</span><span>0</span><span class="focus-lock-spinner" aria-hidden="true"><span>▴</span><span>▾</span></span><span class="focus-lock-unit">min</span></div></div>
          <div><span class="focus-lock-label">BREAK REWARD</span><div class="focus-lock-reward"><span>20% of Completed Todo</span><span aria-hidden="true">▾</span></div></div>
        </div>
        <div class="focus-lock-schedule"><span aria-hidden="true">›</span> Schedule Lock (Optional)</div>
        <div class="focus-lock-actions" aria-hidden="true"><span>Cancel</span><span>Next</span></div>
      </section>`;
  }
}

if (!customElements.get('fokasu-focus-lock')) customElements.define('fokasu-focus-lock', FokasuFocusLock);
