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

 function getCurrentTranslateX(el) {
  const st = window.getComputedStyle(el);
  const tr = st.transform || st.webkitTransform;
  if (tr && tr !== 'none') {
    
    const match = tr.match(/matrix.*\((.+)\)/);
    if (match) {
      const values = match[1].split(',').map(v => parseFloat(v.trim()));
      
      return values.length === 6 ? values[4] : 0;
    }
  }
  return 0;
}

function updateCarousel() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentIndex);
  });


  const containerRect = slidesContainer.parentElement.getBoundingClientRect(); 
  const slideRect = slides[currentIndex].getBoundingClientRect();

 
  const containerCenter = containerRect.left + containerRect.width / 2;
  const slideCenter = slideRect.left + slideRect.width / 2;

  
  const delta = containerCenter - slideCenter;


  const currentTranslate = getCurrentTranslateX(slidesContainer);
  const newTranslate = currentTranslate + delta;

  slidesContainer.style.transform = `translateX(${newTranslate}px)`;
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


  setInterval(() => {
    currentIndex = (currentIndex + 1) % animales.length;
    updateCarousel();
  }, 5000); // cada 5 segundos
});

