// Animate statistics counters
document.addEventListener('DOMContentLoaded', function() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const text = element.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        
        if (! isNaN(number)) {
          let current = 0;
          const increment = number / 50;
          const suffix = text.replace(/[0-9]/g, '');
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
              element.textContent = number + suffix;
              clearInterval(timer);
            } else {
              element.textContent = Math.floor(current) + suffix;
            }
          }, 30);
        }
        
        observer.unobserve(element);
      }
    });
  }, {
    threshold: 0.5
  });
  
  statNumbers.forEach(stat => {
    observer.observe(stat);
  });
});