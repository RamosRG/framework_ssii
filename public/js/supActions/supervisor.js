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

function fetchAuditDetails(auditID) {
    $.ajax({
        url: '../supervisor/auditForSupervisor', // Cambia la URL si es necesario
        method: 'GET',
        data: { id_audit: auditID },
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                const auditData = response.data;
                const tableBody = $('#audit-table tbody');

                tableBody.empty(); // Limpiar la tabla antes de llenarla

                fetchUserData((users) => {
                    if (!users || users.length === 0) {
                        alert('No se encontraron usuarios para asignar como responsables.');
                        return;
                    }

                    auditData.forEach((item) => {
                        const row = `
                            <tr data-id-action="${item.id_actions}">
                                <td>${item.question}</td>
                                <td>${item.answer}</td>
                                <td>${item.evidence ? `<img src="${item.evidence}" alt="Evidencia" style="width: 100px;">` : 'No hay imagen'}</td>
                                <td>${item.action_description}</td>
                                <td>${item.evidence_accion ? `<img src="../accions/${item.evidence_accion}" alt="Evidencia" style="width: 100px;">` : 'No hay imagen'}</td>
                                <td><input type="date" name="date" class="w3-input w3-border w3-round" value="${item.date_start}"></td>
                                <td><input type="checkbox" class="w3-check" ${item.mejorado ? 'checked' : ''}></td>
                                <td><input type="text" name="comentario" class="w3-input w3-border w3-round"></td>
                                <td>
                                    <select class="w3-select w3-border w3-round" onchange="console.log('Responsable seleccionado:', this.value)">
                <option value="">Selecciona un responsable</option>
                ${users.map(user => `
                    <option value="${user.id_user}" ${user.id_user == item.supervisor_id ? 'selected' : ''}>
                        ${user.name} ${user.firstName}
                    </option>`).join('')}
            </select>
                                </td>
                            </tr>
                        `;
                        tableBody.append(row);
                    });
                });
            } else {
                alert('No se encontraron datos de auditoría.');
            }
        },
        error: function (xhr, status, error) {
            console.error('Error al obtener los datos de la auditoría:', error);
        }
    });
}

$('#saveButton').on('click', function () {
    const auditData = [];
    const responsablesData = []; // Para almacenar datos de responsables

    $('#audit-table tbody tr').each(function () {
        const row = $(this);
        const responsable = row.find('select').val();
        console.log('Responsable seleccionado:', responsable); // Aquí es más útil
        const rowData = {
            id_action: row.data('id-action'),
            date: row.find('input[name="date"]').val(),
            mejorado: row.find('td:nth-child(8) input[type="checkbox"]').is(':checked') ? 1 : 0,
            comentario: row.find('input[name="comentario"]').val(),
            responsable: responsable,
        };
        auditData.push(rowData);
        if (responsable) {
            responsablesData.push({
                id_audit: getUrlParameter('id_audit'),
                id_action: rowData.id_action,
                responsable: responsable,
            });
        }
    });


    if (auditData.length > 0) {
        $.ajax({
            url: '../supervisor/finishData',
            method: 'POST',
            data: JSON.stringify({ audits: auditData, responsables: responsablesData }), // Enviamos ambos conjuntos de datos
            contentType: 'application/json',

            success: function (response) {
                console.log({ audits: auditData, responsables: responsablesData });
                alert('Datos guardados correctamente.');
                location.reload(); // Opcional
            },
            error: function (xhr, status, error) {
                console.error('Error al guardar los datos:', error);
            }
        });
    }
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
