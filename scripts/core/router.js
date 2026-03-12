/* ===============================
   ROUTER — Card Navigation
   Click-based (no hover preview)
   =============================== */

export function initCardNavigation() {
  const container = document.querySelector(".modules__grid");
  if (!container) return;

  // Click handler for module cards
  container.addEventListener("click", (event) => {
    const card = event.target.closest(".module-card");
    if (!card) return;

    const feature = card.dataset.feature;
    if (!feature) return;

    document.dispatchEvent(
      new CustomEvent("feature:navigate", {
        detail: { feature },
      }),
    );
  });

  // Keyboard support
  container.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    const card = event.target.closest(".module-card");
    if (!card) return;

    event.preventDefault();
    const feature = card.dataset.feature;
    if (!feature) return;

    document.dispatchEvent(
      new CustomEvent("feature:navigate", {
        detail: { feature },
      }),
    );
  });
}
