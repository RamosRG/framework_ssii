$.ajax({
  url: "/capas.com/accions/getAudits",
  success: function (response) {
    console.log(response);  // Verifica si la respuesta es correcta
  }
});

$(document).ready(function () {
  var table = $('#auditTable').DataTable({
    "ajax": {
      "url": "/capas.com/accions/getAudits", // URL de la función que devuelve los datos
      "dataSrc": "" // Fuente de los datos (en tu caso es un arreglo JSON)
    },
    "columns": [
      { "data": "no_audit" }, // Coincide con la propiedad en el JSON
      {
        "data": function(row) {
          return row.name + " " + row.firstName + " " + row.lastName;
        }
      }, // Nombre completo generado a partir de las propiedades en el JSON
      { "data": "date" }, // Fecha del JSON
      { "data": "shift" }, // Turno
      { "data": "machinery" }, // Maquinaria
      { "data": "department" }, // Departamento
      {
        "data": "fk_status", // Manejo de estados
        "render": function (data) {
          if (data == 0) {
            return '<i class="fa fa-folder-open-o" style="font-size:24px; color:red;"></i>';
          } else if (data == 1) {
            return '<i class="	fa fa-clock-o" style="font-size:24px; color:blue;"></i>';
          } else if (data == 2) {
            return '<i class="fa fa-check-circle" style="font-size:24px; color:green;"></i>';
          } else {
            return '<i class="fa fa-question-circle" style="font-size:24px; color:red;"></i>'; // Manejo de estado desconocido
          }
        }
      },
      {
        "defaultContent": '<button class="btn-getAudit w3-button w3-yellow w3-round fa fa-bars"></button>'
      }
    ]
  });
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
      url: "/capas.com/accions/getAuditById/" + userId,
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
            window.location.href = "/capas.com/accions/auditdetails";
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

$(document).ready(function () {
  // Obtener los datos de la auditoría desde localStorage
  var auditData = localStorage.getItem("auditData");
  if (auditData) {
    var audit = JSON.parse(auditData);

    // Rellenar las cajas de texto con los datos de la auditoría
    $("#id_audit").val(audit.id_audit);
    $("#date").val(audit.date);
    $("#auditor").val(audit.auditor);
    $("#status").val(audit.status);
    $("#departament").val(audit.departament);
    $("#machinery").val(audit.machinery);
    $("#shift").val(audit.shift);
  } else {
  }
});


