document.addEventListener("DOMContentLoaded", () => {
    const recoverPasswordForm = document.getElementById("recoverPasswordForm");

    recoverPasswordForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(recoverPasswordForm);
// Establecer base_url usando una variable PHP que se pase al JavaScript
    const baseUrl = '<?php echo base_url(); ?>'; // Asegúrate de que esta línea se ejecute dentro de una vista PHP

        try {
            const response = await fetch("../../user/resetPassword", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                // Mostrar alerta de éxito con SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: '¡Contraseña restablecida!',
                    text: result.success,
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    window.location.href = 'login'; // Redirige a la página de login o cualquier otra página que desees
                });
            } else {
                // Mostrar alerta de error con SweetAlert2
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result.error,
                    confirmButtonText: 'Intentar de nuevo'
                });
            }
        } catch (error) {
            console.error("Error:", error);
            // Mostrar alerta de error de conexión con SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'Ocurrió un problema. Por favor, inténtalo de nuevo más tarde.',
                confirmButtonText: 'Aceptar'
            });
        }
    });
});