$(document).on('click', '#createUser .btnCreate', function (e) {
    e.preventDefault(); // Evita el comportamiento predeterminado del botón

    var form = $('#userForm'); // Encuentra el formulario
    var formData = form.serialize(); // Serializa los datos del formulario

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
