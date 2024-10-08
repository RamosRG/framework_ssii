$(document).ready(function () {
    // Inicializa DataTable solo una vez
    var table = $('#userTable').DataTable({
        "ajax": {
            "url": "/framework_ssii/auth/getData", // URL de la función que devuelve los datos
            "dataSrc": "" // Fuente de los datos
        },
        "columns": [
            { "data": "email" },
            { "data": "name" },
            { "data": "firstName" },
            { "data": "lastName" },
            { "data": "area" },
            {
                "data": "status",
                "render": function (data) {
                    return data == 1 ? '<i class="fa fa-check" style="font-size:24px;color:green">' : '<i class="fa fa-remove" style="font-size:24px;color:red">';
                }
            },
            { "data": "created_at" },
            { "data": "updated_at" },
            {
                "defaultContent": '<button class="btn-edit w3-button w3-yellow w3-round fa fa-edit"></button>'
            },

        ]
    });

    // Función para manejar el envío del formulario de actualización
    $('#updateUserForm').on('submit', function (e) {
        e.preventDefault(); // Evita que el formulario se envíe de manera predeterminada

        var formData = $(this).serialize(); // Serializa los datos del formulario

        $.ajax({
            url: '../admin/update', // URL de tu controlador que actualiza los datos
            type: 'POST',
            data: formData, // Envía los datos serializados del formulario
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    Swal.fire({
                        title: 'Éxito!',
                        text: '¡Usuario actualizado con éxito!',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then(() => {
                        // Actualiza la DataTable
                        table.ajax.reload(); // Recarga los datos de la tabla
                        // Cierra el modal
                        $('#id01').hide(); 
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error al actualizar el usuario: ' + response.message,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            },
            error: function () {
                // Manejo de errores si la solicitud AJAX falla
                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrió un error al intentar actualizar el usuario.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        });
    });

    // Función para cuando se da click al botón edit obtener los datos del usuario en el modal
    $('#userTable').on('click', '.btn-edit', function () {
        var data = table.row($(this).parents('tr')).data();
        var userId = data.id_user; // Obtener el ID del usuario de la fila

        $.ajax({
            url: '/framework_ssii/auth/getUserById/' + userId,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response.error) {
                    alert(response.error);
                } else {
                    // Se llenan con los datos correctos del usuario seleccionado
                    $('#id01').find('input[name="email"]').val(response.email);
                    $('#id01').find('input[name="name"]').val(response.name);
                    $('#id01').find('input[name="firstName"]').val(response.firstName);
                    $('#id01').find('input[name="lastName"]').val(response.lastName);
                    $('#id01').find('input[name="status"]').val(response.status);
                    $('#id01').find('input[name="area"]').val(response.area);
                    $('#id01').find('input[name="id_user"]').val(response.id_user);
                    $('#id01').find('input[name="fk_area"]').val(response.fk_area);
                    $('#id01').find('input[name="id_area"]').val(response.id_area);
                    $('#id01').find('input[name="created_at"]').val(response.created_at);
                    $('#id01').find('input[name="updated_at"]').val(response.updated_at);

                    // Selecciona el área en el select
                    $('#area').val(response.fk_area);

                    // Mostrar el modal
                    document.getElementById('id01').style.display = 'block';
                }
            },
            error: function () {
                alert('Error al obtener los datos del usuario.');
            }
        });
    });

    // Llamada AJAX para obtener las áreas y mostrarlas en el select
    $.ajax({
        url: '/framework_ssii/admin/getAreas', // URL para obtener las áreas
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            var $areaSelect = $('#area');
            $areaSelect.empty(); // Limpiar las opciones actuales

            if (response.status == 'success') {
                // Llenar el select con las áreas
                $.each(response.areas, function (index, area) {
                    $areaSelect.append($('<option>', {
                        value: area.id_area,  // valor de la opción
                        text: area.area       // texto que se muestra
                    }));
                });
            } else {
                alert('Error al cargar las áreas.');
            }
        },
        error: function () {
            alert('Error al obtener las áreas.');
        }
    });
});