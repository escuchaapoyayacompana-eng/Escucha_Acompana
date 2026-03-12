/* ===============================
   GAME: Autocuidado — ¿Qué harías para cuidarte?
   Multiple selection checkbox game with immediate feedback
   =============================== */

/* ─────────────────────────────────
   DATA
───────────────────────────────── */
const AUTOCUIDADO_OPTIONS = [
  { id: "opt-1", text: "Reconocer que está experimentando estrés.", correct: true },
  { id: "opt-2", text: "Ignorar los síntomas y seguir trabajando igual.", correct: false },
  { id: "opt-3", text: "Realizar respiración diafragmática durante unos minutos.", correct: true },
  { id: "opt-4", text: "Apretar y relajar los músculos para liberar tensión.", correct: true },
  { id: "opt-5", text: "Buscar apoyo o compartir la situación con otros.", correct: true },
  { id: "opt-6", text: "Presionarse para resolver todos los problemas de los demás.", correct: false },
  { id: "opt-7", text: "Establecer momentos de descanso y respetar sus límites.", correct: true },
];

const AUTOCUIDADO_SITUATION = "Después de varias semanas de acompañar a estudiantes con dificultades, un docente comienza a tener problemas para dormir, siente tensión en el cuerpo y le cuesta regular sus emociones.";
const AUTOCUIDADO_QUESTION = "¿Qué acciones reflejan autocuidado adecuado?";
const AUTOCUIDADO_FEEDBACK = "El autocuidado implica reconocer señales de estrés, escuchar el cuerpo y aplicar estrategias de regulación física y emocional para mantener el bienestar y poder acompañar a otros de manera responsable.";

/* ─────────────────────────────────
   STATE
───────────────────────────────── */
let acModal = null;
let acBody = null;
let hasChecked = false; // prevents re-checking

/* ─────────────────────────────────
   PUBLIC: init
───────────────────────────────── */
export function initGameAutocuidado() {
  hasChecked = false;

  acModal = document.getElementById("game-autocuidado-modal");
  acBody  = document.getElementById("game-autocuidado-body");

  if (!acModal || !acBody) return;

  if (acModal.parentNode !== document.body) {
    document.body.appendChild(acModal);
  }

  const isMobile = window.innerWidth < 640;

  Object.assign(acModal.style, {
    display:        "flex",
    position:       "fixed",
    inset:          "0",
    top: "0", left: "0", right: "0", bottom: "0",
    width:          "100vw",
    height:         "100vh",
    zIndex:         "99999",
    background:     "rgba(61, 40, 18, 0.88)",
    backdropFilter: "blur(6px)",
    alignItems:     isMobile ? "flex-end" : "center",
    justifyContent: "center",
    padding:        "0",
    boxSizing:      "border-box",
    overflow:       "hidden",
    opacity:        "0",
    transition:     "opacity 300ms ease",
  });

  const panel = acModal.querySelector(".game-modal__panel");
  if (panel) {
    Object.assign(panel.style, {
      width:         isMobile ? "100%" : "min(960px, 95vw)",
      maxHeight:     isMobile ? "96vh" : "90vh",
      borderRadius:  isMobile ? "20px 20px 0 0" : "20px",
      display:       "flex",
      flexDirection: "column",
      margin:        isMobile ? "auto auto 0 auto" : "auto",
      background:    "var(--color-background, #fff9f0)",
      overflow:      "hidden",
      boxSizing:     "border-box",
    });
    const body = panel.querySelector(".game-modal__body");
    if (body) {
      Object.assign(body.style, {
        flex:      "1 1 auto",
        overflowY: "auto",
        padding:   isMobile ? "1rem" : "1.5rem 2rem",
      });
    }
  }

  acModal.removeAttribute("hidden");

  // Lock scroll
  const scrollY = window.scrollY;
  document.body.dataset.scrollY = scrollY;
  document.body.style.overflow  = "hidden";
  document.body.style.position  = "fixed";
  document.body.style.top       = `-${scrollY}px`;
  document.body.style.width     = "100%";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => { acModal.style.opacity = "1"; });
  });

  const closeBtn = acModal.querySelector(".game-modal__close");
  if (closeBtn) closeBtn.onclick = closeAcModal;

  acModal._bdHandler = (e) => { if (e.target === acModal) closeAcModal(); };
  acModal.addEventListener("click", acModal._bdHandler);
  document.addEventListener("keydown", handleAcEsc);

  renderAcGame();
}

/* ─────────────────────────────────
   CLOSE
───────────────────────────────── */
function closeAcModal() {
  acModal.style.opacity = "0";
  const savedScroll = parseInt(document.body.dataset.scrollY || "0");
  document.body.style.overflow  = "";
  document.body.style.position  = "";
  document.body.style.top       = "";
  document.body.style.width     = "";
  window.scrollTo({ top: savedScroll, behavior: "instant" });
  document.removeEventListener("keydown", handleAcEsc);
  if (acModal._bdHandler) {
    acModal.removeEventListener("click", acModal._bdHandler);
    acModal._bdHandler = null;
  }
  setTimeout(() => {
    acModal.removeAttribute("style");
    acModal.setAttribute("hidden", "");
    acBody.innerHTML = "";
  }, 320);
}

function handleAcEsc(e) {
  if (e.key === "Escape") closeAcModal();
}

