//funcion para crear una nueva auditoria
$(document).on('click', '#createAudit .btnAudit', function (e) {
    e.preventDefault(); // Evita el comportamiento predeterminado del botón
    var form = $('#auditForm'); // Encuentra el formulario
    var formData = form.serializeArray(); // Serializa los datos del formulario como un array

    // Crear un nuevo array para filtrar valores vacíos
    var filteredData = formData.filter(function(item) {
        return item.value.trim() !== ""; // Mantiene solo aquellos inputs que no están vacíos
    });

    // Convertir el array filtrado de nuevo a un formato de cadena de consulta
    var filteredDataString = $.param(filteredData);
    console.log(filteredDataString); // Mostrar datos filtrados

    $.ajax({
        url: '../accions/insertAudit', // URL de tu controlador que inserta los datos
        type: 'POST',
        data: filteredDataString, // Envía los datos filtrados
        dataType: 'json',
        success: function (response) {
            console.log(response);
            if (response.status === 'success') {
                Swal.fire({
                    title: 'Éxito!',
                    text: '¡Auditoria Creada con éxito!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(function () {
                    // Redirige a otra página después de que el usuario cierre el mensaje de éxito
                    window.location.href = '../accions/showaudit'; // Cambia esta URL a la página deseada
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Error al crear la auditoría: ' + response.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        },
        error: function () {
            Swal.fire({
                title: 'Error!',
                text: 'Ocurrió un error al intentar crear la auditoría.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    });
});
//Funcion para mandar a llamar los roles que se utilizan en la auditoria
function fetchShiftData() {
    // Hacemos la solicitud AJAX
    fetch('/capas.com/accions/getShift', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                let shiftSelect = document.getElementById('shift-list');
                shiftSelect.innerHTML = ''; // Limpiar las opciones anteriores

                // Añadimos de nuevo la opción inicial
                let defaultOption = document.createElement('option');
                defaultOption.text = "Open this select menu";
                defaultOption.selected = true;
                shiftSelect.appendChild(defaultOption);

                // Llenar el select con los datos de maquinaria
                data.shift.forEach(item => {
                    let option = document.createElement('option');
                    option.value = item.id_shift;  // Usamos id_shift como valor
                    option.textContent = item.shift;  // Usamos shift como el nombre a mostrar
                    shiftSelect.appendChild(option);
                });
            } else {
                console.error('Error al obtener los turnos');
            }
        })
        .catch(error => console.error('Error en la solicitud:', error));
}
//Funcion para mandar a llamar los departamentos que se utilizan en la auditoria
function fetchDepartamentData() {
    // Hacemos la solicitud AJAX
    fetch('/capas.com/accions/getDepartament', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                let departamentSelect = document.getElementById('departament-list');
                departamentSelect.innerHTML = ''; // Limpiar las opciones anteriores

                // Añadimos de nuevo la opción inicial
                let defaultOption = document.createElement('option');
                defaultOption.text = "Open this select menu";
                defaultOption.selected = true;
                departamentSelect.appendChild(defaultOption);

                // Llenar el select con los datos de maquinaria
                data.departament.forEach(item => {
                    let option = document.createElement('option');
                    option.value = item.id_departament;  // Usamos id_departament como valor
                    option.textContent = item.departament;  // Usamos departament como el nombre a mostrar
                    departamentSelect.appendChild(option);
                });
            } else {
                console.error('Error al obtener los departamentos');
            }
        })
        .catch(error => console.error('Error en la solicitud:', error));
}
//Funcion para mandar a llamar la maquinaria que se utilizara
function fetchMachineryData() {
    // Hacemos la solicitud AJAX
    fetch('/capas.com/accions/getMachinery', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                let machinerySelect = document.getElementById('machinery-list');
                machinerySelect.innerHTML = ''; // Limpiar las opciones anteriores

                // Añadimos de nuevo la opción inicial
                let defaultOption = document.createElement('option');
                defaultOption.text = "Open this select menu";
                defaultOption.selected = true;
                machinerySelect.appendChild(defaultOption);

                // Llenar el select con los datos de maquinaria
                data.machinery.forEach(item => {
                    let option = document.createElement('option');
                    option.value = item.id_machinery;  // Usamos id_machinery como valor
                    option.textContent = item.machinery;  // Usamos machinery como el nombre a mostrar
                    machinerySelect.appendChild(option);
                });
            } else {
                console.error('Error al obtener datos de maquinaria');
            }
        })
        .catch(error => console.error('Error en la solicitud:', error));
}
//Funcion para mandar a llamar la categoria que se utilizan en la auditoria
function fetchCategoryData() {
    // Hacemos la solicitud AJAX
    fetch('/capas.com/accions/getCategory', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                let categorySelect = document.getElementById('category-list');

                categorySelect.innerHTML = ''; // Limpiar las opciones anteriores

                // Añadimos de nuevo la opción inicial
                let defaultOption = document.createElement('option');
                defaultOption.text = "Open this select menu";
                defaultOption.selected = true;
                categorySelect.appendChild(defaultOption);

                // Llenar el select con los datos de maquinaria
                data.category.forEach(item => {
                    let option = document.createElement('option');
                    option.value = item.id_category;  // Usamos id_departament como valor
                    option.textContent = item.category;  // Usamos departament como el nombre a mostrar
                    categorySelect.appendChild(option);
                });
            } else {
                console.error('Error al obtener las categorias');
            }
        })
}
//Funcion para mandar a llamar los privilegios que se utilizan en la auditoria
function getPrivileges() {
    return fetch('/capas.com/auth/getPrivileges', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                let privilegesInput = document.getElementById('privileges'); // El campo input hidden
                privilegesInput.value = data.privileges; // Asignar el valor de los privilegios directamente
            } else {
                console.error('Error al obtener los datos de privilegios');
            }
        })
        .catch(error => console.error('Error en la solicitud:', error));
}
// Función para llenar el select con datos de la fuente
function fetchFountainData(selectElement) {
    fetch('/capas.com/accions/getFountain', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success' && Array.isArray(data.fountain)) {
            selectElement.innerHTML = ''; // Limpia opciones anteriores

            // Opción por defecto
            let defaultOption = document.createElement('option');
            defaultOption.text = "Selecciona una fuente";
            defaultOption.value = '';
            selectElement.appendChild(defaultOption);

            // Llenar select con fuentes
            data.fountain.forEach(item => {
                let option = document.createElement('option');
                option.value = item.id_fountain;
                option.textContent = item.fountain;
                selectElement.appendChild(option);
            });
        } else {
            console.error('Error al obtener datos de fuentes');
        }
    })
    .catch(error => console.error('Error en la solicitud:', error));
}
//categorias utilizadas en la base de datos
const categories = [
    { name: "SEGURIDAD", value: "1",  questions: ["Pregunta 1", "Pregunta 2", "Pregunta 3", "Pregunta 4", "Pregunta 5", "Pregunta 6", "Pregunta 7"] },
    { name: "CALIDAD", value: "2",questions: ["Pregunta 1", "Pregunta 2", "Pregunta 3", "Pregunta 4", "Pregunta 5", "Pregunta 6", "Pregunta 7"] },
    { name: "PRODUCCION", value: "3", questions: ["Pregunta 1", "Pregunta 2", "Pregunta 3", "Pregunta 4", "Pregunta 5", "Pregunta 6", "Pregunta 7"] },
    { name: "PERSONAL O PROCESO", value: "4", questions: ["Pregunta 1", "Pregunta 2", "Pregunta 3", "Pregunta 4", "Pregunta 5", "Pregunta 6", "Pregunta 7"] },
    { name: "COSTO", value: "5", questions: ["Pregunta 1", "Pregunta 2", "Pregunta 3", "Pregunta 4", "Pregunta 5", "Pregunta 6", "Pregunta 7"] }
];

