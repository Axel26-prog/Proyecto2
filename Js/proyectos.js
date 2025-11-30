const PROYECTOS = {
  1: {
    title: "Jaguar Rescue Center",
    desc: "Reforestación de áreas degradadas, creación de corredores biológicos y programas educativos sobre protección de fauna y ecosistemas.",
    logo: `<img src="./img/JRCv.jpg" class="logo-img" alt="Jaguar Rescue Center">`
  },
  2: {
    title: "Rescate Wildlife Rescue Center (Zoo Ave)",
    desc: "Rescate, tratamiento y liberación de animales heridos o confiscados; recuperación física y comportamental para su retorno al hábitat.",
    logo: `<img src="./img/ZOAVE.jpg" class="logo-img" alt="Rescate Wildlife Rescue Center">`
  },
  3: {
    title: "NATUWA Wildlife Sanctuary",
    desc: "Charlas, talleres y recorridos educativos dirigidos a escuelas y comunidades para promover el respeto por la fauna silvestre, la importancia de los ecosistemas y la protección de especies en peligro.",
    logo: `<img src="./img/NATUWA.png" class="logo-img" alt="NATUWA Wildlife Sanctuary">`
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

window.addEventListener("load", () => {
    const catConservacion = document.querySelector('.categoria[data-id="1"]');
    if (catConservacion) catConservacion.click();
  });