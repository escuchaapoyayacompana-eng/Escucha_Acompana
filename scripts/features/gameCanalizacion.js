/* ===============================
   GAME: ¿Cuándo canalizar?
   Flip-card reveal — click to discover
   =============================== */

/* ─────────────────────────────────
   CARD DATA — 6 situations from image
───────────────────────────────── */
const FLIP_CARDS = [
  {
    emoji: "🩹",
    title: "Persona con lesiones graves",
    label: "Se debe canalizar",
    reason: "Se debe priorizar la atención médica de urgencia.",
  },
  {
    emoji: "💭",
    title: "Persona con ideas suicidas",
    label: "Se debe canalizar",
    reason: "Requiere atención especializada inmediata.",
  },
  {
    emoji: "😵",
    title: "Persona confundida o desorientada",
    label: "Se debe canalizar",
    reason: "Puede necesitar evaluación profesional.",
  },
  {
    emoji: "🍶",
    title: "Persona bajo efectos de alcohol o drogas",
    label: "Se debe canalizar",
    reason: "Puede requerir atención especializada.",
  },
  {
    emoji: "💢",
    title: "Persona con conducta agresiva o destructiva",
    label: "Se debe canalizar",
    reason: "Existe riesgo para sí misma o para otras personas.",
  },
  {
    emoji: "👥",
    title: "Persona que no reconoce a sus redes de apoyo",
    label: "Se debe canalizar",
    reason: "Puede estar muy afectada o desorientada.",
  },
];

/* ─────────────────────────────────
   STATE
───────────────────────────────── */
let flipModal     = null;
let flipModalBody = null;
let flippedCount  = 0;

/* ─────────────────────────────────
   PUBLIC: init
───────────────────────────────── */
export function initGameCanalizacion() {
  flippedCount = 0;

  flipModal     = document.getElementById("game-canalizacion-modal");
  flipModalBody = document.getElementById("game-canalizacion-body");

  if (!flipModal || !flipModalBody) return;

  if (flipModal.parentNode !== document.body) {
    document.body.appendChild(flipModal);
  }

  const isMobile = window.innerWidth < 640;

  Object.assign(flipModal.style, {
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

  const panel = flipModal.querySelector(".game-modal__panel");
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

  flipModal.removeAttribute("hidden");

  // Lock scroll
  const scrollY = window.scrollY;
  document.body.dataset.scrollY = scrollY;
  document.body.style.overflow  = "hidden";
  document.body.style.position  = "fixed";
  document.body.style.top       = `-${scrollY}px`;
  document.body.style.width     = "100%";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => { flipModal.style.opacity = "1"; });
  });

  const closeBtn = flipModal.querySelector(".game-modal__close");
  if (closeBtn) closeBtn.onclick = closeFlipModal;

  flipModal._bdHandler = (e) => { if (e.target === flipModal) closeFlipModal(); };
  flipModal.addEventListener("click", flipModal._bdHandler);
  document.addEventListener("keydown", handleFlipEsc);

  renderFlipGame();
}

/* ─────────────────────────────────
   CLOSE
───────────────────────────────── */
function closeFlipModal() {
  flipModal.style.opacity = "0";
  const savedScroll = parseInt(document.body.dataset.scrollY || "0");
  document.body.style.overflow  = "";
  document.body.style.position  = "";
  document.body.style.top       = "";
  document.body.style.width     = "";
  window.scrollTo({ top: savedScroll, behavior: "instant" });
  document.removeEventListener("keydown", handleFlipEsc);
  if (flipModal._bdHandler) {
    flipModal.removeEventListener("click", flipModal._bdHandler);
    flipModal._bdHandler = null;
  }
  setTimeout(() => {
    flipModal.removeAttribute("style");
    flipModal.setAttribute("hidden", "");
    flipModalBody.innerHTML = "";
  }, 320);
}

function handleFlipEsc(e) {
  if (e.key === "Escape") closeFlipModal();
}

