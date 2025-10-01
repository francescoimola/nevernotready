// ===================================
// Atlantic Pet - Main JavaScript Bundle
// ===================================
// Combined: SlideFrame + Unorphanize + Site-specific code

(function() {
  "use strict";

  // SlideFrame - External link iframe functionality
  function slideFrame() {
    try {
      const SFmain = document.createElement("div");
      const SFlinks = document.body.dataset.slideframe
        ? document.querySelectorAll('a:not([data-slideframe="false"])')
        : document.querySelectorAll('a[data-slideframe="true"]');

      SFmain.className = "slideframe";
      SFmain.innerHTML = '<div class="slideframe-generalclose"></div><div class="slideframe-container"><div class="slideframe-container-titlebar"><button class="slideframe-container-titlebar-back slideframe-btn">&larr;</button><strong class="slideframe-container-titlebar-title">Title</strong><a href="#" target="_blank" class="slideframe-container-titlebar-external slideframe-btn">&nearr;</a></div><iframe title="Show external site" class="slideframe-container-frame" src=""></iframe></div>';
      document.body.appendChild(SFmain);

      const elements = {
        title: SFmain.querySelector(".slideframe-container-titlebar-title"),
        frame: SFmain.querySelector(".slideframe-container-frame"),
        external: SFmain.querySelector(".slideframe-container-titlebar-external"),
        back: SFmain.querySelector(".slideframe-container-titlebar-back"),
        close: SFmain.querySelector(".slideframe-generalclose")
      };

      if (!elements.title || !elements.frame || !elements.external || !elements.back || !elements.close) return;

      const closeSlideframe = () => {
        SFmain.classList.remove("slideframe--visible");
        document.body.classList.remove("slideframe-body--noscroll", "slideframe-body--loading");
        setTimeout(() => elements.frame.src = "", 200);
      };

      const openSlideframe = (url, title) => {
        elements.frame.src = url;
        elements.frame.title = title;
        elements.title.textContent = title;
        elements.external.href = url;
        document.body.classList.add("slideframe-body--noscroll", "slideframe-body--loading");
        document.querySelector(".slideframe").classList.add("slideframe--visible");
      };

      if (window.innerWidth > 0) {
        SFlinks.forEach((link) => {
          try {
            const href = link.getAttribute("href");
            if (!href || link.hostname === window.location.hostname || href.includes("mailto:") || href.includes("tel:")) return;

            link.addEventListener("click", (event) => {
              if (event.metaKey || event.ctrlKey) return;
              event.preventDefault();
              openSlideframe(href, link.title || link.textContent);
            });
          } catch (error) {}
        });
      }

      elements.back.addEventListener("click", closeSlideframe);
      elements.close.addEventListener("click", closeSlideframe);
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeSlideframe();
      });
      elements.frame.addEventListener("load", () => {
        document.body.classList.remove("slideframe-body--loading");
      });
    } catch (error) {}
  }

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
      slideFrame();
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
