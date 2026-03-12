/* ===============================
   STAR RATING — Interactive Component
   =============================== */

const FEEDBACK_MESSAGES = {
  1: "😔 ¡Gracias por tu opinión!",
  2: "🙂 Gracias, tomaremos tu opinión en cuenta.",
  3: "👍 ¡Gracias! Seguiremos mejorando.",
  4: "⭐ ¡Excelente! Nos alegra que te guste.",
  5: "🌟 ¡Increíble! ¡Muchas gracias!",
};

export function initStarRating() {
  const container = document.getElementById("star-rating");
  if (!container) return;

  const stars = container.querySelectorAll(".star-rating__star");
  const feedback = container.querySelector(".star-rating__feedback");
  let currentRating = 0;
  let isRated = false;

  // Hover effects
  stars.forEach((star, index) => {
    star.addEventListener("mouseenter", () => {
      if (isRated) return;
      highlightStars(index + 1, "hover");
    });

    star.addEventListener("mouseleave", () => {
      if (isRated) return;
      clearHighlight();
      if (currentRating > 0) {
        highlightStars(currentRating, "active");
      }
    });

    // Click to rate
    star.addEventListener("click", () => {
      if (isRated) return;

      currentRating = index + 1;
      isRated = true;

      clearHighlight();
      highlightStars(currentRating, "active");

      // Pulse animation staggered
      stars.forEach((s, i) => {
        if (i < currentRating) {
          setTimeout(() => {
            s.classList.add("star-rating__star--pulse");
            s.addEventListener(
              "animationend",
              () => {
                s.classList.remove("star-rating__star--pulse");
              },
              { once: true },
            );
          }, i * 80);
        }
      });

      // Show feedback
      if (feedback) {
        feedback.textContent = FEEDBACK_MESSAGES[currentRating] || "¡Gracias!";
        feedback.classList.add("star-rating__feedback--visible");
      }

      // Log for future email integration
      console.log(`⭐ Calificación: ${currentRating} estrellas`);

      // Reset after 4 seconds so they can rate again if they want
      setTimeout(() => {
        isRated = false;
        // Keep the visual state but allow re-rating
      }, 4000);
    });
  });

  function highlightStars(count, mode) {
    stars.forEach((star, i) => {
      star.classList.remove(
        "star-rating__star--hover",
        "star-rating__star--active",
      );
      if (i < count) {
        star.classList.add(`star-rating__star--${mode}`);
      }
    });
  }

  function clearHighlight() {
    stars.forEach((star) => {
      star.classList.remove(
        "star-rating__star--hover",
        "star-rating__star--active",
      );
    });
  }
}
