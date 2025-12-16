/**
 * Skills Grid Module - Interactive Progress Bars
 * HubSpot CMS Theme
 */

(function() {
  'use strict';
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSkillsGrid);
  } else {
    initSkillsGrid();
  }
  
  function initSkillsGrid() {
    const skillCards = document.querySelectorAll('.skills-grid__card');
    
    if (skillCards.length === 0) return;
    
    // Create Intersection Observer for animations
    const observerOptions = {
      threshold:  0.3,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const card = entry.target;
          card.classList.add('is-visible');
          
          // Animate progress bar
          const progressFill = card.querySelector('.skills-grid__progress-fill');
          if (progressFill) {
            const progress = progressFill.getAttribute('data-progress');
            progressFill.style.setProperty('--progress-width', progress + '%');
            
            // Trigger animation
            setTimeout(function() {
              progressFill.style.width = progress + '%';
            }, 100);
          }
          
          // Stop observing after animation
          observer.unobserve(card);
        }
      });
    }, observerOptions);
    
    // Observe all skill cards
    skillCards.forEach(function(card) {
      observer.observe(card);
    });
  }
  
})();