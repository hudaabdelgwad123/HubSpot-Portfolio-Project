/**
 * Education Module - Timeline Animations
 * HubSpot CMS Theme
 */

(function () {
  "use strict";

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initEducation);
  } else {
    initEducation();
  }

  function initEducation() {
    const educationCards = document.querySelectorAll(".education-card");

    if (educationCards.length === 0) return;

    // Create Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const card = entry.target;
          card.classList.add("is-visible");

          // Stop observing after animation
          observer.unobserve(card);
        }
      });
    }, observerOptions);

    // Observe all education cards
    educationCards.forEach(function (card) {
      observer.observe(card);
    });
  }
})();
