// Función para obtener el valor de un parámetro de la URL
function getUrlParameter(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name); // Obtiene el valor del parámetro en la URL
}

// Función para obtener usuarios y poblar el dropdown de responsables
function fetchUserData(callback) {
    fetch("/capas.com/admin/getUsers", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                callback(data.user); // Pasar usuarios al callback
            } else {
                console.error("No se pudieron obtener los datos de los usuarios.");
            }
        })
        .catch((error) => console.error("Error al obtener usuarios:", error));
}

// Función para obtener los detalles de auditoría y poblar la tabla
function fetchAuditDetails(auditID) {
    $.ajax({
        url: '../supervisor/auditForSupervisor', // Cambia la URL si es necesario
        method: 'GET',
        data: { id_audit: auditID }, // Pasamos el id_audit como parámetro en la solicitud
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                const auditData = response.data;
                const tableBody = $('#audit-table tbody'); // Seleccionar el cuerpo de la tabla

                tableBody.empty(); // Limpiar la tabla antes de llenarla

                // Obtener usuarios y poblar la tabla
                fetchUserData((users) => {
                    auditData.forEach((item) => {
                        let row = '<tr data-id-action="' + item.id_actions + '">';
                        row += '<td><input type="text" name="numlinea" class="w3-input w3-border w3-round"></td>';
                        row += '<td>' + item.question + '</td>';
                        row += '<td><input type="text" class="w3-input w3-border w3-round" value="' + item.answer + '"></td>';
                        row += item.evidence
                            ? '<td><img src="' + item.evidence + '" alt="Evidencia" style="width: 100px; height: auto;"></td>'
                            : '<td>No hay imagen</td>';
                        row += '<td><input type="text" class="w3-input w3-border w3-round" value="' + item.action_description + '"></td>';
                        row += item.evidence_accion
                            ? '<td><img src="../accions/' + item.evidence_accion + '" alt="Evidencia" style="width: 100px; height: auto;"></td>'
                            : '<td>No hay imagen</td>';
                        row += '<td><input type="date" class="w3-input w3-border w3-round" value="' + item.date_start + '"></td>';
                        row += '<td><input type="checkbox" class="w3-check" ' + (item.mejorado ? 'checked' : '') + '></td>';
                        row += '<td><input type="text" name="comentario" class="w3-input w3-border w3-round"></td>';

                        row += '<td><select class="w3-select w3-border w3-round">';
                        row += '<option value="">Selecciona un responsable</option>';

                        // Opciones dinámicas de usuarios
                        users.forEach((user) => {
                            row += '<option value="' + user.id_user + '"' + 
                                (user.id_user == item.supervisor_id ? ' selected' : '') + '>' +
                                user.email + '</option>';
                        });

                        row += '</select></td>';
                        row += '</tr>';
                        tableBody.append(row); // Añadir la fila a la tabla
                    });
                });
            } else {
                alert('No se encontraron datos de auditoría.');
            }
        },
        error: function (xhr, status, error) {
            console.log('Error al obtener los datos de la auditoría:', error);
        }
    });
}

// Guardar datos al servidor
$('#saveButton').on('click', function () {
    const auditData = [];

    // Recorrer cada fila de la tabla
    $('#audit-table tbody tr').each(function () {
        const row = $(this);

        // Recopilar los datos de cada fila
        const rowData = {
            id_action: row.data('id-action'), // ID de acción desde atributo data
            question: row.find('td:nth-child(1)').text(),
            answer: row.find('td:nth-child(2) input').val(),
            evidence: row.find('td:nth-child(3) img').attr('src') || null,
            actionDescription: row.find('td:nth-child(4) input').val(),
            evidenceAccion: row.find('td:nth-child(5) img').attr('src') || null,
            date: row.find('td:nth-child(6) input').val(),
            mejorado: row.find('td:nth-child(7) input[type="checkbox"]').is(':checked') ? 1 : 0,
            responsable: row.find('td:nth-child(8) select').val(),
        };

        auditData.push(rowData);
    });
    
    // Enviar los datos al servidor
    $.ajax({
        url: '../supervisor/finishData',
        type: 'POST',
        data: JSON.stringify({ audits: auditData }),
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
return false;
            alert('Datos guardados correctamente');
        },
        error: function (xhr, status, error) {
            console.error('Error al guardar los datos:', error);
        }
    });
});

// Ejecutar funciones al cargar el documento
$(document).ready(function () {
    const auditID = getUrlParameter('id_audit'); // Obtener el id_audit de la URL
    if (auditID) {
        fetchAuditDetails(auditID); // Cargar detalles de auditoría
    } else {
        alert('ID de auditoría no proporcionado en la URL.');
    }
});
