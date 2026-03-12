/* ===============================
   GAME: ¿Qué son?
   Actividad interactiva — Drag & Drop
   =============================== */

/* ─────────────────────────────────
   GAME DATA — 5 parts
───────────────────────────────── */
const GAME_DATA = [
  /* ── Part 1 ── */
  {
    id: 1,
    title: "¿Qué es orientar?",
    type: "fill", // fill-in-the-blank
    instruction: "Arrastra las palabras correctas para completar la frase.",
    sentenceParts: [
      "Orientar significa ",
      null, // blank 0
      ", ",
      null, // blank 1
      " y ayudar a una persona a ",
      null, // blank 2
      " a sí misma y al mundo que la rodea.",
    ],
    blanks: [
      { answer: "guiar" },
      { answer: "conducir" },
      { answer: "comprenderse" },
    ],
    words: ["imponer", "guiar", "controlar", "conducir", "comprenderse"],
    wrongWords: ["imponer", "controlar"],
    correctSentence:
      "Orientar significa guiar, conducir y ayudar a una persona a comprenderse a sí misma y al mundo que la rodea.",
  },
  /* ── Part 2 ── */
  {
    id: 2,
    title: "Función de la orientación",
    type: "fill",
    instruction: "Arrastra las palabras correctas para completar la frase.",
    sentenceParts: [
      "La orientación auxilia al individuo para ",
      null,
      " su postura ante la ",
      null,
      ", comprendiendo sus ",
      null,
      " y ",
      null,
      ".",
    ],
    blanks: [
      { answer: "clarificar" },
      { answer: "vida" },
      { answer: "posibilidades" },
      { answer: "limitaciones" },
    ],
    words: ["limitaciones", "problemas", "vida", "posibilidades", "clarificar"],
    wrongWords: ["problemas"],
    correctSentence:
      "La orientación auxilia al individuo para clarificar su postura ante la vida, comprendiendo sus posibilidades y limitaciones.",
  },
  /* ── Part 3 ── */
  {
    id: 3,
    title: "Factores que influyen",
    type: "categorize",
    instruction:
      "Arrastra los elementos que influyen en la forma en que una persona enfrenta una situación.",
    words: [
      "Color favorito",
      "Edad",
      "Personalidad",
      "Música preferida",
      "Cultura",
      "Salud",
      "Marca de ropa",
      "Experiencias previas",
      "Recursos personales",
    ],
    correctWords: [
      "Edad",
      "Personalidad",
      "Cultura",
      "Salud",
      "Experiencias previas",
      "Recursos personales",
    ],
    wrongWords: ["Color favorito", "Música preferida", "Marca de ropa"],
  },
  /* ── Part 4 ── */
  {
    id: 4,
    title: "Apoyo emocional inmediato",
    type: "fill",
    instruction: "Arrastra las palabras correctas para completar la frase.",
    sentenceParts: [
      "El apoyo emocional inmediato se brinda a una persona afectada por un evento ",
      null,
      " con el objetivo de ofrecer ",
      null,
      " emocional.",
    ],
    blanks: [{ answer: "perturbador" }, { answer: "contención" }],
    words: ["perturbador", "control", "contención", "solución"],
    wrongWords: ["control", "solución"],
    correctSentence:
      "El apoyo emocional inmediato se brinda a una persona afectada por un evento perturbador con el objetivo de ofrecer contención emocional.",
  },
  /* ── Part 5 ── */
  {
    id: 5,
    title: "Objetivo del apoyo emocional",
    type: "fill",
    instruction: "Arrastra las palabras correctas para completar la frase.",
    sentenceParts: [
      "Su objetivo es ",
      null,
      " la intensidad de las ",
      null,
      " para que la persona se sienta ",
      null,
      " y ",
      null,
      ".",
    ],
    blanks: [
      { answer: "reducir" },
      { answer: "emociones" },
      { answer: "escuchada" },
      { answer: "aceptada" },
    ],
    words: ["reducir", "ignorada", "emociones", "escuchada", "aceptada"],
    wrongWords: ["ignorada"],
    correctSentence:
      "Su objetivo es reducir la intensidad de las emociones para que la persona se sienta escuchada y aceptada.",
    isLast: true,
  },
];

