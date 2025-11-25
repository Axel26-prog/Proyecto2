const PROYECTOS = {
  1: {
    title: "Reserva Monteverde",
    desc: "Protección de bosques, monitoreo de especies y corredores biológicos.",
    logo: `<svg width="100" height="100"><rect width="100" height="100" rx="12" fill="#ffffff"/><text x="50" y="57" text-anchor="middle" font-family="Anton" font-size="36" fill="#465127">MV</text></svg>`
  },
  2: {
    title: "Centro de Rescate La Marina",
    desc: "Rehabilitación de animales víctimas de tráfico y cacería.",
    logo: `<svg width="100" height="100"><rect width="100" height="100" rx="12" fill="#ffffff"/><text x="50" y="57" text-anchor="middle" font-family="Anton" font-size="32" fill="#465127">RM</text></svg>`
  },
  3: {
    title: "Eco Educación CR",
    desc: "Programas educativos para conciencia ambiental en escuelas.",
    logo: `<svg width="100" height="100"><rect width="100" height="100" rx="12" fill="#ffffff"/><text x="50" y="57" text-anchor="middle" font-family="Anton" font-size="32" fill="#465127">ED</text></svg>`
  }
};

const categorias = document.querySelectorAll(".categoria");
const title = document.getElementById("project-title");
const desc = document.getElementById("project-desc");
const logo = document.getElementById("project-logo");

categorias.forEach(cat => {
  cat.addEventListener("click", () => {
    categorias.forEach(c => c.classList.remove("selected"));
    cat.classList.add("selected");

    const id = cat.dataset.id;
    const data = PROYECTOS[id];

    title.textContent = data.title;
    desc.textContent = data.desc;
    logo.innerHTML = data.logo;

    ordenarCategorias(id);
  });
});

// Mantener la categoría seleccionada en medio
function ordenarCategorias(id) {
  categorias.forEach(c => {
    if (c.dataset.id === id) {
      c.style.order = "1"; // centro
    } else {
      c.style.order = c.dataset.id < id ? "0" : "2";
    }
  });
}