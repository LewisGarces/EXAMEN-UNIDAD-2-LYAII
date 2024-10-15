// Diccionario con palabras y sinónimos
const diccionario = {
    "rápido": ["veloz", "ágil"],            // Sinónimos para "rápido"
    "grande": ["enorme", "gigante"],        // Sinónimos para "grande"
    "feliz": ["contento", "alegre"],        // Sinónimos para "feliz"
    "casa": ["hogar", "vivienda"],          // Sinónimos para "casa"
    "bonito": ["hermoso", "lindo"],         // Sinónimos para "bonito"
    "inteligente": ["sabio", "listo"],      // Sinónimos para "inteligente"
    "fuerte": ["robusto", "poderoso"],      // Sinónimos para "fuerte"
    "viejo": ["antiguo", "mayor"],          // Sinónimos para "viejo"
    "amable": ["cordial", "cálido"],        // Sinónimos para "amable"
    "trabajo": ["empleo", "ocupación"],     // Sinónimos para "trabajo"
    "niño": ["infante", "pequeño"],         // Sinónimos para "niño"
    "importante": ["relevante", "significativo"], // Sinónimos para "importante"
    "tranquilo": ["calmado", "sereno"],     // Sinónimos para "tranquilo"
    "fácil": ["simple", "sencillo"]          // Sinónimos para "fácil"
};

// Evento cuando se selecciona una palabra
document.getElementById('palabra-diccionario').addEventListener('change', () => {
    const palabraSeleccionada = document.getElementById('palabra-diccionario').value; // Obtiene la palabra seleccionada
    const sinonimos = diccionario[palabraSeleccionada]; // Busca los sinónimos en el diccionario
    const seleccionarSinonimo = document.getElementById('sinonimo'); // Obtiene el selector de sinónimos

    // Reinicia las opciones del selector de sinónimos
    seleccionarSinonimo.innerHTML = '<option value="">Selecciona una palabra</option>'; 

    if (sinonimos) {
        sinonimos.forEach(sinonimo => { // Itera sobre los sinónimos encontrados
            const opcion = document.createElement('option'); // Crea un nuevo elemento <option>
            opcion.value = sinonimo; // Asigna el valor del sinónimo
            opcion.textContent = sinonimo; // Establece el texto del elemento <option>
            seleccionarSinonimo.appendChild(opcion); // Agrega el nuevo <option> al selector
        });
    } else {
        // Si no hay sinónimos, muestra un mensaje de advertencia
        Swal.fire({
            icon: 'warning',
            title: 'Sin sinónimos',
            text: 'No hay sinónimos disponibles para esta palabra.'
        });
    }
});

// Evento para reemplazar la palabra
document.getElementById('boton-reemplazar').addEventListener('click', () => {
    const palabraSeleccionada = document.getElementById('palabra-diccionario').value; // Obtiene la palabra seleccionada
    const sinonimoSeleccionado = document.getElementById('sinonimo').value; // Obtiene el sinónimo seleccionado
    const divTexto = document.getElementById('input-texto'); // Obtiene el div editable
    let textoIngresado = divTexto.innerHTML; // Obtiene el contenido del div

    // Verifica si se han seleccionado la palabra y el sinónimo
    if (!palabraSeleccionada || !sinonimoSeleccionado) {
        Swal.fire({
            icon: 'error',
            title: 'Faltan datos',
            text: 'Selecciona una palabra y su sinónimo antes de reemplazar.'
        });
        return; // Termina la ejecución si faltan datos
    }

    const regex = new RegExp(palabraSeleccionada, 'gi'); // Crea una expresión regular insensible a mayúsculas
    if (regex.test(textoIngresado)) { // Verifica si la palabra está en el texto
        // Reemplaza la palabra seleccionada por el sinónimo resaltándolo
        const textoReemplazado = textoIngresado.replace(regex, (match) => {
            return `<mark style="background-color: #FF69B4; color: #4682B4;">${sinonimoSeleccionado}</mark>`;
        });
        divTexto.innerHTML = textoReemplazado; // Actualiza el contenido del div

        // Muestra un mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: 'Reemplazo exitoso',
            text: `La palabra "${palabraSeleccionada}" fue reemplazada por "${sinonimoSeleccionado}".`
        });
    } else {
        // Muestra un mensaje de error si no se encuentra la palabra
        Swal.fire({
            icon: 'error',
            title: 'Palabra no encontrada',
            text: 'La palabra seleccionada no se encuentra en el texto ingresado.'
        });
    }
});

// Evento para buscar la palabra
document.getElementById('boton-buscar').addEventListener('click', () => {
    const palabraSeleccionada = document.getElementById('palabra-diccionario').value; // Obtiene la palabra seleccionada
    const divTexto = document.getElementById('input-texto'); // Obtiene el div editable
    let textoIngresado = divTexto.innerHTML; // Obtiene el contenido del div

    // Verifica si se ha seleccionado una palabra
    if (!palabraSeleccionada) {
        Swal.fire({
            icon: 'error',
            title: 'Faltan datos',
            text: 'Selecciona una palabra antes de buscar.'
        });
        return; // Termina la ejecución si falta la palabra
    }

    const regex = new RegExp(palabraSeleccionada, 'gi'); // Crea una expresión regular insensible a mayúsculas
    if (regex.test(textoIngresado)) { // Verifica si la palabra está en el texto
        // Resalta la palabra encontrada
        const textoMarcado = textoIngresado.replace(regex, (match) => {
            return `<mark style="background-color: #FF69B4; color: #4682B4;">${match}</mark>`;
        });
        divTexto.innerHTML = textoMarcado; // Actualiza el contenido del div

        // Muestra un mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: 'Palabra encontrada',
            text: `La palabra "${palabraSeleccionada}" ha sido marcada.`
        });
    } else {
        // Muestra un mensaje de error si no se encuentra la palabra
        Swal.fire({
            icon: 'error',
            title: 'Palabra no encontrada',
            text: 'La palabra seleccionada no se encuentra en el texto ingresado.'
        });
    }
});

// Evento para limpiar el contenido
document.getElementById('boton-limpiar').addEventListener('click', () => {
    // Muestra un mensaje de confirmación antes de limpiar
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Se eliminará todo el texto y las selecciones!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6', // Color del botón de confirmar
        cancelButtonColor: '#d33', // Color del botón de cancelar
        confirmButtonText: 'Sí, limpiar' // Texto del botón de confirmar
    }).then((result) => {
        if (result.isConfirmed) { // Si el usuario confirma
            // Limpia el texto y restablece los selectores
            document.getElementById('input-texto').innerHTML = ''; // Limpia el contenido del div
            document.getElementById('palabra-diccionario').selectedIndex = 0; // Resetea el selector de palabras
            document.getElementById('sinonimo').innerHTML = '<option value="">Selecciona una palabra</option>'; // Limpia el selector de sinónimos
            // Muestra un mensaje de éxito
            Swal.fire(
                '¡Limpio!',
                'El texto y las selecciones han sido eliminados.',
                'success'
            );
        }
    });
});
