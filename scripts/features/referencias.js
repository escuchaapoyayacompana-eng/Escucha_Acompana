/* ============================================
   FEATURE: Referencias y Bibliografía
   ============================================ */

export function initReferencias() {
  const container = document.getElementById("feature-content");
  if (!container) return;
  container.innerHTML = "";

  const section = document.createElement("div");
  section.className = "module-content fade-in-up";

  // Data array containing raw HTML citations to permit italicized titles and links
  const referencias = [
    `López, N., y Sola, T. (2007). Conceptualización y aproximación científica de la orientación educativa. En <em>Orientación y apoyo psicopedagógico</em> [Antología]. Universidad Pedagógica Nacional, Unidad Ajusco. (Obra original publicada en 2007 por la editorial GEU). Recuperado de: <a href="https://www.upnlapaz.edu.mx/antologias/Ant_Psicologia_6sem_7380_OrientacionyApoyoPsicopedagogico.pdf" target="_blank" rel="noopener noreferrer">https://www.upnlapaz.edu.mx/antologias/Ant_Psicologia_6sem_7380_OrientacionyApoyoPsicopedagogico.pdf</a>`,
    `Secretaría de Salud, y Comisión Nacional de Salud Mental y Adicciones. (s. f.). <em>Primeros auxilios psicológicos en el contexto escolar</em>. Gobierno de México. Recuperado de: <a href="https://www.gob.mx/cms/uploads/attachment/file/959830/CUADERNILLO_PAP_R.pdf" target="_blank" rel="noopener noreferrer">https://www.gob.mx/cms/uploads/attachment/file/959830/CUADERNILLO_PAP_R.pdf</a>`,
    `World Health Organization: WHO. (26 de abril 2024). <em>Self-care for health and well-being</em>. Recuperado de: <a href="https://www.who.int/news-room/fact-sheets/detail/self-care-health-interventions" target="_blank" rel="noopener noreferrer">https://www.who.int/news-room/fact-sheets/detail/self-care-health-interventions</a>`,
    `Centros de Integración Juvenil. (s. f.). <em>Autocuidado: Unidad 3</em> [Material de curso]. Curso Primeros Auxilios Psicológicos.`,
    `Centros de Integración Juvenil. (s. f.). <em>Componentes PAP: Unidad 2</em> [Material de curso]. Curso Primeros Auxilios Psicológicos.`,
    `Centros de Integración Juvenil. (s. f.). <em>Intervención primera instancia: Unidad 1</em> [Material de curso]. Curso Primeros Auxilios Psicológicos.`
  ];

  section.innerHTML = `
    <!-- Header -->
    <div class="module-header" style="margin-bottom: var(--spacing-xl);">
      <p class="module-header__eyebrow fade-in-up">Módulo Extra</p>
      <h2 class="module-header__title fade-in-up" data-delay="1">Referencias y Bibliografía</h2>
      <p class="module-header__subtitle fade-in-up" data-delay="2">
        Fuentes consultadas para el desarrollo de este manual interactivo.
      </p>
    </div>

    <!-- References List using APA Hanging Indent + Bullets -->
    <div class="references-container fade-in-up" data-delay="3" style="background: white; padding: var(--spacing-xl); border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
      <ul class="ref-list">
        ${referencias.map(ref => `<li class="ref-item text-md text-muted">${ref}</li>`).join('')}
      </ul>
    </div>
  `;

  container.append(section);
}
