  // Inicializar DataTable para la tabla de preguntas
  var table = $('#questionTable').DataTable({
    "ajax": {
        "url": "/capas.com/accions/showQuestion",
        "dataSrc": ""
    },
    "columns": [
        { "data": "id_question" },
        { "data": "category" },
        { "data": "question" },
        {
            "data": "status",
            "render": function (data) {
                return data == 1 
                    ? '<i class="fa fa-check" style="font-size:24px;color:green"></i>' 
                    : '<i class="fa fa-remove" style="font-size:24px;color:red"></i>';
            }
        },
        { "data": "create_for" },
        { "data": "source" },
        {
            "data": "id_question",
            "render": function (data, type, row) {
                var statusText = row.status == 1 ? 'Desactivar' : 'Activar';
                var newStatus = row.status == 1 ? 0 : 1; // Cambiar el estado
                return `
                    <button class="btn-update-status w3-button w3-red" data-id="${data}" data-status="${newStatus}">
                        ${statusText}
                    </button>
                `;
            }
        }
    ]
});
