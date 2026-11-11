/* global Paddle */
(() => {
  "use strict";
  const status = document.getElementById("status");
  const indicator = document.getElementById("checkout-loading");
  const show = text => { if (indicator) indicator.hidden = true; status.textContent = text; };
  const transactions = new URLSearchParams(window.location.search).getAll("_ptxn");
  if (transactions.length !== 1 || !/^txn_[a-z0-9]{26}$/.test(transactions[0])) {
    show("This checkout link is missing or invalid. Return to Fokasu and choose Upgrade again.");
    return;
  }
  const config = window.FOKASU_CHECKOUT;
  if (!config || config.environment !== "sandbox" || !/^test_[a-zA-Z0-9]+$/.test(config.clientToken)) {
    show("Sandbox checkout is not configured yet. Return to Fokasu and try again later.");
    return;
  }

  const script = document.createElement("script");
  script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
  script.onerror = () => show("Secure checkout could not load. Check your connection and return to Fokasu to retry.");
  script.onload = () => {
    try {
      Paddle.Environment.set("sandbox");
      Paddle.Initialize({
        token: config.clientToken,
        eventCallback(event) {
          switch (event.name) {
            case "checkout.loaded": show("Complete your test checkout with Paddle."); break;
            case "checkout.completed": show("Checkout completed. Return to Fokasu to confirm your plan."); break;
            case "checkout.closed": show("Checkout closed. Check your plan in Fokasu. Closing this page does not cancel billing."); break;
            case "checkout.error":
            case "checkout.payment.failed": show("Checkout could not finish. Return to Fokasu to check billing status and retry."); break;
          }
        }
      });
      // Paddle's default-payment-link handling reads _ptxn and opens this transaction.
      // Do not also call Checkout.open(), or create a checkout from prices/items.
    } catch (_) {
      show("Secure checkout could not start. Return to Fokasu and try again later.");
    }
  };
  document.head.appendChild(script);
})();
