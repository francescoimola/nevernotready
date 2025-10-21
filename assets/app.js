// ===================================
// Atlantic Pet - Main JavaScript Bundle
// ===================================
// Combined: Unorphanize + Site-specific code

(function() {
  "use strict";

  // Unorphanize - Prevent text widows
  function unorphanize() {
    try {
      document.querySelectorAll("p, h1, h2, h3, li, .prevent-orphan").forEach((element) => {
        try {
          if (element.classList.contains("no-wrap")) return;
          const content = element.innerHTML;
          element.innerHTML = content.replace(/ ([^ ]*)$/, "&nbsp;$1");
        } catch (error) {}
      });
    } catch (error) {}
  }

  // Mobile Menu Toggle
  function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');

    if (mobileMenu && mobileNavMenu) {
      mobileMenu.addEventListener('toggle', function() {
        if (mobileMenu.open) {
          mobileNavMenu.classList.add('open');
        } else {
          mobileNavMenu.classList.remove('open');
        }
      });
    }
  }

  // Rebrand Modal
  function closeModal() {
    const modal = document.getElementById('rebrand-modal');
    if (modal) {
      modal.style.display = 'none';
      localStorage.setItem('hasSeenRebrandModal', 'true');
    }
  }

  function initRebrandModal() {
    const modal = document.getElementById('rebrand-modal');
    if (!modal) return;

    const hasSeenModal = localStorage.getItem('hasSeenRebrandModal');
    if (!hasSeenModal) {
      setTimeout(function () {
        modal.style.display = 'flex';
      }, 500);
    }
  }

  // Make functions globally available for onclick attributes
  window.closeModal = closeModal;

  // Initialize on page load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      unorphanize();
      initMobileMenu();
    });
    window.addEventListener('load', initRebrandModal);
  } else {
    unorphanize();
    initMobileMenu();
    initRebrandModal();
  }
})();
