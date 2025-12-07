// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add active class to current navigation link
document.addEventListener("DOMContentLoaded", function () {
  const currentLocation =
    window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (
      linkPath === currentLocation ||
      (currentLocation === "" && linkPath === "index.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Add scroll progress indicator
  createScrollIndicator();

  // Initialize fade-in animations
  initScrollAnimations();

  // Add cursor glow effect
  initCursorGlow();
});

// Scroll Progress Indicator
function createScrollIndicator() {
  const indicator = document.createElement("div");
  indicator.className = "scroll-indicator";
  document.body.appendChild(indicator);

  window.addEventListener("scroll", () => {
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    indicator.style.width = scrolled + "%";
  });
}

// Fade in animation for sections on scroll
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px 0px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all sections for animation
  document.querySelectorAll("section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(section);
  });

  // Animate project cards
  document.querySelectorAll(".project-card").forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Animate interest list items
  document.querySelectorAll(".interest-list li").forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-20px)";
    item.style.transition = `opacity 0.5s ease ${
      index * 0.05
    }s, transform 0.5s ease ${index * 0.05}s`;
    observer.observe(item);
  });
}

// Cursor glow effect
function initCursorGlow() {
  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.2s ease;
        transform: translate(-50%, -50%);
    `;
  document.body.appendChild(glow);

  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

// Enhanced navbar on scroll
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.padding = "0.75rem 0";
    navbar.style.background = "rgba(26, 31, 58, 0.95)";
  } else {
    navbar.style.padding = "1rem 0";
    navbar.style.background = "rgba(26, 31, 58, 0.8)";
  }

  lastScroll = currentScroll;
});

// Add ripple effect to buttons
document.querySelectorAll(".project-link, .hero-links a").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Tech tag hover effects
document.querySelectorAll(".tech-tag").forEach((tag) => {
  tag.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px) scale(1.05)";
  });

  tag.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Typing effect for hero subtitle (optional - only on home page)
if (document.querySelector(".subtitle")) {
  const subtitle = document.querySelector(".subtitle");
  const text = subtitle.textContent;
  subtitle.textContent = "";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      subtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }

  // Start typing after page load
  setTimeout(typeWriter, 500);
}