/* ─────────────────────────────────
   RENDER
───────────────────────────────── */
function renderFlipGame() {
  flippedCount = 0;

  const cardsHtml = FLIP_CARDS.map((card, i) => `
    <div class="flip-card" id="flip-card-${i}" data-index="${i}"
         style="animation-delay:${i * 60}ms">
      <!-- Inner (rotates on click) -->
      <div class="flip-card__inner" id="flip-inner-${i}">

        <!-- FRONT -->
        <div class="flip-card__front">
          <span class="flip-card__emoji">${card.emoji}</span>
          <p class="flip-card__title">${card.title}</p>
          <span class="flip-card__hint">Haz clic para descubrir →</span>
        </div>

        <!-- BACK -->
        <div class="flip-card__back">
          <span class="flip-card__emoji flip-card__emoji--sm">${card.emoji}</span>
          <div class="flip-card__badge">✅ ${card.label}</div>
          <p class="flip-card__reason">${card.reason}</p>
        </div>

      </div>
    </div>
  `).join("");

  flipModalBody.innerHTML = `
    <!-- Instruction -->
    <div class="game-instruction" style="margin-bottom:var(--spacing-xl);">
      <strong>Instrucción</strong>
      Observa las tarjetas y haz clic en cada una para descubrir si es una situación en la que se debe canalizar a la persona a ayuda especializada.
    </div>

    <!-- Counter -->
    <div class="flip-counter" id="flip-counter">
      <span id="flip-count">0</span> / ${FLIP_CARDS.length} descubiertas
    </div>

    <!-- Cards grid -->
    <div class="flip-grid" id="flip-grid">
      ${cardsHtml}
    </div>

    <!-- Completion message -->
    <div class="flip-completion" id="flip-completion" style="display:none;"></div>
  `;

  // Attach click events
  FLIP_CARDS.forEach((_, i) => {
    const card  = document.getElementById(`flip-card-${i}`);
    const inner = document.getElementById(`flip-inner-${i}`);
    card.addEventListener("click", () => {
      if (inner.classList.contains("flip-card__inner--flipped")) return;
      inner.classList.add("flip-card__inner--flipped");
      card.classList.add("flip-card--done");
      flippedCount++;
      document.getElementById("flip-count").textContent = flippedCount;
      if (flippedCount === FLIP_CARDS.length) {
        setTimeout(showFlipCompletion, 600);
      }
    });
  });
}

/* ─────────────────────────────────
   COMPLETION SCREEN
───────────────────────────────── */
function showFlipCompletion() {
  const el = document.getElementById("flip-completion");
  el.style.display = "block";
  el.innerHTML = `
    <div class="game-result" style="margin-top:var(--spacing-2xl);">
      <span class="game-result__emoji">🏆</span>
      <h3 class="game-result__title">¡Lo descubriste todo!</h3>
      <p style="color:var(--color-text-secondary);margin-bottom:var(--spacing-xl);">
        Has revisado las 6 situaciones en las que se debe canalizar a la persona hacia ayuda especializada.
      </p>
      <div class="game-result__reflection">
        <strong>💡 Reflexión final</strong>
        Canalizar a tiempo puede salvar vidas. Cuando la situación supera los límites del apoyo emocional inmediato, orientar a la persona hacia servicios especializados es la acción más responsable y empática que puedes tomar.
      </div>
      <div style="display:flex;gap:var(--spacing-md);justify-content:center;flex-wrap:wrap;margin-top:var(--spacing-xl);">
        <button class="button button--secondary" id="btn-flip-replay" type="button">🔄 Ver de nuevo</button>
        <button class="button button--primary" id="btn-flip-close" type="button">
          Cerrar <span class="button__icon">✓</span>
        </button>
      </div>
    </div>
  `;

  el.scrollIntoView({ behavior: "smooth", block: "start" });

  document.getElementById("btn-flip-close")?.addEventListener("click", closeFlipModal);
  document.getElementById("btn-flip-replay")?.addEventListener("click", () => {
    renderFlipGame();
  });
}
