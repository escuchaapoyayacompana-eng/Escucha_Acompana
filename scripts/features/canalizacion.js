/* ============================================
   FEATURE: Canalización
   ============================================ */

import { initGameCanalizacion } from "./gameCanalizacion.js";

export function initCanalizacion() {
  const container = document.getElementById("feature-content");
  if (!container) return;
  container.innerHTML = "";

  const situations = [
    "Cuando la persona está herida o lesionada gravemente y se debe priorizar su traslado para recibir atención de urgencia.",
    "Cuando la persona tiene ideas suicidas o representa un riesgo para otra u otras personas.",
    "Cuando la persona parece confundida y desorientada.",
    "Cuando la persona está muy alterada, al punto de no poder ocuparse de sí misma.",
    "Cuando la persona está tan afectada que puede presentar incapacidad para darse cuenta de lo ocurrido.",
    "Cuando la persona se encuentra bajo los efectos de alcohol u otras sustancias psicoactivas.",
    "Cuando no quiere hablar con nadie.",
    "Cuando presenta conducta agresiva y/o destructiva.",
  ];

  const section = document.createElement("div");
  section.className = "module-content";

  section.innerHTML = `
    <!-- Header with Image Split -->
    <div class="module-hero-split fade-in-up">
      <div class="module-header" style="text-align: left; margin-bottom: 0;">
        <p class="module-header__eyebrow">Módulo 5</p>
        <h2 class="module-header__title" data-delay="1">Canalización</h2>
        <p class="module-header__subtitle" data-delay="2" style="margin-left: 0;">
          Cuándo y cómo derivar a una persona hacia apoyo profesional especializado.
        </p>
      </div>
      
      <div class="module-hero-image fade-in-up" data-delay="3" style="max-width: 500px;">
        <img src="./assets/images/canalizacion_intro.png" alt="Canalización - Ilustración" style="object-fit: contain;">
      </div>
    </div>

    <!-- Definition -->
    <div class="highlight-box fade-in-up" data-delay="3">
      <p class="highlight-box__text">
        <strong>Canalizar:</strong> “vincular a una persona en peligro con personas, instituciones, centros u hospitales, para que reciba la atención necesaria y adecuada; esto puede realizarse al comunicarse directamente o brindando detalles de contacto a la persona afectada.”(Secretaría de Salud y CONASAMA, s. f., p. 54)
      </p>
    </div>

    <!-- Info cards -->
    <div class="module-two-col fade-in-up" data-delay="4">
      <div class="info-card">
        <h4 class="heading-5" style="margin-bottom: var(--spacing-sm);">🤝 Redes de apoyo</h4>
        <p class="text-md text-muted">
          Facilita el contacto con sus familiares, amigos u otras redes de apoyo.
          Sugiere que los llame si es necesario. También puedes sugerir apoyo de instituciones.
        </p>
      </div>
      <div class="info-card info-card--highlight">
        <h4 class="heading-5" style="margin-bottom: var(--spacing-sm);">📋 Evaluación previa</h4>
        <p class="text-md text-muted">
          Esta derivación o referencia se realiza cuando se ha evaluado a la persona
          y detectamos que necesita ayuda más allá de lo que podemos brindarle.
        </p>
      </div>
    </div>

    <!-- Situations list -->
    <div class="fade-in-up">
      <h3 class="heading-4" style="margin-bottom: var(--spacing-lg);">
        ⚠️ ¿Cuándo canalizar?
      </h3>
      <div class="canalizacion-situations">
        ${situations
          .map(
            (text, i) => `
          <div class="situation-item fade-in-up" data-delay="${Math.min(i + 1, 7)}">
            <span class="situation-item__icon">⚡</span>
            <span class="situation-item__text">${text}</span>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>

    <!-- Video Resumen Accordion -->
    <div class="fade-in-up" data-delay="8" style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-xl);">
      <div class="accordion" id="video-accordion-canalizacion">
        <div class="accordion__item" data-accordion-item>
          <button class="accordion__trigger" aria-expanded="false">
            <div class="accordion__trigger-left">
              <span class="accordion__step-badge" style="background:var(--color-primary); color:white;">🎥</span>
              <span class="accordion__trigger-title">Resumen en video</span>
            </div>
            <svg class="accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="accordion__panel">
            <div class="accordion__content" style="padding-bottom: var(--spacing-md);">
              <div class="hero__video-wrap" style="aspect-ratio: 16 / 9; max-width: 800px; margin-inline: auto; margin-top: var(--spacing-sm);">
                <iframe src="https://www.youtube.com/embed/mhD7CL6XHVM" title="Resumen: Canalización en Primeros Auxilios Emocionales"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen loading="lazy" style="width:100%; height:100%; border:none; border-radius:var(--radius-lg);"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA: Iniciar actividad -->
    <div class="fade-in-up" style="text-align: center; padding-top: var(--spacing-xl);">
      <button class="button button--primary button--lg" type="button" id="btn-actividad-canalizacion">
        Iniciar actividad
        <span class="button__icon" aria-hidden="true">→</span>
      </button>
    </div>
  `;

  container.append(section);

  // ── Wire CTA ──
  const btn = section.querySelector("#btn-actividad-canalizacion");
  if (btn) btn.addEventListener("click", () => initGameCanalizacion());

  // Init interactive accordion
  initAccordion(section);
}

function initAccordion(root) {
  const items = root.querySelectorAll("[data-accordion-item]");

  items.forEach((item) => {
    const trigger = item.querySelector(".accordion__trigger");
    if (!trigger) return;

    trigger.addEventListener("click", () => {
      const isActive = item.classList.contains("accordion__item--active");

      // Close all (only one in this case, but keeps it generic)
      items.forEach((i) => {
        i.classList.remove("accordion__item--active");
        const btn = i.querySelector(".accordion__trigger");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });

      // Toggle clicked
      if (!isActive) {
        item.classList.add("accordion__item--active");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });
}
