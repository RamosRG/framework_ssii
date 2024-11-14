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

  var audit_id = data.id_audit; // Obtener el ID de la auditoría de la fila
  if (!audit_id) {
    alert("No se pudo obtener el ID de la auditoría.");
    return;
  }
  
  // Realizar la solicitud AJAX para obtener los datos de la auditoría
  $.ajax({
    url: "/capas.com/accions/getAuditToEdit/" + audit_id, // Cambié userId por audit_id
    type: "GET",
    dataType: "json",
    success: function (response) {
      if (response.status === "error") {
        alert(response.message);
      } else {
        console.log(response);
        // Guardar los datos de la auditoría en localStorage
        localStorage.setItem("auditData", JSON.stringify(response.data));
  
        // Confirmar si los datos fueron almacenados en localStorage
        if (localStorage.getItem("auditData")) {
          // Redirigir a la vista de detalles
          window.location.href = "/capas.com/accions/auditdetails";
        } else {
          alert("No se pudieron guardar los datos en localStorage.");
        }
      }
    },
    error: function () {
      alert("Error al obtener los datos de la auditoría.");
    },  
  });
});

$(document).ready(function () {
  // Obtener los datos de la auditoría desde localStorage
  var auditData = localStorage.getItem("auditData");
  if (auditData) {
    var audit = JSON.parse(auditData);

    // Rellenar las cajas de texto con los datos de la auditoría
    $("#id_audit").val(audit.id_audit);
    $("#date").val(audit.date);
  } else {
  }
});