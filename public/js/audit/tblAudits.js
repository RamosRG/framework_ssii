$(document).ready(function () {
  var table = $('#auditTable').DataTable({
    "ajax": {
      "url": "/capas.com/accions/getAuditToEdit", // URL para obtener los datos
      "dataSrc": "data" // Indica que los datos están en la propiedad "data"
    },
    "columns": [
      { "data": "audit_title" },       // Propiedad en el JSON
      { "data": "created_at" },        // Propiedad en el JSON
      { "data": "department" },        // Propiedad en el JSON
      {
        "defaultContent": '<button class="fa fa-arrow-right btn-getAudit w3-button w3-yellow w3-round fa fa-address-book-o"></button>'
      }
    ]
  });

 $(document).ready(function () {
   // Inicializar DataTable y asignarla a la variable 'table'
   var table = $("#auditTable").DataTable();

   // Evento para manejar el click en el botón '.btn-getAudit'
   $("#auditTable").on("click", ".btn-getAudit", function () {
     var data = table.row($(this).parents("tr")).data();
     var userId = data.id_audit; // Obtener el ID de la auditoría de la fila

     if (!userId) {
       alert("No se pudo obtener el ID de la auditoría.");
       return;
     }

     // Realizar la solicitud AJAX para obtener los datos de la auditoría
     $.ajax({
       url: "/capas.com/accions/getAuditOfEdit/" + userId,
       type: "GET",
       dataType: "json",
       success: function (response) {
         if (response.error) {
           alert(response.error);
         } else {
           console.log(response);
           // Guardar los datos de la auditoría en localStorage
           localStorage.setItem("auditData", JSON.stringify(response));

           // Confirmar si los datos fueron almacenados en localStorage
           if (localStorage.getItem("auditData")) {
             // Redirigir a la vista de detalles
             window.location.href = "/capas.com/accions/AuditToEdit";
           } else {
           }
         }
       },
       error: function () {
         alert("Error al obtener los datos de la auditoría.");
       },
     });
   });
 });

});