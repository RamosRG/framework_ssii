$(document).ready(function () {

    // Llamada AJAX para obtener el último número de auditoría
    $.ajax({
        url: "/capas.com/accions/getLastAuditNumber",
        method: "GET",
        dataType: "json",
        success: function (response) {
            if (response && response.no_audit) {
                // Incrementar el número de auditoría
                var nextAuditNumber = parseInt(response.no_audit) + 1;
                $("#no_audit").val(nextAuditNumber);  // Asignar el nuevo número de auditoría al campo
            } else {
                $("#no_audit").val(1);  // Si no hay auditorías previas, comenzar con 1
            }
        },
        error: function (error) {
            console.error("Error al obtener el último número de auditoría:", error);
            $("#no_audit").val(1);  // Fallback por si no hay auditorías registradas
        }
    });

    // Si hay datos de auditoría en localStorage, los cargamos
    var auditData = localStorage.getItem("auditData");

    if (auditData) {
        var audit = JSON.parse(auditData);

        // Rellenar las cajas de texto con los datos de la auditoría
        // Asigna el valor al encabezado h2
        $("#audit_title").text(audit.audit_title);
        $("#no_audit").val(audit.no_audit);
        $("#date").val(audit.date);
        $("#auditor").val(audit.name + " " + audit.firstName + " " + audit.lastName);
        $("#status").val(audit.status);
        $("#departament").val(audit.department);
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
                            <td>${detail.source}</td>
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
