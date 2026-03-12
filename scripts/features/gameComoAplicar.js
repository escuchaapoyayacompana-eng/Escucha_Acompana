/* ===============================
   GAME: ¿Cómo aplicarlas? — Verdadero o Falso
   =============================== */

/* ─────────────────────────────────
   DATA — 8 afirmaciones de la imagen
───────────────────────────────── */
const TF_DATA = [
  {
    statement: '"Escuchar a la persona con empatía y sin juzgar es una parte fundamental del apoyo."',
    answer: "V",
    feedback: null,
  },
  {
    statement: '"Cuando una persona está en crisis, lo más importante es darle consejos rápidos para solucionar su problema."',
    answer: "F",
    feedback: "Primero se debe escuchar y comprender la situación.",
  },
  {
    statement: '"Observar implica identificar si la persona está en peligro o necesita ayuda inmediata."',
    answer: "V",
    feedback: null,
  },
  {
    statement: '"Es correcto presionar a la persona para que hable si no quiere hacerlo."',
    answer: "F",
    feedback: "Se debe respetar su decisión y su ritmo.",
  },
  {
    statement: '"Proteger significa alejar a la persona de posibles peligros y cuidar su seguridad."',
    answer: "V",
    feedback: null,
  },
  {
    statement: '"Durante el acompañamiento es importante mantener la privacidad y confidencialidad."',
    answer: "V",
    feedback: null,
  },
  {
    statement: '"Quien brinda apoyo debe resolver completamente los problemas de la persona."',
    answer: "F",
    feedback: "El apoyo consiste en acompañar y ayudar a que la persona encuentre sus propios recursos.",
  },
  {
    statement: '"Conectar implica ayudar a la persona a buscar apoyo en familiares, amigos o servicios profesionales."',
    answer: "V",
    feedback: null,
  },
];

/* ─────────────────────────────────
   STATE
───────────────────────────────── */
let tfModal     = null;
let tfModalBody = null;
let userAnswers = []; // null | 'V' | 'F' per row

/* ─────────────────────────────────
   PUBLIC: init
───────────────────────────────── */
export function initGameComoAplicar() {
  userAnswers = new Array(TF_DATA.length).fill(null);

  tfModal     = document.getElementById("game-como-modal");
  tfModalBody = document.getElementById("game-como-body");

  if (!tfModal || !tfModalBody) return;

  if (tfModal.parentNode !== document.body) {
    document.body.appendChild(tfModal);
  }

  const isMobile = window.innerWidth < 640;

  Object.assign(tfModal.style, {
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

  const panel = tfModal.querySelector(".game-modal__panel");
  if (panel) {
    Object.assign(panel.style, {
      width:         isMobile ? "100%" : "min(1140px, 95vw)",
      maxHeight:     isMobile ? "96vh" : "95vh",
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

  tfModal.removeAttribute("hidden");
  // Lock scroll without jumping
  const scrollY = window.scrollY;
  document.body.dataset.scrollY = scrollY;
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = "100%";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => { tfModal.style.opacity = "1"; });
  });

  const closeBtn = tfModal.querySelector(".game-modal__close");
  if (closeBtn) closeBtn.onclick = closeTfModal;

  tfModal._bdHandler = (e) => { if (e.target === tfModal) closeTfModal(); };
  tfModal.addEventListener("click", tfModal._bdHandler);
  document.addEventListener("keydown", handleTfEsc);

  renderTfGame();
}

/* ─────────────────────────────────
   CLOSE
───────────────────────────────── */
function closeTfModal() {
  tfModal.style.opacity = "0";
  // Restore scroll without jumping
  const savedScroll = parseInt(document.body.dataset.scrollY || "0");
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  window.scrollTo({ top: savedScroll, behavior: "instant" });
  document.removeEventListener("keydown", handleTfEsc);
  if (tfModal._bdHandler) {
    tfModal.removeEventListener("click", tfModal._bdHandler);
    tfModal._bdHandler = null;
  }
  setTimeout(() => {
    tfModal.removeAttribute("style");
    tfModal.setAttribute("hidden", "");
    tfModalBody.innerHTML = "";
  }, 320);
}

function handleTfEsc(e) {
  if (e.key === "Escape") closeTfModal();
}

/* ─────────────────────────────────
   RENDER THE TABLE GAME
───────────────────────────────── */
function renderTfGame() {
  const rowsHtml = TF_DATA.map(
    (item, i) => `
    <div class="tf-row" id="tf-row-${i}">
      <div class="tf-row__statement">${item.statement}</div>
      <div class="tf-row__controls">
        <button class="tf-btn tf-btn--v" data-index="${i}" data-choice="V" type="button">
          <span class="tf-btn__icon">V</span>
          <span class="tf-btn__label">Verdadero</span>
        </button>
        <button class="tf-btn tf-btn--f" data-index="${i}" data-choice="F" type="button">
          <span class="tf-btn__icon">F</span>
          <span class="tf-btn__label">Falso</span>
        </button>
      </div>
      <div class="tf-row__feedback" id="tf-feedback-${i}"></div>
    </div>`
  ).join("");

  tfModalBody.innerHTML = `
    <!-- Instruction -->
    <div class="game-instruction" style="margin-bottom: var(--spacing-xl);">
      <strong>Instrucción</strong>
      Lee cada afirmación y decide si es Verdadera o Falsa según los principios de actuación de acompañamiento y apoyo.
    </div>

    <!-- Table header -->
    <div class="tf-table">
      <div class="tf-table__header">
        <div class="tf-header__statement">Afirmación</div>
        <div class="tf-header__vf">V &nbsp;/&nbsp; F</div>
        <div class="tf-header__feedback">Retroalimentación</div>
      </div>

      <div class="tf-table__body" id="tf-rows">
        ${rowsHtml}
      </div>
    </div>

    <!-- Submit / result area -->
    <div class="tf-submit-row">
      <button class="button button--primary" id="btn-tf-check" type="button" disabled>
        Verificar respuestas
      </button>
      <div class="tf-counter" id="tf-counter">0 / ${TF_DATA.length} respondidas</div>
    </div>

    <div class="tf-result-banner" id="tf-result" style="display:none;"></div>
  `;

  attachTfEvents();
}

/* ─────────────────────────────────
   EVENTS
───────────────────────────────── */
function attachTfEvents() {
  const allBtns  = tfModalBody.querySelectorAll(".tf-btn");
  const checkBtn = document.getElementById("btn-tf-check");
  const counter  = document.getElementById("tf-counter");

  allBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx    = parseInt(btn.dataset.index);
      const choice = btn.dataset.choice;

      // If already answered, ignore
      if (userAnswers[idx] !== null) return;

      userAnswers[idx] = choice;

      const row      = document.getElementById(`tf-row-${idx}`);
      const feedback = document.getElementById(`tf-feedback-${idx}`);
      const correct  = TF_DATA[idx].answer;
      const isRight  = choice === correct;

      // Mark the chosen button
      btn.classList.add(isRight ? "tf-btn--correct" : "tf-btn--incorrect");

      // If wrong, highlight correct answer
      if (!isRight) {
        const correctBtn = row.querySelector(`[data-choice="${correct}"]`);
        if (correctBtn) correctBtn.classList.add("tf-btn--show-correct");
      }

      // Disable both buttons for this row
      row.querySelectorAll(".tf-btn").forEach((b) => {
        b.disabled = true;
        b.classList.add("tf-btn--done");
      });

      // Show feedback for false answers
      if (TF_DATA[idx].feedback) {
        feedback.textContent = TF_DATA[idx].feedback;
        feedback.classList.add("tf-row__feedback--visible");
      } else if (isRight) {
        feedback.innerHTML = `<span style="color:var(--color-success);font-weight:600;">✓ Correcto</span>`;
        feedback.classList.add("tf-row__feedback--visible");
      }

      // Update counter
      const answered = userAnswers.filter((a) => a !== null).length;
      counter.textContent = `${answered} / ${TF_DATA.length} respondidas`;

      // Enable check when all answered
      if (answered === TF_DATA.length) {
        checkBtn.disabled = false;
        checkBtn.textContent = "Ver resultado final →";
      }
    });
  });

  checkBtn.addEventListener("click", showTfResult);
}

