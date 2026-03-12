/* ===============================
   FEATURE: ¿Cuándo aplicarlas?
   =============================== */

import { initGameCuandoAplicar } from "./gameCuandoAplicar.js";

export function initCuandoAplicar() {
  const container = document.getElementById("feature-content");
  if (!container) return;
  container.innerHTML = "";

  const section = document.createElement("div");
  section.className = "module-content";

  section.innerHTML = `
    <!-- Header with Image Split -->
    <div class="module-hero-split fade-in-up">
      <div class="module-header" style="text-align: left; margin-bottom: 0;">
        <p class="module-header__eyebrow">Módulo 2</p>
        <h2 class="module-header__title" data-delay="1">¿Cuándo aplicarlas?</h2>
        <p class="module-header__subtitle" data-delay="2" style="margin-left: 0; margin-bottom: var(--spacing-lg);">
          Identifica las situaciones en las que este apoyo emocional es necesario y oportuno.
        </p>
        
        <div class="highlight-box" data-delay="3">
          <p class="highlight-box__text">
            Se aplican cuando alguien está pasando por una <strong>crisis emocional</strong> y necesita
            apoyo humano inmediato. Es fundamental actuar de forma empática y respetuosa.
          </p>
        </div>
      </div>
      
      <div class="module-hero-image fade-in-up" data-delay="3">
        <img src="./assets/images/cuando_aplicar_intro.png" alt="¿Cuándo aplicarlas? - Ilustración">
      </div>
    </div>

    <!-- Crisis definition -->
    <div class="crisis-definition fade-in-up" data-delay="4">
      <div class="crisis-definition__visual">
        <h3 class="crisis-definition__title">¿Qué es una crisis?</h3>
        <p class="crisis-definition__text">
          Es un estado temporal de desequilibrio emocional ante un evento inesperado
          o estresante que puede generar:
        </p>
        <div class="crisis-emotions">
          <span class="crisis-emotion-tag">Confusión</span>
          <span class="crisis-emotion-tag">Angustia</span>
          <span class="crisis-emotion-tag">Miedo</span>
          <span class="crisis-emotion-tag">Ansiedad</span>
        </div>
      </div>

      <div>
        <h3 class="heading-4" style="margin-bottom: var(--spacing-md);">Recuerda</h3>
        <p class="text-md text-muted" style="margin-bottom: var(--spacing-lg);">
          Básicamente se pueden aplicar cuando la persona se encuentre en crisis
          y esté dispuesta a recibirla.
        </p>

        <div class="info-card info-card--highlight">
          <p class="text-md">
            <strong>No son terapia ni sustituyen atención profesional.</strong>
            Son un apoyo inmediato para reducir el malestar, dar calma y ayudar
            a la persona a recuperar equilibrio.
          </p>
        </div>
      </div>
    </div>

    <!-- Qué NO hacer (importante) -->
    <div class="fade-in-up">
      <h3 class="heading-4" style="margin-bottom: var(--spacing-md);">
        ⚠️ Muy importante — NO debes:
      </h3>
      <div class="important-list">
        <div class="important-list__item">
          <span class="important-list__icon">🚫</span>
          <span class="important-list__text"><strong>Asumir</strong> lo que la persona siente o necesita</span>
        </div>
        <div class="important-list__item">
          <span class="important-list__icon">🚫</span>
          <span class="important-list__text"><strong>Victimizar</strong> ni reforzar la vulnerabilidad</span>
        </div>
        <div class="important-list__item">
          <span class="important-list__icon">🚫</span>
          <span class="important-list__text"><strong>Comparar</strong> con otras experiencias o personas</span>
        </div>
        <div class="important-list__item">
          <span class="important-list__icon">🚫</span>
          <span class="important-list__text"><strong>Callar</strong> o ignorar lo que la persona expresa</span>
        </div>
      </div>
    </div>

    <!-- CTA: Iniciar actividad -->
    <div class="fade-in-up" style="text-align: center; padding-top: var(--spacing-xl);">
      <button class="button button--primary button--lg" type="button" id="btn-actividad-cuando">
        Iniciar actividad
        <span class="button__icon" aria-hidden="true">→</span>
      </button>
    </div>
  `;

  container.append(section);

  // Wire button
  const btn = section.querySelector("#btn-actividad-cuando");
  if (btn) {
    btn.addEventListener("click", () => initGameCuandoAplicar());
  }
}
