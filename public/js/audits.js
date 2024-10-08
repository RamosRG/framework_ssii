$(document).ready(function () {

  // Obtener los datos de la auditoría desde localStorage
  var auditData = localStorage.getItem("auditData");
  if (auditData) {
    var audit = JSON.parse(auditData);
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
        url: '../accions/getAudit/' + idAudit,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                var auditDetails = response.data;

                // Limpiar la tabla antes de agregar nuevas filas
                $("#audit-questions-list").empty();

                // Rellenar la tabla con los datos recibidos
                auditDetails.forEach(function (detail) {
                    var row = `
                        <tr>
                            <td>${detail.category}</td>
                            <td>${detail.question}</td>
                            <td>${detail.create_at}</td>
                            <td>${detail.fountain}</td>
                            <td>${detail.compliance}</td>
                            <td>${detail.findings}</td>
                        </tr>
                    `;
                    $("#audit-questions-list").append(row);
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
