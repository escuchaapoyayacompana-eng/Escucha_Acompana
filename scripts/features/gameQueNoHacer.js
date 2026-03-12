/* ===============================
   GAME: ¿Qué no hacer? — ¿Es apoyo en crisis o no?
   A/B click → instant inline feedback per situation
   =============================== */

/* ─────────────────────────────────
   DATA — 5 situaciones de las imágenes
───────────────────────────────── */
const CRISIS_DATA = [
  {
    id: 1,
    situation:
      "Una persona insiste en que el afectado explique exactamente qué pasó y analice lo ocurrido para entenderlo mejor.",
    options: [
      { label: "a", text: "No es adecuado en el apoyo en crisis", correct: true },
      { label: "b", text: "Sí es adecuado" },
    ],
    feedback:
      "En el apoyo en crisis no se pide analizar racionalmente el evento en ese momento, porque la persona puede estar en un estado de vulnerabilidad emocional.",
  },
  {
    id: 2,
    situation:
      "El acompañante escucha con calma y permite que la persona decida qué quiere compartir y cuándo.",
    options: [
      { label: "a", text: "Es parte del apoyo en crisis", correct: true },
      { label: "b", text: "No corresponde" },
    ],
    feedback:
      "El apoyo en crisis se basa en respeto, escucha y no forzar a la persona a hablar de sus emociones.",
  },
  {
    id: 3,
    situation:
      "El acompañante intenta diagnosticar un trastorno psicológico para ayudar mejor.",
    options: [
      { label: "a", text: "No corresponde al apoyo en crisis", correct: true },
      { label: "b", text: "Sí corresponde" },
    ],
    feedback:
      "El apoyo en crisis no realiza diagnósticos ni reemplaza la intervención de especialistas.",
  },
  {
    id: 4,
    situation:
      "La persona que acompaña reconoce que si la situación lo requiere, puede canalizar a especialistas.",
    options: [
      { label: "a", text: "No corresponde" },
      { label: "b", text: "Es parte del apoyo en crisis", correct: true },
    ],
    feedback:
      "El apoyo en crisis orienta y canaliza cuando es necesario, pero no sustituye a profesionales.",
  },
  {
    id: 5,
    situation:
      "El acompañante presiona al afectado para que exprese sus emociones inmediatamente.",
    options: [
      { label: "a", text: "No corresponde", correct: true },
      { label: "b", text: "Sí corresponde" },
    ],
    feedback:
      "El apoyo en crisis no es un medio de presión para que la persona hable o reviva la experiencia.",
  },
];

/* ─────────────────────────────────
   STATE
───────────────────────────────── */
let cnModal     = null;
let cnBody      = null;
let cnAnswers   = []; // null | true | false per situation

/* ─────────────────────────────────
   PUBLIC: init
───────────────────────────────── */
export function initGameQueNoHacer() {
  cnAnswers = new Array(CRISIS_DATA.length).fill(null);

  cnModal = document.getElementById("game-que-no-modal");
  cnBody  = document.getElementById("game-que-no-body");

  if (!cnModal || !cnBody) return;

  if (cnModal.parentNode !== document.body) {
    document.body.appendChild(cnModal);
  }

  cnModal.classList.add("game-modal--visible");
  cnModal.removeAttribute("hidden");

  // Lock scroll without jumping
  const scrollY = window.scrollY;
  document.body.dataset.scrollY = scrollY;
  document.body.style.overflow  = "hidden";
  document.body.style.position  = "fixed";
  document.body.style.top       = `-${scrollY}px`;
  document.body.style.width     = "100%";

  cnModal.classList.add("game-modal--visible");

  const closeBtn = cnModal.querySelector(".game-modal__close");
  if (closeBtn) closeBtn.onclick = closeCnModal;

  cnModal._bdHandler = (e) => { if (e.target === cnModal) closeCnModal(); };
  cnModal.addEventListener("click", cnModal._bdHandler);
  document.addEventListener("keydown", handleCnEsc);

  renderCrisisGame();
}

/* ─────────────────────────────────
   CLOSE
───────────────────────────────── */
function closeCnModal() {
  cnModal.classList.remove("game-modal--visible");
  const savedScroll = parseInt(document.body.dataset.scrollY || "0");
  document.body.style.overflow  = "";
  document.body.style.position  = "";
  document.body.style.top       = "";
  document.body.style.width     = "";
  window.scrollTo({ top: savedScroll, behavior: "instant" });
  document.removeEventListener("keydown", handleCnEsc);
  if (cnModal._bdHandler) {
    cnModal.removeEventListener("click", cnModal._bdHandler);
    cnModal._bdHandler = null;
  }
  setTimeout(() => {
    cnModal.removeAttribute("style");
    cnModal.setAttribute("hidden", "");
    cnBody.innerHTML = "";
  }, 320);
}

function handleCnEsc(e) {
  if (e.key === "Escape") closeCnModal();
}

