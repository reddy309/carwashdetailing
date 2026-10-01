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
     HOME CLICK
  ========================================================= */

  if (homeButton && dropdown) {
    homeButton.addEventListener("click", (event) => {
      event.preventDefault();

      event.stopPropagation();

      toggleDropdown();
    });
  }

  /* =========================================================
     ACTIVE TOP-LEVEL NAVIGATION
     
     Current page gets active underline.

     Home:
     - index.html
     - index1.html

     Home 1 / Home 2 do NOT get separate
     active underline.
     
     Home parent remains active.
  ========================================================= */

  const setActiveNav = () => {
    if (!mainNav) {
      return;
    }

    let currentPage = window.location.pathname.split("/").pop().toLowerCase();

    /* Root URL = index.html */

    if (!currentPage) {
      currentPage = "index.html";
    }

    /* =======================================================
       TOP-LEVEL NAV LINKS ONLY
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
    ======================================================= */

    if (homeButton) {
      const homePages = ["", "index.html", "index1.html"];

      homeButton.classList.toggle("active", homePages.includes(currentPage));
    }
  };

  /* =========================================================
     SET ACTIVE NAV ON PAGE LOAD
  ========================================================= */

  setActiveNav();

  /* =========================================================
     NAVIGATION LINKS
  ========================================================= */

  if (mainNav) {
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
       No preventDefault().
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

    if (
      (currentWidth <= 820 && previousWidth > 820) ||
      (currentWidth > 820 && previousWidth <= 820)
    ) {
      closeMenu();
    }

    previousWidth = currentWidth;
  });

  /* =========================================================
     INITIAL HEADER STATE
  ========================================================= */

  closeMenu();

  updateHeader();

  refreshIcons();

  /* =========================================================
     CUSTOMER REVIEWS
  ========================================================= */

  const slides = document.querySelectorAll(".customer-review-slide");

  const dotsContainer = document.getElementById("customerReviewDots");

  const prevButton = document.getElementById("customerReviewPrev");

  const nextButton = document.getElementById("customerReviewNext");

  if (slides.length) {
    const autoSlideTime = 500000;

    let currentIndex = 0;

    let autoSlideTimer = null;

    /* =======================================================
       REVIEW DOTS
    ======================================================= */

    if (dotsContainer) {
      dotsContainer.innerHTML = "";

      slides.forEach((slide, index) => {
        const dot = document.createElement("button");

        dot.type = "button";

        dot.className = "customer-review-dot";

        dot.setAttribute("aria-label", `Show review ${index + 1}`);

        dot.addEventListener("click", () => {
          showReview(index);

          restartAutoSlide();
        });

        dotsContainer.appendChild(dot);
      });
    }

    /* =======================================================
       SHOW REVIEW
    ======================================================= */

    function showReview(index) {
      currentIndex = (index + slides.length) % slides.length;

      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("active", slideIndex === currentIndex);
      });

      const dots = document.querySelectorAll(".customer-review-dot");

      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === currentIndex);
      });

      refreshIcons();
    }

    /* =======================================================
       NEXT REVIEW
    ======================================================= */

    function nextReview() {
      showReview(currentIndex + 1);
    }

    /* =======================================================
       PREVIOUS REVIEW
    ======================================================= */

    function previousReview() {
      showReview(currentIndex - 1);
    }

    /* =======================================================
       NEXT BUTTON
    ======================================================= */

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        nextReview();

        restartAutoSlide();
      });
    }

    /* =======================================================
       PREVIOUS BUTTON
    ======================================================= */

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        previousReview();

        restartAutoSlide();
      });
    }

    /* =======================================================
       START AUTO SLIDE
    ======================================================= */

    function startAutoSlide() {
      clearInterval(autoSlideTimer);

      autoSlideTimer = setInterval(() => {
        nextReview();
      }, autoSlideTime);
    }

    /* =======================================================
       RESTART AUTO SLIDE
    ======================================================= */

    function restartAutoSlide() {
      startAutoSlide();
    }

    /* =======================================================
       INITIAL REVIEW
    ======================================================= */

    showReview(0);

    startAutoSlide();
  }
});

/* =========================================================
   FAQ ACCORDION
========================================================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  if (!question) {
    return;
  }

  question.addEventListener("click", () => {
    const isCurrentlyOpen = item.classList.contains("open");

    /* Close all FAQ items */

    faqItems.forEach((faqItem) => {
      faqItem.classList.remove("open");

      const faqQuestion = faqItem.querySelector(".faq-question");

      if (faqQuestion) {
        faqQuestion.setAttribute("aria-expanded", "false");
      }
    });

    /* Open clicked FAQ */

    if (!isCurrentlyOpen) {
      item.classList.add("open");

      question.setAttribute("aria-expanded", "true");
    }
  });
});
