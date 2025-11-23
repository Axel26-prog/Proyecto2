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
    // matrix(a, b, c, d, tx, ty) or matrix3d(...)
    const match = tr.match(/matrix.*\((.+)\)/);
    if (match) {
      const values = match[1].split(',').map(v => parseFloat(v.trim()));
      // tx está en el índice 4 para matrix(a,b,c,d,tx,ty)
      return values.length === 6 ? values[4] : 0;
    }
  }
  return 0;
}

function updateCarousel() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentIndex);
  });

  // rects absolutos en la ventana
  const containerRect = slidesContainer.parentElement.getBoundingClientRect(); // .carrusel-container
  const slideRect = slides[currentIndex].getBoundingClientRect();

  // centro del contenedor y centro de la slide
  const containerCenter = containerRect.left + containerRect.width / 2;
  const slideCenter = slideRect.left + slideRect.width / 2;

  // delta necesario (px) para alinear el centro de la slide con el centro del contenedor
  const delta = containerCenter - slideCenter;

  // obtener el translateX actual y sumarle el ajuste
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

  // Rotación automática
  setInterval(() => {
    currentIndex = (currentIndex + 1) % animales.length;
    updateCarousel();
  }, 5000); // cada 5 segundos
});

