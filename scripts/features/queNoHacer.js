/* ============================================
   FEATURE: ¿Qué no hacer?
   Alert cards with warning styling
   ============================================ */

import { initGameQueNoHacer } from "./gameQueNoHacer.js";

export function initQueNoHacer() {
  const container = document.getElementById("feature-content");
  if (!container) return;
  container.innerHTML = "";

  const section = document.createElement("div");
  section.className = "module-content";

  const items = [
    {
      title: "No es algo que todas las personas afectadas necesitan",
      desc: "Algunas personas pueden afrontar la situación con sus propios recursos y redes de apoyo sin requerir intervención inmediata.",
      icon: "🚫",
    },
    {
      title: "No es terapia psicológica",
      desc: "No busca un proceso profundo ni continuo, sino brindar apoyo inmediato y contener emocionalmente en el momento de crisis.",
      icon: "🚫",
    },
    {
      title: "No es para hacer diagnósticos",
      desc: "No se evalúan trastornos ni se etiquetan conductas; solo se atiende la necesidad urgente de estabilidad emocional.",
      icon: "⚠️",
    },
    {
      title: "No es un interrogatorio invasivo",
      desc: "No se obliga a la persona a dar detalles ni a revivir la experiencia si no lo desea.",
      icon: "🚫",
    },
    {
      title: "No es asesoramiento profesional",
      desc: "No se ofrecen soluciones técnicas ni se reemplaza la intervención de especialistas; se orienta y canaliza si es necesario.",
      icon: "⚠️",
    },
    {
      title: "No es pedir al afectado que analice lo sucedido",
      desc: "No se busca que reflexione o explique racionalmente el evento en ese momento de vulnerabilidad.",
      icon: "🚫",
    },
    {
      title: "No es un medio de presión emocional",
      desc: "La persona decide qué compartir y cuándo; el apoyo se basa en el respeto y la escucha sin forzar.",
      icon: "🚫",
    },
  ];

  section.innerHTML = `
    <!-- Header -->
    <div class="module-header">
      <p class="module-header__eyebrow fade-in-up">Módulo 4</p>
      <h2 class="module-header__title fade-in-up" data-delay="1">¿Qué no hacer?</h2>
      <p class="module-header__subtitle fade-in-up" data-delay="2">
        Identifica las prácticas que debes evitar al brindar apoyo emocional.
      </p>
    </div>

    <!-- Alert cards & Image split -->
    <div class="module-hero-split fade-in-up" data-delay="3" style="align-items: stretch;">
      <!-- Left side: The alert cards -->
      <div style="flex: 1; display: flex; flex-direction: column; gap: var(--spacing-md);">
        ${items
          .map(
            (item, i) => `
          <div class="alert-card alert-card--danger fade-in-up" data-delay="${Math.min(i + 1, 7)}">
            <div class="alert-card__icon">${item.icon}</div>
            <div class="alert-card__content">
              <h4 class="alert-card__title">${item.title}</h4>
              <p class="alert-card__desc">${item.desc}</p>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>

      <!-- Right side: The image -->
      <div class="module-hero-image" style="flex: 1; max-width: 500px; display: flex; align-items: flex-start; justify-content: flex-end;">
        <img src="./assets/images/que_no_hacer_intro.png" alt="¿Qué no hacer? Ilustraciones de prevención" style="height: 100%; object-fit: contain; border-radius: var(--radius-lg);">
      </div>
    </div>

    <!-- Video Resumen Accordion -->
    <div class="fade-in-up" data-delay="8" style="margin-top: var(--spacing-xl); margin-bottom: var(--spacing-xl);">
      <div class="accordion" id="video-accordion">
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
                <iframe src="https://www.youtube.com/embed/srMqnXj8G4Y" title="Resumen: ¿Qué no hacer en Primeros Auxilios Emocionales?"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen loading="lazy" style="width:100%; height:100%; border:none; border-radius:var(--radius-lg);"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Disclaimer -->
    <div class="disclaimer fade-in-up">
      <span class="disclaimer__icon">ℹ️</span>
      <p class="disclaimer__text">
        <strong>Recuerda:</strong> Este apoyo no sustituye la atención profesional.
        Si la persona necesita ayuda especializada, canalizala a los servicios correspondientes.
      </p>
    </div>

    <!-- CTA: Iniciar actividad -->
    <div class="fade-in-up" style="text-align: center; padding-top: var(--spacing-xl);">
      <button class="button button--primary button--lg" type="button" id="btn-actividad-que-no">
        Iniciar actividad
        <span class="button__icon" aria-hidden="true">→</span>
      </button>
    </div>
  `;

  container.append(section);

  // ── Wire CTA ──
  const btn = section.querySelector("#btn-actividad-que-no");
  if (btn) btn.addEventListener("click", () => initGameQueNoHacer());

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

