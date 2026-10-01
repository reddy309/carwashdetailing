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
    if (!menuToggle) {
      return;
    }

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
    if (!dropdown) {
      return;
    }

    dropdown.classList.remove("active");

    if (homeButton) {
      homeButton.setAttribute("aria-expanded", "false");
    }
  };

  /* =========================================================
     TOGGLE DROPDOWN
  ========================================================= */

  const toggleDropdown = () => {
    if (!dropdown) {
      return;
    }

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
     
     HOME
     index.html
     index1.html

     SERVICES
     services.html
     service-details.html
     service-details-*.html

     SERVICE AREA
     service-area.html

     PRICING
     pricing.html

     CONTACT
     contact.html
  ========================================================= */

  const setActiveNav = () => {
    if (!mainNav) {
      return;
    }

    /* =======================================================
       CURRENT PAGE
    ======================================================= */

    let currentPage = window.location.pathname.split("/").pop().toLowerCase();

    /* Root URL */

    if (!currentPage) {
      currentPage = "index.html";
    }

    /* =======================================================
       REMOVE ALL ACTIVE CLASSES
    ======================================================= */

    const allNavItems = mainNav.querySelectorAll("a, button");

    allNavItems.forEach((item) => {
      item.classList.remove("active");
    });

    /* =======================================================
       HOME
       
       Home 1 / Home 2 do not get their own active line.
    ======================================================= */

    if (currentPage === "index.html" || currentPage === "index1.html") {
      if (homeButton) {
        homeButton.classList.add("active");
      }
    }

    /* =======================================================
       TOP LEVEL LINKS ONLY
       
       Exclude:
       - Home dropdown links
       - Mobile login
    ======================================================= */

    const normalLinks = mainNav.querySelectorAll(
      "a:not(.mobile-login):not(.nav-dropdown a)",
    );

    normalLinks.forEach((link) => {
      const href = link.getAttribute("href");

      if (!href) {
        return;
      }

      const linkPage = href.split("/").pop().split("#")[0].toLowerCase();

      /* =====================================================
         SERVICES
         
         Services stays ACTIVE on:
         
         services.html
         service-details.html
         service-details-wash.html
         service-details-interior.html
         service-details-exterior.html
         etc.
      ===================================================== */

      if (linkPage === "services.html") {
        const isServicePage =
          currentPage === "services.html" ||
          currentPage === "service-details.html" ||
          currentPage.startsWith("service-details-");

        if (isServicePage) {
          link.classList.add("active");
        }

        return;
      }

      /* =====================================================
         SERVICE AREA
      ===================================================== */

      if (linkPage === "service-area.html") {
        if (currentPage === "service-area.html") {
          link.classList.add("active");
        }

        return;
      }

      /* =====================================================
         PRICING
      ===================================================== */

      if (linkPage === "pricing.html") {
        if (currentPage === "pricing.html") {
          link.classList.add("active");
        }

        return;
      }

      /* =====================================================
         CONTACT
      ===================================================== */

      if (linkPage === "contact.html") {
        if (currentPage === "contact.html") {
          link.classList.add("active");
        }

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
    if (!mainNav) {
      return;
    }

    mainNav.classList.add("active");

    setMenuIcon(true);
  };

  /* =========================================================
     TOGGLE MOBILE MENU
  ========================================================= */

  const toggleMenu = () => {
    if (!mainNav) {
      return;
    }

    const isOpen = mainNav.classList.contains("active");

    if (isOpen) {
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

      /* ===============================================
           MOBILE MENU OPEN FIRST
        =============================================== */

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
     
     Navigate normally.
     No separate active line.
  ========================================================= */

  if (dropdown) {
    const homeLinks = dropdown.querySelectorAll("a");

    homeLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.stopPropagation();

        /*
             Do NOT use preventDefault().
             Home 1 / Home 2 navigate normally.
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
    if (!header) {
      return;
    }

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

      /*
           Re-check active navigation
           after breakpoint change.
        */

      setActiveNav();
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
