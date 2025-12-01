document.addEventListener('DOMContentLoaded', () => {
  const flecha = document.querySelector('a[href="#seccion2"]');
  
  if(flecha) {
    flecha.addEventListener('click', (e) => {
      e.preventDefault(); 

      // Scroll suave con GSAP
      gsap.to(window, {
        duration: 1,
        scrollTo: "#seccion2",
        ease: "power2.inOut"
      });

      // Animación de la flecha
      gsap.fromTo(flecha, 
        { y: 0 }, 
        { y: 10, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.inOut" }
      );
    });
  }
});