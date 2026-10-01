document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     LUCIDE ICON REFRESH
  ========================================================= */

  const refreshIcons = () => {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  };

  /* =========================================================
     HEADER ELEMENTS
  ========================================================= */

  const menuToggle = document.getElementById("menuToggle");

  const mainNav = document.getElementById("mainNav");

  const homeButton = document.getElementById("homeDropdownButton");

  const dropdown = document.querySelector(".nav-dropdown");

  const header = document.getElementById("siteHeader");

  /* =========================================================
     MENU ICON
  ========================================================= */

  const setMenuIcon = (open = false) => {
    if (!menuToggle) return;

    menuToggle.innerHTML = open
      ? '<i data-lucide="x"></i>'
      : '<i data-lucide="menu"></i>';

    menuToggle.setAttribute("aria-label", open ? "Close Menu" : "Open Menu");

    menuToggle.setAttribute("title", open ? "Close Menu" : "Menu");

    refreshIcons();
  };

  /* =========================================================
     CLOSE DROPDOWN
  ========================================================= */

  const closeDropdown = () => {
    if (!dropdown) return;

    dropdown.classList.remove("active");

    if (homeButton) {
      homeButton.setAttribute("aria-expanded", "false");
    }
  };

  /* =========================================================
     TOGGLE DROPDOWN
  ========================================================= */

  const toggleDropdown = () => {
    if (!dropdown) return;

    const isOpen = dropdown.classList.contains("active");

    if (isOpen) {
      closeDropdown();
    } else {
      dropdown.classList.add("active");

      if (homeButton) {
        homeButton.setAttribute("aria-expanded", "true");
      }
    }

    refreshIcons();
  };

  /* =========================================================
     ACTIVE NAVIGATION

     HOME:
     index.html
     index1.html

     SERVICES:
     services.html
     service-details.html
     service-details-*.html

     Services active line stays visible on
     Services + all Service Details pages.
  ========================================================= */

  const setActiveNav = () => {
    if (!mainNav) return;

    let currentPage = window.location.pathname.split("/").pop().toLowerCase();

    /* =======================================================
       ROOT URL
    ======================================================= */

    if (!currentPage) {
      currentPage = "index.html";
    }

    /* =======================================================
       REMOVE ALL ACTIVE CLASSES FIRST
    ======================================================= */

    const allNavItems = mainNav.querySelectorAll(".nav-link");

    allNavItems.forEach((item) => {
      item.classList.remove("active");
    });

    /* =======================================================
       HOME PARENT
    ======================================================= */

    if (homeButton) {
      const homePages = ["", "index.html", "index1.html"];

      if (homePages.includes(currentPage)) {
        homeButton.classList.add("active");
      }
    }

    /* =======================================================
       TOP-LEVEL NAVIGATION LINKS ONLY

       Dropdown Home 1 / Home 2 are excluded.
    ======================================================= */

    const normalLinks = mainNav.querySelectorAll(
      "a:not(.mobile-login):not(.nav-dropdown a)",
    );

    normalLinks.forEach((link) => {
      const href = link.getAttribute("href");

      if (!href) return;

      const linkPage = href.split("/").pop().split("#")[0].toLowerCase();

      /* =====================================================
         SERVICES + SERVICE DETAILS

         Services remains active on:

         services.html
         service-details.html
         service-details-anything.html
      ===================================================== */

      if (
        linkPage === "services.html" &&
        (currentPage === "services.html" ||
          currentPage === "service-details.html" ||
          currentPage.startsWith("service-details-"))
      ) {
        link.classList.add("active");

        return;
      }

      /* =====================================================
         NORMAL PAGE MATCH
      ===================================================== */

      if (linkPage === currentPage) {
        link.classList.add("active");
      }
    });
  };

  /* =========================================================
     CLOSE MOBILE MENU
  ========================================================= */

  const closeMenu = () => {
    if (mainNav) {
      mainNav.classList.remove("active");
    }

    closeDropdown();

    setMenuIcon(false);
  };

  /* =========================================================
     OPEN MOBILE MENU
  ========================================================= */

  const openMenu = () => {
    if (!mainNav) return;

    mainNav.classList.add("active");

    setMenuIcon(true);
  };

  /* =========================================================
     TOGGLE MOBILE MENU
  ========================================================= */

  const toggleMenu = () => {
    if (!mainNav) return;

    if (mainNav.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  /* =========================================================
     HAMBURGER
  ========================================================= */

  if (menuToggle) {
    menuToggle.addEventListener("click", (event) => {
      event.preventDefault();

      event.stopPropagation();

      toggleMenu();
    });
  }

  /* =========================================================
     HOME DROPDOWN
  ========================================================= */

  if (homeButton && dropdown) {
    homeButton.addEventListener("click", (event) => {
      event.preventDefault();

      event.stopPropagation();

      /* =================================================
           MOBILE MENU MUST BE OPEN FIRST
        ================================================= */

      if (
        window.innerWidth <= 820 &&
        mainNav &&
        !mainNav.classList.contains("active")
      ) {
        openMenu();
      }

      toggleDropdown();
    });
  }

  /* =========================================================
     HOME 1 / HOME 2
  ========================================================= */

  if (dropdown) {
    const homeLinks = dropdown.querySelectorAll("a");

    homeLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.stopPropagation();

        /*
            IMPORTANT:
            Do NOT use preventDefault().
            Home 1 / Home 2 must navigate normally.
          */

        if (window.innerWidth <= 820) {
          closeDropdown();
        }
      });
    });
  }

  /* =========================================================
     OTHER NAVIGATION LINKS
  ========================================================= */

  if (mainNav) {
    const normalLinks = mainNav.querySelectorAll(
      "a:not(.mobile-login):not(.nav-dropdown a)",
    );

    normalLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 820) {
          closeMenu();
        }
      });
    });
  }

  /* =========================================================
     MOBILE LOGIN
  ========================================================= */

  if (mainNav) {
    const mobileLogin = mainNav.querySelector(".mobile-login");

    if (mobileLogin) {
      mobileLogin.addEventListener("click", () => {
        if (window.innerWidth <= 820) {
          closeMenu();
        }
      });
    }
  }

  /* =========================================================
     OUTSIDE CLICK
  ========================================================= */

  document.addEventListener("click", (event) => {
    if (!mainNav || !menuToggle) {
      return;
    }

    if (window.innerWidth > 820) {
      return;
    }

    if (!mainNav.classList.contains("active")) {
      return;
    }

    const clickedInsideMenu = mainNav.contains(event.target);

    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMenu();
    }
  });

  /* =========================================================
     ESCAPE
  ========================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  /* =========================================================
     HEADER SCROLL
  ========================================================= */

  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", updateHeader, {
    passive: true,
  });

  /* =========================================================
     RESPONSIVE RESET

     <= 820px = Mobile / Tablet
     > 820px  = Desktop
  ========================================================= */

  let previousWidth = window.innerWidth;

  window.addEventListener("resize", () => {
    const currentWidth = window.innerWidth;

    const crossedBreakpoint =
      (currentWidth <= 820 && previousWidth > 820) ||
      (currentWidth > 820 && previousWidth <= 820);

    if (crossedBreakpoint) {
      closeMenu();
    }

    previousWidth = currentWidth;
  });

  /* =========================================================
     INITIAL STATE
  ========================================================= */

  setActiveNav();

  closeMenu();

  updateHeader();

  refreshIcons();
});
