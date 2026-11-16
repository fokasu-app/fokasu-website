import './dashboard.js?v=20261027-social-14';

let previewCount = 0;
class FokasuCreateTodo extends HTMLElement {
  connectedCallback() {
    const id = `create-todo-demo-${++previewCount}`;
    this.innerHTML = `
      <div class="todo-demo-backdrop" aria-hidden="true" inert><div class="dash-layout"><fokasu-demo-sidebar selected="Dashboard"></fokasu-demo-sidebar><div class="dash-main"><fokasu-demo-header></fokasu-demo-header></div></div></div>
      <form class="todo-demo-form" aria-label="Create Todo preview">
        <h3>Create Todo</h3>
        <p class="todo-demo-intro">Capture the task, choose a deadline, and estimate the focused time it needs.</p>
        <label class="todo-demo-description" for="${id}-description">TODO DESCRIPTION<textarea id="${id}-description" placeholder="What needs your attention?" rows="3"></textarea></label>
        <div class="todo-demo-fields">
          <label for="${id}-date">DEADLINE DATE<input id="${id}-date" type="date" value="2026-08-30"></label>
          <fieldset><legend>ESTIMATED TIME</legend><div class="todo-demo-time"><input aria-label="Estimated hours" type="number" min="0" max="24" value="1"><span class="todo-demo-spinner" aria-hidden="true"><span>▴</span><span>▾</span></span><span>hr</span><input aria-label="Estimated minutes" type="number" min="0" max="59" value="0"><span class="todo-demo-spinner" aria-hidden="true"><span>▴</span><span>▾</span></span><span>min</span></div></fieldset>
          <div class="todo-demo-tag-field"><label for="${id}-tag">TAGS (OPTIONAL)</label><div class="todo-demo-tag-input"><input id="${id}-tag" placeholder="Add a tag and press Enter" maxlength="24" autocomplete="off"></div><div class="todo-demo-tags" aria-live="polite"></div><svg class="todo-demo-arrow" viewBox="-2 -2 50 54" aria-hidden="true"><polygon points="0,25 26,0 26,12 46,12 46,38 26,38 26,50"/></svg></div>
        </div>
        <p class="todo-demo-status" role="status"></p>
        <div class="todo-demo-actions"><label><input type="checkbox">Strict Mode</label><label><input type="checkbox" checked>Automatic Breaks</label><button type="reset">Cancel</button><button type="submit">Save</button></div>
      </form>`;
    const form = this.querySelector('form');
    const tagInput = this.querySelector('.todo-demo-tag-input input');
    const tags = this.querySelector('.todo-demo-tags');
    const status = this.querySelector('.todo-demo-status');
    const addTag = () => {
      const value = tagInput.value.trim();
      if (!value || tags.children.length >= 3) return;
      if ([...tags.children].some(tag => tag.dataset.tag.toLowerCase() === value.toLowerCase())) return;
      const tag = document.createElement('button');
      tag.type = 'button';
      tag.dataset.tag = value;
      tag.textContent = `${value} ×`;
      tag.setAttribute('aria-label', `Remove ${value} tag`);
      tag.addEventListener('click', () => tag.remove());
      tags.append(tag);
      tagInput.value = '';
    };
    tagInput.addEventListener('keydown', event => {
      if (event.key === 'Enter') { event.preventDefault(); addTag(); }
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      addTag();
      status.textContent = 'Preview only. Open Fokasu to save your todo.';
    });
    form.addEventListener('reset', () => { tags.replaceChildren(); status.textContent = ''; });
  }
}
customElements.define('fokasu-create-todo', FokasuCreateTodo);