/* ─────────────────────────────────
   STATE
───────────────────────────────── */
let currentPart = 0;
let partScores = []; // { correct: bool } per part
let modal = null;
let modalBody = null;
let draggedToken = null;
let dragSource = null; // 'bank' | 'zone'
let dragSourceZoneIndex = null;

/* ─────────────────────────────────
   PUBLIC: init
───────────────────────────────── */
export function initGameQueSon() {
  currentPart = 0;
  partScores = [];
  draggedToken = null;
  dragSource = null;
  dragSourceZoneIndex = null;

  modal = document.getElementById("game-que-son-modal");
  modalBody = document.getElementById("game-modal-body");

  if (!modal || !modalBody) return;

  // ── Guarantee modal is a direct child of <body> at runtime ──
  // This prevents any parent transform/overflow from breaking position:fixed
  if (modal.parentNode !== document.body) {
    document.body.appendChild(modal);
  }

  // ── Force ALL overlay styles inline (bypasses any CSS specificity issue) ──
  const isMobile = window.innerWidth < 640;
  Object.assign(modal.style, {
    display:         "flex",
    position:        "fixed",
    inset:           "0",
    top:             "0",
    left:            "0",
    right:           "0",
    bottom:          "0",
    width:           "100vw",
    height:          "100vh",
    zIndex:          "99999",
    background:      "rgba(61, 40, 18, 0.88)",   /* cálido oscuro, no negro */
    backdropFilter:  "blur(6px)",
    alignItems:      isMobile ? "flex-end" : "center",
    justifyContent:  "center",
    padding:         "0",
    boxSizing:       "border-box",
    overflow:        "hidden",
    opacity:         "0",
    transition:      "opacity 300ms ease",
  });

  // ── Ensure the panel is properly sized and scrolls internally only if needed ──
  const panel = modal.querySelector(".game-modal__panel");
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
        overflowY: "auto",   /* scrollbar ONLY when taller than panel */
        padding:   isMobile ? "1rem" : "1.5rem",
      });
    }
  }

  modal.removeAttribute("hidden");
  // Lock scroll without jumping
  const scrollY = window.scrollY;
  document.body.dataset.scrollY = scrollY;
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = "100%";

  // Animate in after one frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      modal.style.opacity = "1";
    });
  });

  // Close handlers (reset each time so no duplicates)
  const closeBtn = modal.querySelector(".game-modal__close");
  if (closeBtn) closeBtn.onclick = closeModal;

  // Backdrop click
  modal._backdropHandler = (e) => { if (e.target === modal) closeModal(); };
  modal.addEventListener("click", modal._backdropHandler);

  document.addEventListener("keydown", handleEsc);

  renderPart(currentPart);
}

/* ─────────────────────────────────
   CLOSE
───────────────────────────────── */
function closeModal() {
  modal.style.opacity = "0";
  // Restore scroll without jumping
  const savedScroll = parseInt(document.body.dataset.scrollY || "0");
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  window.scrollTo({ top: savedScroll, behavior: "instant" });
  document.removeEventListener("keydown", handleEsc);
  if (modal._backdropHandler) {
    modal.removeEventListener("click", modal._backdropHandler);
    modal._backdropHandler = null;
  }
  setTimeout(() => {
    modal.style.display = "none";
    // Reset inline styles so CSS can take over on next open
    modal.removeAttribute("style");
    modal.setAttribute("hidden", "");
    modalBody.innerHTML = "";
  }, 320);
}

function handleEsc(e) {
  if (e.key === "Escape") closeModal();
}

