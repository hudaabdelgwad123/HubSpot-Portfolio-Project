/**
 * Projects Showcase Module - Interactive Filtering
 * HubSpot CMS Theme
 */

(function() {
  'use strict';
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectsShowcase);
  } else {
    initProjectsShowcase();
  }
  
  function initProjectsShowcase() {
    const filterButtons = document.querySelectorAll('.projects-showcase__filter-btn');
    const projectCards = document.querySelectorAll('.projects-showcase__card');
    
    if (filterButtons.length === 0) return;
    
    // Filter functionality
    filterButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const filterValue = this.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(function(btn) {
          btn.classList.remove('projects-showcase__filter-btn--active');
        });
        this.classList.add('projects-showcase__filter-btn--active');
        
        // Filter projects
        projectCards.forEach(function(card) {
          const category = card.getAttribute('data-category');
          
          if (filterValue === 'all' || category === filterValue) {
            card.classList.remove('is-hidden');
            card.style.display = 'block';
            
            // Trigger reflow for animation
            setTimeout(function() {
              card.style.opacity = '1';
              card. style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card. style.transform = 'translateY(30px)';
            
            setTimeout(function() {
              card. classList.add('is-hidden');
              card.style.display = 'none';
            }, 400);
          }
        });
      });
    });
    
    // Intersection Observer for lazy loading images
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const image = entry.target;
            if (image.dataset.src) {
              image.src = image. dataset.src;
              image. removeAttribute('data-src');
            }
            imageObserver.unobserve(image);
          }
        });
      }, {
        rootMargin: '50px'
      });
      
      const images = document.querySelectorAll('.projects-showcase__image[data-src]');
      images.forEach(function(img) {
        imageObserver.observe(img);
      });
    }
  }
  
})();