// js/carrusel.js
document.addEventListener("DOMContentLoaded", async () => {
    const slidesContainer = document.querySelector(".carrusel-slides");
    const prevBtn = document.querySelector(".carrusel-arrow.prev");
    const nextBtn = document.querySelector(".carrusel-arrow.next");
    const wrapper = document.querySelector(".carrusel-container");

    if (!slidesContainer || !prevBtn || !nextBtn || !wrapper) return;

    let animales = [];
    let slides = [];
    let currentIndex = 0;

    // =========================
    //   Cargar JSON original
    // =========================
    try {
        const resp = await fetch("data/animales.json");
        animales = await resp.json();
    } catch (e) {
        console.error("Error cargando animales.json", e);
        return;
    }

    // =========================
    //   Crear tarjeta
    // =========================
    const crearTarjeta = (animal) => {
        const d = document.createElement("div");
        d.classList.add("carrusel-slide");
        d.innerHTML = `
            <img src="${animal.imagen}">
            <div class="slide-content">
                <h4>${animal.nombre}</h4>
                <p>${animal.descripcion}</p>
            </div>
        `;
        return d;
    };

    // =========================
    //   Repetir secuencia N veces
    // =========================
    const REPETICIONES = 1000; // repetciones

    for (let r = 0; r < REPETICIONES; r++) {
        animales.forEach(a => slidesContainer.appendChild(crearTarjeta(a)));
    }

    slides = Array.from(document.querySelectorAll(".carrusel-slide"));

    // =========================
    //   Medidas 
    // =========================
    let step = 0;
    let baseOffset = 0;

    function calcularMedidas() {
        const r0 = slides[0].getBoundingClientRect();
        const r1 = slides[1].getBoundingClientRect();

        step = r1.left - r0.left;  // distancia horizontal
        baseOffset = (wrapper.clientWidth - r0.width) / 2;
    }

    function aplicarTransform(animar = true) {
        slides.forEach((s, i) => {
            s.classList.toggle("active", i === currentIndex);
        });

        slidesContainer.style.transition = animar ? "transform 0.35s ease" : "none";

        const x = baseOffset - step * currentIndex;
        slidesContainer.style.transform = `translateX(${x}px)`;
    }

    // =========================
    //   Mover derecha/izquierda
    // =========================
    function siguiente() {
        currentIndex++;
        if (currentIndex >= slides.length) currentIndex = 0; // reiniciar
        aplicarTransform(true);
    }

    function anterior() {
        currentIndex--;
        if (currentIndex < 0) currentIndex = slides.length - 1;
        aplicarTransform(true);
    }

    // =========================
    //   Clicks
    // =========================
    nextBtn.addEventListener("click", siguiente);
    prevBtn.addEventListener("click", anterior);

    // =========================
    //   Auto-slide
    // =========================
    let auto = setInterval(siguiente, 5000);

    wrapper.addEventListener("mouseenter", () => clearInterval(auto));
    wrapper.addEventListener("mouseleave", () => {
        auto = setInterval(siguiente, 5000);
    });

    // =========================
    //   Inicializar
    // =========================
    calcularMedidas();
    aplicarTransform(false);

    window.addEventListener("resize", () => {
        calcularMedidas();
        aplicarTransform(false);
    });
});

