/* ============================================
   FEATURE: Evaluación (Modal Form)
   ============================================ */

export function initEvaluacionModal() {
  const modal = document.getElementById("game-evaluacion-modal");
  const modalBody = document.getElementById("game-evaluacion-body");
  if (!modal || !modalBody) return;

  // Render the evaluation form
  modalBody.innerHTML = `
    <div class="evaluacion-container">
      <!-- Video embed -->
      <div class="hero__video-wrap" style="aspect-ratio: 16 / 9; max-width: 800px; margin-inline: auto; margin-bottom: var(--spacing-xl);">
        <iframe src="https://www.youtube.com/embed/mhD7CL6XHVM" title="Video de Evaluación"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen loading="lazy" style="width:100%; height:100%; border:none; border-radius:var(--radius-lg);"></iframe>
      </div>

      <p class="text-md text-center text-muted" style="margin-bottom: var(--spacing-xl);">
        Por favor, ayúdanos a mejorar contestando las siguientes preguntas.
      </p>

      <form id="evaluacion-form" class="evaluacion-form">
        <!-- Q1 -->
        <div class="form-group">
          <p class="form-label">¿La información presentada en la página te pareció clara?</p>
          <div class="radio-group">
            <label class="radio-label"><input type="radio" name="Pregunta_1_Resolucion" value="Sí" required> Sí</label>
            <label class="radio-label"><input type="radio" name="Pregunta_1_Resolucion" value="No"> No</label>
            <label class="radio-label"><input type="radio" name="Pregunta_1_Resolucion" value="Parcialmente"> Parcialmente</label>
          </div>
        </div>

        <!-- Q2 -->
        <div class="form-group">
          <p class="form-label">¿Consideras que la información es suficiente para comprender el tema?</p>
          <div class="radio-group">
            <label class="radio-label"><input type="radio" name="Pregunta_2_Suficiente" value="Sí" required> Sí</label>
            <label class="radio-label"><input type="radio" name="Pregunta_2_Suficiente" value="No"> No</label>
            <label class="radio-label"><input type="radio" name="Pregunta_2_Suficiente" value="Parcialmente"> Parcialmente</label>
          </div>
        </div>

        <!-- Q3 -->
        <div class="form-group">
          <p class="form-label">¿La información de la página te pareció útil?</p>
          <div class="radio-group">
            <label class="radio-label"><input type="radio" name="Pregunta_3_Util" value="Sí" required> Sí</label>
            <label class="radio-label"><input type="radio" name="Pregunta_3_Util" value="No"> No</label>
            <label class="radio-label"><input type="radio" name="Pregunta_3_Util" value="Parcialmente"> Parcialmente</label>
          </div>
        </div>

        <!-- Q4: Stars -->
        <div class="form-group">
          <p class="form-label text-center">En general, ¿cómo calificarías esta página web?</p>
          <div class="eval-star-rating" id="eval-stars">
            <button type="button" class="eval-star" data-rating="1" aria-label="1 estrella">★</button>
            <button type="button" class="eval-star" data-rating="2" aria-label="2 estrellas">★</button>
            <button type="button" class="eval-star" data-rating="3" aria-label="3 estrellas">★</button>
            <button type="button" class="eval-star" data-rating="4" aria-label="4 estrellas">★</button>
            <button type="button" class="eval-star" data-rating="5" aria-label="5 estrellas">★</button>
          </div>
          <input type="hidden" name="Calificacion_General_Estrellas" id="q4-rating-input" required value="">
          <p id="eval-star-feedback" class="text-center text-sm" style="color:var(--color-primary); min-height: 20px;"></p>
        </div>

        <!-- Q5 -->
        <div class="form-group">
          <p class="form-label">¿Recomendarías esta página a otras personas?</p>
          <div class="radio-group">
            <label class="radio-label"><input type="radio" name="Pregunta_5_Recomendacion" value="Sí" required> Sí</label>
            <label class="radio-label"><input type="radio" name="Pregunta_5_Recomendacion" value="No"> No</label>
          </div>
        </div>

        <div style="text-align: center; margin-top: var(--spacing-2xl);">
          <button type="submit" class="button button--primary button--lg" id="eval-submit-btn">
            Enviar respuestas
            <span class="button__icon">✉️</span>
          </button>
        </div>
      </form>
    </div>
  `;

  // --- Modal Logic ---

  // Handle Stars logic
  const starsGroup = document.getElementById("eval-stars");
  const stars = document.querySelectorAll(".eval-star");
  const ratingInput = document.getElementById("q4-rating-input");
  const starFeedback = document.getElementById("eval-star-feedback");

  let currentRating = 0;

  stars.forEach((star, index) => {
    // Hover effects
    star.addEventListener("mouseenter", () => {
      updateStarsUI(index + 1);
    });

    star.addEventListener("mouseleave", () => {
      updateStarsUI(currentRating);
    });

    // Click effect
    star.addEventListener("click", () => {
      currentRating = index + 1;
      ratingInput.value = currentRating + " de 5"; // Makes it cleaner in Formspree email
      updateStarsUI(currentRating);
      
      const messages = ["", "Muy deficiente", "Deficiente", "Regular", "Buena", "Excelente"];
      starFeedback.textContent = messages[currentRating];
    });
  });

  function updateStarsUI(ratingValue) {
    stars.forEach((s, idx) => {
      if (idx < ratingValue) {
        s.classList.add("active");
      } else {
        s.classList.remove("active");
      }
    });
  }

  // Handle Form Submission -> Formspree Fetch
  const form = document.getElementById("evaluacion-form");
  const submitBtn = document.getElementById("eval-submit-btn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!ratingInput.value) {
      alert("Por favor, selecciona una calificación de estrellas antes de enviar.");
      return;
    }

    // Change button state to loading
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `Enviando... <span class="button__icon">⏳</span>`;
    submitBtn.disabled = true;

    // We don't need to manually assemble a string. FormData can be posted natively to Formspree
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xdawgvdo", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Show a beautiful success state instead of an alert
        modalBody.innerHTML = `
          <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:var(--spacing-3xl) var(--spacing-md); text-align:center; height:100%; min-height: 40vh;">
            <div style="font-size: 5rem; margin-bottom: var(--spacing-md);">✅</div>
            <h3 class="heading-3" style="color:var(--color-primary); margin-bottom:var(--spacing-sm);">¡Gracias por tus respuestas!</h3>
            <p class="text-md text-muted" style="margin-bottom:var(--spacing-xl);">Hemos recibido tu evaluación correctamente. Tu opinión nos ayuda enormemente a mejorar.</p>
            <button class="button button--primary button--lg" id="btn-close-success" type="button">
              Cerrar <span class="button__icon" aria-hidden="true">✔</span>
            </button>
          </div>
        `;
        modalBody.scrollTop = 0;
        document.getElementById("btn-close-success")?.addEventListener("click", closeModal);
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          alert("Hubo un error al enviar: " + data["errors"].map(error => error["message"]).join(", "));
        } else {
          alert("Hubo un problema al enviar tu formulario. Inténtalo de nuevo.");
        }
      }
    } catch (error) {
      alert("Hubo un problema con la red. Verifica tu conexión a internet e inténtalo de nuevo.");
    } finally {
      // Revert button state if modal wasn't closed or on error
      if (!modal.hasAttribute("hidden")) {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    }
  });

  // --- Open Modal ---
  if (modal.parentNode !== document.body) {
    document.body.appendChild(modal);
  }

  // Force scroll to top whenever it opens
  if (modalBody) {
    modalBody.scrollTop = 0;
  }

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
    background:      "rgba(61, 40, 18, 0.88)",
    backdropFilter:  "blur(6px)",
    alignItems:      isMobile ? "flex-end" : "center",
    justifyContent:  "center",
    padding:         "0",
    boxSizing:       "border-box",
    overflow:        "hidden",
    opacity:         "0",
    transition:      "opacity 300ms ease",
  });

  const panel = modal.querySelector(".game-modal__panel");
  if (panel) {
    Object.assign(panel.style, {
      width:         isMobile ? "100%" : "min(800px, 95vw)", // Evaluation modal is a bit thinner
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

  function closeModal() {
    modal.style.opacity = "0";
    // Restore scroll without jumping
    const savedScroll = parseInt(document.body.dataset.scrollY || "0");
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    window.scrollTo({ top: savedScroll, behavior: "instant" });
    
    if (modal._backdropHandler) {
      modal.removeEventListener("click", modal._backdropHandler);
      modal._backdropHandler = null;
    }
    
    setTimeout(() => {
      modal.style.display = "none";
      modal.removeAttribute("style");
      modal.setAttribute("hidden", "");
    }, 320);
  }

  // Hook up close buttons
  const closeModalBtns = modal.querySelectorAll(".game-modal__close");
  closeModalBtns.forEach(btn => {
    btn.onclick = closeModal;
  });

  // Backdrop click hookup
  modal._backdropHandler = (e) => { if (e.target === modal) closeModal(); };
  modal.addEventListener("click", modal._backdropHandler);
}
