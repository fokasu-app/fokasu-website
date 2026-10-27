import './dashboard.js?v=20261027-social-14';

const blockedItems = ['reddit.com/r/*', 'youtube.com/reels', 'facebook.com', 'instagram.com'];
// Exact trash geometry from the desktop BlockController.
const trash = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 4.5 H13 M5.5 4.5 V3 C5.5 2.4 5.9 2 6.5 2 H9.5 C10.1 2 10.5 2.4 10.5 3 V4.5 M4.5 4.5 V13 C4.5 13.6 4.9 14 5.5 14 H10.5 C11.1 14 11.5 13.6 11.5 13 V4.5 M6.5 7 V11 M9.5 7 V11"/></svg>';
// Permissions-page arrow geometry, rotated to point up at the lock.
const lockArrow = '<svg class="block-demo-lock-arrow" viewBox="-2 -2 54 50" fill="currentColor" stroke="#133b31" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><g transform="translate(50 0) rotate(90)"><polygon points="0,25 26,0 26,12 46,12 46,38 26,38 26,50"/></g></svg>';

class FokasuBlocks extends HTMLElement {
 connectedCallback() {
  this.innerHTML = `<div class="dash-layout block-demo-layout">
   <fokasu-demo-sidebar selected="Block" aria-hidden="true"></fokasu-demo-sidebar>
   <div class="dash-main block-demo-main">
    <fokasu-demo-header aria-hidden="true"></fokasu-demo-header>
    <div class="block-demo-content">
     <div class="block-demo-intro"><h3>Block</h3><p>Your website and application blocking rules are not currently active.</p></div>
     <div class="block-demo-workspace">
      <div class="block-demo-toolbar"><div class="block-demo-tabs" aria-label="Blocked websites view"><span class="is-selected">Blocked</span><span>Exceptions</span><span>YouTube</span><span>Applications</span></div><span class="block-demo-tour">Take A Tour</span></div>
      <div class="block-demo-input-row" aria-hidden="true"><span class="block-demo-input">Enter a URL like instagram.com to block</span><span class="block-demo-add"><svg viewBox="0 0 20 20"><path d="M10 4V16M4 10H16"/></svg></span></div>
      <section class="block-demo-list-section" aria-label="Sample blocked websites"><h4>Blocked items</h4><ul class="block-demo-items">${blockedItems.map(url => `<li><span>${url}</span><span class="block-demo-trash">${trash}</span></li>`).join('')}</ul></section>
     </div>
    </div>
   </div>
   <span class="dash-edge-tab" aria-hidden="true">‹</span>
  </div>`;
  this.querySelector('.block-demo-main .dash-lock').insertAdjacentHTML('beforeend', lockArrow);
 }
}

customElements.define('fokasu-blocks', FokasuBlocks);
