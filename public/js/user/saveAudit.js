function fetchUserData() {
  fetch("/capas.com/admin/getUsers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        let userSelect = document.getElementById("user-list");
        userSelect.innerHTML = ""; // Limpiar las opciones anteriores

        // Añadir opción inicial
        let defaultOption = document.createElement("option");
        defaultOption.text = "Open this select menu";
        defaultOption.value = ""; // Vacío para validación posterior
        defaultOption.selected = true;
        defaultOption.disabled = true;
        userSelect.appendChild(defaultOption);

        // Llenar el select con los datos de los usuarios
        data.user.forEach((item) => {
          let option = document.createElement("option");
          option.value = item.id_user; // Usamos id_user como valor
          option.textContent = item.email; // Mostrar email en el dropdown
          option.setAttribute("data-email", item.email); // Agregar el correo como atributo personalizado
          userSelect.appendChild(option);
        });

        // Inicializar Select2 con estilos
        $('#user-list').select2({
          placeholder: "Open this select menu", // Placeholder personalizado
          allowClear: true, // Agregar botón de limpieza
          theme: "classic", // Cambia el tema según tus preferencias
        });
      } else {
        console.error("Error al obtener datos de los usuarios");
      }
    })
    .catch((error) => console.error("Error en la solicitud:", error));
}

function collectTableData() {
  const userId = document.getElementById("user-list").value;
  const urlParams = new URLSearchParams(window.location.search);
  const id_audit = urlParams.get("id_audit"); // Obtener id_audit de la URL

  if (!userId) {
    Swal.fire({
      icon: "warning",
      title: "Usuario no seleccionado",
      text: "Por favor selecciona un usuario antes de enviar los datos.",
      confirmButtonText: "Aceptar",
    });
    return null;
  }

  if (!id_audit) {
    Swal.fire({
      icon: "warning",
      title: "ID de auditoría no proporcionado",
      text: "Por favor asegúrate de que la URL tenga el parámetro id_audit.",
      confirmButtonText: "Aceptar",
    });
    return null;
  }

  console.log("ID del usuario:", userId);
  console.log("ID de auditoría:", id_audit);

  // Retornar los datos para ser enviados
  return { userId, id_audit }; 
}

document.getElementById("send-data").addEventListener("click", function () {
  const data = collectTableData();
  if (!data) return;

  sendDataToSupervisor(data);
});

function sendDataToSupervisor(data) {
  $.ajax({
    url: "../user/savedAudit",  // Asegúrate de que la URL sea correcta en tu backend
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),  // Enviar el objeto con userId y id_audit
    success: function (response) {
      console.log(response);
      if (response.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Datos enviados correctamente",
          text: response.message,
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.href = "/capas.com/user/home"; // Redirigir a la página de inicio
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al enviar los datos",
          text: response.message,
          confirmButtonText: "Aceptar",
        });
      }
    },
    error: function (xhr, status, error) {
      console.error("Error en la solicitud AJAX:", error);
      Swal.fire({
        icon: "error",
        title: "Error en la conexión",
        text: "Hubo un problema al enviar los datos. Inténtalo nuevamente.",
        confirmButtonText: "Aceptar",
      });
    },
  });
}

$(document).ready(function () {
    // Asociar el evento de clic al botón
    $("#save-audit").on("click", function () {
        const urlParams = new URLSearchParams(window.location.search);
        const id_audit = urlParams.get("id_audit");

        if (!id_audit) {
            alert("No se encontró el ID de auditoría.");
            return;
        }

        saveAuditComment(id_audit); // Llamar a la función para guardar el comentario
    });
});

// Función para guardar el comentario de auditoría
function saveAuditComment(idAudit) {
    // Obtener el comentario
    const comment = $("#audit-commentario").val();

    // Preparar los datos para enviar al servidor
    const data = {
        id_audit: idAudit,
        comment: comment,
    };

    // Enviar la solicitud AJAX con fetch
    fetch("../user/submitAuditComment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
            }
            return response.json(); // Convertir la respuesta a JSON
        })
        .then((result) => {
            if (result.status === "success") {
                Swal.fire({
                    icon: "success",
                    title: "Datos enviados correctamente",
                    text: result.message,
                    showConfirmButton: false,
                    timer: 1500,
                }).then(() => {
                    window.location.href = "/capas.com/accions/showaudit"; // Redirigir a la página de inicio
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error al enviar los datos",
                    text: result.message,
                    confirmButtonText: "Aceptar",
                });
            }
        })
        .catch((error) => {
            console.error("Error en la solicitud:", error);
            Swal.fire({
                icon: "error",
                title: "Error en la conexión",
                text: "Hubo un problema al enviar los datos. Inténtalo nuevamente.",
                confirmButtonText: "Aceptar",
            });
        });
}