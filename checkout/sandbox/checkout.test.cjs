const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync(__dirname + '/checkout.js', 'utf8');
const valid = 'txn_' + '0'.repeat(26);
function page(search, config = { environment: 'sandbox', clientToken: 'test_public' }) {
  const calls = [], scripts = [], status = { textContent: '' };
  let callback;
  const document = { getElementById: () => status, createElement: () => ({}), head: { appendChild: s => scripts.push(s) } };
  const Paddle = { Environment: { set: v => calls.push(['environment', v]) }, Initialize: options => {
    calls.push(['initialize', options.token]); callback = options.eventCallback;
  }, Checkout: { open: () => { throw new Error('must not explicitly open checkout'); } } };
  vm.runInNewContext(source, { document, window: { location: { search }, FOKASU_CHECKOUT: config }, URLSearchParams, Paddle });
  return { calls, scripts, status, event: name => callback({ name }) };
}
test('missing, invalid, and duplicate transaction input never loads Paddle', () => {
  for (const search of ['', '?_ptxn=bad', '?_ptxn=' + valid + '&_ptxn=' + valid]) {
    const p = page(search); assert.equal(p.scripts.length, 0); assert.match(p.status.textContent, /missing or invalid/);
  }
});
test('deployment token/environment must be sandbox-owned', () => {
  for (const config of [{ environment: 'live', clientToken: 'live_public' }, { environment: 'sandbox', clientToken: '' }]) {
    const p = page('?_ptxn=' + valid, config); assert.equal(p.scripts.length, 0); assert.match(p.status.textContent, /not configured/);
  }
});
test('valid transaction initializes sandbox once and displays confirmation as pending', () => {
  const p = page('?_ptxn=' + valid + '&environment=live&token=live_untrusted');
  assert.equal(p.scripts.length, 1); assert.equal(p.scripts[0].src, 'https://cdn.paddle.com/paddle/v2/paddle.js');
  p.scripts[0].onload();
  assert.deepEqual(p.calls, [['environment', 'sandbox'], ['initialize', 'test_public']]);
  p.event('checkout.completed'); assert.match(p.status.textContent, /refresh billing status/); assert.doesNotMatch(p.status.textContent, /Pro is active/);
  p.event('checkout.closed'); assert.match(p.status.textContent, /does not cancel/);
  p.event('checkout.error'); assert.match(p.status.textContent, /could not finish/);
});
test('SDK load error has a useful return instruction', () => {
  const p = page('?_ptxn=' + valid); p.scripts[0].onerror(); assert.match(p.status.textContent, /return to Fokasu/i);
});
