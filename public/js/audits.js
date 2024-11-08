$(document).ready(function () {

    var auditData = localStorage.getItem("auditData");

    if (auditData) {
        var audit = JSON.parse(auditData);

        $("#audit_title").text(audit.audit_title);
        $("#no_audit").val(audit.no_audit);
        $("#date").val(audit.date);
        $("#auditor").val(audit.name + " " + audit.firstName + " " + audit.lastName);
        $("#status").val(audit.status);
        $("#departament").val(audit.department);
        $("#machinery").val(audit.machinery);
        $("#shift").val(audit.shift);

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

                    // Limpiar las tablas antes de agregar nuevas filas
                    $("#audit-questions-list").empty();
                    $("#taken-actions-list").empty();

                    // Rellenar la tabla de preguntas de la auditoría
                    auditDetails.forEach(function (detail) {
                        var questionsRow = `
                            <tr>
                                <td>${detail.category}</td>
                                <td>${detail.question}</td>
                                <td>${detail.create_at}</td>
                                <td>${detail.source}</td>
                                <td>${detail.compliance}</td>
                                <td>${detail.Que_se_encontro}</td>
                            </tr>
                        `;
                        $("#audit-questions-list").append(questionsRow);

                        // Rellenar la tabla de acciones tomadas si existen
                        if (detail.action_description) {
                            var actionsRow = `
                                <tr>
                                    <td>${detail.action_description}</td>
                                    <td>${detail.responsable}</td>
                                    <td>${detail.evidence_accion}</td>
                                    <td>${detail.action_complete ? "Yes" : "No"}</td>
                                    <td>${detail.action_created_at}</td>
                                    <td>${detail.action_updated_at}</td>
                                </tr>
                            `;
                            $("#taken-actions-list").append(actionsRow);
                        }
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