/* ─────────────────────────────────
   RENDER
───────────────────────────────── */
function renderCrisisGame() {
  const cardsHtml = CRISIS_DATA.map((item, i) => `
    <div class="cn-card" id="cn-card-${i}">
      <div class="cn-card__header">
        <span class="cn-card__num">Situación ${item.id}</span>
      </div>
      <p class="cn-card__situation">${item.situation}</p>
      <div class="cn-card__options">
        ${item.options.map((opt) => `
          <button class="cn-option" type="button"
            data-card="${i}" data-correct="${opt.correct === true}">
            <span class="cn-option__label">${opt.label})</span>
            <span class="cn-option__text">${opt.text}</span>
          </button>
        `).join("")}
      </div>
      <div class="cn-feedback" id="cn-feedback-${i}">
        <span class="cn-feedback__icon"></span>
        <p class="cn-feedback__text"></p>
      </div>
    </div>
  `).join("");

  cnBody.innerHTML = `
    <!-- Instruction -->
    <div class="game-instruction" style="margin-bottom:var(--spacing-xl);">
      <strong>Instrucción</strong>
      Lee cada situación y decide si la acción corresponde al apoyo emocional en crisis o es algo que no se debe hacer.
    </div>

    <!-- Cards -->
    <div class="cn-cards" id="cn-cards">
      ${cardsHtml}
    </div>

    <!-- Counter + submit -->
    <div class="tf-submit-row" style="margin-top:var(--spacing-xl);">
      <button class="button button--primary" id="btn-cn-check" type="button" disabled>
        Ver resultado final
      </button>
      <div class="tf-counter" id="cn-counter">0 / ${CRISIS_DATA.length} respondidas</div>
    </div>

    <div id="cn-result" style="display:none;"></div>
  `;

  attachCnEvents();
}

/* ─────────────────────────────────
   EVENTS
───────────────────────────────── */
function attachCnEvents() {
  const allBtns  = cnBody.querySelectorAll(".cn-option");
  const checkBtn = document.getElementById("btn-cn-check");
  const counter  = document.getElementById("cn-counter");

  allBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cardIdx  = parseInt(btn.dataset.card);
      const isRight  = btn.dataset.correct === "true";

      if (cnAnswers[cardIdx] !== null) return; // already answered

      cnAnswers[cardIdx] = isRight;

      const card    = document.getElementById(`cn-card-${cardIdx}`);
      const fbEl    = document.getElementById(`cn-feedback-${cardIdx}`);
      const allOpts = card.querySelectorAll(".cn-option");

      // Mark chosen button
      btn.classList.add(isRight ? "cn-option--correct" : "cn-option--incorrect");

      // If wrong, highlight correct option
      if (!isRight) {
        allOpts.forEach((o) => {
          if (o.dataset.correct === "true") o.classList.add("cn-option--show-correct");
        });
      }

      // Disable all options for this card
      allOpts.forEach((o) => {
        o.disabled = true;
        o.classList.add("cn-option--done");
      });

      // Show feedback
      fbEl.querySelector(".cn-feedback__icon").textContent = isRight ? "✅" : "❌";
      fbEl.querySelector(".cn-feedback__text").textContent = CRISIS_DATA[cardIdx].feedback;
      fbEl.classList.add("cn-feedback--visible");
      fbEl.dataset.result = isRight ? "correct" : "incorrect";

      // Update counter
      const answered = cnAnswers.filter((a) => a !== null).length;
      counter.textContent = `${answered} / ${CRISIS_DATA.length} respondidas`;

      if (answered === CRISIS_DATA.length) {
        checkBtn.disabled = false;
      }
    });
  });

  checkBtn.addEventListener("click", showCnResult);
}

/* ─────────────────────────────────
   RESULT
───────────────────────────────── */
function showCnResult() {
  const correct = cnAnswers.filter(Boolean).length;
  const total   = CRISIS_DATA.length;
  const pct     = Math.round((correct / total) * 100);
  const emoji   = pct === 100 ? "🏆" : pct >= 60 ? "🌟" : "💪";
  const msg     =
    pct === 100
      ? "¡Excelente! Reconoces perfectamente qué acciones sí forman parte del apoyo en crisis."
      : pct >= 60
        ? "¡Bien! Tienes una buena comprensión del tema."
        : "¡Sigue practicando! Revisa el módulo para reforzar conceptos.";

  const resultEl = document.getElementById("cn-result");
  resultEl.style.display = "block";
  resultEl.innerHTML = `
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
        El apoyo en crisis implica escuchar con respeto, acompañar sin presionar, orientar sin diagnosticar y saber cuándo canalizar. Reconocer lo que NO se debe hacer es tan importante como saber qué hacer.
      </div>
      <div style="display:flex;gap:var(--spacing-md);justify-content:center;flex-wrap:wrap;margin-top:var(--spacing-xl);">
        <button class="button button--secondary" id="btn-cn-replay" type="button">🔄 Repetir actividad</button>
        <button class="button button--primary" id="btn-cn-close" type="button">
          Cerrar <span class="button__icon">✓</span>
        </button>
      </div>
    </div>
  `;

  resultEl.scrollIntoView({ behavior: "smooth", block: "start" });

  document.getElementById("btn-cn-close")?.addEventListener("click", closeCnModal);
  document.getElementById("btn-cn-replay")?.addEventListener("click", () => {
    cnAnswers = new Array(CRISIS_DATA.length).fill(null);
    renderCrisisGame();
  });
}
