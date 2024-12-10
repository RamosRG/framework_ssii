$(document).ready(function () {
  // Manejar el envío del formulario de inicio de sesión
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    var formData = $(this).serialize();

    $.ajax({
      url: "/capas.com/auth/login",
      type: "POST",
      data: formData,
      dataType: "json",
      success: function (response) {
        if (response.status === "success") {
          sessionStorage.setItem("id_user", response.id_user);
          sessionStorage.setItem("privileges", response.privileges);

          if (response.username) {
            sessionStorage.setItem("username", response.username);
          }

          // Redirige al home
          window.location.href = response.redirect;
        } else {
          showError("Error!", response.message);
        }
      },
      error: function () {
        showError("Error!", "Ocurrió un error al intentar iniciar sesión.");
      },
    });
  });

  // Mostrar el nombre de usuario
  var username = sessionStorage.getItem("username");
  $("#welcome-message").text(
    username ? `WELCOME\n${username}` : "WELCOME\nGuest"
  );

  // Función para generar tarjetas de auditorías (Asignadas o para revisión)
  function generateAuditCards(auditDetails, containerId) {
    var container = document.getElementById(containerId);

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

  // Botón para obtener auditorías asignadas
  $("#auditForWeek").on("click", function () {
    var userId = sessionStorage.getItem("id_user");

    if (!userId) {
      showError("Error!", "Usuario no autenticado o sesión expirada.");
      return;
    }

    $.ajax({
      url: "../accions/auditForUsers/" + userId,
      type: "GET",
      dataType: "json",
      success: function (response) {
        if (response.status === "success") {
          var auditDetails = response.data;

          // Almacenar los detalles en sessionStorage
          sessionStorage.setItem("dataCards", JSON.stringify(auditDetails));  // Para las auditorías asignadas

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

  // Verificar y generar tarjetas de auditorías asignadas
  var dataCards = sessionStorage.getItem("dataCards");
  if (dataCards) {
    try {
      generateAuditCards(JSON.parse(dataCards), "auditCardsContainer"); // Generar tarjetas asignadas
    } catch (e) {
      console.error("Error al parsear dataCards:", e);
    }
  } else {
    console.warn("No se encontraron datos en sessionStorage para dataCards.");
  }

  // Botón para auditorías por revisar
  $("#auditForReview").on("click", function () {
    var userId = sessionStorage.getItem("id_user");

    if (!userId) {
      showError("Error!", "Usuario no autenticado o sesión expirada.");
      return;
    }

    $.ajax({
      url: "../supervisor/auditToReview/" + userId,
      type: "GET",
      dataType: "json",
      success: function (response) {
        if (response.status === "success") {
          var auditDetails = response.data;

          // Almacenar los detalles en sessionStorage
          sessionStorage.setItem("dataaudit", JSON.stringify(auditDetails));

          // Redirigir a la página de auditorías
          window.location.href = "../supervisor/accionsOfAudit";
        } else {
          showError("Error!", response.message);
        }
      },
      error: function () {
        showError("Error!", "No se pudieron obtener las auditorías.");
      },
    });
  });

  // Verificar y generar tarjetas de auditorías para revisión
  var dataaudit = sessionStorage.getItem("dataaudit");

  if (dataaudit) {
    try {
      generateAuditCards(JSON.parse(dataaudit), "reviewAuditCardsContainer"); // Generar tarjetas para revisión
    } catch (e) {
      console.error("Error al parsear dataaudit:", e);
    }
  } else {
    console.warn("No se encontraron datos en sessionStorage para dataaudit.");
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

// Botón para obtener auditorías asignadas
$("#dashboard").on("click", function () {
  var userId = sessionStorage.getItem("id_user");

  if (!userId) {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: 'Usuario no autenticado o sesión expirada.',
      confirmButtonText: 'OK'
    });
    window.location.href = "../user/dashboard";
    return;
  }

});

// Cargar datos del dashboard al cargar la página
$(document).ready(function () {
  $.ajax({
    url: "<?= base_url('../accions/getDashboardData') ?>",
    method: "GET",
    dataType: "json",
    success: function (data) {
      // Actualizar valores en las tarjetas
      $('#totalAudits').text(data.audits.length || 0);
      $('#answeredQuestions').text(data.answered || 0);
      $('#pendingActions').text(data.pendingActions || 0);

      // Configuración del gráfico
      const ctx = document.getElementById('auditChart').getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Respondidas', 'No Respondidas', 'Acciones Pendientes'],
          datasets: [{
            label: 'Resumen',
            data: [data.answered || 0, data.notAnswered || 0, data.pendingActions || 0],
            backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
          }]
        },
      });
    },
    error: function (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'No se pudieron cargar los datos del dashboard.',
        confirmButtonText: 'OK'
      });
      console.error("Error al obtener los datos:", err);
    }
  });
});
