/* ===============================
   GAME: ¿Cuándo aplicar?
   Actividad interactiva — Opción múltiple
   =============================== */

/* ─────────────────────────────────
   QUIZ DATA — 5 escenarios
───────────────────────────────── */
const QUIZ_DATA = [
  {
    id: 1,
    situation:
      "Un estudiante llega al aula visiblemente angustiado después de recibir una noticia familiar inesperada. Dice que se siente confundido y no sabe qué hacer.",
    question: "¿Cuál sería la mejor acción del docente en este momento?",
    options: [
      { letter: "A", text: "Ignorar la situación y continuar con la clase." },
      { letter: "B", text: "Escuchar al estudiante y brindarle apoyo emocional inmediato.", correct: true },
      { letter: "C", text: "Comparar su situación con la de otras personas." },
      { letter: "D", text: "Decirle que no es tan grave." },
    ],
    feedback:
      "El apoyo emocional inmediato se aplica cuando una persona está atravesando una <strong>crisis emocional</strong> y necesita apoyo humano inmediato. Su objetivo es brindar contención y ayudar a reducir el malestar.",
    isLast: true,
  },
];

/* ─────────────────────────────────
   STATE
───────────────────────────────── */
let currentQ   = 0;
let scores     = []; // true/false per question
let qModal     = null;
let qModalBody = null;
let answered   = false;

/* ─────────────────────────────────
   PUBLIC: init
───────────────────────────────── */
export function initGameCuandoAplicar() {
  currentQ   = 0;
  scores     = [];
  answered   = false;

  qModal     = document.getElementById("game-cuando-modal");
  qModalBody = document.getElementById("game-cuando-body");

  if (!qModal || !qModalBody) return;

  // Guarantee modal is direct child of body
  if (qModal.parentNode !== document.body) {
    document.body.appendChild(qModal);
  }

  qModal.classList.add("game-modal--visible");
  qModal.removeAttribute("hidden");
  // Lock scroll without jumping
  const scrollY = window.scrollY;
  document.body.dataset.scrollY = scrollY;
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = "100%";

  qModal.classList.add("game-modal--visible");

  // Close handlers
  const closeBtn = qModal.querySelector(".game-modal__close");
  if (closeBtn) closeBtn.onclick = closeQuizModal;

  qModal._backdropHandler = (e) => { if (e.target === qModal) closeQuizModal(); };
  qModal.addEventListener("click", qModal._backdropHandler);
  document.addEventListener("keydown", handleQuizEsc);

  renderQuestion(currentQ);
}

/* ─────────────────────────────────
   CLOSE
───────────────────────────────── */
function closeQuizModal() {
  qModal.classList.remove("game-modal--visible");
  // Restore scroll without jumping
  const savedScroll = parseInt(document.body.dataset.scrollY || "0");
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  window.scrollTo({ top: savedScroll, behavior: "instant" });
  document.removeEventListener("keydown", handleQuizEsc);
  if (qModal._backdropHandler) {
    qModal.removeEventListener("click", qModal._backdropHandler);
    qModal._backdropHandler = null;
  }
  setTimeout(() => {
    qModal.removeAttribute("style");
    qModal.setAttribute("hidden", "");
    qModalBody.innerHTML = "";
  }, 320);
}

function handleQuizEsc(e) {
  if (e.key === "Escape") closeQuizModal();
}

/* ─────────────────────────────────
   RENDER QUESTION
───────────────────────────────── */
function renderQuestion(index) {
  answered = false;
  const q = QUIZ_DATA[index];
  if (!q) { renderQuizResult(); return; }

  const progress = Math.round((index / QUIZ_DATA.length) * 100);

  const optionsHtml = q.options
    .map(
      (opt) => `
      <button class="quiz-option" data-correct="${opt.correct || false}" type="button">
        <span class="quiz-option__letter">${opt.letter}</span>
        <span class="quiz-option__text">${opt.text}</span>
      </button>`
    )
    .join("");

  qModalBody.innerHTML = `
    <!-- Progress -->
    <div class="game-progress">
      <div class="game-progress__track">
        <div class="game-progress__fill" style="width:${progress}%"></div>
      </div>
      <span class="game-progress__label">Pregunta ${index + 1} / ${QUIZ_DATA.length}</span>
    </div>

    <div class="game-part" style="animation: gameFadeUp 400ms var(--ease-out-expo, cubic-bezier(0.16,1,0.3,1)) both;">

      <!-- Badge -->
      <div class="game-part__badge">🔍 Escenario ${index + 1}: ¿Cuándo aplicar?</div>

      <!-- Instruction -->
      <div class="game-instruction">
        <strong>Instrucción</strong>
        Lee la situación y elige la respuesta correcta.
      </div>

      <!-- Situation card -->
      <div class="quiz-situation">
        <div class="quiz-situation__label">📋 Situación</div>
        <p class="quiz-situation__text">${q.situation}</p>
      </div>

      <!-- Question -->
      <div class="quiz-question">${q.question}</div>

      <!-- Options -->
      <div class="quiz-options" id="quiz-options">
        ${optionsHtml}
      </div>

      <!-- Feedback (hidden until answer) -->
      <div class="quiz-feedback" id="quiz-feedback">
        <span class="quiz-feedback__icon" id="quiz-feedback-icon"></span>
        <div>
          <div class="quiz-feedback__label" id="quiz-feedback-label"></div>
          <p class="quiz-feedback__text" id="quiz-feedback-text"></p>
        </div>
      </div>

      <!-- Navigation -->
      <div class="game-nav">
        <div class="game-nav__left">
          ${index > 0
            ? `<button class="button button--secondary button--sm" id="btn-q-prev" type="button">← Anterior</button>`
            : ""}
        </div>
        <div class="game-nav__right">
          <button class="button button--primary button--sm" id="btn-q-next" type="button" disabled>
            ${index === QUIZ_DATA.length - 1 ? "Ver resultados →" : "Siguiente →"}
          </button>
        </div>
      </div>
    </div>
  `;

  qModalBody.scrollTop = 0;
  attachOptionEvents(q, index);
}

