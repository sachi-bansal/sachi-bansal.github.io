// js/transitions.js
// Requires GSAP + ScrollTrigger CDN scripts loaded before this file.

gsap.registerPlugin(ScrollTrigger);

// --- Page fade-in on load ---
gsap.to(document.body, { opacity: 1, duration: 0.25, ease: "power1.out" });

// --- Intercept internal links for fade-out ---
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a[href]").forEach(link => {
    const href = link.getAttribute("href");
    // Skip: external links, anchor links, mailto, pdf downloads
    if (
      !href ||
      href.startsWith("http") ||
      href.startsWith("#") ||
      href.startsWith("mailto") ||
      href.endsWith(".pdf")
    ) return;

    link.addEventListener("click", e => {
      e.preventDefault();
      gsap.to(document.body, {
        opacity: 0,
        duration: 0.2,
        ease: "power1.in",
        onComplete: () => { window.location.href = href; }
      });
    });
  });

  // --- Scroll reveal: generic .reveal elements ---
  gsap.utils.toArray(".reveal").forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 85%" },
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: "power2.out"
    });
  });

  // --- Scroll reveal: .reveal-left slides from left ---
  gsap.utils.toArray(".reveal-left").forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 85%" },
      opacity: 0,
      x: -60,
      duration: 0.8,
      ease: "power2.out"
    });
  });

  // --- Scroll reveal: .reveal-right slides from right ---
  gsap.utils.toArray(".reveal-right").forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 85%" },
      opacity: 0,
      x: 60,
      duration: 0.8,
      ease: "power2.out"
    });
  });

  // --- Staggered reveal for groups ---
  gsap.utils.toArray(".reveal-group").forEach(group => {
    gsap.from(group.children, {
      scrollTrigger: { trigger: group, start: "top 85%" },
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out"
    });
  });

  // --- Mobile hamburger (populated by Task 12) ---
  const hamburger = document.querySelector(".nav__hamburger");
  const navLinks  = document.querySelector(".nav__links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
    document.querySelectorAll(".nav__dropdown > a").forEach(toggle => {
      toggle.addEventListener("click", e => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          toggle.closest(".nav__dropdown").classList.toggle("open");
        }
      });
    });
    document.addEventListener("click", e => {
      if (!e.target.closest(".nav")) navLinks.classList.remove("open");
    });
  }
});