/* ─────────────────────────────────
   RENDER PART
───────────────────────────────── */
function renderPart(index) {
  const part = GAME_DATA[index];
  if (!part) {
    renderResult();
    return;
  }

  const progress = Math.round(((index) / GAME_DATA.length) * 100);

  let html = `
    <!-- Progress -->
    <div class="game-progress">
      <div class="game-progress__track">
        <div class="game-progress__fill" style="width:${progress}%"></div>
      </div>
      <span class="game-progress__label">Parte ${index + 1} / ${GAME_DATA.length}</span>
    </div>

    <div class="game-part">
      <!-- Badge -->
      <div class="game-part__badge">📚 Parte ${index + 1}: ${part.title}</div>

      <!-- Instruction -->
      <div class="game-instruction">
        <strong>Instrucción</strong>
        ${part.instruction}
      </div>
  `;

  if (part.type === "fill") {
    html += renderFillPart(part);
  } else if (part.type === "categorize") {
    html += renderCategorizePart(part);
  }

  html += `
      <!-- Feedback -->
      <div class="game-feedback" id="game-feedback" ${part.type === "categorize" ? "" : ""}>
        <div class="game-feedback__label">✅ Respuesta correcta</div>
        <p class="game-feedback__text">${
          part.correctSentence ||
          `Factores correctos: ${part.correctWords?.join(", ")}.`
        }</p>
      </div>

      <!-- Navigation -->
      <div class="game-nav">
        <div class="game-nav__left">
          ${
            index > 0
              ? `<button class="button button--secondary button--sm" id="btn-prev">← Anterior</button>`
              : ""
          }
        </div>
        <div class="game-nav__right">
          <button class="button button--primary button--sm" id="btn-check">Verificar</button>
          <button class="button button--primary button--sm" id="btn-next" disabled>
            ${index === GAME_DATA.length - 1 ? "Ver resultados →" : "Siguiente →"}
          </button>
        </div>
      </div>
    </div>
  `;

  modalBody.innerHTML = html;
  modalBody.scrollTop = 0;

  // Attach interactions
  if (part.type === "fill") {
    initFillDragDrop(part);
  } else if (part.type === "categorize") {
    initCategorizeDragDrop(part);
  }

  // Nav buttons
  const btnCheck = document.getElementById("btn-check");
  const btnNext = document.getElementById("btn-next");
  const btnPrev = document.getElementById("btn-prev");

  if (btnCheck) {
    btnCheck.addEventListener("click", () => {
      const correct =
        part.type === "fill"
          ? checkFill(part)
          : checkCategorize(part);

      partScores[index] = correct;

      const feedback = document.getElementById("game-feedback");
      if (feedback) feedback.classList.add("game-feedback--visible");

      if (btnNext) btnNext.disabled = false;
      btnCheck.disabled = true;
    });
  }

  if (btnNext) {
    btnNext.addEventListener("click", () => {
      currentPart++;
      renderPart(currentPart);
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      currentPart--;
      renderPart(currentPart);
    });
  }
}

/* ─────────────────────────────────
   FILL: render
───────────────────────────────── */
function renderFillPart(part) {
  // Build sentence HTML
  let sentenceHtml = "";
  let blankIdx = 0;
  for (const seg of part.sentenceParts) {
    if (seg === null) {
      sentenceHtml += `<span class="drop-zone" data-blank="${blankIdx}" data-placeholder="____"></span>`;
      blankIdx++;
    } else {
      sentenceHtml += seg;
    }
  }

  // Shuffle word bank
  const shuffled = [...part.words].sort(() => Math.random() - 0.5);

  const chipsHtml = shuffled
    .map(
      (w) =>
        `<span class="drag-token" draggable="true" data-word="${w}">${w}</span>`,
    )
    .join("");

  return `
    <div class="game-sentence-label">Frase</div>
    <div class="game-sentence-wrap" id="game-sentence">${sentenceHtml}</div>

    <div class="game-word-bank">
      <div class="game-word-bank-label">Palabras disponibles</div>
      <div class="game-word-bank__chips" id="word-bank">${chipsHtml}</div>
    </div>
  `;
}