/* ─────────────────────────────────
   RESULT BANNER
───────────────────────────────── */
function showTfResult() {
  const correct = userAnswers.filter((a, i) => a === TF_DATA[i].answer).length;
  const total   = TF_DATA.length;
  const pct     = Math.round((correct / total) * 100);
  const emoji   = pct === 100 ? "🏆" : pct >= 75 ? "🌟" : "💪";
  const msg     =
    pct === 100
      ? "¡Perfecto! Dominas los principios de acompañamiento y apoyo emocional."
      : pct >= 75
        ? "¡Muy bien! Tienes una sólida comprensión del tema."
        : "¡Buen intento! Repasa el módulo para afianzar los conceptos.";

  const banner = document.getElementById("tf-result");
  banner.style.display = "block";
  banner.innerHTML = `
    <div class="game-result" style="margin-top:var(--spacing-xl);">
      <span class="game-result__emoji">${emoji}</span>
      <h3 class="game-result__title">¡Actividad completada!</h3>
      <div class="game-score">
        <div class="game-score__item">
          <span class="game-score__num">${correct}</span>
          <span class="game-score__lbl">Correctas</span>
        </div>
        <div class="game-score__item">
          <span class="game-score__num">${total}</span>
          <span class="game-score__lbl">Total</span>
        </div>
        <div class="game-score__item">
          <span class="game-score__num">${pct}%</span>
          <span class="game-score__lbl">Puntuación</span>
        </div>
      </div>
      <p style="color:var(--color-text-secondary);margin-bottom:var(--spacing-xl);">${msg}</p>
      <div class="game-result__reflection">
        <strong>💡 Reflexión final</strong>
        Aplicar el apoyo emocional requiere escucha activa, respeto por los tiempos de la persona, protección de su seguridad y confidencialidad, y acompañarla a encontrar sus propios recursos y redes de apoyo.
      </div>
      <div style="display:flex;gap:var(--spacing-md);justify-content:center;flex-wrap:wrap;margin-top:var(--spacing-xl);">
        <button class="button button--secondary" id="btn-tf-replay" type="button">🔄 Repetir actividad</button>
        <button class="button button--primary" id="btn-tf-close" type="button">
          Cerrar <span class="button__icon">✓</span>
        </button>
      </div>
    </div>
  `;

  banner.scrollIntoView({ behavior: "smooth", block: "start" });

  document.getElementById("btn-tf-close")?.addEventListener("click", closeTfModal);
  document.getElementById("btn-tf-replay")?.addEventListener("click", () => {
    userAnswers = new Array(TF_DATA.length).fill(null);
    renderTfGame();
  });
}
