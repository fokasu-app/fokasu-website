# Sandbox checkout deployment

This page is prepared locally and has not been published. Deploy at
`https://fokasu.app/checkout/sandbox/` through the existing website workflow.
Set the deployed `config.js` clientToken to the sandbox `test_…` client-side token.
It is public; never put a Paddle API key, webhook secret, or Fokasu session here.
Do not select the environment/token from query parameters.

Configure Paddle sandbox's Default payment link and backend PADDLE_CHECKOUT_URL
with that exact HTTPS URL before enabling purchases. Paddle.js handles `_ptxn`
automatically; this page intentionally never calls Checkout.open().

Run `node --test fokasu-website/checkout/sandbox/checkout.test.cjs` from workspace root.
These local checks use a stub SDK. Before enabling BILLING_ENABLED, verify the
real deployed page/SDK opens exactly once with a sandbox transaction, supports
reload and close/error/completion, and never claims that browser events grant Pro.
Only signed backend state/verified reconciliation can grant access.

To prepare the public token file from an already configured deployment environment:
`python3 fokasu-website/checkout/sandbox/configure.py` (requires
PADDLE_ENVIRONMENT=sandbox and PADDLE_CLIENT_TOKEN). This helper reads neither
PADDLE_API_KEY nor Fokasu credentials and does not print the token.

Step 6: checkout uses the existing website header, footer and navigation styles.
A visual spinner replaces transport loading text; outcome/pending copy stays short.
The page still relies on Paddle's `_ptxn` handling and never creates a transaction
or grants access. Payment confirmation remains a backend concern.
