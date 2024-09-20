$.ajax({
    url: "/framework_ssii/accions/getAudits",
    success: function (response) {
        console.log(response);  // Verifica si la respuesta es correcta
    }
});

$(document).ready(function () {
    var table = $('#auditTable').DataTable({
        "ajax": {
            "url": "/framework_ssii/accions/getAudits", // URL de la función que devuelve los datos
            "dataSrc": "" // Fuente de los datos (en tu caso es 'data')
        },
        "columns": [
            { "data": "no_audit" },       // Coincide con la propiedad en el JSON
            { "data": "auditor" },        // Coincide con la propiedad en el JSON
            { "data": "date" },           // Coincide con la propiedad en el JSON
            { "data": "shift" },          // Coincide con la propiedad en el JSON
            { "data": "machinery" },      // Coincide con la propiedad en el JSON
            { "data": "departament" },    // Coincide con la propiedad en el JSON
            {
                "data": "status",   // Cambiar "status" por "audit_status" para que coincida
                "render": function (data) {
                    return data == 1 ? `<i class="fa fa-plus" style="font-size:24px;color:blue">`:   '<i class="fa fa-remove w3-red" style="font-size:24px"></i>'
                }
            },
            {
                "defaultContent": '<button class="btn-getAudit w3-button w3-yellow w3-round fa fa-address-book-o"></button>'
            }
        ]
    });
});

// Función para cuando se da click al botón edit obtener los datos del usuario en el modal
$(document).ready(function() {
    // Inicializar DataTable y asignarla a la variable 'table'
    var table = $('#auditTable').DataTable();

    // Evento para manejar el click en el botón '.btn-getAudit'
    $('#auditTable').on('click', '.btn-getAudit', function () {
        var data = table.row($(this).parents('tr')).data();
        var userId = data.id_audit; // Obtener el ID de la auditoría de la fila

        if (!userId) {
            alert('No se pudo obtener el ID de la auditoría.');
            return;
        }

        // Realizar la solicitud AJAX para obtener los datos de la auditoría
        $.ajax({
            url: '/framework_ssii/accions/getAuditById/' + userId,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                if (response.error) {
                    alert(response.error);
                } else {
                    console.log(response); // Mostrar los datos en la consola
                }
            },
            error: function () {
                alert('Error al obtener los datos de la auditoría.');
            }
        });
    });
});



