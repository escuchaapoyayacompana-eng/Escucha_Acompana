/* ===============================
   VIEW MANAGER
   Handles feature navigation
   =============================== */

import { initQueSon } from "../features/queSon.js";
import { initCuandoAplicar } from "../features/cuandoAplicar.js";
import { initComoAplicar } from "../features/comoAplicar.js";
import { initQueNoHacer } from "../features/queNoHacer.js";
import { initCanalizacion } from "../features/canalizacion.js";
import { initAutocuidado } from "../features/autocuidado.js";
import { initUbicacion } from "../features/ubicacion.js";
import { initReferencias } from "../features/referencias.js";
import { observeNewContent } from "./animations.js";

const featureMap = {
  queSon: initQueSon,
  cuandoAplicar: initCuandoAplicar,
  comoAplicar: initComoAplicar,
  queNoHacer: initQueNoHacer,
  canalizacion: initCanalizacion,
  autocuidado: initAutocuidado,
  ubicacion: initUbicacion,
  referencias: initReferencias,
};

export function initViewManager() {
  const featureView = document.getElementById("feature-view");
  const backButton = document.getElementById("back-button");
  const featureContent = document.getElementById("feature-content");
  const featureViewContent = document.querySelector(".feature-view__content");
  const modulesSection = document.getElementById("modulos");

  if (!featureView || !backButton || !featureContent || !featureViewContent)
    return;

  // Navigate to feature
  document.addEventListener("feature:navigate", (event) => {
    const { feature } = event.detail;
    const initFn = featureMap[feature];

    if (!initFn) {
      featureContent.innerHTML = `<p class="text-muted">Contenido próximamente</p>`;
      return;
    }

    // Show feature view, hide modules
    featureView.hidden = false;
    if (modulesSection) modulesSection.hidden = true;

    // Reset animation state
    featureViewContent.classList.remove("visible");

    // Init feature content
    initFn();

    // Scroll to feature view (not top of page)
    featureView.scrollIntoView({ behavior: "smooth", block: "start" });

    // Trigger entrance animation
    requestAnimationFrame(() => {
      featureViewContent.classList.add("visible");
      observeNewContent(featureViewContent);
    });
  });

  // Back button
  backButton.addEventListener("click", closeFeatureView);

  function closeFeatureView() {
    featureView.hidden = true;
    if (modulesSection) modulesSection.hidden = false;
    featureContent.innerHTML = "";
    featureViewContent.classList.remove("visible");

    // Scroll to modules
    requestAnimationFrame(() => {
      modulesSection?.scrollIntoView({ behavior: "smooth" });
    });
  }
}
