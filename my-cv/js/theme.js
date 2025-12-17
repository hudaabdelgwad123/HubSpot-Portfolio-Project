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
      document.body.style.overflow = this.classList.contains("active")
        ? "hidden"
        : "";
    });

    const shouldCloseOnClick = navMenu.dataset.closeOnClick !== "false";

    if (shouldCloseOnClick) {
      const navLinks = navMenu.querySelectorAll(".nav-link");
      navLinks.forEach((link) => {
        link.addEventListener("click", function () {
          mobileMenuToggle.classList.remove("active");
          navMenu.classList.remove("active");
          mobileMenuToggle.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        });
      });
    }

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
    let ticking = false;
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            const scrollTop =
              window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight =
              document.documentElement.scrollHeight -
              document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            scrollProgress.style.width = scrollPercentage + "%";
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  // ==================== NAVBAR SCROLL EFFECT ====================
  const siteHeader = document.querySelector(".site-header");
  if (siteHeader) {
    let headerTicking = false;
    window.addEventListener(
      "scroll",
      function () {
        if (!headerTicking) {
          window.requestAnimationFrame(function () {
            if (window.scrollY > 50) {
              siteHeader.classList.add("scrolled");
            } else {
              siteHeader.classList.remove("scrolled");
            }
            headerTicking = false;
          });
          headerTicking = true;
        }
      },
      { passive: true }
    );
  }

  // ==================== ACTIVE NAV LINK ON SCROLL ====================
  const sections = document.querySelectorAll("[id]");
  const navLinksForActive = document.querySelectorAll(
    ".nav-link:not(.nav-cta)"
  );

  function setActiveLink() {
    const scrollY = window.pageYOffset;
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 200;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = sectionId;
      }
    });

    // Handle when at very top of page
    if (scrollY < 100) {
      currentSection = sections[0]?.getAttribute("id") || "";
    }

    navLinksForActive.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === "#" + currentSection) {
        link.classList.add("active");
      }
    });
  }

  // Set initial active state
  setActiveLink();

  let activeLinkTicking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!activeLinkTicking) {
        window.requestAnimationFrame(function () {
          setActiveLink();
          activeLinkTicking = false;
        });
        activeLinkTicking = true;
      }
    },
    { passive: true }
  );

  // ==================== SMOOTH SCROLLING ====================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); // Always prevent default for hash links

      const href = this.getAttribute("href");
      if (href && href !== "#" && href.length > 1) {
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);

        if (target) {
          const headerOffset = 90;
          const targetPosition =
            target.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = targetPosition - headerOffset;

          // Smooth scroll with fallback
          if ("scrollBehavior" in document.documentElement.style) {
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          } else {
            // Fallback for browsers that don't support smooth scroll
            smoothScrollTo(offsetPosition, 600);
          }
        } else {
          console.warn("Target section not found:", href);
        }
      } else if (href === "#") {
        // Scroll to top for empty hash
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    });
  });

  // Smooth scroll polyfill function
  function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  // ==================== ANIMATE ON SCROLL ====================
  const animateElements = document.querySelectorAll(".animate-on-scroll");

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  animateElements.forEach((element) => {
    observer.observe(element);
  });

  // ==================== PAGE LOAD ANIMATION ====================
  window.addEventListener("load", function () {
    document.body.classList.remove("loading");
  });

  console.log("🎨 Modern Portfolio Theme Loaded");
});