/* ─────────────────────────────────
   FILL: drag-and-drop
───────────────────────────────── */
function initFillDragDrop(part) {
  const sentence = document.getElementById("game-sentence");
  const bank = document.getElementById("word-bank");

  // ── Desktop drag events on tokens ──
  function attachTokenEvents(token) {
    token.addEventListener("dragstart", (e) => {
      draggedToken = token.dataset.word;
      if (token.closest("#word-bank")) {
        dragSource = "bank";
        dragSourceZoneIndex = null;
      } else {
        dragSource = "zone";
        dragSourceZoneIndex = parseInt(
          token.closest(".drop-zone")?.dataset.blank,
        );
      }
      token.classList.add("drag-token--dragging");
      e.dataTransfer.effectAllowed = "move";
    });

    token.addEventListener("dragend", () => {
      token.classList.remove("drag-token--dragging");
    });
  }

  // ── Drop zones ──
  const zones = sentence.querySelectorAll(".drop-zone");
  zones.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      zone.classList.add("drop-zone--hover");
    });

    zone.addEventListener("dragleave", () =>
      zone.classList.remove("drop-zone--hover"),
    );

    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      zone.classList.remove("drop-zone--hover");
      if (!draggedToken) return;

      // If zone already has a token, return it to bank
      const existing = zone.querySelector(".drag-token");
      if (existing) {
        returnTokenToBank(existing, bank, attachTokenEvents);
      }

      // If token came from another zone, clear that zone
      if (dragSource === "zone" && dragSourceZoneIndex !== null) {
        const srcZone = sentence.querySelector(
          `[data-blank="${dragSourceZoneIndex}"]`,
        );
        if (srcZone) {
          srcZone.innerHTML = "";
          srcZone.classList.remove(
            "drop-zone--filled",
            "drop-zone--correct",
            "drop-zone--incorrect",
          );
        }
      } else if (dragSource === "bank") {
        // Mark token as used in bank
        const bankToken = bank.querySelector(`[data-word="${draggedToken}"]`);
        if (bankToken) bankToken.classList.add("drag-token--used");
      }

      // Place in zone
      placeTokenInZone(zone, draggedToken, attachTokenEvents);
      draggedToken = null;
    });
  });

  // ── Bank: allow returning tokens ──
  bank.addEventListener("dragover", (e) => e.preventDefault());
  bank.addEventListener("drop", (e) => {
    e.preventDefault();
    if (!draggedToken) return;

    // If token came from a zone, clear that zone
    if (dragSource === "zone" && dragSourceZoneIndex !== null) {
      const srcZone = sentence.querySelector(
        `[data-blank="${dragSourceZoneIndex}"]`,
      );
      if (srcZone) {
        srcZone.innerHTML = "";
        srcZone.classList.remove(
          "drop-zone--filled",
          "drop-zone--correct",
          "drop-zone--incorrect",
        );
      }
      // Re-enable the token in bank
      const bankToken = bank.querySelector(`[data-word="${draggedToken}"]`);
      if (bankToken) bankToken.classList.remove("drag-token--used");
    }
    draggedToken = null;
  });

  // Attach events to existing tokens in bank
  bank.querySelectorAll(".drag-token").forEach(attachTokenEvents);

  // ── Touch support ──
  initTouchDragFill(sentence, bank, attachTokenEvents, part);
}

function placeTokenInZone(zone, word, attachTokenEvents) {
  zone.innerHTML = `<span class="drag-token" draggable="true" data-word="${word}">${word}</span>`;
  zone.classList.add("drop-zone--filled");
  zone.classList.remove("drop-zone--correct", "drop-zone--incorrect");
  const newToken = zone.querySelector(".drag-token");
  if (newToken) attachTokenEvents(newToken);
}

