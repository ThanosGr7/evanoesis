/*
  EVANOESIS — SHARED MOBILE HAMBURGER MENU
  ------------------------------------------------------------
  Mobile only (<= 520px).

  The hamburger header is authored once inside the mobile Home markup.
  On phones this script moves that header to <body>, allowing the exact
  same brand/menu/separator to persist across Home, Projects, What We Do
  and Contact while site.js swaps the tab content.
*/
(() => {
    const mq = window.matchMedia("(max-width: 520px)");

    function setup() {
        const header = document.querySelector(".mobile-home-header");
        const toggle = document.querySelector(".mobile-home-menu-toggle");
        const nav = document.querySelector(".mobile-home-nav");

        if (!header || !toggle || !nav) return;

        const originalParent = header.parentNode;
        const originalNextSibling = header.nextSibling;

        const placeHeader = () => {
            if (mq.matches) {
                if (header.parentNode !== document.body) {
                    document.body.appendChild(header);
                }
            } else if (header.parentNode !== originalParent) {
                if (originalNextSibling && originalNextSibling.parentNode === originalParent) {
                    originalParent.insertBefore(header, originalNextSibling);
                } else {
                    originalParent.appendChild(header);
                }
            }
        };

        const closeMenu = () => {
            header.classList.remove("is-menu-open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Open menu");
        };

        const openMenu = () => {
            header.classList.add("is-menu-open");
            toggle.setAttribute("aria-expanded", "true");
            toggle.setAttribute("aria-label", "Close menu");
        };

        placeHeader();

        toggle.addEventListener("click", (event) => {
            if (!mq.matches) return;

            event.stopPropagation();

            if (header.classList.contains("is-menu-open")) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        nav.addEventListener("click", (event) => {
            if (!mq.matches) return;

            const item = event.target.closest("[data-content]");
            if (item) {
                closeMenu();
            }
        });

        document.addEventListener("click", (event) => {
            if (!mq.matches) return;

            if (!header.contains(event.target)) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        mq.addEventListener?.("change", () => {
            closeMenu();
            placeHeader();
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setup, { once: true });
    } else {
        setup();
    }
})();
