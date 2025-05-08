// Run slideFrame
slideFrame = (e) => {
  const SFthreshold = 0;
  const SFmain = document.createElement("div");
  const SFlinks = document.body.dataset.slideframe
    ? document.querySelectorAll('a:not([data-slideframe="false"])')
    : document.querySelectorAll('a[data-slideframe="true"]');
  SFmain.classList.add("slideframe");
  SFmain.innerHTML =
    '<div class="slideframe-generalclose"></div><div class="slideframe-container"><div class="slideframe-container-titlebar">' +
    '<button class="slideframe-container-titlebar-back slideframe-btn">&larr;</button><strong class="slideframe-container-tit' +
    'lebar-title">Title</strong><a href="#" target="_blank" class="slideframe-container-titlebar-external slideframe-btn">&ne' +
    'arr;</a></div><iframe title="Show external site" class="slideframe-container-frame" src=""></iframe></div>';
  document.body.append(SFmain);
  const SFtitle = document.querySelector(
    ".slideframe-container-titlebar-title"
  );
  const SFframe = document.querySelector(".slideframe-container-frame");
  const SFexternal = document.querySelector(
    ".slideframe-container-titlebar-external"
  );
  const SFback = document.querySelector(".slideframe-container-titlebar-back");
  const SFclose = document.querySelector(".slideframe-generalclose");
  if (window.innerWidth > SFthreshold) {
    SFlinks.forEach((link) => {
      if (link.getAttribute("href") !== null) {
        if (
          link.hostname !== window.location.hostname &&
          link.getAttribute("href").indexOf("mailto:") < 0 &&
          link.getAttribute("href").indexOf("tel:") < 0
        ) {
          link.addEventListener("click", (e) => {
            if (!e.metaKey && !e.ctrlKey) {
              e.preventDefault();
              SFmain.classList.add("slideframe--visible");
              document.body.classList.add(
                "slideframe-body--noscroll",
                "slideframe-body--loading"
              );
              let href = link.getAttribute("href");
              SFframe.setAttribute("src", href);
              SFframe.setAttribute(
                "title",
                link.hasAttribute("title")
                  ? link.getAttribute("title")
                  : link.innerText
              );
              SFtitle.innerText = link.hasAttribute("title")
                ? link.getAttribute("title")
                : link.innerText;
              SFexternal.setAttribute("href", link.getAttribute("href"));
            }
          });
        }
      }
    });
  }
  SFback.addEventListener("click", (e) => {
    SFmain.classList.remove("slideframe--visible");
    document.body.classList.remove(
      "slideframe-body--noscroll",
      "slideframe-body--loading"
    );
    setTimeout((e) => {
      SFframe.setAttribute("src", "");
    }, 200);
  });
  SFclose.addEventListener("click", (e) => {
    SFmain.classList.remove("slideframe--visible");
    document.body.classList.remove(
      "slideframe-body--noscroll",
      "slideframe-body--loading"
    );
    setTimeout((e) => {
      SFframe.setAttribute("src", "");
    }, 200);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      SFmain.classList.remove("slideframe--visible");
      document.body.classList.remove(
        "slideframe-body--noscroll",
        "slideframe-body--loading"
      );
      setTimeout((e) => {
        SFframe.setAttribute("src", "");
      }, 200);
    }
  });
  SFframe.addEventListener("load", (e) => {
    document.body.classList.remove("slideframe-body--loading");
  });
};
slideFrame();
// Define the unorphanize function
function unorphanize(elements, options = {}) {
  // Set default options with destructuring
  const { count = 1 } = options;
  // Iterate over each matched element
  elements.forEach(function (element) {
    let content = element.innerHTML;
    // Match HTML tags and store them in an array
    const tags = content.match(/<([A-Z][A-Z0-9]*)\b[^>]*>/gi) || [];
    const placeholders = [];
    // Replace tags with placeholders
    tags.forEach((tag, index) => {
      placeholders.push(tag);
      content = content.replace(tag, `__${index}__`);
    });
    // Replace spaces with non-breaking spaces to prevent orphans
    for (let i = 0; i < count; i++) {
      const lastSpaceIndex = content.lastIndexOf(" ");
      if (lastSpaceIndex > 0) {
        content =
          content.substring(0, lastSpaceIndex) +
          "&nbsp;" +
          content.substring(lastSpaceIndex + 1);
      }
    }
    // Restore original tags from placeholders
    placeholders.forEach((tag, index) => {
      const regex = new RegExp(`__${index}__`, "g");
      content = content.replace(regex, tag);
    });
    // Update the HTML content
    element.innerHTML = content;
  });
}
// Run the unorphanize function and set up accordion headers
document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".no-wrap");
  unorphanize(elements, { count: 1 });
  // Default count set here; can be modified
  // Ensure all accordion headers are focusable before adding event listeners
  document.querySelectorAll(".accordion-header").forEach((header) => {
    if (header.tabIndex < 0) {
      header.setAttribute("tabindex", "0");
    }
  });
  // Add the event listener with debouncing
  let debounceTimer;
  document.addEventListener("keyup", function (event) {
    clearTimeout(debounceTimer);
    // Clear any previously set timer
    // Set a new debounce timer to delay execution
    debounceTimer = setTimeout(() => {
      if (event.key === "Enter") {
        const focusedElement = document.activeElement;
        // Ensure focused element is an accordion-header and is focusable
        if (
          focusedElement.classList.contains("accordion-header") &&
          focusedElement.tabIndex >= 0
        ) {
          event.preventDefault(); // Prevent default action if necessary
          focusedElement.click(); // Simulate a click on the focused accordion header
        }
      }
    }, 200); // Set the debounce delay (200ms in this case)
  });
});