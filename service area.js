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
     CLOSE HOME DROPDOWN
  ========================================================= */

  const closeDropdown = () => {
    if (!dropdown) return;

    dropdown.classList.remove("active");

    if (homeButton) {
      homeButton.setAttribute("aria-expanded", "false");
    }
  };

  /* =========================================================
     TOGGLE HOME DROPDOWN
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
  ========================================================= */

  const setActiveNav = () => {
    if (!mainNav) return;

    let currentPage = window.location.pathname.split("/").pop().toLowerCase();

    if (!currentPage) {
      currentPage = "index.html";
    }

    /* ---------------------------------------------------------
       REMOVE OLD ACTIVE STATES
    --------------------------------------------------------- */

    const allNavItems = mainNav.querySelectorAll("a, button");

    allNavItems.forEach((item) => {
      item.classList.remove("active");
    });

    /* ---------------------------------------------------------
       HOME
       index.html + index1.html
    --------------------------------------------------------- */

    if (currentPage === "index.html" || currentPage === "index1.html") {
      if (homeButton) {
        homeButton.classList.add("active");
      }
    }

    /* ---------------------------------------------------------
       NORMAL TOP-LEVEL NAV LINKS

       Dropdown links are excluded.
       Mobile Login is excluded.
    --------------------------------------------------------- */

    const normalLinks = mainNav.querySelectorAll(
      "a:not(.dropdown-menu a):not(.mobile-login)",
    );

    normalLinks.forEach((link) => {
      const href = link.getAttribute("href");

      if (!href) return;

      const linkPage = href.split("/").pop().split("#")[0].toLowerCase();

      /* -------------------------------------------------------
         SERVICES

         service.html
         service-details.html
         service-details-*.html
      ------------------------------------------------------- */

      if (linkPage === "service.html") {
        if (
          currentPage === "service.html" ||
          currentPage === "service-details.html" ||
          currentPage.startsWith("service-details-")
        ) {
          link.classList.add("active");
        }

        return;
      }

      /* -------------------------------------------------------
         SERVICE AREA

         IMPORTANT:
         Current file name is:
         service area.html
      ------------------------------------------------------- */

      if (linkPage === "service area.html") {
        if (currentPage === "service area.html") {
          link.classList.add("active");
        }

        return;
      }

      /* -------------------------------------------------------
         PRICING
      ------------------------------------------------------- */

      if (linkPage === "pricing.html") {
        if (currentPage === "pricing.html") {
          link.classList.add("active");
        }

        return;
      }

      /* -------------------------------------------------------
         CONTACT
      ------------------------------------------------------- */

      if (linkPage === "contact.html") {
        if (currentPage === "contact.html") {
          link.classList.add("active");
        }

        return;
      }

      /* -------------------------------------------------------
         DASHBOARD
      ------------------------------------------------------- */

      if (linkPage === "dashboard.html") {
        if (currentPage === "dashboard.html") {
          link.classList.add("active");
        }

        return;
      }

      /* -------------------------------------------------------
         DEFAULT MATCH
      ------------------------------------------------------- */

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

      /* Open mobile menu first if needed */

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
     HOME DROPDOWN LINKS
  ========================================================= */

  if (dropdown) {
    const homeLinks = dropdown.querySelectorAll("a");

    homeLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.stopPropagation();

        if (window.innerWidth <= 820) {
          closeDropdown();
        }
      });
    });
  }

  /* =========================================================
     NORMAL NAVIGATION LINKS
  ========================================================= */

  if (mainNav) {
    const normalLinks = mainNav.querySelectorAll(
      "a:not(.dropdown-menu a):not(.mobile-login)",
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
     CLOSE MENU WHEN CLICKING OUTSIDE
  ========================================================= */

  document.addEventListener("click", (event) => {
    if (!mainNav || !menuToggle) return;

    if (window.innerWidth > 820) return;

    const menuIsOpen = mainNav.classList.contains("active");

    if (!menuIsOpen) return;

    const clickedInsideMenu = mainNav.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMenu();
    }
  });

  /* =========================================================
     ESC KEY
  ========================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    closeMenu();
  });

  /* =========================================================
     STICKY HEADER
  ========================================================= */

  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", updateHeader, { passive: true });

  /* =========================================================
     RESPONSIVE BREAKPOINT
     820px
  ========================================================= */

  let previousWidth = window.innerWidth;

  window.addEventListener("resize", () => {
    const currentWidth = window.innerWidth;

    const crossedBreakpoint =
      (currentWidth <= 820 && previousWidth > 820) ||
      (currentWidth > 820 && previousWidth <= 820);

    if (crossedBreakpoint) {
      closeMenu();

      /* Re-check active page after breakpoint change */
      setActiveNav();
    }

    previousWidth = currentWidth;
  });

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  setActiveNav();

  closeMenu();

  updateHeader();

  refreshIcons();
});

/* =========================================================
   PRICING FAQ
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".pricing-faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".pricing-faq-question");

    const answer = item.querySelector(".pricing-faq-answer");

    const icon = question ? question.querySelector("svg") : null;

    if (!question || !answer) return;

    /* -------------------------------------------------------
       FAQ CLICK
    ------------------------------------------------------- */

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      /* Close all FAQ items */

      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");

        const otherAnswer = otherItem.querySelector(".pricing-faq-answer");

        const otherQuestion = otherItem.querySelector(".pricing-faq-question");

        const otherIcon = otherQuestion
          ? otherQuestion.querySelector("svg")
          : null;

        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }

        if (otherQuestion) {
          otherQuestion.setAttribute("aria-expanded", "false");
        }

        if (otherIcon) {
          otherIcon.style.transform = "rotate(0deg)";
        }
      });

      /* Open selected FAQ */

      if (!isOpen) {
        item.classList.add("active");

        question.setAttribute("aria-expanded", "true");

        answer.style.maxHeight = answer.scrollHeight + "px";

        if (icon) {
          icon.style.transform = "rotate(45deg)";
        }
      }
    });
  });

  /* ---------------------------------------------------------
     FAQ RESIZE
  --------------------------------------------------------- */

  window.addEventListener("resize", () => {
    const activeItem = document.querySelector(".pricing-faq-item.active");

    if (!activeItem) return;

    const answer = activeItem.querySelector(".pricing-faq-answer");

    if (answer) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});
