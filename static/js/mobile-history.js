/*
  EVANOESIS — MOBILE TAB HISTORY
  ------------------------------------------------------------
  Mobile only (<= 520px).

  Adds browser-history entries for the site's in-page tabs so Android/iOS
  Back returns to the previous EVANOESIS tab instead of immediately leaving
  the site.

  This file does not replace site.js. Load it AFTER site.js.
*/
(() => {
    const MOBILE_QUERY = "(max-width: 520px)";
    const STATE_KEY = "evanoesisMobileTab";
    let restoringFromHistory = false;

    function isMobile() {
        return window.matchMedia(MOBILE_QUERY).matches;
    }

    function activeTarget() {
        const active = document.querySelector("[data-content].is-active");
        return active?.dataset?.content || "home";
    }

    function clickTarget(target) {
        if (!isMobile()) {
            return;
        }

        const button = document.querySelector(`[data-content="${target}"]`);

        if (!button) {
            return;
        }

        restoringFromHistory = true;
        button.click();

        /*
          The main site transition has its own timing.
          Keep the history guard active through that transition so a
          programmatic restoration cannot create a new history entry.
        */
        window.setTimeout(() => {
            restoringFromHistory = false;

            const nowActive = activeTarget();

            if (nowActive !== target) {
                restoringFromHistory = true;
                button.click();

                window.setTimeout(() => {
                    restoringFromHistory = false;
                }, 650);
            }
        }, 650);
    }

    function initializeMobileHistory() {
        if (!isMobile()) {
            return;
        }

        const current = activeTarget();

        if (!history.state || !history.state[STATE_KEY]) {
            history.replaceState(
                { ...(history.state || {}), [STATE_KEY]: current },
                "",
                window.location.href
            );
        }
    }

    document.addEventListener(
        "click",
        (event) => {
            if (!isMobile() || restoringFromHistory) {
                return;
            }

            const button = event.target.closest("[data-content]");

            if (!button) {
                return;
            }

            const target = button.dataset.content;
            const currentState = history.state?.[STATE_KEY];

            if (!target || target === currentState) {
                return;
            }

            history.pushState(
                { ...(history.state || {}), [STATE_KEY]: target },
                "",
                window.location.href
            );
        },
        true
    );

    window.addEventListener("popstate", (event) => {
        if (!isMobile()) {
            return;
        }

        const target = event.state?.[STATE_KEY] || "home";
        clickTarget(target);
    });

    initializeMobileHistory();
})();
