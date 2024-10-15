$(document).ready(function () {
  // Obtener el ID de auditoría de la URL
  var urlParams = new URLSearchParams(window.location.search);
  var id_audit = urlParams.get("id_audit");

  // Verificar si existe el id_audit
  if (id_audit) {
    console.log("ID de auditoría encontrado: " + id_audit);
    fetchAuditDetails(id_audit);
  } else {
    console.error("No se encontró el ID de auditoría en la URL.");
  }

  function fetchAuditDetails(idAudit) {
    $.ajax({
      url: "../user/auditDetails/" + idAudit,
      type: "GET",
      dataType: "json",
      success: function (response) {
        if (response.status === "success") {
          var auditDetails = response.data;

          if (auditDetails.length > 0) {
            var audit = auditDetails[0];

            // Rellenar los campos de la auditoría
            $("#no_audit").val(audit.no_audit);
            $("#date").val(audit.date);
            $("#auditor").val(audit.auditor);
            $("#status").val(audit.status);
            $("#departament").val(audit.departament);
            $("#machinery").val(audit.machinery);
            $("#shift").val(audit.shift);

            // Limpiar la tabla antes de agregar nuevas filas
            $("#audit-questions-list").empty();

            // Llenar la tabla de preguntas
            auditDetails.forEach(function (detail) {
              var isChecked = "checked";
              var complianceCheckbox = `
                  <input type="checkbox" class="w3-check" ${isChecked} data-question-id="${detail.id_question}">
              `;
              var row = `
                <tr>
                    <td>${detail.category}</td>
                    <td>${detail.question}</td>
                    <td>${detail.create_at}</td>
                    <td>${detail.fountain}</td>
                    <td>${complianceCheckbox}</td>
                    <td><input type="text" class="w3-text"></td>
                    <td><button class="camera-button" style="display:none;"><i class="fa fa-camera"></i></button></td>
                </tr>
              `;
              $("#audit-questions-list").append(row);
            });

            // Evento para los checkboxes: Mostrar el modal cuando se desmarca la casilla
            $("#audit-questions-list").on("change", ".w3-check", function () {
              var isChecked = $(this).is(":checked");
              var questionId = $(this).data("question-id");

              if (!isChecked) {
                // Mostrar el modal cuando se desmarca
                $("#photoModal").data("question-id", questionId).modal("show");
              }
            });

            // Manejar la vista previa de la imagen seleccionada
            $("#photoInput").on("change", function () {
              var file = this.files[0];
              if (file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                  $("#photoPreview").attr("src", e.target.result);
                  $("#preview").show(); // Mostrar la vista previa
                };
                reader.readAsDataURL(file);
              }
            });

            // Guardar la foto seleccionada
            $("#savePhoto").on("click", function () {
              var questionId = $("#photoModal").data("question-id");
              var fileInput = $("#photoInput")[0].files[0];

              if (fileInput) {
                // Simulación de subida
                alert("Foto subida para la pregunta ID: " + questionId);

                // Cerrar el modal y limpiar
                $("#photoModal").modal("hide");
                $("#photoInput").val(""); // Limpiar el campo de archivo
                $("#preview").hide(); // Ocultar la vista previa
              } else {
                alert("Por favor, selecciona una foto antes de guardar.");
              }
            });
          } else {
            console.error("No se encontraron detalles de auditoría.");
          }
        } else {
          console.error("Error al obtener los detalles de la auditoría");
        }
      },
      error: function (xhr, status, error) {
        console.error("Error en la solicitud AJAX:", error);
      },
    });
  }
});
