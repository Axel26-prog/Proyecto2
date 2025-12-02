document.getElementById("btn-enviar").addEventListener("click", function (e) {
    e.preventDefault();  // evita recargar la página

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();

    let captcha = "";

    // Captcha: evita error si no ha cargado
    if (typeof grecaptcha !== "undefined") {
        captcha = grecaptcha.getResponse();
    }

    //  Validaciones
    if (!nombre || !correo || !asunto || !descripcion) {
        alert("Por favor complete todos los campos.");
        return;
    }

    // Validación de correo real
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
        alert("Ingrese un correo válido.");
        return;
    }

    if (captcha.length === 0) {
        alert("Por favor verifique el captcha.");
        return;
    }

    // PASA VALIDACIÓN → Mostrar modal con datos
    document.getElementById("m-nombre").textContent = nombre;
    document.getElementById("m-correo").textContent = correo;
    document.getElementById("m-asunto").textContent = asunto;
    document.getElementById("m-descripcion").textContent = descripcion;

    document.getElementById("modal").style.display = "block";
});


// ⭐ Limpiar formulario completo
function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("asunto").selectedIndex = 0;
    document.getElementById("descripcion").value = "";

    if (typeof grecaptcha !== "undefined") {
        grecaptcha.reset(); // reinicia el captcha
    }
}


//  Cerrar modal con botón X
document.querySelector(".cerrar").addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
    limpiarFormulario();
});


// Cerrar modal clickeando fuera del contenido
window.addEventListener("click", function (e) {
    const modal = document.getElementById("modal");
    if (e.target === modal) {
        modal.style.display = "none";
        limpiarFormulario();
    }
});
