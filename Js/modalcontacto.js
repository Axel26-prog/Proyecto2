document.getElementById("btn-enviar").addEventListener("click", function () {

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const asunto = document.getElementById("asunto").value;
    const descripcion = document.getElementById("descripcion").value.trim();

    const captcha = grecaptcha.getResponse(); // respuesta del captcha

    

    if (!nombre || !correo || !asunto || !descripcion) {
        alert("Por favor complete todos los campos.");
        return;
    }

    if (captcha.length === 0) {
        alert("Por favor verifique el captcha.");
        return;
    }

    // PASA VALIDACIÓN → Mostrar modal
    document.getElementById("m-nombre").textContent = nombre;
    document.getElementById("m-correo").textContent = correo;
    document.getElementById("m-asunto").textContent = asunto;
    document.getElementById("m-descripcion").textContent = descripcion;

    document.getElementById("modal").style.display = "block";
});

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("asunto").selectedIndex = 0;   // vuelve a "Selecciona un asunto"
    document.getElementById("descripcion").value = "";

    // resetear el captcha (si está cargado)
    if (typeof grecaptcha !== "undefined") {
        grecaptcha.reset();
    }
}

// Cerrar modal
document.querySelector(".cerrar").addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
    limpiarFormulario();
});