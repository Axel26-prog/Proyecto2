document.addEventListener('DOMContentLoaded', async () => {
  const slidesContainer = document.querySelector('.carrusel-slides');
  const prevBtn = document.querySelector('.carrusel-arrow.prev');
  const nextBtn = document.querySelector('.carrusel-arrow.next');

  let animales = [];
  let currentIndex = 0;

  // Cargar JSON
  const response = await fetch('data/animales.json');
  animales = await response.json();

  // Crear slides
  animales.forEach((animal, index) => {
    const slide = document.createElement('div');
    slide.classList.add('carrusel-slide');
    if(index === 0) slide.classList.add('active');
    slide.innerHTML = `
      <img src="${animal.imagen}" alt="${animal.nombre}">
      <div class="slide-content">
        <h4>${animal.nombre}</h4>
        <p>${animal.descripcion}</p>
      </div>
    `;
    slidesContainer.appendChild(slide);
  });

  const slides = document.querySelectorAll('.carrusel-slide');

 function updateCarousel() {
  slides.forEach((slide, index) => {
    slide.classList.remove('active');
    if(index === currentIndex) slide.classList.add('active');
  });

  const slideWidth = slides[0].offsetWidth + 32; 
  const containerWidth = slidesContainer.offsetWidth;
 
  const offset = (containerWidth / 2) - (slideWidth / 2) - currentIndex * slideWidth;
  
  slidesContainer.style.transform = `translateX(${offset}px)`;
}

  // Flechas
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + animales.length) % animales.length;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % animales.length;
    updateCarousel();
  });

  // Rotación automática
  setInterval(() => {
    currentIndex = (currentIndex + 1) % animales.length;
    updateCarousel();
  }, 5000); // cada 5 segundos
});