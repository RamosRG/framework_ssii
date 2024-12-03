document.addEventListener("DOMContentLoaded", () => {
    const recoverPasswordForm = document.getElementById("recoverPasswordForm");

    recoverPasswordForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(recoverPasswordForm);

        try {
            const response = await fetch("../user/requestPasswordReset", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                // Mostrar alerta de éxito con SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: '¡Correo Enviado Correctamente!',
                    text: result.success,
                    confirmButtonText: 'Aceptar'
                });
            } else {
                // Mostrar alerta de error con SweetAlert2
                Swal.fire({
                    icon: 'error',
                    title: 'Error ¡Revisa tu correo!',
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
