(() => {
  "use strict";

  const browserButtons = [...document.querySelectorAll("[data-browser]")];
  const preview = document.getElementById("image-preview");
  const desktopShot = document.querySelector(".desktop-shot");
  const extensionArrow = desktopShot.querySelector(".extension-arrow");
  let selectedBrowser = "chromium";

  const guides = {
    chromium: {
      prefix: "chrome",
      toolbar: { width: 1918, height: 1147, x: 1778, y: 65 },
      alt: [
        "Chrome toolbar with the Extensions puzzle-piece icon at the top right",
        "Fokasu listed in Chrome’s Extensions menu",
        "Fokasu setup with Review consent and Open extension settings buttons",
      ],
      copy: "Review consent, then enable <strong>Allow in Incognito</strong> in extension settings.",
    },
    firefox: {
      prefix: "firefox",
      toolbar: { width: 1853, height: 1152, x: 1782, y: 65 },
      alt: [
        "Firefox toolbar with the Extensions puzzle-piece icon at the top right",
        "Fokasu listed in Firefox’s Extensions menu",
        "Fokasu setup showing data consent Granted and incognito access Enabled",
      ],
      copy: "Review consent if asked. Set <strong>Run in Private Windows</strong> to <strong>Allow</strong> in extension settings.",
    },
  };

  function positionExtensionArrow() {
    const toolbar = guides[selectedBrowser].toolbar;
    const zoom = parseFloat(getComputedStyle(desktopShot).getPropertyValue("--desktop-zoom"));
    // Match the screenshot's cover crop, top-right alignment, and zoom.
    const scale = Math.max(desktopShot.clientWidth / toolbar.width, desktopShot.clientHeight / toolbar.height) * zoom;
    extensionArrow.style.left = (desktopShot.clientWidth - (toolbar.width - toolbar.x - 13) * scale + 2) + "px";
    extensionArrow.style.top = (toolbar.y * scale) + "px";
    extensionArrow.removeAttribute("hidden");
  }

  function selectBrowser(name) {
    selectedBrowser = name;
    const guide = guides[name];
    browserButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.browser === name));
    });
    ["desktop", "icon", "opened"].forEach((part, index) => {
      const img = document.getElementById("image-" + part);
      img.src = "/permissions/images/" + guide.prefix + "_" + (part === "desktop" ? part : "fokasu_" + part) + ".png";
      img.alt = guide.alt[index];
    });
    document.getElementById("permission-copy").innerHTML = guide.copy;
    positionExtensionArrow();
  }

  browserButtons.forEach((button) => {
    button.addEventListener("click", () => selectBrowser(button.dataset.browser));
  });
  // Brave uses a Chromium user agent, so it shares the Chrome guide.
  selectBrowser(/Firefox\//i.test(navigator.userAgent || "") ? "firefox" : "chromium");
  new ResizeObserver(positionExtensionArrow).observe(desktopShot);

  document.querySelectorAll(".screenshot").forEach((button) => {
    button.addEventListener("click", () => {
      const source = button.querySelector("img");
      const target = document.getElementById("preview-image");
      target.src = source.src;
      target.alt = source.alt;
      preview.showModal();
    });
  });
  document.getElementById("close-preview").addEventListener("click", () => preview.close());
  preview.addEventListener("click", (event) => {
    if (event.target !== preview) return;
    const bounds = preview.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) preview.close();
  });
})();
