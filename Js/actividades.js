document.addEventListener("DOMContentLoaded", async () => {

    const selectProvincia = document.getElementById("selectProvincia");
    const selectActividad = document.getElementById("selectActividad");
    const tituloActividad = document.getElementById("tituloActividad");
    const descripcionActividad = document.getElementById("descripcionActividad");
    const cardActividad = document.getElementById("cardActividad");
    const imgActividad = document.getElementById("imgActividad");


    const btnInscribirse = document.getElementById("btnInscribirse");
    const modalInscripcion = document.getElementById("modalInscripcion");
    const modalConfirmacion = document.getElementById("modalConfirmacion");

    const inputNombre = document.getElementById("nombreVol");
    const inputCorreo = document.getElementById("correoVol");
    const actividadTextoSpan = document.getElementById("actividadSeleccionadaTexto");

    const btnContinuar = document.getElementById("btnContinuar");
    const btnCerrarModal = document.getElementById("btnCerrarModal");
    const btnCancelar = document.getElementById("btnCancelar");
    const errorFormulario = document.getElementById("errorFormulario");

    function lanzarConfeti() {
        const duration = 1 * 1200;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 7,
                startVelocity: 25,
                spread: 80,
                origin: { y: 0.6 }
            });

            // ELEVAR EL CANVAS DEL CONFETI POR ENCIMA DEL MODAL 🎉
            const canvas = document.querySelector("canvas");
            if (canvas) {
                canvas.style.zIndex = "2000";   // encima del modal
                canvas.style.position = "fixed";
            }

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    }



    // Ocultar tarjeta al inicio
    cardActividad.style.display = "none";

    let actividadesData = {};

    try {
        // Cargar provincias y actividades al mismo tiempo
        const [respProv, respAct] = await Promise.all([
            fetch("data/provincias.json"),
            fetch("data/actividades.json")
        ]);

        const provincias = await respProv.json();
        actividadesData = await respAct.json();

        // Llenar select de provincias
        provincias.forEach(prov => {
            const option = document.createElement("option");
            option.value = prov;
            option.textContent = prov;
            selectProvincia.appendChild(option);
        });

    } catch (error) {
        console.error("Error cargando datos:", error);
    }


    // Cuando cambia la provincia
    selectProvincia.addEventListener("change", () => {

        const provinciaSeleccionada = selectProvincia.value;


        // Reiniciar segundo dropdown
        selectActividad.innerHTML = '<option value="">Seleccione...</option>';

        // Reset tarjeta
        tituloActividad.textContent = "Descripción en el Dropdown";
        descripcionActividad.textContent = "Descripción larga...";
        cardActividad.style.display = "none";  // ocultar nuevamente

        const actividadesProvincia = actividadesData[provinciaSeleccionada];
        if (!actividadesProvincia) return;

        // Llenar actividades según provincia
        actividadesProvincia.forEach((actividad, index) => {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = actividad.dropdown;
            selectActividad.appendChild(option);
        });
    });


    // Cuando elige una actividad
    selectActividad.addEventListener("change", () => {

        const provinciaSeleccionada = selectProvincia.value;
        const indice = selectActividad.value;

        const actividadesProvincia = actividadesData[provinciaSeleccionada];

        if (!provinciaSeleccionada || indice === "" || !actividadesProvincia) return;

        const actividad = actividadesProvincia[indice];

        // Actualizar contenido
        tituloActividad.textContent = actividad.titulo;
        descripcionActividad.textContent = actividad.descripcion;

        // Actualizar imagen
        imgActividad.src = actividad.imagen;  

        // Mostrar tarjeta
        cardActividad.style.display = "flex";
    });


    //BOTON DE INSCRIBIRSE & ABRIR EL MODAL 1
    btnInscribirse.addEventListener("click", () => {
        // Validar que haya actividad seleccionada
        if (!selectProvincia.value || selectActividad.value === "") {
            alert("Primero seleccione una provincia y una actividad.");
            return;
        }

        // Limpiar campos del modal
        inputNombre.value = "";
        inputCorreo.value = "";
        errorFormulario.style.display = "none";

        // Abrir modal 1
        modalInscripcion.classList.add("show");
    });



    //BOTON CONTINUAR & VALIDAR Y PASAR AL MODAL 2
    btnContinuar.addEventListener("click", () => {
        const nombre = inputNombre.value.trim();
        const correo = inputCorreo.value.trim();

        // Referencia al mensaje de error
        errorFormulario.style.display = "none";

        // Validación
        if (!nombre || !correo) {
            errorFormulario.textContent = "⚠️ Por favor complete nombre y correo válidos.";
            errorFormulario.style.display = "block";
            return;
        }

        const regexCorreo = /\S+@\S+\.\S+/;
        if (!regexCorreo.test(correo)) {
            errorFormulario.textContent = "⚠️ Ingrese un correo electrónico válido.";
            errorFormulario.style.display = "block";
            return;
        }

        // Pasar mensaje de actividad seleccionada al modal 2
        actividadTextoSpan.textContent = tituloActividad.textContent;

        // Cerrar modal 1 y abrir modal 2
        modalInscripcion.classList.remove("show");
        modalConfirmacion.classList.add("show");
        lanzarConfeti();
    });

    //BOTON CANCELAR QUE CIERRA EL MODAL 1
    btnCancelar.addEventListener("click", () => {
        modalInscripcion.classList.remove("show");
    });

    //BOTON CANCELAR QUE CIERRA EL MODAL 2
    btnCerrarModal.addEventListener("click", () => {

        // Cerrar modal 2
        modalConfirmacion.classList.remove("show");

        // Limpiar selects
        selectProvincia.value = "";
        selectActividad.innerHTML = '<option value="">Seleccione...</option>';

        // Reset tarjeta
        tituloActividad.textContent = "Descripción en el Dropdown";
        descripcionActividad.textContent = "Descripción larga...";
        cardActividad.style.display = "none";
    });


});


