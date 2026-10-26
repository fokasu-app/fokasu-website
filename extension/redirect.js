(() => {
  "use strict";

  const stores = {
    chromium: "https://chromewebstore.google.com/detail/fokasu/kcjhihkbhildakpnghknpomakellcngi",
    firefox: "https://addons.mozilla.org/firefox/addon/fokasu/",
  };
  const ua = navigator.userAgent || "";
  const status = document.getElementById("status");
  // Mobile browser branding does not imply support for the desktop extension.
  const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    || navigator.userAgentData?.mobile === true;
  if (mobile) {
    status.textContent = "Open this link in your desktop browser to set up Fokasu.";
    return;
  }

  const brands = navigator.userAgentData?.brands || [];
  const firefox = /Firefox\//i.test(ua);
  const chromium = /Chrome\/|Chromium\/|Edg\/|OPR\/|Vivaldi\//i.test(ua)
    || brands.some(({ brand }) => /Chromium|Google Chrome|Microsoft Edge/i.test(brand));
  const destination = firefox ? stores.firefox : chromium ? stores.chromium : null;

  if (!destination) {
    status.textContent = /Safari\//i.test(ua)
      ? "Fokasu’s extension isn’t available for Safari. Use a supported desktop browser."
      : "Choose the store for your desktop browser.";
    return;
  }

  status.textContent = "Opening your extension store…";
  // Fixed, trusted destinations only; query strings cannot override the redirect.
  try {
    window.location.replace(destination);
  } catch {
    status.textContent = "Choose your extension store below to continue.";
  }
})();
