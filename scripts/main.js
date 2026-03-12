/* ===============================
   MAIN ENTRY POINT
   =============================== */

import { initScrollAnimations } from "./core/animations.js";
import { initCardNavigation } from "./core/router.js";
import { initViewManager } from "./core/viewManager.js";
import { initStarRating } from "./core/star-rating.js";
import { initEvaluacionModal } from "./features/evaluacion.js";

document.addEventListener("DOMContentLoaded", () => {
  initScrollAnimations();
  initCardNavigation();
  initViewManager();
  initSidebar();
  initHero();
  initStarRating();
  
  // Wire up the new global Evaluation modal triggers
  const btnNavDesktop = document.getElementById("btn-nav-calificar-desktop");
  const btnNavMobile = document.getElementById("btn-nav-calificar-mobile");
  const btnNavModules = document.getElementById("btn-nav-calificar-modules");
  
  [btnNavDesktop, btnNavMobile, btnNavModules].forEach(btn => {
    if (btn) btn.addEventListener("click", (e) => {
      e.preventDefault();
      initEvaluacionModal();
    });
  });
});

/* ── Sidebar navigation logic ── */
function initSidebar() {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("sidebar-toggle");
  const overlay = document.getElementById("sidebar-overlay");

  if (!sidebar) return;

  // Desktop nav links with data-feature
  sidebar.querySelectorAll(".sidebar__link[data-feature]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const feature = link.dataset.feature;
      if (feature) {
        document.dispatchEvent(
          new CustomEvent("feature:navigate", { detail: { feature } }),
        );
      }
      // Close mobile sidebar if open
      closeMobileSidebar();
    });
  });

  // Mobile toggle
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = sidebar.classList.toggle("sidebar--open");
      if (isOpen) {
        overlay.classList.add("sidebar__overlay--visible");
        document.body.style.overflow = "hidden";
      } else {
        closeMobileSidebar();
      }
    });
  }

  // Close on overlay click
  if (overlay) {
    overlay.addEventListener("click", closeMobileSidebar);
  }

  function closeMobileSidebar() {
    sidebar.classList.remove("sidebar--open");
    overlay?.classList.remove("sidebar__overlay--visible");
    document.body.style.overflow = "";
  }
}

/* ── Hero interactions ── */
function initHero() {
  const scrollBtn = document.getElementById("scroll-indicator");
  const btnComenzar = document.getElementById("btn-comenzar");

  if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
      document
        .getElementById("modulos")
        ?.scrollIntoView({ behavior: "smooth" });
    });
  }

  if (btnComenzar) {
    btnComenzar.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .getElementById("modulos")
        ?.scrollIntoView({ behavior: "smooth" });
    });
  }
}
