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

  // Copy email to clipboard with visual feedback
  function initEmailCopy() {
    const mailtoLinks = document.querySelectorAll('a[href^="mailto:"]');

    mailtoLinks.forEach(link => {
      link.addEventListener('click', async function(e) {
        e.preventDefault();

        const email = this.getAttribute('href').replace('mailto:', '');

        try {
          await navigator.clipboard.writeText(email);

          // Show success feedback
          const originalText = this.textContent;
          this.textContent = 'Email copied!';

          setTimeout(() => {
            this.textContent = originalText;
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
    });
  }

  // Make functions globally available for onclick attributes
  window.closeModal = closeModal;

  // Initialize on page load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      unorphanize();
      initEmailCopy();
    });
    window.addEventListener('load', initRebrandModal);
  } else {
    unorphanize();
    initEmailCopy();
    initRebrandModal();
  }
})();
