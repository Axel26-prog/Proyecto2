document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("scroll", () => {
    const section = document.querySelector(".sticky-section");
    const view1 = document.querySelector(".view-1");
    const view2 = document.querySelector(".view-2");

    if (!section) return;

    const rect = section.getBoundingClientRect();
    const scrollAmount = Math.abs(rect.top);  // cuánto hemos bajado dentro de la sección
    const switchPoint = window.innerHeight * 0.5; // cuando llegamos a la mitad del scroll

    if (scrollAmount > switchPoint) {
      // Mostrar vista 2
      view1.style.opacity = "0";
      view2.style.opacity = "1";
    } else {
      // Mostrar vista 1
      view1.style.opacity = "1";
      view2.style.opacity = "0";
    }
  });
});