// Hero Banner Module - Typing Animation
document.addEventListener('DOMContentLoaded', function() {
  const typingElements = document.querySelectorAll('.typing-text');
  
  typingElements.forEach(element => {
    const text = element.getAttribute('data-text');
    if (text) {
      // Force clear any existing content
      element.innerHTML = '';
      element.textContent = '';
      let index = 0;
      
      function type() {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;
          setTimeout(type, 100);
        }
      }
      
      setTimeout(type, 800);
    }
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});