/* ─────────────────────────────────
   RENDER
───────────────────────────────── */
function renderAcGame() {
  const optionsHtml = AUTOCUIDADO_OPTIONS.map((opt) => `
    <label class="ac-option" id="label-${opt.id}">
      <input type="checkbox" class="ac-checkbox" value="${opt.id}" />
      <span class="ac-custom-check"></span>
      <span class="ac-option__text">${opt.text}</span>
      <span class="ac-option__icon" id="icon-${opt.id}"></span>
    </label>
  `).join("");

  acBody.innerHTML = `
    <!-- Instruction -->
    <div class="game-instruction" style="margin-bottom:var(--spacing-lg);">
      <strong>Instrucción:</strong> Lee la situación y selecciona las acciones que representan autocuidado según lo aprendido.
    </div>

    <!-- Situation Card -->
    <div class="ac-card" style="animation: gameFadeUp 400ms ease both;">
      <h3 class="ac-card__title">Situación:</h3>
      <p class="ac-card__text">${AUTOCUIDADO_SITUATION}</p>
      
      <h4 class="ac-card__question">${AUTOCUIDADO_QUESTION}</h4>
      
      <div class="ac-options">
        ${optionsHtml}
      </div>

      <div class="ac-action">
        <button class="button button--primary" id="btn-ac-check" type="button" disabled>
          Comprobar respuesta
        </button>
      </div>
    </div> <!-- Close ac-card -->

    <!-- Feedback Area (moved outside ac-card to match other games' light background) -->
    <div id="ac-feedback" style="display:none;"></div>
  `;

  attachAcEvents();
}

/* ─────────────────────────────────
   EVENTS
───────────────────────────────── */
function attachAcEvents() {
  const checkboxes = acBody.querySelectorAll(".ac-checkbox");
  const checkBtn   = document.getElementById("btn-ac-check");

  checkboxes.forEach((cb) => {
    cb.addEventListener("change", () => {
      // Enable check button if at least one checkbox is checked
      const checkedCount = Array.from(checkboxes).filter(c => c.checked).length;
      checkBtn.disabled = checkedCount === 0;
    });
  });

  checkBtn.addEventListener("click", showAcResult);
}

/* ─────────────────────────────────
   RESULT / COMPROBAR
───────────────────────────────── */
function showAcResult() {
  if (hasChecked) return;
  hasChecked = true;

  const checkboxes = acBody.querySelectorAll(".ac-checkbox");
  const checkBtn   = document.getElementById("btn-ac-check");
  const feedback   = document.getElementById("ac-feedback");

  // Disable button
  checkBtn.style.display = "none";

  // Evaluate options and calculate score
  let correctSelected = 0;
  let incorrectSelected = 0;
  let totalCorrectAvailable = 0;

  AUTOCUIDADO_OPTIONS.forEach((opt) => {
    if (opt.correct) totalCorrectAvailable++;

    const cb     = document.querySelector(`.ac-checkbox[value="${opt.id}"]`);
    const label  = document.getElementById(`label-${opt.id}`);
    const icon   = document.getElementById(`icon-${opt.id}`);
    const isChecked = cb.checked;

    // Disable checkbox
    cb.disabled = true;
    label.classList.add("ac-option--locked");

    if (isChecked) {
      if (opt.correct) {
        label.classList.add("ac-option--correct");
        icon.textContent = "✅";
        correctSelected++;
      } else {
        label.classList.add("ac-option--incorrect");
        icon.textContent = "❌";
        incorrectSelected++;
      }
    } else {
      if (opt.correct) {
        // Did not check a correct answer, highlight it slightly as missed
        label.classList.add("ac-option--missed");
        icon.textContent = "✓";
      }
    }
  });

  // Calculate score logic: 
  // Base score is correct ones selected, minus penalties for incorrect ones.
  // Minimum score is 0.
  let rawScore = correctSelected - incorrectSelected;
  if (rawScore < 0) rawScore = 0;
  
  const pct = Math.round((rawScore / totalCorrectAvailable) * 100);
  const emoji = pct === 100 ? "🏆" : pct >= 60 ? "🌟" : "💪";
  const msg =
    pct === 100
      ? "¡Excelente! Identificaste correctamente todas las acciones de autocuidado."
      : pct >= 60
        ? "¡Bien hecho! Tienes una buena noción del autocuidado, aunque puedes mejorar."
        : "¡Sigue practicando! Recuerda que cuidarte a ti mismo es fundamental para poder apoyar a otros.";

  // Replace modal body content entirely with the results screen
  acBody.innerHTML = `
    <div class="game-result">
      <span class="game-result__emoji">${emoji}</span>
      <h3 class="game-result__title">¡Actividad completada!</h3>
      
      <div class="game-score">
        <div class="game-score__item">
          <span class="game-score__num">${correctSelected} / ${totalCorrectAvailable}</span>
          <span class="game-score__lbl">Aciertos</span>
        </div>
        <div class="game-score__item">
          <span class="game-score__num">${incorrectSelected}</span>
          <span class="game-score__lbl">Errores</span>
        </div>
        <div class="game-score__item">
          <span class="game-score__num">${pct}%</span>
          <span class="game-score__lbl">Puntuación</span>
        </div>
      </div>
      
      <p style="color:var(--color-text-secondary);margin-bottom:var(--spacing-xl);text-align:center;">${msg}</p>

      <div class="game-result__reflection" style="text-align:left;">
        <strong>💡 Reflexión final</strong>
        ${AUTOCUIDADO_FEEDBACK}
      </div>
      
      <div style="display:flex;gap:var(--spacing-md);justify-content:center;flex-wrap:wrap;">
        <button class="button button--secondary" id="btn-ac-replay" type="button">🔄 Repetir actividad</button>
        <button class="button button--primary" id="btn-ac-close" type="button">
          Cerrar <span class="button__icon">✓</span>
        </button>
      </div>
    </div>
  `;

  // Wire buttons
  document.getElementById("btn-ac-replay")?.addEventListener("click", () => {
    hasChecked = false;
    renderAcGame();
  });
  document.getElementById("btn-ac-close")?.addEventListener("click", closeAcModal);
}