function returnTokenToBank(token, bank, attachTokenEvents) {
  const word = token.dataset.word;
  const bankToken = bank.querySelector(`[data-word="${word}"]`);
  if (bankToken) bankToken.classList.remove("drag-token--used");
}

/* ─────────────────────────────────
   FILL: check answers
───────────────────────────────── */
function checkFill(part) {
  const sentence = document.getElementById("game-sentence");
  const zones = sentence.querySelectorAll(".drop-zone");
  let allCorrect = true;

  zones.forEach((zone, i) => {
    const token = zone.querySelector(".drag-token");
    const value = token ? token.dataset.word : null;
    const expected = part.blanks[i]?.answer;

    if (value === expected) {
      zone.classList.add("drop-zone--correct");
      zone.classList.remove("drop-zone--incorrect");
    } else {
      zone.classList.add("drop-zone--incorrect");
      zone.classList.remove("drop-zone--correct");
      allCorrect = false;
    }
  });

  // Mark wrong words in bank with red style
  const bank = document.getElementById("word-bank");
  if (bank) {
    bank.querySelectorAll(".drag-token").forEach((t) => {
      if (part.wrongWords.includes(t.dataset.word)) {
        t.classList.add("drag-token--incorrect-bank");
      }
    });
  }

  return allCorrect;
}

/* ─────────────────────────────────
   CATEGORIZE: render
───────────────────────────────── */
function renderCategorizePart(part) {
  const shuffled = [...part.words].sort(() => Math.random() - 0.5);
  const chipsHtml = shuffled
    .map(
      (w) =>
        `<span class="drag-token" draggable="true" data-word="${w}">${w}</span>`,
    )
    .join("");

  return `
    <div class="game-cat-layout">
      <div class="game-cat-panel game-cat-panel--target" id="cat-drop-zone">
        <div class="game-cat-panel__title">✅ Factores que influyen</div>
        <div class="game-cat-panel__chips" id="cat-target-chips"></div>
      </div>
      <div class="game-cat-panel" id="cat-bank-panel">
        <div class="game-cat-panel__title">📦 Palabras disponibles</div>
        <div class="game-cat-panel__chips" id="cat-bank-chips">${chipsHtml}</div>
      </div>
    </div>
  `;
}

/* ─────────────────────────────────
   CATEGORIZE: drag-and-drop
───────────────────────────────── */
function initCategorizeDragDrop(part) {
  const bankChips = document.getElementById("cat-bank-chips");
  const targetChips = document.getElementById("cat-target-chips");
  const dropZone = document.getElementById("cat-drop-zone");

  function attachCatToken(token) {
    token.addEventListener("dragstart", (e) => {
      draggedToken = token.dataset.word;
      dragSource = token.closest("#cat-bank-chips") ? "bank" : "target";
      token.classList.add("drag-token--dragging");
      e.dataTransfer.effectAllowed = "move";
    });
    token.addEventListener("dragend", () =>
      token.classList.remove("drag-token--dragging"),
    );
  }

  // Drop on target zone
  [dropZone, targetChips].forEach((el) => {
    el.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZone.classList.add("drop-zone--hover");
    });
    el.addEventListener("dragleave", () =>
      dropZone.classList.remove("drop-zone--hover"),
    );
    el.addEventListener("drop", (e) => {
      e.preventDefault();
      dropZone.classList.remove("drop-zone--hover");
      if (!draggedToken) return;
      if (dragSource === "bank") {
        // Move from bank to target
        const t = bankChips.querySelector(`[data-word="${draggedToken}"]`);
        if (t) {
          bankChips.removeChild(t);
          t.classList.remove("drag-token--used");
          targetChips.appendChild(t);
          attachCatToken(t);
        }
      }
      draggedToken = null;
    });
  });

  // Drop back on bank
  bankChips.addEventListener("dragover", (e) => e.preventDefault());
  bankChips.addEventListener("drop", (e) => {
    e.preventDefault();
    if (!draggedToken || dragSource !== "target") return;
    const t = targetChips.querySelector(`[data-word="${draggedToken}"]`);
    if (t) {
      targetChips.removeChild(t);
      bankChips.appendChild(t);
      t.classList.remove(
        "drop-zone--correct",
        "drop-zone--incorrect",
        "drag-token--correct",
        "drag-token--incorrect-bank",
      );
      attachCatToken(t);
    }
    draggedToken = null;
  });

  // Init token events
  bankChips.querySelectorAll(".drag-token").forEach(attachCatToken);

  // Touch
  initTouchDragCat(bankChips, targetChips, dropZone, attachCatToken);
}

