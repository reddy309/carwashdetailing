document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     ELEMENTS
  ========================================================= */

  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");

  const adminProfileWrapper = document.querySelector(".admin-profile-wrapper");

  const adminProfileButton = document.getElementById("adminProfileButton");

  const adminDropdown = document.getElementById("adminDropdown");

  const headerLabel = document.getElementById("headerLabel");

  const headerTitle = document.getElementById("headerTitle");

  /* =========================================================
     PAGE DATA
  ========================================================= */

  const pageData = {
    dashboard: {
      label: "CUSTOMER DASHBOARD",
      title: "Welcome back, Customer",
    },

    bookings: {
      label: "MY BOOKINGS",
      title: "Your Bookings",
    },

    vehicles: {
      label: "MY VEHICLES",
      title: "Your Vehicles",
    },

    packages: {
      label: "SERVICE PACKAGES",
      title: "Available Services",
    },

    tracking: {
      label: "TECHNICIAN TRACKING",
      title: "Track Your Technician",
    },

    history: {
      label: "SERVICE HISTORY",
      title: "Your Service History",
    },

    payments: {
      label: "PAYMENTS",
      title: "Your Payments",
    },

    notifications: {
      label: "NOTIFICATIONS",
      title: "Your Notifications",
    },

    settings: {
      label: "ACCOUNT SETTINGS",
      title: "Account Settings",
    },

    profile: {
      label: "MY PROFILE",
      title: "My Profile",
    },
  };

  /* =========================================================
     ICON REFRESH
  ========================================================= */

  function refreshIcons() {
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  /* =========================================================
     SHOW PAGE
  ========================================================= */

  function showPage(pageName) {
    if (!pageData[pageName]) {
      pageName = "dashboard";
    }

    /* Hide every page */

    document.querySelectorAll(".dynamic-page").forEach((page) => {
      page.hidden = true;
    });

    /* Show selected page */

    const target = document.querySelector(
      `.dynamic-page[data-content="${pageName}"]`,
    );

    if (target) {
      target.hidden = false;
    }

    /* Active sidebar */

    document.querySelectorAll(".nav-item[data-page]").forEach((item) => {
      item.classList.toggle("active", item.dataset.page === pageName);
    });

    /* Header */

    if (headerLabel) {
      headerLabel.textContent = pageData[pageName].label;
    }

    if (headerTitle) {
      headerTitle.textContent = pageData[pageName].title;
    }

    /* Close mobile sidebar */

    closeSidebar();

    /* Close admin dropdown */

    closeAdminDropdown();

    /* Update hash */

    if (window.location.hash !== `#${pageName}`) {
      history.replaceState(null, "", `#${pageName}`);
    }

    refreshIcons();
  }

  /* =========================================================
     SIDEBAR NAVIGATION
  ========================================================= */

  document.querySelectorAll(".nav-item[data-page]").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();

      showPage(item.dataset.page);
    });
  });

  /* =========================================================
     ALL DATA PAGE LINKS
  ========================================================= */

  document.querySelectorAll("[data-page-link]").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();

      const page = item.dataset.pageLink;

      showPage(page);
    });
  });

  /* =========================================================
     ADMIN DROPDOWN
  ========================================================= */

  function closeAdminDropdown() {
    if (!adminProfileWrapper) {
      return;
    }

    adminProfileWrapper.classList.remove("open");

    if (adminProfileButton) {
      adminProfileButton.setAttribute("aria-expanded", "false");
    }
  }

  function openAdminDropdown() {
    if (!adminProfileWrapper) {
      return;
    }

    adminProfileWrapper.classList.add("open");

    if (adminProfileButton) {
      adminProfileButton.setAttribute("aria-expanded", "true");
    }

    refreshIcons();
  }

  if (adminProfileButton && adminProfileWrapper) {
    adminProfileButton.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen = adminProfileWrapper.classList.contains("open");

      if (isOpen) {
        closeAdminDropdown();
      } else {
        openAdminDropdown();
      }
    });
  }

  /* =========================================================
     OUTSIDE CLICK
  ========================================================= */

  document.addEventListener("click", (event) => {
    if (adminProfileWrapper && !adminProfileWrapper.contains(event.target)) {
      closeAdminDropdown();
    }
  });

  /* =========================================================
     MOBILE SIDEBAR
  ========================================================= */

  function openSidebar() {
    if (!sidebar) {
      return;
    }

    sidebar.classList.add("open");

    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    if (!sidebar) {
      return;
    }

    sidebar.classList.remove("open");

    document.body.style.overflow = "";
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      if (sidebar.classList.contains("open")) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  /* =========================================================
     CLOSE SIDEBAR WHEN CLICKING OUTSIDE
  ========================================================= */

  document.addEventListener("click", (event) => {
    if (
      window.innerWidth <= 900 &&
      sidebar &&
      sidebar.classList.contains("open") &&
      !sidebar.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeSidebar();
    }
  });

  /* =========================================================
     ESC KEY
  ========================================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSidebar();

      closeAdminDropdown();
    }
  });

  /* =========================================================
     BOOK SERVICE
  ========================================================= */

  document.querySelectorAll(".book-service-button").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = "booking.html";
    });
  });

  /* =========================================================
     LOGOUT
  ========================================================= */

  const logoutButtons = document.querySelectorAll(
    "#sidebarLogoutButton, #adminLogoutButton",
  );

  logoutButtons.forEach((button) => {
    button.addEventListener("click", () => {
      /*
          Clear customer login data here
          if authentication is implemented.
        */

      localStorage.removeItem("autosshineUser");

      window.location.href = "Login.html";
    });
  });

  /* =========================================================
     HASH CHANGE
  ========================================================= */

  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.replace("#", "");

    showPage(pageData[hash] ? hash : "dashboard");
  });

  /* =========================================================
     INITIAL PAGE
  ========================================================= */

  const initialPage = window.location.hash.replace("#", "");

  showPage(pageData[initialPage] ? initialPage : "dashboard");

  /* =========================================================
     LUCIDE
  ========================================================= */

  refreshIcons();
});
