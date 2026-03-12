/* ============================================
   FEATURE: Autocuidado
   ============================================ */

import { initGameAutocuidado } from "./gameAutocuidado.js";

export function initAutocuidado() {
  const container = document.getElementById("feature-content");
  if (!container) return;
  container.innerHTML = "";

  const section = document.createElement("div");
  section.className = "module-content";

  section.innerHTML = `
    <!-- Header -->
    <div class="module-header" style="margin-bottom: var(--spacing-xl);">
      <p class="module-header__eyebrow fade-in-up">Módulo 6</p>
      <h2 class="module-header__title fade-in-up" data-delay="1">Autocuidado</h2>
      <p class="module-header__subtitle fade-in-up" data-delay="2">
        Cuida tu bienestar emocional y físico para poder brindar apoyo de manera responsable.
      </p>
    </div>

    <!-- Hero Image Center -->
    <div class="module-hero-image fade-in-up" data-delay="2" style="max-width: 800px; margin-inline: auto; margin-bottom: var(--spacing-2xl);">
      <img src="./assets/images/autocuidado_intro.png" alt="Ilustraciones de prácticas de Autocuidado" style="width: 100%; height: auto; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
    </div>

    <!-- Definition -->
    <div class="highlight-box fade-in-up" data-delay="3">
      <p class="highlight-box__text">
        <strong>Autocuidado:</strong> "Es la capacidad de promover su propia salud, prevenir enfermedades, mantener la salud y afrontar la enfermedad con o sin el apoyo de un profesional de la salud o de la atención sanitaria".(WHO, 2024)</em>
      </p>
    </div>

    <!-- Key message -->
    <div class="info-card info-card--highlight fade-in-up" data-delay="4">
      <p class="text-md">
        <strong>"Recuerda que brindar apoyo de forma responsable significa cuidar tu propia salud
        y bienestar.</strong> Tener la certeza de que se es capaz, física y emocionalmente, de ayudar
        a otras personas." <em> (OMS, 2012, citado en Centros de Integración Juvenil, s. f.)</em>
      </p>
    </div>

    <!-- Desgaste warning -->
    <div class="fade-in-up">
      <h3 class="heading-4" style="margin-bottom: var(--spacing-md);">Riesgo de desgaste</h3>
      <p class="text-md text-muted" style="margin-bottom: var(--spacing-lg);">
        El autocuidado integral de quien brinda orientación es prioritario. La exposición prolongada
        al acompañamiento genera una elevada carga de estrés. De no gestionarse, el interventor corre
        el riesgo de caer en el agotamiento y adoptar ideas erróneas como:
      </p>
      <div style="display: flex; flex-direction: column; gap: var(--spacing-sm); margin-bottom: var(--spacing-xl);">
        <div class="alert-card alert-card--warning">
          <div class="alert-card__icon">⚠️</div>
          <div class="alert-card__content">
            <p class="alert-card__desc">Tratar de resolver todo tomando el papel de protagonista.</p>
          </div>
        </div>
        <div class="alert-card alert-card--warning">
          <div class="alert-card__icon">⚠️</div>
          <div class="alert-card__content">
            <p class="alert-card__desc">Presionar para hablar cuando solo se debe escuchar.</p>
          </div>
        </div>
        <div class="alert-card alert-card--warning">
          <div class="alert-card__icon">⚠️</div>
          <div class="alert-card__content">
            <p class="alert-card__desc">Confundir la intención con la ejecución.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 1. Identificar estrés -->
    <div class="fade-in-up">
      <h3 class="heading-4" style="margin-bottom: var(--spacing-md);">
        1. Identifica si el estrés te está invadiendo
      </h3>
      <div class="symptom-grid">
        <div class="symptom-item"><span class="symptom-item__icon">😴</span> Dificultad para conciliar el sueño</div>
        <div class="symptom-item"><span class="symptom-item__icon">💪</span> Dolores musculares</div>
        <div class="symptom-item"><span class="symptom-item__icon">🍽️</span> Problemas digestivos</div>
        <div class="symptom-item"><span class="symptom-item__icon">😢</span> Dificultad para regular emociones</div>
        <div class="symptom-item"><span class="symptom-item__icon">👨‍👩‍👧</span> Alejamiento del ámbito familiar</div>
      </div>
    </div>

    <!-- Tips -->
    <div class="fade-in-up">
      <h3 class="heading-4" style="margin-bottom: var(--spacing-lg);">Toma en cuenta lo siguiente</h3>
      <div class="tips-grid">
        <div class="tip-item"><span class="tip-item__icon">🌱</span><span class="tip-item__text">Reconoce la resiliencia en ti mismo</span></div>
        <div class="tip-item"><span class="tip-item__icon">🤝</span><span class="tip-item__text">Busca red de apoyo para ti</span></div>
        <div class="tip-item"><span class="tip-item__icon">⏰</span><span class="tip-item__text">Prioriza tus ritmos estableciendo horarios</span></div>
        <div class="tip-item"><span class="tip-item__icon">🥗</span><span class="tip-item__text">Cuida tu alimentación, reduce la cafeína</span></div>
        <div class="tip-item"><span class="tip-item__icon">🙏</span><span class="tip-item__text">Acepta tus límites</span></div>
        <div class="tip-item"><span class="tip-item__icon">🎨</span><span class="tip-item__text">Fomenta el bienestar con tiempos de ocio</span></div>
        <div class="tip-item"><span class="tip-item__icon">🧘</span><span class="tip-item__text">Gestiona tu carga, escucha a tu cuerpo</span></div>
        <div class="tip-item"><span class="tip-item__icon">💭</span><span class="tip-item__text">Identifica, expresa y valida tus emociones</span></div>
        <div class="tip-item"><span class="tip-item__icon">☕</span><span class="tip-item__text">Toma un descanso, tu cuerpo lo necesita</span></div>
      </div>
    </div>

    <!-- 2. Técnica de respiración -->
    <div class="fade-in-up">
      <h3 class="heading-4" style="margin-bottom: var(--spacing-lg);">
        2. Técnica de manejo emocional — Respiración diafragmática
      </h3>
      <div class="breath-exercise">
        <div class="breath-exercise__circle">🌊</div>
        <h4 class="breath-exercise__title">Respiración diafragmática</h4>
        <div class="breath-steps">
          <p class="breath-steps__item">1. Realiza suaves inhalaciones por la nariz y exhalaciones por la boca.</p>
          <p class="breath-steps__item">2. Contén el aire unos instantes.</p>
          <p class="breath-steps__item">3. Concéntrate en el movimiento del abdomen y en el aire que entra y sale.</p>
          <p class="breath-steps__item">4. Continúa la actividad cinco minutos.</p>
        </div>
      </div>
    </div>

    <!-- 3. Técnica de relajación -->
    <div class="fade-in-up">
      <h3 class="heading-4" style="margin-bottom: var(--spacing-lg);">
        3. Técnica de relajación
      </h3>
      <div class="relax-steps">
        ${[
          "Siéntate cómodamente en tu silla colocando tu espalda derecha en el respaldo, tus glúteos en el asiento y tus pies bien asentados en el piso.",
          "Estira los brazos hacia el frente y aprieta los puños lo más que puedas. Inhala profundamente mientras los pones en tensión.",
          "Suelta el aire poco a poco y afloja la tensión de tus puños, permitiendo que tus brazos descansen sobre los costados de tu cuerpo.",
          "Repite esta operación agregando tus piernas. Continúa hasta lograr aflojar todo tu cuerpo.",
          "No olvides combinar la tensión con la inhalación y la relajación con la exhalación.",
        ]
          .map(
            (text, i) => `
          <div class="relax-step">
            <span class="relax-step__num">${i + 1}</span>
            <span class="relax-step__text">${text}</span>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>

    <!-- Escuche su cuerpo -->
    <div class="disclaimer fade-in-up">
      <span class="disclaimer__icon">💡</span>
      <p class="disclaimer__text">
        <strong>Escucha tu cuerpo:</strong> es el primer paso para poder ayudar a los demás.
        Si sientes que la situación te sobrepasa, busca apoyo profesional.
      </p>
    </div>

    <!-- CTA: Iniciar actividad -->
    <div class="fade-in-up" style="text-align: center; padding-top: var(--spacing-xl);">
      <button class="button button--primary button--lg" type="button" id="btn-actividad-autocuidado">
        Iniciar actividad
        <span class="button__icon" aria-hidden="true">→</span>
      </button>
    </div>
  `;

  container.append(section);

  // ── Wire CTA ──
  const btn = section.querySelector("#btn-actividad-autocuidado");
  if (btn) btn.addEventListener("click", () => initGameAutocuidado());
}
