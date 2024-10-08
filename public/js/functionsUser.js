$('#loginForm').on('submit', function (e) {
    e.preventDefault();

    var formData = $(this).serialize();

    $.ajax({
        url: '/framework_ssii/auth/login',
        type: 'POST',
        data: formData,
        dataType: 'json',
        success: function (response) {
            sessionStorage.setItem('id_user', response.id_user);
            if (response.status === 'success') {
                // Asegúrate de que 'username' (en este caso el email) esté presente en la respuesta

                // Almacena el email como 'username' en sessionStorage
                if (response.username) {
                    sessionStorage.setItem('username', response.username);

                }

                // Redirige al home
                window.location.href = response.redirect;
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: response.message,
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

$(document).ready(function () {
    // Recupera el username de sessionStorage
    var username = sessionStorage.getItem('username');
    // Si el username (email) existe, lo mostramos. Si no, mostramos 'Guest'
    if (username) {
        $('#welcome-message').text('WELCOME\n' + username);
    } else {
        $('#welcome-message').text('WELCOME\nGuest');
    }
});


$('#auditForWeek').on('click', function () {
    // Obtener el ID del usuario desde sessionStorage
    var userId = sessionStorage.getItem('id_user');

    // Asegurarse de que el userId está presente
    if (userId) {
        // Realizar la llamada AJAX enviando el userId
        $.ajax({
            url: './../accions/getAudit/', // Cambia esto a la URL de tu API
            method: 'GET',
            data: { userId: userId }, // Enviar el userId en la solicitud
            success: function (response) {
                // Manejar la respuesta del servidor
                console.log('Response from server:', response);
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    } else {
        alert('User ID not found');
    }
});



