// Modern Portfolio Theme JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // ==================== MOBILE MENU TOGGLE ====================
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navMenu = document.getElementById("navMenu");

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.classList.toggle("active");
      const isExpanded = this.getAttribute("aria-expanded") === "true";
      this.setAttribute("aria-expanded", !isExpanded);
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = this.classList.contains("active") ? "hidden" : "";
    });

    // Close menu when clicking on a nav link
    const navLinks = navMenu.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        mobileMenuToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        if (navMenu.classList.contains("active")) {
          mobileMenuToggle.classList.remove("active");
          navMenu.classList.remove("active");
          mobileMenuToggle.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        }
      }
    });
  }

  // ==================== SCROLL PROGRESS BAR ====================
  const scrollProgress = document.getElementById("scrollProgress");
  if (scrollProgress) {
    window.addEventListener("scroll", function () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.width = scrollPercentage + "%";
    });
  }

  // ==================== NAVBAR SCROLL EFFECT ====================
  const siteHeader = document.querySelector(".site-header");
  if (siteHeader) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    });
  }

  // ==================== ACTIVE NAV LINK ON SCROLL ====================
  const sections = document.querySelectorAll("section[id]");
  const navLinksForActive = document.querySelectorAll(".nav-link");

  function setActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinksForActive.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);

  // ==================== SMOOTH SCROLLING ====================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }
    });
  });

  // ==================== ANIMATE ON SCROLL ====================
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  animateElements.forEach(element => {
    observer.observe(element);
  });

  // ==================== PAGE LOAD ANIMATION ====================
  window.addEventListener('load', function() {
    document.body.classList.remove('loading');
  });

  console.log('🎨 Modern Portfolio Theme Loaded');
});

