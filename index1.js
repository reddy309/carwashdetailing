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
     CLOSE HOME DROPDOWN
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
     TOGGLE HOME DROPDOWN
  ========================================================= */

  const toggleDropdown = () => {
    if (!dropdown) {
      return;
    }

    const isOpen = dropdown.classList.contains("active");

    if (isOpen) {
      dropdown.classList.remove("active");

      if (homeButton) {
        homeButton.setAttribute("aria-expanded", "false");
      }
    } else {
      dropdown.classList.add("active");

      if (homeButton) {
        homeButton.setAttribute("aria-expanded", "true");
      }
    }

    refreshIcons();
  };

  /* =========================================================
     ACTIVE NAVIGATION LINK
     
     - Current page gets active underline
     - Home 1 / Home 2 keep Home active
     - Dropdown links do not get separate active line
  ========================================================= */

  const setActiveNav = () => {
    if (!mainNav) {
      return;
    }

    let currentPage = window.location.pathname.split("/").pop().toLowerCase();

    /* Root URL */

    if (!currentPage) {
      currentPage = "index.html";
    }

    /* =======================================================
       TOP-LEVEL NAVIGATION LINKS ONLY
    ======================================================= */

    const topLevelLinks = mainNav.querySelectorAll(
      "a.nav-link:not(.mobile-login):not(.dropdown-menu a)",
    );

    topLevelLinks.forEach((link) => {
      const href = link.getAttribute("href");

      if (!href) {
        return;
      }

      const linkPage = href.split("/").pop().split("#")[0].toLowerCase();

      link.classList.toggle("active", linkPage === currentPage);
    });

    /* =======================================================
       HOME PARENT ACTIVE
       
       Home 1 + Home 2
       both keep Home active
    ======================================================= */

    if (homeButton) {
      const homePages = ["", "index.html", "index1.html"];

      homeButton.classList.toggle("active", homePages.includes(currentPage));
    }
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
     HAMBURGER CLICK
  ========================================================= */

  if (menuToggle) {
    menuToggle.addEventListener("click", (event) => {
      event.preventDefault();

      event.stopPropagation();

      toggleMenu();
    });
  }

  /* =========================================================
     HOME DROPDOWN CLICK
  ========================================================= */

  if (homeButton && dropdown) {
    homeButton.addEventListener("click", (event) => {
      event.preventDefault();

      event.stopPropagation();

      toggleDropdown();
    });
  }

  /* =========================================================
     NAVIGATION LINKS
  ========================================================= */

  if (mainNav) {
    /* =======================================================
       TOP-LEVEL LINKS
    ======================================================= */

    const navigationLinks = mainNav.querySelectorAll(
      "a.nav-link:not(.mobile-login):not(.dropdown-menu a)",
    );

    navigationLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 820) {
          closeMenu();
        }
      });
    });

    /* =======================================================
       HOME 1 / HOME 2
       
       Navigate normally.
       Home remains active on destination page.
    ======================================================= */

    const homeLinks = mainNav.querySelectorAll(".dropdown-menu a");

    homeLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.stopPropagation();

        if (window.innerWidth <= 820) {
          closeDropdown();

          mainNav.classList.remove("active");

          setMenuIcon(false);
        }
      });
    });

    /* =======================================================
       MOBILE LOGIN
    ======================================================= */

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

    const menuIsOpen = mainNav.classList.contains("active");

    if (!menuIsOpen) {
      return;
    }

    const clickedInsideMenu = mainNav.contains(event.target);

    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMenu();
    }
  });

  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    closeMenu();
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

  window.addEventListener("scroll", updateHeader, { passive: true });

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
     INITIAL HEADER STATE
  ========================================================= */

  setActiveNav();

  closeMenu();

  updateHeader();

  refreshIcons();
});