/* ─────────────────────────────────
   OPTION CLICK EVENTS
───────────────────────────────── */
function attachOptionEvents(q, index) {
  const options   = qModalBody.querySelectorAll(".quiz-option");
  const feedback  = document.getElementById("quiz-feedback");
  const fbIcon    = document.getElementById("quiz-feedback-icon");
  const fbLabel   = document.getElementById("quiz-feedback-label");
  const fbText    = document.getElementById("quiz-feedback-text");
  const btnNext   = document.getElementById("btn-q-next");
  const btnPrev   = document.getElementById("btn-q-prev");

  options.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (answered) return;
      answered = true;

      const isCorrect = btn.dataset.correct === "true";
      scores[index] = isCorrect;

      // Style all options
      options.forEach((o) => {
        o.disabled = true;
        o.classList.add("quiz-option--disabled");
        if (o.dataset.correct === "true") {
          o.classList.add("quiz-option--correct");
        }
      });
      if (!isCorrect) {
        btn.classList.add("quiz-option--incorrect");
      }

      // Show feedback
      fbIcon.textContent  = isCorrect ? "✅" : "❌";
      fbLabel.textContent = isCorrect ? "¡Correcto!" : "Respuesta incorrecta";
      fbText.innerHTML    = q.feedback;
      feedback.classList.add("quiz-feedback--visible");
      feedback.dataset.result = isCorrect ? "correct" : "incorrect";

      // Enable next
      if (btnNext) btnNext.disabled = false;
    });
  });

  if (btnNext) {
    btnNext.addEventListener("click", () => {
      currentQ++;
      renderQuestion(currentQ);
    });
  }
  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      currentQ--;
      renderQuestion(currentQ);
    });
  }
}

/* ─────────────────────────────────
   RESULT SCREEN
───────────────────────────────── */
function renderQuizResult() {
  const correctCount = scores.filter(Boolean).length;
  const total        = QUIZ_DATA.length;
  const pct          = Math.round((correctCount / total) * 100);

  const emoji = pct === 100 ? "🏆" : pct >= 60 ? "🌟" : "💪";
  const msg   =
    pct === 100
      ? "¡Excelente! Identificas perfectamente cuándo aplicar el apoyo emocional."
      : pct >= 60
        ? "¡Muy bien! Tienes una buena comprensión del tema."
        : "¡Buen intento! Revisa el módulo para reforzar los conceptos.";

  qModalBody.innerHTML = `
    <div class="game-progress" style="margin-bottom: var(--spacing-xl)">
      <div class="game-progress__track">
        <div class="game-progress__fill" style="width:100%"></div>
      </div>
      <span class="game-progress__label">5 / 5</span>
    </div>

    <div class="game-result">
      <span class="game-result__emoji">${emoji}</span>
      <h3 class="game-result__title">¡Actividad completada!</h3>

      <div class="game-score">
        <div class="game-score__item">
          <span class="game-score__num">${correctCount}</span>
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
        El apoyo emocional inmediato se aplica ante cualquier persona que esté atravesando una crisis emocional y esté dispuesta a recibirlo. Reconocer el momento oportuno marca la diferencia entre una intervención efectiva y una oportunidad perdida.
      </div>

      <div style="display:flex;gap:var(--spacing-md);justify-content:center;flex-wrap:wrap;">
        <button class="button button--secondary" id="btn-q-replay" type="button">🔄 Repetir actividad</button>
        <button class="button button--primary" id="btn-q-close" type="button">
          Cerrar <span class="button__icon">✓</span>
        </button>
      </div>
    </div>
  `;

  document.getElementById("btn-q-close")?.addEventListener("click", closeQuizModal);
  document.getElementById("btn-q-replay")?.addEventListener("click", () => {
    currentQ = 0;
    scores   = [];
    renderQuestion(0);
  });
}
