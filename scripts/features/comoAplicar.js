/* ===============================
   FEATURE: ¿Cómo aplicarlas?
   Interactive accordion + pillar cards
   =============================== */

import { initGameComoAplicar } from "./gameComoAplicar.js";

export function initComoAplicar() {
  const container = document.getElementById("feature-content");
  if (!container) return;
  container.innerHTML = "";

  const section = document.createElement("div");
  section.className = "module-content";

  section.innerHTML = `
    <!-- Header -->
    <div class="module-header" style="margin-bottom: var(--spacing-xl);">
      <p class="module-header__eyebrow fade-in-up">Módulo 3</p>
      <h2 class="module-header__title fade-in-up" data-delay="1">¿Cómo aplicarlas?</h2>
      <p class="module-header__subtitle fade-in-up" data-delay="2">
        Proceso paso a paso y principios de actuación para brindar apoyo emocional.
      </p>
    </div>

    <!-- ═══ PROCESO EN 4 PASOS (Accordion Interactivo) ═══ -->
    <div class="fade-in-up" data-delay="3">
      <h3 class="heading-4" style="margin-bottom: var(--spacing-xl); text-align: center;">Proceso de intervención</h3>

      <div class="module-hero-split">
        <!-- Image on the Left -->
        <div class="module-hero-image" style="flex: 1; max-width: 450px; margin: 0 auto; display: flex; align-items: flex-start; justify-content: center;">
          <img src="./assets/images/como_aplicar_intro.png" alt="Proceso de Intervención en 4 pasos">
        </div>

        <!-- Accordion on the Right -->
        <div style="flex: 1; width: 100%;">
          <div class="accordion" id="steps-accordion">
            <!-- Paso 1 -->
        <div class="accordion__item accordion__item--active" data-accordion-item>
          <button class="accordion__trigger" aria-expanded="true">
            <div class="accordion__trigger-left">
              <span class="accordion__step-badge">1</span>
              <span class="accordion__trigger-title">Primer acercamiento</span>
            </div>
            <svg class="accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="accordion__panel">
            <div class="accordion__content">
              <p>Escucha los hechos y los sentimientos de la persona. Es importante mostrar <strong>interés y empatía</strong> genuina.</p>
              <div class="accordion__questions">
                <span class="accordion__question">¿Qué fue lo que pasó?</span>
                <span class="accordion__question">¿Cómo te sientes al respecto?</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Paso 2 -->
        <div class="accordion__item" data-accordion-item>
          <button class="accordion__trigger" aria-expanded="false">
            <div class="accordion__trigger-left">
              <span class="accordion__step-badge">2</span>
              <span class="accordion__trigger-title">Examinar las dimensiones</span>
            </div>
            <svg class="accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="accordion__panel">
            <div class="accordion__content">
              <p>Evalúa las dimensiones del problema en tres áreas (Slaikeu, 2000):</p>
              <p><strong>Pasado Inmediato:</strong> Acontecimientos que condujeron al estado de crisis.</p>
              <p><strong>Presente:</strong> Identificar fortalezas y debilidades con preguntas: ¿Qué?, ¿Cómo?...</p>
              <p><strong>Futuro:</strong> Indagar las dificultades que podría tener la persona y su familia.</p>
            </div>
          </div>
        </div>

        <!-- Paso 3 -->
        <div class="accordion__item" data-accordion-item>
          <button class="accordion__trigger" aria-expanded="false">
            <div class="accordion__trigger-left">
              <span class="accordion__step-badge">3</span>
              <span class="accordion__trigger-title">Explorar las soluciones posibles</span>
            </div>
            <svg class="accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="accordion__panel">
            <div class="accordion__content">
            <p><strong>Fomentar la autonomía:</strong> Motivar a la persona a actuar por sí misma y generar sus propias alternativas.</p>
              <p><strong>Recuperar intentos previos:</strong> Indagar qué acciones ya ha intentado la persona.</p>
              <p><strong>Actitud Facilitadora:</strong> Escuchar y dirigir la discusión. Brindar consejo y establecer acciones claras.</p>
              <p>En caso de incapacidad de afrontamiento, se canaliza a profesionales.</p>
              <p><strong>Propuesta de alternativas nuevas</strong> junto con la persona afectada.</p>
              <p><strong>Jerarquizar necesidades:</strong> Categorizar soluciones según sean urgentes.</p>
              <p><strong>Prever obstáculos:</strong> Identificar posibles barreras que dificulten la puesta en marcha de los planes.</p>
            </div>
          </div>
        </div>

        <!-- Paso 4 -->
        <div class="accordion__item" data-accordion-item>
          <button class="accordion__trigger" aria-expanded="false">
            <div class="accordion__trigger-left">
              <span class="accordion__step-badge">4</span>
              <span class="accordion__trigger-title">Ayudar a tomar una elección</span>
            </div>
            <svg class="accordion__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          <div class="accordion__panel">
            <div class="accordion__content">
              <p><strong>Se establece el siguiente rol:
 </strong> Motivar a la persona a actuar por sí misma y generar sus propias alternativas.</p>
              <p><strong>Actitud Facilitadora: </strong> Escuchar y dirigir la discusión.</p>
              <p>Escuchar y brindar consejo.</p>
              <p>Establecer acciones que debe realizar la persona.</p>
              <p>En caso de incapacidad de afrontamiento se canaliza a profesionales.</p>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>

    <!-- ═══ PRINCIPIOS DE ACTUACIÓN (4 Pilares) ═══ -->
    <div class="fade-in-up">
      <h3 class="heading-4 text-center" style="margin-bottom: var(--spacing-xs);">Principios básicos de actuación</h3>
      <p class="text-md text-muted text-center" style="margin-bottom: var(--spacing-xl); max-width: 500px; margin-inline: auto;">
        Los cuatro pilares fundamentales para brindar apoyo emocional responsable.
      </p>

      <div class="pillars-grid">
        <!-- Observar -->
        <div class="pillar-card fade-in-up" data-delay="1">
          <div class="pillar-card__icon" style="background: rgba(245,158,11,0.1); color: #F59E0B;">👁️</div>
          <h4 class="pillar-card__title" style="color: #F59E0B;">OBSERVAR</h4>
          <ul style="text-align: left; list-style-type: disc; margin-top: var(--spacing-md); padding-left: var(--spacing-lg); color: var(--color-text-secondary); font-size: var(--font-size-sm); line-height: 1.6; display: flex; flex-direction: column; gap: var(--spacing-xs);">
            <li>Si el apoyo es presencial: no acuda al lugar del evento si no está convencido de que está seguro.</li>
            <li>Identifique a personas con necesidades básicas urgentes o reacciones graves.</li>
            <li>Sea consciente de su rol, considere quién puede necesitar apoyo.</li>
            <li>Consiga asistencia para quienes requieren de apoyo adicional o especializado.</li>
            <li>Canalice a heridos a personal médico o de primeros auxilios físicos.</li>
          </ul>
        </div>

        <!-- Proteger -->
        <div class="pillar-card fade-in-up" data-delay="2">
          <div class="pillar-card__icon" style="background: rgba(16,185,129,0.1); color: #10B981;">🛡️</div>
          <h4 class="pillar-card__title" style="color: #10B981;">PROTEGER</h4>
          <ul style="text-align: left; list-style-type: disc; margin-top: var(--spacing-md); padding-left: var(--spacing-lg); color: var(--color-text-secondary); font-size: var(--font-size-sm); line-height: 1.6; display: flex; flex-direction: column; gap: var(--spacing-xs);">
            <li>Aleje a la persona de posibles peligros inminentes.</li>
            <li>Proteja de la exposición de los medios de comunicación.</li>
            <li>Si la persona está muy angustiada, no la deje sola.</li>
            <li>Cuide de violencia y discriminación a quienes padezcan problemas de salud o discapacidad física o mental.</li>
          </ul>
        </div>

        <!-- Escuchar -->
        <div class="pillar-card fade-in-up" data-delay="3">
          <div class="pillar-card__icon" style="background: rgba(59,130,246,0.1); color: #3B82F6;">👂</div>
          <h4 class="pillar-card__title" style="color: #3B82F6;">ESCUCHAR</h4>
          <ul style="text-align: left; list-style-type: disc; margin-top: var(--spacing-md); padding-left: var(--spacing-lg); color: var(--color-text-secondary); font-size: var(--font-size-sm); line-height: 1.6; display: flex; flex-direction: column; gap: var(--spacing-xs);">
            <li>Averigüe lo que es importante para la persona.</li>
            <li>A partir de lo que la persona mencione ayude a establecer prioridades.</li>
            <li>Indague acerca de lo que le preocupa.</li>
            <li>No presione a la persona.</li>
            <li>Escuche si decide contarle lo ocurrido.</li>
            <li>No narre sus propias experiencias.</li>
            <li>Ayude a la persona a tranquilizarse, después de escucharla con ejercicios de respiración en 8 tiempos.</li>
          </ul>
        </div>

        <!-- Conectar -->
        <div class="pillar-card fade-in-up" data-delay="4">
          <div class="pillar-card__icon" style="background: rgba(139,92,246,0.1); color: #8B5CF6;">🔗</div>
          <h4 class="pillar-card__title" style="color: #8B5CF6;">CONECTAR</h4>
          <ul style="text-align: left; list-style-type: disc; margin-top: var(--spacing-md); padding-left: var(--spacing-lg); color: var(--color-text-secondary); font-size: var(--font-size-sm); line-height: 1.6; display: flex; flex-direction: column; gap: var(--spacing-xs);">
            <li>Escuche si decide contarle lo ocurrido.</li>
            <li>No narre sus propias experiencias. Ayude a la persona a tranquilizarse, después de escucharla.</li>
            <li>Ayude a la persona a atender sus necesidades básicas.</li>
            <li>Ayude a que la persona acceda a servicios de apoyo.</li>
            <li>Brinde información veraz.</li>
            <li>Ayude a las personas a enfrentarse a los problemas.</li>
            <li>Ponga en contacto a las personas con sus seres queridos y/o sus redes de apoyo.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- The Observar section has been integrated into the pills above -->

    <!-- ═══ ACTITUD ═══ -->
    <div class="fade-in-up">
      <h3 class="heading-4" style="margin-bottom: var(--spacing-md);">Tu actitud importa</h3>
      <p class="text-md text-muted" style="margin-bottom: var(--spacing-lg);">
        Principios básicos que debes tomar en cuenta al brindar apoyo.
      </p>
      <div class="principios-list">
        ${[
          "Muéstrate honrado y digno de confianza.",
          "Respeta que la otra persona es libre de tomar sus propias decisiones.",
          "Mantén al margen tus prejuicios y preferencias personales.",
          "Si la persona rechaza la ayuda, infórmale que puede recibirla en un futuro.",
          "Respeta la privacidad y confidencialidad de los afectados.",
          "Actúa de forma oportuna con base en la cultura, edad y género de la persona.",
          "No trates de aprovecharte de tu autoridad.",
          "Evita pedir favores económicos a cambio de la ayuda.",
          "No realices promesas que no podrás cumplir.",
          "Mantén distancia, no puedes mostrarte prepotente o entrometido.",
          "Familiarízate con el contexto, normas sociales, culturales y religiosas.",
          "La ayuda que darás es para que la persona encuentre sus propios recursos.",
        ]
          .map(
            (text, i) => `
          <div class="principio-item">
            <span class="principio-item__num">${i + 1}</span>
            <span class="principio-item__text">${text}</span>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>

    <!-- CTA: Iniciar actividad -->
    <div class="fade-in-up" style="text-align: center; padding-top: var(--spacing-xl);">
      <button class="button button--primary button--lg" type="button" id="btn-actividad-como">
        Iniciar actividad
        <span class="button__icon" aria-hidden="true">→</span>
      </button>
    </div>
  `;

  container.append(section);

  // ── Wire CTA ──
  const btn = section.querySelector("#btn-actividad-como");
  if (btn) btn.addEventListener("click", () => initGameComoAplicar());

  // Init accordion interactivity
  initAccordion(section);
}

function initAccordion(root) {
  const items = root.querySelectorAll("[data-accordion-item]");

  items.forEach((item) => {
    const trigger = item.querySelector(".accordion__trigger");
    if (!trigger) return;

    trigger.addEventListener("click", () => {
      const isActive = item.classList.contains("accordion__item--active");

      // Close all
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
