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
      mobileMenu.addEventListener('toggle', function(e) {
        if (e.target.open) {
          mobileNavMenu.classList.add('open');
        } else {
          mobileNavMenu.classList.remove('open');
        }
      });
    }
  }

  // Studio Page - Button Interaction
  function showField(fieldId) {
    const yes = document.getElementById('yesField');
    const no = document.getElementById('noField');
    const btns = document.getElementById('choiceButtons');

    if (!yes || !no || !btns) return;

    yes.style.display = 'none';
    no.style.display = 'none';
    btns.style.overflow = 'hidden';
    btns.style.opacity = '0';

    setTimeout(function () {
      btns.style.height = '0px';
    }, 300);

    setTimeout(function () {
      btns.parentNode.removeChild(btns);
      const section = document.getElementById(fieldId);
      section.style.display = 'block';
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 700);
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
  window.showField = showField;
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
