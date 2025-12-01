document.addEventListener("DOMContentLoaded", async () => {
    const botones = document.querySelectorAll(".btn-acerca");
    const infoArea = document.getElementById("info-area");

    // Cargar JSON externo
    let data = {};
    try {
        const res = await fetch("data/info.json");
        data = await res.json();
    } catch (error) {
        console.error("Error cargando JSON:", error);
    }

    function cargarInfo(id) {
    const persona = data[id];

    // Oculta para iniciar la transición
    infoArea.classList.remove("visible");

    infoArea.innerHTML = `
        <img src="${persona.foto}" alt="${persona.nombre}">
        <h2>${persona.nombre}</h2>
        <p>${persona.descripcion}</p>
        <p>Cédula: ${persona.cedula}</p>
        <p>Correo: ${persona.correo}</p>
    `;

    // Esto permite que el navegador recalcule antes de mostrar
    setTimeout(() => infoArea.classList.add("visible"), 20);
}

    botones.forEach(btn => {
        btn.addEventListener("click", () => {

            botones.forEach(b => b.classList.remove("activo"));
            btn.classList.add("activo");

            cargarInfo(btn.dataset.id);
        });
    });

    // Cargar Erin al iniciar
    cargarInfo("erin");
    document.querySelector(".btn-acerca[data-id='erin']").classList.add("activo");
});