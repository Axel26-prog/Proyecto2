document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".sticky-section");
  const view1 = document.querySelector(".view-1");
  const view2 = document.querySelector(".view-2");
  const overlay = document.querySelector(".overlay-dark");

  if (!section) return;

  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const progress = scrollY - sectionTop;

    // El punto donde cambia la vista
    const switchPoint = sectionHeight * 0.65;

    if (progress > switchPoint) {
    
      view1.style.opacity = "0";
      view2.style.opacity = "1";
      overlay.style.opacity = "0.6";
    } else {
      // Vista 1 normal
      view1.style.opacity = "1";
      view2.style.opacity = "0";
      overlay.style.opacity = "0";
    }
  });
});
