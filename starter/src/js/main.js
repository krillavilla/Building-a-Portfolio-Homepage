(function () {
  const header = document.querySelector(".header");
  const toggle = document.querySelector(".header__toggle");
  const navList = document.getElementById("primary-nav");

  // Header shrink on scroll
  let lastY = 0;
  const shrinkThreshold = 10;
  const onScroll = () => {
    const y = window.scrollY || 0;
    if (y > shrinkThreshold) header.classList.add("header--shrink");
    else header.classList.remove("header--shrink");
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu toggle
  if (toggle && navList) {
    toggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("header--open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // On-scroll reveal using IntersectionObserver
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-inview");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }
})();