function createDynamicSections() {
    const container = document.getElementById('dynamic-sections');

    categories.forEach((category) => {
        const section = document.createElement('div');
        section.className = 'question-section';

        const label = document.createElement('h3');
        label.innerHTML = `<b>${category.name}</b>`;
        section.appendChild(label);

        category.questions.forEach((question, questionIndex) => {
            const questionContainer = document.createElement('div');
            questionContainer.style.display = 'flex';
            questionContainer.style.alignItems = 'center';
            questionContainer.style.gap = '10px';
            questionContainer.style.marginBottom = '15px';

            // Input para la pregunta
            const input = document.createElement('input');
            input.className = 'w3-input w3-border w3-round';
            input.type = 'text';
            input.placeholder = question;
            input.required = true;

            // Select para la fuente
            const select = document.createElement('select');
            select.className = 'w3-select w3-border w3-round';
            select.style.display = 'none'; // Se mostrará después de que se escriba en el input

            // Llenar select cuando se escribe en el input
            input.addEventListener('input', function () {
                if (input.value.trim() !== "") {
                    select.style.display = 'block';
                    fetchFountainData(select); // Llamada para llenar el select
                } else {
                    select.style.display = 'none'; // Ocultar si el input está vacío
                }
            });

            questionContainer.appendChild(input);
            questionContainer.appendChild(select);
            section.appendChild(questionContainer);
        });

        container.appendChild(section);
    });
}
//funcion para obtener al usuario
function fetchUserData() {
    fetch('/capas.com/admin/getUsers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            let userSelect = document.getElementById('user-list');
            userSelect.innerHTML = ''; // Limpiar las opciones anteriores

            // Añadir de nuevo la opción inicial
            let defaultOption = document.createElement('option');
            defaultOption.text = "Open this select menu";
            defaultOption.selected = true;
            userSelect.appendChild(defaultOption);

            // Llenar el select con los datos de los usuarios
            data.user.forEach(item => {  // Aquí cambiamos `machinery` por `users`
                let option = document.createElement('option');
                option.value = item.id_user;  // Usamos id_user como valor
                option.textContent = item.email;  // Usamos email como el nombre a mostrar
                userSelect.appendChild(option);
            });
        } else {
            console.error('Error al obtener datos de los usuarios');
        }
    })
    .catch(error => console.error('Error en la solicitud:', error));
}

//funcion para cargar todas los select que se encuentran en la vista de create audit
window.onload = function () {
    fetchShiftData();
    fetchDepartamentData();
    fetchMachineryData();
    fetchCategoryData();
    getPrivileges();
    fetchFountainData();
    createDynamicSections();
    fetchUserData();
    const dateField = document.getElementById('date-field');
    const today = new Date().toISOString().split('T')[0]; // Obtiene la fecha en formato YYYY-MM-DD
    dateField.value = today;
};