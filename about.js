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
    if (dropdown) {
      dropdown.classList.remove("active");
    }

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

    dropdown.classList.toggle("active", !isOpen);

    if (homeButton) {
      homeButton.setAttribute("aria-expanded", String(!isOpen));
    }

    refreshIcons();
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
     HOME DROPDOWN BUTTON
  ========================================================= */

  if (homeButton && dropdown) {
    homeButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      toggleDropdown();
    });
  }

  /* =========================================================
     GET CURRENT PAGE
  ========================================================= */

  const getCurrentPage = () => {
    let currentPage = window.location.pathname
      .split("/")
      .pop()
      .split("?")[0]
      .split("#")[0]
      .toLowerCase()
      .trim();

    if (!currentPage) {
      currentPage = "index.html";
    }

    return currentPage;
  };

  /* =========================================================
     GET LINK PAGE
  ========================================================= */

  const getLinkPage = (link) => {
    if (!link) {
      return "";
    }

    const href = link.getAttribute("href");

    if (!href || href === "#" || href.startsWith("javascript:")) {
      return "";
    }

    return href
      .split("?")[0]
      .split("#")[0]
      .split("/")
      .pop()
      .toLowerCase()
      .trim();
  };

  /* =========================================================
     ACTIVE NAVIGATION
  ========================================================= */

  const setActiveNav = () => {
    if (!mainNav) {
      return;
    }

    const currentPage = getCurrentPage();

    /* =======================================================
       REMOVE OLD ACTIVE STATES
    ======================================================= */

    const allNavItems = mainNav.querySelectorAll("a.nav-link, button.nav-link");

    allNavItems.forEach((item) => {
      item.classList.remove("active");

      item.removeAttribute("aria-current");
    });

    /* =======================================================
       HOME DROPDOWN
    ======================================================= */

    const homeLinks = mainNav.querySelectorAll(
      ".dropdown-menu a, .nav-dropdown a",
    );

    let homeChildActive = false;

    homeLinks.forEach((link) => {
      const linkPage = getLinkPage(link);

      if (linkPage && linkPage === currentPage) {
        link.classList.add("active");

        link.setAttribute("aria-current", "page");

        homeChildActive = true;
      }
    });

    /* =======================================================
       HOME PARENT
    ======================================================= */

    const homePages = [
      "",
      "index.html",
      "index1.html",
      "home.html",
      "home1.html",
      "home2.html",
    ];

    if (homeButton) {
      const homeActive = homeChildActive || homePages.includes(currentPage);

      homeButton.classList.toggle("active", homeActive);

      if (homeActive) {
        homeButton.setAttribute("aria-current", "page");
      }
    }

    /* =======================================================
       NORMAL TOP LEVEL LINKS
    ======================================================= */

    const topLevelLinks = mainNav.querySelectorAll(
      "a.nav-link:not(.mobile-login)",
    );

    topLevelLinks.forEach((link) => {
      /* Skip dropdown links */

      if (link.closest(".dropdown-menu") || link.closest(".nav-dropdown")) {
        return;
      }

      /* Skip Home button */

      if (link === homeButton) {
        return;
      }

      const linkPage = getLinkPage(link);

      if (linkPage && linkPage === currentPage) {
        link.classList.add("active");

        link.setAttribute("aria-current", "page");
      }
    });

    /* =======================================================
       ABOUT PAGE — FORCE ACTIVE
       
       about.html
       about
       /about.html
    ======================================================= */

    if (currentPage === "about.html" || currentPage === "about") {
      const aboutLink = mainNav.querySelector('a[href="about.html"]');

      if (aboutLink) {
        aboutLink.classList.add("active");

        aboutLink.setAttribute("aria-current", "page");
      }
    }
  };

  /* =========================================================
     SET ACTIVE ON PAGE LOAD
  ========================================================= */

  setActiveNav();

  /* =========================================================
     NORMAL NAVIGATION LINKS
  ========================================================= */

  if (mainNav) {
    const navigationLinks = mainNav.querySelectorAll(
      "a.nav-link:not(.mobile-login)",
    );

    navigationLinks.forEach((link) => {
      /* Skip dropdown links */

      if (link.closest(".dropdown-menu") || link.closest(".nav-dropdown")) {
        return;
      }

      /* Skip Home */

      if (link === homeButton) {
        return;
      }

      link.addEventListener("click", () => {
        /* Remove active */

        navigationLinks.forEach((navLink) => {
          if (
            !navLink.closest(".dropdown-menu") &&
            !navLink.closest(".nav-dropdown")
          ) {
            navLink.classList.remove("active");

            navLink.removeAttribute("aria-current");
          }
        });

        /* Add active to clicked link */

        link.classList.add("active");

        link.setAttribute("aria-current", "page");

        /* Mobile menu close */

        if (window.innerWidth <= 820) {
          closeMenu();
        }
      });
    });

    /* =======================================================
       HOME 1 / HOME 2
    ======================================================= */

    const homeLinks = mainNav.querySelectorAll(
      ".dropdown-menu a, .nav-dropdown a",
    );

    homeLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.stopPropagation();

        homeLinks.forEach((homeLink) => {
          homeLink.classList.remove("active");

          homeLink.removeAttribute("aria-current");
        });

        link.classList.add("active");

        link.setAttribute("aria-current", "page");

        if (homeButton) {
          homeButton.classList.add("active");
        }

        if (window.innerWidth <= 820) {
          closeDropdown();

          mainNav.classList.remove("active");

          setMenuIcon(false);
        }

        /* Normal navigation continues */
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

  window.addEventListener("scroll", updateHeader, {
    passive: true,
  });

  /* =========================================================
     RESPONSIVE RESET
  ========================================================= */

  let previousWidth = window.innerWidth;

  window.addEventListener("resize", () => {
    const currentWidth = window.innerWidth;

    const crossedBreakpoint =
      (currentWidth <= 820 && previousWidth > 820) ||
      (currentWidth > 820 && previousWidth <= 820);

    if (crossedBreakpoint) {
      closeMenu();

      setActiveNav();
    }

    previousWidth = currentWidth;
  });

  /* =========================================================
     INITIAL HEADER STATE
  ========================================================= */

  closeMenu();

  setActiveNav();

  updateHeader();

  refreshIcons();
});
