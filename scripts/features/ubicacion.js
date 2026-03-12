/* ============================================
   FEATURE: Ubicación
   ============================================ */

import { initEvaluacionModal } from "./evaluacion.js";

export function initUbicacion() {
  const container = document.getElementById("feature-content");
  if (!container) return;
  container.innerHTML = "";

  const section = document.createElement("div");
  section.className = "module-content";

  section.innerHTML = `
    <!-- Header -->
    <div class="module-header">
      <p class="module-header__eyebrow fade-in-up">Módulo 7</p>
      <h2 class="module-header__title fade-in-up" data-delay="1">Ubicación</h2>
      <p class="module-header__subtitle fade-in-up" data-delay="2">
        Encuentra centros de apoyo y atención profesional en toda la República Mexicana.
      </p>
    </div>

    <!-- Map + Info -->
    <div class="ubicacion__map-section fade-in-up" data-delay="3">
      <div class="ubicacion__map-wrap">
        <img class="ubicacion__map" src="./assets/images/mexico.svg"
             alt="Mapa de México con ubicación de sedes CIJ"
             loading="lazy" />
      </div>

      <div class="ubicacion__info">
        <div class="info-card">
          <h3 class="heading-4" style="margin-bottom: var(--spacing-md);">📍 Centros de Integración Juvenil</h3>
          <p class="ubicacion__info-text">
            Para obtener las direcciones de todos los CIJ de la República Mexicana,
            consulta el directorio oficial. Encuentra el centro más cercano a tu ubicación.
          </p>
        </div>

        <a class="button button--primary button--lg"
           href="https://www.cij.org.mx:89/RedAtencion/"
           target="_blank"
           rel="noopener noreferrer">
          Consultar sedes oficiales
          <span class="button__icon" aria-hidden="true">→</span>
        </a>

        <div class="info-card info-card--highlight">
          <p class="text-sm text-muted">
            💡 Si necesitas ayuda inmediata, no dudes en contactar al centro más cercano.
            La línea de atención está disponible para orientarte.
          </p>
        </div>
      </div>
    </div>

    <!-- CTA: Iniciar actividad (Convertido a Evaluación) -->
    <div class="fade-in-up" style="text-align: center; padding-top: var(--spacing-xl);">
      <button class="button button--primary button--lg" type="button" id="btn-actividad-ubicacion">
        Califica nuestra página
        <span class="button__icon" aria-hidden="true">⭐</span>
      </button>
    </div>
  `;

  container.append(section);

  const btn = section.querySelector("#btn-actividad-ubicacion");
  if (btn) {
    btn.addEventListener("click", () => {
      initEvaluacionModal();
    });
  }
}

