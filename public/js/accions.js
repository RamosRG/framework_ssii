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
                    return data == 1 ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16">
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                    <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5"/>
                </svg>`:   '<i class="fa fa-remove w3-red" style="font-size:24px"></i>'
                }
            },
            {
                "defaultContent": '<button class="btn-edit w3-button w3-yellow w3-round fa fa-edit"></button>'
            }
        ]
    });
});
