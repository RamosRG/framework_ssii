$(document).ready(function () {
    // Inicializar DataTable para la tabla de preguntas
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
                    return data == 1 
                        ? '<i class="fa fa-check" style="font-size:24px;color:green"></i>' 
                        : '<i class="fa fa-remove" style="font-size:24px;color:red"></i>';
                }
            },
            { "data": "create_for" },
            { "data": "fountain" },
            {
                "data": "id_question",
                "render": function (data, type, row) {
                    var statusText = row.status == 1 ? 'Desactivar' : 'Activar';
                    var newStatus = row.status == 1 ? 0 : 1; // Cambiar el estado
                    return `
                        <button class="btn-update-status w3-button w3-red" data-id="${data}" data-status="${newStatus}">
                            ${statusText}
                        </button>
                    `;
                }
            }
        ]
    });

    // Inicializar Select2 en los selectores de área y departamento
    $('#area-list, #department-list').select2({
        placeholder: "Seleccione una opción",
        allowClear: true // Permite limpiar la selección
    });

    // Función para cargar los datos del área
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
                let areaSelect = $('#area-list');
                areaSelect.empty(); // Limpiar opciones anteriores
                areaSelect.append(new Option("Seleccione una opción", "")); // Añadir opción predeterminada

                // Llenar el select con los datos de áreas
                data.areas.forEach(item => {
                    let option = new Option(item.area, item.id_area);
                    areaSelect.append(option);
                });

                areaSelect.trigger('change'); // Actualizar Select2
            } else {
                console.error('Error al obtener las áreas');
            }
        })
        .catch(error => console.error('Error en la solicitud:', error));
    }

    // Manejar el cambio en el área y cargar departamentos correspondientes
    $('#area-list').on('change', function () {
        let areaId = $(this).val();

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
                    let departmentSelect = $('#department-list');
                    departmentSelect.empty(); // Limpiar opciones anteriores
                    departmentSelect.append(new Option("Seleccione un departamento", "")); // Añadir opción inicial

                    // Llenar el select con datos de departamentos
                    data.departments.forEach(item => {
                        let option = new Option(item.department, item.id_department);
                        departmentSelect.append(option);
                    });

                    departmentSelect.trigger('change'); // Actualizar Select2
                } else {
                    console.error('Error al obtener los departamentos');
                }
            })
            .catch(error => console.error('Error en la solicitud:', error));
        }
    });

    // Llamar a la función de carga de áreas al cargar la página
    fetchAreaData();

    // Manejar el evento de clic para actualizar el estado de la pregunta
    $('#questionTable').on('click', '.btn-update-status', function () {
        var questionId = $(this).data('id');
        var newStatus = $(this).data('status');

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
    
    // Manejar la creación de preguntas
    $(document).on('click', '#createQuestion .btnQuestion', function (e) {
        e.preventDefault();

        var form = $('#questionForm');
        var formData = form.serialize();
        console.log(formData);
        
        $.ajax({
            url: '../accions/insertQuestions', // URL del controlador que inserta los datos
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    Swal.fire({
                        title: 'Éxito!',
                        text: 'Pregunta Creada con éxito!',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error al crear la pregunta: ' + response.message,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            },
            error: function () {
                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrió un error al intentar crear la pregunta.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        });
    });

    // Manejar la creación de usuarios
    $(document).on('click', '#createUser .btnCreate', function (e) {
        e.preventDefault();

        var form = $('#userForm');
        var formData = form.serialize();
        console.log(formData);
        
        $.ajax({
            url: '../admin/insertData', // URL del controlador que inserta los datos
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    Swal.fire({
                        title: 'Éxito!',
                        text: '¡Usuario creado con éxito!',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then(function () {
                        window.location.href = '../admin/home';
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
    
    // Cargar todas las áreas al cargar la página
    window.onload = function () {
        fetchAreaData();
    };
});
