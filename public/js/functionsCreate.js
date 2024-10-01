$(document).ready(function () {
    var table = $('#questionTable').DataTable({
        "ajax": {
            "url": "/framework_ssii/accions/showQuestion",
            "dataSrc": ""
        },
        "columns": [
            { "data": "id_question" },
            { "data": "category" },
            { "data": "question" },
            {
                "data": "status",
                "render": function (data) {
                    return data == 1 ? '<i class="fa fa-check" style="font-size:24px;color:green"></i>' : '<i class="fa fa-remove" style="font-size:24px;color:red"></i>';
                }
            },
            { "data": "create_for" },
            { "data": "fountain" },
            {
                "data": "id_question",
                "render": function (data, type, row) {
                    var statusText = row.status == 1 ? 'Desactivar' : 'Activar';
                    var newStatus = row.status == 1 ? 0 : 1; // Cambia el estado
                    return `
                        <button class="btn-update-status w3-button w3-red" data-id="${data}" data-status="${newStatus}">
                            ${statusText}
                        </button>
                    `;
                }
            }
        ]
    });

    // Manejar el evento de clic en el botón para actualizar el estado
    $('#questionTable').on('click', '.btn-update-status', function () {
        var questionId = $(this).data('id');
        var newStatus = $(this).data('status');

        // Enviar solicitud AJAX para actualizar el estado
        $.ajax({
            url: '/framework_ssii/accions/updateStatus/' + questionId, // Ruta al método en el controlador
            method: 'POST',
            data: { status: newStatus }, // Enviar el nuevo estado
            success: function (response) {
                if (response.success) {
                    alert('Estado actualizado correctamente');
                    table.ajax.reload(); // Recargar la tabla
                } else {
                    alert('Error: ' + response.error);
                }
            }
        });
    });
});


$(document).on('click', '#createQuestion .btnQuestion', function (e) {
    e.preventDefault(); // Evita el comportamiento predeterminado del botón

    var form = $('#questionForm'); // Encuentra el formulario
    var formData = form.serialize(); // Serializa los datos del formulario
    console.log(formData);
    $.ajax({
        url: '../accions/insertQuestions', // URL de tu controlador que inserta los datos
        type: 'POST',
        data: formData, // Envía los datos serializados del formulario
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                Swal.fire({
                    title: 'Éxito!',
                    text: 'Pregunta Creada con exito!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Error al crear el Crear la pregunta: ' + response.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        },
        error: function () {
            Swal.fire({
                title: 'Error!',
                text: 'Ocurrió un error al intentar creat la pregunta.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    });
});

//funcion para crear una nueva auditoria
$(document).on('click', '#createAudit .btnAudit', function (e) {
    e.preventDefault(); // Evita el comportamiento predeterminado del botón

    var form = $('#auditForm'); // Encuentra el formulario
    var formData = form.serialize(); // Serializa los datos del formulario
    console.log(formData);
    $.ajax({
        url: '../accions/insertAudit', // URL de tu controlador que inserta los datos
        type: 'POST',
        data: formData, // Envía los datos serializados del formulario
        dataType: 'json',
        success: function (response) {
            console.log(response);
            if (response.status === 'success') {
                Swal.fire({
                    title: 'Éxito!',
                    text: '¡Auditoria Creada con exito!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(function () {
                    // Redirige a otra página después de que el usuario cierre el mensaje de éxito
                    window.location.href = '../accions/showAudit'; // Cambia esta URL a la página deseada
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Error al crear el Crear la auditoria: ' + response.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        },
        error: function () {
            Swal.fire({
                title: 'Error!',
                text: 'Ocurrió un error al intentar crear la auditoria.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    });
});

//funcion para crear un usuario
$(document).on('click', '#createUser .btnCreate', function (e) {
    e.preventDefault(); // Evita el comportamiento predeterminado del botón

    var form = $('#userForm'); // Encuentra el formulario
    var formData = form.serialize(); // Serializa los datos del formulario
    console.log(formData);
    $.ajax({
        url: '../admin/insertData', // URL de tu controlador que inserta los datos
        type: 'POST',
        data: formData, // Envía los datos serializados del formulario
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                Swal.fire({
                    title: 'Éxito!',
                    text: '¡Usuario creado con éxito!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(function () {
                    // Redirige a otra página después de que el usuario cierre el mensaje de éxito
                    window.location.href = '../admin/home'; // Cambia esta URL a la página deseada
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Error al crear el usuario: ' + response.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        },
        error: function () {
            Swal.fire({
                title: 'Error!',
                text: 'Ocurrió un error al intentar crear el usuario.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    });

});

$('#loginForm').on('submit', function (e) {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario

    // Llama a la función getPrivileges para asegurar que privileges tenga valor
    getPrivileges().then(() => {
        var formData = $(this).serialize(); // Serializa los datos del formulario
        console.log(formData);
        $.ajax({
            url: '/framework_ssii/auth/login',
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    window.location.href = response.redirect; // Cambia la URL a la página de destino
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Credenciales incorrectas',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            },
            error: function () {
                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrió un error al intentar iniciar sesión.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        });
    });
});

function fetchFountainData() {
    // Hacemos la solicitud AJAX
    fetch('/framework_ssii/accions/getFountain', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                let fountainSelect = document.getElementById('fountain-list');
                fountainSelect.innerHTML = ''; // Limpiar las opciones anteriores

                // Añadimos de nuevo la opción inicial
                let defaultOption = document.createElement('option');
                defaultOption.text = "Open this select menu";
                defaultOption.selected = true;
                fountainSelect.appendChild(defaultOption);

                // Llenar el select con los datos de maquinaria
                data.fountain.forEach(item => {
                    let option = document.createElement('option');
                    option.value = item.id_fountain;  // Usamos id_machinery como valor
                    option.textContent = item.fountain;  // Usamos machinery como el nombre a mostrar
                    fountainSelect.appendChild(option);
                });
            } else {
                console.error('Error al obtener datos de maquinaria');
            }
        })
        .catch(error => console.error('Error en la solicitud:', error));
}
//Funcion para mandar a llamar la maquinaria que se utilizara
function fetchMachineryData() {
    // Hacemos la solicitud AJAX
    fetch('/framework_ssii/accions/getMachinery', {
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
//Funcion para mandar a llamar los roles que se utilizan en la auditoria
function fetchShiftData() {
    // Hacemos la solicitud AJAX
    fetch('/framework_ssii/accions/getShift', {
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
    fetch('/framework_ssii/accions/getDepartament', {
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
//Funcion para mandar a llamar los privilegios que se utilizan en la auditoria
function getPrivileges() {
    return fetch('/framework_ssii/auth/getPrivileges', {
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
//Funcion para mandar a llamar la categoria que se utilizan en la auditoria
function fetchCategoryData() {
    // Hacemos la solicitud AJAX
    fetch('/framework_ssii/accions/getCategory', {
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
//funcion para cargar todas los select que se encuentran en la vista de create audit
window.onload = function () {
    fetchMachineryData();
    fetchShiftData();
    fetchDepartamentData();
    getPrivileges();
    fetchCategoryData();
    fetchFountainData();
};