/* ─────────────────────────────────
   CATEGORIZE: check
───────────────────────────────── */
function checkCategorize(part) {
  const targetChips = document.getElementById("cat-target-chips");
  const bankChips = document.getElementById("cat-bank-chips");
  let allCorrect = true;

  targetChips.querySelectorAll(".drag-token").forEach((t) => {
    if (part.correctWords.includes(t.dataset.word)) {
      t.style.borderColor = "var(--color-success)";
      t.style.background = "rgba(16,185,129,0.12)";
      t.style.color = "#065f46";
    } else {
      t.style.borderColor = "var(--color-danger)";
      t.style.background = "rgba(239,68,68,0.1)";
      t.style.color = "var(--color-danger)";
      allCorrect = false;
    }
  });

  // Check if all correct words are there
  const placed = [...targetChips.querySelectorAll(".drag-token")].map(
    (t) => t.dataset.word,
  );
  const missing = part.correctWords.filter((w) => !placed.includes(w));
  if (missing.length > 0) allCorrect = false;

  // Shade wrong words left in bank
  bankChips.querySelectorAll(".drag-token").forEach((t) => {
    if (part.wrongWords.includes(t.dataset.word)) {
      t.classList.add("drag-token--incorrect-bank");
    }
  });

  return allCorrect;
}

/* ─────────────────────────────────
   RESULT SCREEN
───────────────────────────────── */
function renderResult() {
  const correctCount = partScores.filter(Boolean).length;
  const total = GAME_DATA.length;
  const pct = Math.round((correctCount / total) * 100);

  const emoji = pct === 100 ? "🏆" : pct >= 60 ? "🌟" : "💪";
  const msg =
    pct === 100
      ? "¡Excelente! Completaste toda la actividad correctamente."
      : pct >= 60
        ? "¡Muy bien! Tienes una buena comprensión del tema."
        : "¡Buen intento! Revisa el módulo para reforzar los conceptos.";

  // Animated progress fill to 100%
  const progressHtml = `
    <div class="game-progress" style="margin-bottom:var(--spacing-xl)">
      <div class="game-progress__track">
        <div class="game-progress__fill" style="width:100%"></div>
      </div>
      <span class="game-progress__label">5 / 5</span>
    </div>
  `;

  modalBody.innerHTML = `
    ${progressHtml}
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
        La orientación y el apoyo emocional inmediato permiten acompañar a las personas en momentos
        difíciles, ayudando a disminuir la intensidad emocional y favoreciendo la búsqueda de alternativas.
      </div>

      <div style="display:flex;gap:var(--spacing-md);justify-content:center;flex-wrap:wrap;">
        <button class="button button--secondary" id="btn-replay">🔄 Repetir actividad</button>
        <button class="button button--primary" id="btn-close-result">
          Cerrar <span class="button__icon">✓</span>
        </button>
      </div>
    </div>
  `;

  document.getElementById("btn-close-result")?.addEventListener("click", closeModal);
  document.getElementById("btn-replay")?.addEventListener("click", () => {
    currentPart = 0;
    partScores = [];
    renderPart(0);
  });
}

