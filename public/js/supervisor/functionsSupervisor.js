$(document).ready(function () {

  // Mostrar el nombre de usuario
  var username = sessionStorage.getItem("username");
  $("#welcome-message").text(
    username ? `WELCOME\n${username}` : "WELCOME\nGuest"
  );

  // Manejar clic en el botón para obtener auditorías
  $("#auditForWeek").on("click", function () {
    var userId = sessionStorage.getItem("id_user");

    if (!userId) {
      showError("Error!", "Usuario no autenticado o sesión expirada.");
      return;
    }

    $.ajax({
      url: "../supervisor/auditForSupervisor/" + userId,
      type: "GET",
      dataType: "json",
      success: function (response) {
        if (response.status === "success") {
          var auditDetails = response.data;

          // Almacenar los detalles en sessionStorage
          sessionStorage.setItem("auditDetails", JSON.stringify(auditDetails));

          // Redirigir a la página de auditorías
          window.location.href = "../user/Assignedaudit";
        } else {
          showError("Error!", response.message);
        }
      },
      error: function () {
        showError("Error!", "No se pudieron obtener las auditorías.");
      },
    });
  });

  // Generar las tarjetas dinámicamente
  function generateAuditCards(auditDetails) {
    var container = document.getElementById("auditCardsContainer");

    if (!container) {
      console.warn("Contenedor para las tarjetas no encontrado.");
      return;
    }

    container.innerHTML = ""; // Limpiar el contenedor antes de generar las tarjetas

    auditDetails.forEach(function (audit) {
      var card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-id-audit", audit.id_audit);

      // Contenido de la tarjeta
      card.innerHTML = `
        <h2>${audit.audit_title}</h2>
        <p><strong>Auditor:</strong> ${audit.name} ${audit.firstName} ${audit.lastName}</p>
        <p><strong>Fecha:</strong> ${audit.DATE}</p>
      `;

      // Añadir funcionalidad de selección a la tarjeta
      card.addEventListener("click", function () {
        var id_audit = audit.id_audit;
        // Redirigir a una página de detalles
        window.location.href = "showAudit?id_audit=" + id_audit;
      });

      container.appendChild(card);
    });
  }

  // Llamar a la función para generar las tarjetas
  var auditDetails = JSON.parse(sessionStorage.getItem("auditDetails"));
  if (auditDetails) {
    generateAuditCards(auditDetails);
  }

  // Función para mostrar errores
  function showError(title, message) {
    Swal.fire({
      title: title,
      text: message,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
});