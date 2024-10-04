$(document).ready(function () {

  // Obtener los datos de la auditoría desde localStorage
  var auditData = localStorage.getItem("auditData");
  if (auditData) {
    var audit = JSON.parse(auditData);
    console.log(auditData);
    // Rellenar las cajas de texto con los datos de la auditoría
    $("#no_audit").val(audit.no_audit);
    $("#date").val(audit.date);
    $("#auditor").val(audit.auditor);
    $("#status").val(audit.status);
    $("#departament").val(audit.departament);
    $("#machinery").val(audit.machinery);
    $("#shift").val(audit.shift);

    // Llamar a la función para obtener los detalles de la auditoría
    fetchAuditDetails(audit.id_audit);
  }

  function fetchAuditDetails(idAudit) {
    $.ajax({
      url: '../accions/getAudit/' + idAudit, // Corregimos la URL
      type: 'GET',
      dataType: 'json',
      success: function (response) {
        console.log(response);
        if (response.status === 'success') {
          var auditDetails = response.data;

          // Limpiar la lista antes de llenarla
          $("#audit-questions-list").empty();

          // Llenar la lista con los detalles de las preguntas de la auditoría
          auditDetails.forEach(function (detail) {
            var listItem = '<li class="w3-padding-16">' +
              '<span>' + detail.category + '</span> - ' +
              '<span>' + detail.question + '</span> - ' +
              '<span>' + detail.create_at + '</span> - ' +
              '<span>' + detail.fountain + '</span>' +
              '</li>';
            $("#audit-questions-list").append(listItem);
          });
        } else {
          console.error('Error al obtener los detalles de la auditoría');
        }
      },
      error: function (xhr, status, error) {
        console.error('Error en la solicitud AJAX:', error);
      }
    });
  }
  
});
