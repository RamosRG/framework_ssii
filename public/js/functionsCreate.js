$(document).ready(function () {
    var table = $('#questionTable').DataTable({
        "ajax": {
            "url": "/capas.com/accions/showQuestion",
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
            url: '/capas.com/accions/updateStatus/' + questionId, // Ruta al método en el controlador
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

//Funcion para mandar a llamar los departamentos que se utilizan en la auditoria
function fetchAreaData() {
    fetch('/capas.com/accions/getArea', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                let areaSelect = document.getElementById('area-list');
                areaSelect.innerHTML = ''; // Limpiar las opciones anteriores

                // Añadimos la opción inicial
                let defaultOption = document.createElement('option');
                defaultOption.text = "Open this select menu";
                defaultOption.selected = true;
                areaSelect.appendChild(defaultOption);

                // Llenar el select con los datos de áreas
                data.areas.forEach(item => {
                    let option = document.createElement('option');
                    option.value = item.id_area;  // Usamos id_area como valor
                    option.textContent = item.area;  // Usamos area como el nombre a mostrar
                    areaSelect.appendChild(option);
                });
            } else {
                console.error('Error al obtener las áreas');
            }
        })
        .catch(error => console.error('Error en la solicitud:', error));
}

document.getElementById('area-list').addEventListener('change', function () {
    let areaId = this.value;  // Obtener el ID del área seleccionada

    if (areaId) {
        fetch(`/capas.com/accions/getDepartamentById/${areaId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    let departmentSelect = document.getElementById('department-list');
                    departmentSelect.innerHTML = ''; // Limpiar las opciones anteriores

                    // Añadimos la opción inicial
                    let defaultOption = document.createElement('option');
                    defaultOption.text = "Seleccione un departamento";
                    defaultOption.selected = true;
                    departmentSelect.appendChild(defaultOption);

                    // Llenar el select con los datos de departamentos
                    data.departments.forEach(item => {
                        let option = document.createElement('option');
                        option.value = item.id_department;  // Usamos id_department como valor
                        option.textContent = item.department;  // Usamos department como el nombre a mostrar
                        departmentSelect.appendChild(option);
                    });
                } else {
                    console.error('Error al obtener los departamentos');
                }
            })
            .catch(error => console.error('Error en la solicitud:', error));
    }
});

//funcion para cargar todas los select que se encuentran en la vista de create audit
window.onload = function () {

    fetchAreaData();

};

