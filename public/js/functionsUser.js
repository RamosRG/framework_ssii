$(document).ready(function () {
    // Manejar el envío del formulario de inicio de sesión
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

    // Mostrar el nombre de usuario
    var username = sessionStorage.getItem('username');
    $('#welcome-message').text(username ? `WELCOME\n${username}` : 'WELCOME\nGuest');

    // Evento para obtener las auditorías de la semana
    $('#auditForWeek').on('click', function () {
        var userId = sessionStorage.getItem('id_user');

        if (userId) {
            $.ajax({
                url: '../accions/auditForUsers/' + userId,
                type: 'GET',
                dataType: 'json',
                success: function (response) {
                    if (response.status === 'success') {
                        var auditDetails = response.data; // Array con todas las auditorías
                        
                        // Almacenar los detalles de las auditorías en sessionStorage
                        sessionStorage.setItem('auditDetails', JSON.stringify(auditDetails));

                        // Redirigir a la página de auditorías
                        window.location.href = '../user/Assignedaudit';
                    }
                },
                error: function () {
                    Swal.fire({
                        title: 'Error!',
                        text: 'No se pudieron obtener las auditorías.',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            });
        }
    });

    // Generar las tarjetas dinámicamente
    function generateAuditCards(auditDetails) {
        var container = document.getElementById('auditCardsContainer');
        container.innerHTML = ''; // Limpiar el contenedor antes de generar las tarjetas
    
        auditDetails.forEach(function (audit) {
            var card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id-audit', audit.id_audit);
    
            // Contenido de la tarjeta
            card.innerHTML = `
                <h2>Detalles de la Auditoría</h2>
                <p><strong>Auditor:</strong> ${audit.auditor}</p>
                <p><strong>Fecha:</strong> ${audit.DATE}</p>
            `;
    
            // Añadir funcionalidad de selección a la tarjeta
            card.addEventListener('click', function() {
                var id_audit = audit.id_audit;
                // Redirigir a otra URL pasando el ID de la auditoría por POST
                $.ajax({
                    url: '../user/auditDetails', // URL de destino para la solicitud POST
                    type: 'POST',
                    data: { id_audit: id_audit }, // Enviar el ID de la auditoría
                    success: function(response) {
                        if (response.status === 'success') {
                            // Aquí puedes redirigir a la página de detalles o manejar la respuesta
                            // Por ejemplo, redirigir a una nueva página y pasar datos en la URL
                            window.location.href = '../user/showAudit?id_audit=' + id_audit; // Cambia esta URL a donde necesites
                        } else {
                            alert(response.message);
                        }
                    },
                    error: function() {
                        alert('Error al enviar los datos.');
                    }
                });
            });
    
            container.appendChild(card);
        });
    }
    

    // Llamar a la función para generar las tarjetas
    var auditDetails = JSON.parse(sessionStorage.getItem('auditDetails'));
    if (auditDetails) {
        generateAuditCards(auditDetails);
    }
});
