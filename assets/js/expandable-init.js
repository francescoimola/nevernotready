/**
 * Accessible Expandable Content Implementation - Browser-Compatible Version
 */
(function() {
  // Single function to handle DOM queries with optional context
  function $(selector, context) {
    return (context || document).querySelector(selector);
  }
  
  // Create and configure accessibility features and handlers for an element
  function makeAccessible(element, config) {
    if (!element) return;
    
    element.setAttribute('tabindex', '0');
    element.setAttribute('role', 'button');
    element.setAttribute('aria-expanded', config.expanded);
    element.setAttribute('aria-controls', config.controls);
    
    // Click handler
    element.addEventListener('click', function(e) {
      e.preventDefault();
      config.onToggle();
    });
    
    // Keyboard handler
    element.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        config.onToggle();
      }
    });
  }
  
  // Toggle the expandable state
  function toggleExpandable(expandable, isOpen) {
    // Set element state
    if (isOpen) {
      expandable.setAttribute('open', '');
      expandable.classList.add('open');
    } else {
      expandable.removeAttribute('open');
      expandable.classList.remove('open');
    }
    
    // Update ARIA state
    var expandBtn = $('.expand-wrapper', expandable);
    if (expandBtn) expandBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    
    // Handle non-native details support
    if (!('open' in document.createElement('details'))) {
      var content = $('.details-content', expandable);
      if (content) {
        // Add transition with minimal modification
        content.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
        content.style.maxHeight = isOpen ? '1000px' : '0';
        content.style.opacity = isOpen ? '1' : '0';
        content.style.overflow = 'hidden';
      }
    }
    
    // Focus management
    setTimeout(function() {
      var focusTarget = isOpen 
        ? $('.toggle-wrapper', expandable) 
        : $('.expand-wrapper', expandable);
      if (focusTarget) focusTarget.focus();
    }, 100);
  }
  
  // Initialize the component
  function initialize() {
    // Flag browsers without native details support
    if (!('open' in document.createElement('details'))) {
      document.documentElement.classList.add('no-details');
    }
    
    // Process all expandable elements
    var expandables = document.querySelectorAll('.expandable');
    for (var i = 0; i < expandables.length; i++) {
      var expandable = expandables[i];
      
      // Generate a consistent ID for the content area
      var uniqueId = expandable.id || 'exp-' + Math.floor(Math.random() * 1000000);
      var contentId = 'content-' + uniqueId;
      var content = $('.details-content', expandable);
      if (content) content.id = contentId;
      
      // Setup open button
      makeAccessible($('.expand-wrapper', expandable), {
        expanded: 'false',
        controls: contentId,
        onToggle: function(el) {
          return function() { toggleExpandable(el, true); };
        }(expandable)
      });
      
      // Setup close button
      makeAccessible($('.toggle-wrapper', expandable), {
        expanded: 'true',
        controls: contentId,
        onToggle: function(el) {
          return function() { toggleExpandable(el, false); };
        }(expandable)
      });
      
      // Prevent unwanted summary clicks
      var summary = $('summary', expandable);
      if (summary) {
        summary.addEventListener('click', function(e) {
          var target = e.target;
          while (target && target !== this) {
            if (target.className && target.className.indexOf('expand-wrapper') >= 0) {
              return;
            }
            target = target.parentNode;
          }
          e.preventDefault();
        });
      }
      
      // Set initial state
      if (expandable.hasAttribute('open')) {
        expandable.classList.add('open');
      }
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState !== 'loading') {
    initialize();
  } else {
    document.addEventListener('DOMContentLoaded', initialize);
  }
})();