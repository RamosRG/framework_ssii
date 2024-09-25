$(document).ready(function () {
    // Obtener los datos de la auditoría desde localStorage
    var auditData = localStorage.getItem("auditData");
    if (auditData) {
        var audit = JSON.parse(auditData);

        // Rellenar las cajas de texto con los datos de la auditoría
        $("#no_audit").val(audit.no_audit);
        $("#date").val(audit.date);
        $("#auditor").val(audit.auditor);
        $("#status").val(audit.status);
        $("#departament").val(audit.departament);
        $("#machinery").val(audit.machinery);
        $("#shift").val(audit.shift);
    } 
});

function addRow() {
    // Obtener la tabla y su cuerpo
    var table = document.getElementById("dynamicTable").getElementsByTagName('tbody')[0];

    // Crear una nueva fila
    var newRow = table.insertRow();

    // Agregar las 6 celdas
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);

    // Insertar contenido en las celdas
    cell1.innerHTML = '<input type="text" name="campo1[]">';
    cell2.innerHTML = `
        <select name="campo2[]">
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
        </select>`;
    cell3.innerHTML = `
        <select name="campo3[]">
            <option value="opcionA">Opción A</option>
            <option value="opcionB">Opción B</option>
            <option value="opcionC">Opción C</option>
        </select>`;
    cell4.innerHTML = '<input type="text" name="campo4[]">';
    cell5.innerHTML = '<input type="text" name="campo5[]">';
}
/*
$(document).ready(function() {
    $('#search-select').select2({
      placeholder: 'Busca o agrega un nuevo elemento',
      tags: true,
      createTag: function(params) {
        let term = $.trim(params.term);
        if (term === '') {
          return null;
        }
        return {
          id: term,
          text: term,
          newTag: true
        };
      }
    });
  });
  */
