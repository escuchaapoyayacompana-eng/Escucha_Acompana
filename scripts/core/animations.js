/* ===============================
   SCROLL ANIMATIONS
   IntersectionObserver-based
   =============================== */

const ANIMATION_CLASSES = [
  "fade-in-up",
  "fade-in",
  "scale-in",
  "slide-in-left",
  "slide-in-right",
];

let observer;

export function initScrollAnimations() {
  if (typeof IntersectionObserver === "undefined") {
    // Fallback: make everything visible
    document
      .querySelectorAll(ANIMATION_CLASSES.map((c) => `.${c}`).join(","))
      .forEach((el) => el.classList.add("visible"));
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  observeElements(document);
}

export function observeNewContent(container) {
  if (!observer || !container) return;
  observeElements(container);
}

function observeElements(root) {
  const selector = ANIMATION_CLASSES.map((c) => `.${c}:not(.visible)`).join(
    ",",
  );
  root.querySelectorAll(selector).forEach((el) => {
    observer.observe(el);
  });
}
