$(document).ready(function () {
    // Inicializa DataTable solo una vez
    var table = $('#userTable').DataTable({
        "ajax": {
            "url": "/capas.com/auth/getData", // URL de la función que devuelve los datos
            "dataSrc": "" // Fuente de los datos
        },
        "columns": [
            { "data": "email" },
            { "data": "name" },
            { "data": "firstName" },
            { "data": "lastName" },
            { "data": "area" },
            { "data": "department" },
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
            url: '/capas.com/auth/getUserById/' + userId,
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
});
