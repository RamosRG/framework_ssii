$(document).ready(function () {

    // Obtener el ID de auditoría de la URL
    var urlParams = new URLSearchParams(window.location.search);
    var id_audit = urlParams.get('id_audit');

    // Verificar si existe el id_audit
    if (id_audit) {
        console.log("ID de auditoría encontrado: " + id_audit);

        // Llamar a la función para obtener los detalles de la auditoría
        fetchAuditDetails(id_audit);
    } else {
        console.error("No se encontró el ID de auditoría en la URL.");
    }

    function fetchAuditDetails(idAudit) {
        $.ajax({
            url: '../user/auditDetails/' + idAudit,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                console.log(response); // Muestra la respuesta completa
                if (response.status === 'success') {
                    // Suponiendo que la respuesta contiene un array de auditorías
                    var auditDetails = response.data; // Aquí tienes el array de auditorías
                    console.log(auditDetails); // Muestra auditDetails

                    if (auditDetails.length > 0) {
                        // Si hay auditorías, tomamos la primera (o la que necesites)
                        var audit = auditDetails[0];

                        // Rellenar los campos de la auditoría
                        $("#no_audit").val(audit.no_audit);
                        $("#date").val(audit.create_at);
                        $("#auditor").val(audit.auditor);
                        $("#status").val(audit.status);
                        $("#departament").val(audit.departament);
                        $("#machinery").val(audit.machinery);
                        $("#shift").val(audit.shift);

                        // Limpiar la tabla antes de agregar nuevas filas
                        $("#audit-questions-list").empty();

                        // Llenar la tabla de preguntas
                        auditDetails.forEach(function (detail) {
                            var complianceCheckbox = `
                            <input type="checkbox" class="w3-check" ${detail.is_fulfilled === 1 ? 'checked' : ''} >
                        `; // Muestra cada detalle de la pregunta
                        var findingsText = `
                            <input type="text" class="w3-text" ${detail.answer} >
                        `; // Muestra cada detalle de la pregunta
                            var row = `
                                <tr>
                                    <td>${detail.category}</td>
                                    <td>${detail.question}</td>
                                    <td>${detail.create_at}</td>
                                    <td>${detail.fountain}</td>
                                    <td>${complianceCheckbox}</td> <!-- Checkbox en lugar de valor -->
                                    <td>${findingsText}</td>
                                </tr>
                            `;
                            $("#audit-questions-list").append(row);
                        });
                    } else {
                        console.error('No se encontraron detalles de auditoría.');
                    }
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
