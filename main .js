/* ==================================================
   CRAFT NEST
   RTL + DARK MODE
   LOCAL STORAGE
================================================== */

(function () {
  /* ==================================================
     APPLY ALL MODES
  ================================================== */

  function applyModes() {
    const rtlEnabled = localStorage.getItem("craftNestRTL") === "enabled";

    const darkEnabled = localStorage.getItem("craftNestDark") === "enabled";

    /* ==================================================
       HTML / DOCUMENT DIRECTION
    ================================================== */

    document.documentElement.setAttribute("dir", rtlEnabled ? "rtl" : "ltr");

    document.documentElement.classList.toggle("rtl", rtlEnabled);

    document.documentElement.classList.toggle("dark", darkEnabled);

    /* ==================================================
       BODY
    ================================================== */

    if (document.body) {
      document.body.classList.toggle("rtl", rtlEnabled);

      document.body.classList.toggle("dark", darkEnabled);
    }

    /* ==================================================
       RTL BUTTON
    ================================================== */

    const rtlButton = document.getElementById("rtlToggle");

    if (rtlButton) {
      /*
        When current mode is RTL,
        button shows LTR.

        When current mode is LTR,
        button shows RTL.
      */

      rtlButton.textContent = rtlEnabled ? "LTR" : "RTL";

      rtlButton.setAttribute(
        "aria-label",
        rtlEnabled ? "Switch to LTR" : "Switch to RTL",
      );

      rtlButton.setAttribute(
        "title",
        rtlEnabled ? "Switch to LTR" : "Switch to RTL",
      );
    }

    /* ==================================================
       DARK MODE BUTTON
    ================================================== */

    const darkButton = document.getElementById("darkToggle");

    if (darkButton) {
      darkButton.setAttribute(
        "aria-label",
        darkEnabled ? "Switch to Light Mode" : "Switch to Dark Mode",
      );

      darkButton.setAttribute(
        "title",
        darkEnabled ? "Switch to Light Mode" : "Switch to Dark Mode",
      );

      const icon = darkButton.querySelector("[data-lucide]");

      if (icon) {
        icon.setAttribute("data-lucide", darkEnabled ? "sun" : "moon");
      }
    }

    /* ==================================================
       LUCIDE
    ================================================== */

    if (
      typeof lucide !== "undefined" &&
      typeof lucide.createIcons === "function"
    ) {
      lucide.createIcons();
    }
  }

  /* ==================================================
     PAGE READY
  ================================================== */

  document.addEventListener("DOMContentLoaded", function () {
    /* -----------------------------------------------
         APPLY SAVED SETTINGS
      ----------------------------------------------- */

    applyModes();

    /* ==================================================
         RTL BUTTON
      ================================================== */

    const rtlButton = document.getElementById("rtlToggle");

    if (rtlButton) {
      rtlButton.addEventListener("click", function (event) {
        event.preventDefault();

        /* ------------------------------------------
               GET CURRENT MODE
            ------------------------------------------ */

        const rtlEnabled = localStorage.getItem("craftNestRTL") === "enabled";

        /* ------------------------------------------
               TOGGLE RTL / LTR
            ------------------------------------------ */

        if (rtlEnabled) {
          /* RTL → LTR */

          localStorage.setItem("craftNestRTL", "disabled");
        } else {
          /* LTR → RTL */

          localStorage.setItem("craftNestRTL", "enabled");
        }

        /* ------------------------------------------
               APPLY IMMEDIATELY
            ------------------------------------------ */

        applyModes();
      });
    }

    /* ==================================================
         DARK MODE BUTTON
      ================================================== */

    const darkButton = document.getElementById("darkToggle");

    if (darkButton) {
      darkButton.addEventListener("click", function (event) {
        event.preventDefault();

        const darkEnabled = localStorage.getItem("craftNestDark") === "enabled";

        localStorage.setItem(
          "craftNestDark",
          darkEnabled ? "disabled" : "enabled",
        );

        applyModes();
      });
    }

    /* ==================================================
         LUCIDE INITIALIZE
      ================================================== */

    if (
      typeof lucide !== "undefined" &&
      typeof lucide.createIcons === "function"
    ) {
      lucide.createIcons();
    }
  });
})();