/* ─────────────────────────────────
   TOUCH SUPPORT — Fill
───────────────────────────────── */
function initTouchDragFill(sentence, bank, attachTokenEvents, part) {
  let touchToken = null;
  let ghost = null;

  modalBody.addEventListener(
    "touchstart",
    (e) => {
      const target = e.target.closest(".drag-token");
      if (!target) return;
      touchToken = target;
      const rect = target.getBoundingClientRect();
      ghost = target.cloneNode(true);
      ghost.style.cssText = `
        position:fixed;pointer-events:none;z-index:9999;
        left:${rect.left}px;top:${rect.top}px;
        width:${rect.width}px;opacity:0.85;
        transition:none;box-shadow:0 8px 20px rgba(0,0,0,0.2);
      `;
      document.body.appendChild(ghost);
      touchToken.style.opacity = "0.4";
    },
    { passive: true },
  );

  modalBody.addEventListener("touchmove", (e) => {
    if (!ghost) return;
    const t = e.touches[0];
    ghost.style.left = `${t.clientX - ghost.offsetWidth / 2}px`;
    ghost.style.top = `${t.clientY - ghost.offsetHeight / 2}px`;
  });

  modalBody.addEventListener("touchend", (e) => {
    if (!ghost || !touchToken) return;
    const t = e.changedTouches[0];
    ghost.remove();
    ghost = null;
    touchToken.style.opacity = "";

    const el = document.elementFromPoint(t.clientX, t.clientY);
    const zone = el?.closest(".drop-zone");
    if (zone) {
      const word = touchToken.dataset.word;
      const existing = zone.querySelector(".drag-token");
      if (existing) returnTokenToBank(existing, bank, attachTokenEvents);
      const isFromZone = touchToken.closest(".drop-zone");
      if (isFromZone) {
        isFromZone.innerHTML = "";
        isFromZone.classList.remove("drop-zone--filled","drop-zone--correct","drop-zone--incorrect");
      } else {
        touchToken.classList.add("drag-token--used");
      }
      placeTokenInZone(zone, word, attachTokenEvents);
    }
    touchToken = null;
  });
}

/* ─────────────────────────────────
   TOUCH SUPPORT — Categorize
───────────────────────────────── */
function initTouchDragCat(bankChips, targetChips, dropZone, attachCatToken) {
  let touchToken = null;
  let ghost = null;
  let srcPanel = null;

  modalBody.addEventListener(
    "touchstart",
    (e) => {
      const target = e.target.closest(".drag-token");
      if (!target) return;
      touchToken = target;
      srcPanel = target.closest("#cat-bank-chips") ? bankChips : targetChips;
      const rect = target.getBoundingClientRect();
      ghost = target.cloneNode(true);
      ghost.style.cssText = `
        position:fixed;pointer-events:none;z-index:9999;
        left:${rect.left}px;top:${rect.top}px;
        width:${rect.width}px;opacity:0.85;transition:none;
      `;
      document.body.appendChild(ghost);
      touchToken.style.opacity = "0.4";
    },
    { passive: true },
  );

  modalBody.addEventListener("touchmove", (e) => {
    if (!ghost) return;
    const t = e.touches[0];
    ghost.style.left = `${t.clientX - ghost.offsetWidth / 2}px`;
    ghost.style.top = `${t.clientY - ghost.offsetHeight / 2}px`;
  });

  modalBody.addEventListener("touchend", (e) => {
    if (!ghost || !touchToken) return;
    const t = e.changedTouches[0];
    ghost.remove();
    ghost = null;
    touchToken.style.opacity = "";

    const el = document.elementFromPoint(t.clientX, t.clientY);
    const onTarget =
      el?.closest("#cat-drop-zone") || el?.closest("#cat-target-chips");
    const onBank = el?.closest("#cat-bank-chips");

    if (onTarget && srcPanel === bankChips) {
      bankChips.removeChild(touchToken);
      targetChips.appendChild(touchToken);
      attachCatToken(touchToken);
    } else if (onBank && srcPanel === targetChips) {
      targetChips.removeChild(touchToken);
      bankChips.appendChild(touchToken);
      attachCatToken(touchToken);
    }

    touchToken = null;
    srcPanel = null;
  });
}
