/* ===============================
   FEATURE: ¿Qué son?
   =============================== */

import { initGameQueSon } from "./gameQueSon.js";

export function initQueSon() {
  const container = document.getElementById("feature-content");
  if (!container) return;
  container.innerHTML = "";

  const section = document.createElement("div");
  section.className = "module-content";

  section.innerHTML = `
    <!-- Header with Image Split -->
    <div class="module-hero-split fade-in-up">
      <div class="module-header" style="text-align: left; margin-bottom: 0;">
        <p class="module-header__eyebrow">Módulo 1</p>
        <h2 class="module-header__title" data-delay="1">¿Qué son?</h2>
        <p class="module-header__subtitle" data-delay="2" style="margin-left: 0; margin-bottom: var(--spacing-lg);">
          Orientaciones para el apoyo emocional inmediato en situaciones de crisis
        </p>
        
        <div class="highlight-box" data-delay="3">
          <p class="highlight-box__text">
            <strong>Orientar</strong> "Orientar significa, fundamentalmente guiar, indicar, conducir, ayudar a conocerse a sí mismo y al mundo que rodea." (López y Sola, 2007, p. 2).
            <p>Es un apoyo que se proporciona a una persona afectada recientemente
            por un acontecimiento perturbador, de manera inmediata, para lograr una
            <strong>contención emocional</strong> y estabilizarla.</p>
          </p>
        </div>
      </div>
      
      <div class="module-hero-image fade-in-up" data-delay="3">
        <img src="./assets/images/escucha_apoya_acompana.png" alt="Escucha, Apoya, Acompaña - Ilustración del concepto">
      </div>
    </div>

    <!-- Orientacion Flowchart (Nuevo) -->
    <div class="orientacion-flow fade-in-up" data-delay="3">
      <div class="orientacion-flow__root">
        <span class="orientacion-flow__tag text-shadow">ORIENTACIÓN</span>
      </div>
      <div class="orientacion-flow__branches">
        <!-- Función branch -->
        <div class="orientacion-branch">
          <div class="orientacion-branch__connector orientacion-branch__connector--left"></div>
          <div class="orientacion-branch__header">
            <span class="orientacion-flow__tag">FUNCIÓN</span>
          </div>
          <div class="orientacion-branch__box">
            <ul>
              <li>Auxilia al individuo para clarificar su postura ante:</li>
            </ul>
            <p>- La vida, comprendiendo sus posibilidades y limitaciones.</p>
          </div>
        </div>

        <!-- Configura branch -->
        <div class="orientacion-branch">
          <div class="orientacion-branch__connector orientacion-branch__connector--right"></div>
          <div class="orientacion-branch__header">
            <span class="orientacion-flow__tag">CONFIGURA</span>
          </div>
          <div class="orientacion-branch__box">
            <p>
              Un marco de igualdad de oportunidades tanto para la
              actividad laboral, como para el tiempo de ocio.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Objetivo principal -->
    <div class="module-two-col">
      <div class="fade-in-up" data-delay="3">
        <h3 class="heading-4" style="margin-bottom: var(--spacing-md);">Objetivo principal</h3>
        <p class="text-lg text-muted" style="margin-bottom: var(--spacing-lg);">
          Reducir la intensidad de las emociones haciendo sentir a la otra persona escuchada, aceptada y
          apoyada, validando sus emociones.
        </p>
        <div class="info-card info-card--highlight" style="margin-bottom: var(--spacing-lg);">
          <p class="text-md">
            Este apoyo lo puede realizar <strong>cualquier persona</strong> en una sola sesión, con una
            capacitación previa. No sustituye la atención profesional.
          </p>
        </div>
      </div>
      <div class="fade-in-up" data-delay="4">
        <h3 class="heading-4" style="margin-bottom: var(--spacing-md);">Esencia de las orientaciones</h3>
        <div class="feature-list">
          <div class="feature-list__item">
            <span class="feature-list__bullet"></span>
            <span class="feature-list__text">Brindar apoyo de forma no invasiva</span>
          </div>
          <div class="feature-list__item">
            <span class="feature-list__bullet"></span>
            <span class="feature-list__text">Asumir la existencia de resiliencia natural en las personas</span>
          </div>
          <div class="feature-list__item">
            <span class="feature-list__bullet"></span>
            <span class="feature-list__text">Facilitar la generación de alternativas frente al evento</span>
          </div>
          <div class="feature-list__item">
            <span class="feature-list__bullet"></span>
            <span class="feature-list__text">Minimizar complicaciones de salud física o mental derivadas del evento</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Características clave -->
    <div>
      <h3 class="heading-4 text-center fade-in-up" style="margin-bottom: var(--spacing-xl);">
        Características clave
      </h3>
      <div class="que-son__chars-grid">
        <div class="char-card fade-in-up" data-delay="1">
          <div class="char-card__icon">🤝</div>
          <h4 class="char-card__title">Contención emocional</h4>
          <p class="char-card__desc">Brindar estabilidad y seguridad a la persona en crisis de forma inmediata.</p>
        </div>
        <div class="char-card fade-in-up" data-delay="2">
          <div class="char-card__icon">👂</div>
          <h4 class="char-card__title">Escucha activa</h4>
          <p class="char-card__desc">Prestar atención genuina a lo que la persona expresa verbal y no verbalmente.</p>
        </div>
        <div class="char-card fade-in-up" data-delay="3">
          <div class="char-card__icon">💚</div>
          <h4 class="char-card__title">Validación emocional</h4>
          <p class="char-card__desc">Reconocer y aceptar las emociones de la persona sin juzgar ni minimizar.</p>
        </div>
        <div class="char-card fade-in-up" data-delay="4">
          <div class="char-card__icon">⚡</div>
          <h4 class="char-card__title">Apoyo inmediato</h4>
          <p class="char-card__desc">Actuar de forma oportuna en el momento de mayor vulnerabilidad.</p>
        </div>
      </div>
    </div>

    <!-- Factores individuales -->
    <div class="fade-in-up">
      <div class="info-card" style="margin-bottom: var(--spacing-lg);">
        <p class="text-md text-muted" style="margin-bottom: var(--spacing-md);">
          Es importante considerar que cada individuo tiene una particular manera de expresarse
          a través de las palabras, el silencio o las conductas, debido a las diferencias individuales.
        </p>
      </div>
      <h4 class="heading-5" style="margin-bottom: var(--spacing-md);">Factores que influyen</h4>
      <div class="factors-grid">
        <div class="factor-tag"><span class="factor-tag__dot"></span> Edad</div>
        <div class="factor-tag"><span class="factor-tag__dot"></span> Personalidad</div>
        <div class="factor-tag"><span class="factor-tag__dot"></span> Cultura / Tradiciones</div>
        <div class="factor-tag"><span class="factor-tag__dot"></span> Cohesión social</div>
        <div class="factor-tag"><span class="factor-tag__dot"></span> Salud</div>
        <div class="factor-tag"><span class="factor-tag__dot"></span> Experiencias previas</div>
        <div class="factor-tag"><span class="factor-tag__dot"></span> Recursos personales</div>
        <div class="factor-tag"><span class="factor-tag__dot"></span> Tipo y duración del evento</div>
      </div>
    </div>

    <!-- Carácter preventivo -->
    <div class="disclaimer fade-in-up">
      <span class="disclaimer__icon">ℹ️</span>
      <p class="disclaimer__text">
        <strong>Carácter preventivo:</strong> Aunque las experiencias traumáticas son comunes,
        el pronóstico de recuperación varía y no todos los afectados logran mitigar los síntomas
        sin una intervención oportuna. La detección temprana y el apoyo inmediato son fundamentales.
      </p>
    </div>

    <!-- CTA: Iniciar actividad -->
    <div class="fade-in-up" style="text-align: center; padding-top: var(--spacing-xl);">
      <button class="button button--primary button--lg" type="button" id="btn-actividad-que-son">
        Iniciar actividad
        <span class="button__icon" aria-hidden="true">→</span>
      </button>
    </div>
  `;

  container.append(section);

  // Wire "Iniciar actividad" button to open the game modal
  const btnActividad = section.querySelector("#btn-actividad-que-son");
  if (btnActividad) {
    btnActividad.addEventListener("click", (e) => {
      e.preventDefault();
      initGameQueSon();
    });
  }
}
