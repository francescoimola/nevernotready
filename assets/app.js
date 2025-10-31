// ===================================
// Main JavaScript
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

  // Signup form submission
  function initSignupForm() {
    const form = document.getElementById('signup-form');
    if (!form) return;

    const messageDiv = document.getElementById('form-message');
    const submitButton = document.getElementById('submit-button');

    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Disable submit button and show loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Signing up...';

      // Clear previous messages
      messageDiv.className = 'form-message';
      messageDiv.textContent = '';

      // Get form data
      const formData = new FormData(form);
      const email = formData.get('email');

      // Prepare the request body (URL-encoded)
      const formBody = `email=${encodeURIComponent(email)}`;

      try {
        const response = await fetch('https://app.loops.so/api/newsletter-form/cmhepd87qfls01b0i7veoodr3', {
          method: 'POST',
          body: formBody,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        // Parse JSON response
        const data = await response.json();

        if (response.ok && data.success) {
          // Success
          messageDiv.className = 'form-message success';
          messageDiv.innerHTML = "<b>That's it, you're all signed up!</b> <br>Expect a welcome email soon. If you don't see it, please check your spam";
          form.reset();
        } else if (response.status === 429) {
          // Rate limit error
          messageDiv.className = 'form-message error';
          messageDiv.textContent = 'Too many signups, please try again in a moment.';
        } else {
          // Error from server
          messageDiv.className = 'form-message error';
          messageDiv.textContent = data.message || 'Something went wrong. Please try again.';
        }
      } catch (error) {
        // Network error
        messageDiv.className = 'form-message error';
        messageDiv.textContent = 'Unable to connect. Please check your connection and try again.';
      } finally {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Yes, keep me posted';
      }
    });
  }

  // Make functions globally available for onclick attributes
  window.closeModal = closeModal;

  // Initialize on page load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      unorphanize();
      initEmailCopy();
      initSignupForm();
    });
    window.addEventListener('load', initRebrandModal);
  } else {
    unorphanize();
    initEmailCopy();
    initSignupForm();
    initRebrandModal();
  }
})();
