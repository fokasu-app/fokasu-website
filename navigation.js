(() => {
  const popupMenus = [
    ...document.querySelectorAll(".nav-more, .download-picker"),
  ];

  if (popupMenus.length === 0) return;

  document.addEventListener("click", (event) => {
    popupMenus.forEach((menu) => {
      if (menu.open && !menu.contains(event.target)) {
        menu.open = false;
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    const openMenu = popupMenus.find((menu) => menu.open);
    if (!openMenu) return;

    openMenu.open = false;
    openMenu.querySelector("summary")?.focus();
  });
})();
