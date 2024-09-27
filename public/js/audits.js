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


 
function generarCheckboxes(selectId) {
  const select1 = document.getElementById(selectId);
  const checkboxSelectContainer = document.getElementById('checkboxSelectContainer');
  const checkboxSelect = document.getElementById('checkboxSelect');

  // Evento change para el select
  select1.addEventListener('change', function() {
      // Limpiar el contenedor de los checkbox
      checkboxSelect.innerHTML = '';

      if (this.value !== '') {
          // Mostrar el contenedor con los checkbox
          checkboxSelectContainer.style.display = 'block';

          // Opciones con checkbox según la selección
          let opciones = [];

          if (this.value === 'opcion1') {
              opciones = ['Sub Opción 1.1', 'Sub Opción 1.2', 'Sub Opción 1.3'];
          } else if (this.value === 'opcion2') {
              opciones = ['Sub Opción 2.1', 'Sub Opción 2.2', 'Sub Opción 2.3'];
          }

          // Generar checkbox por cada opción
          opciones.forEach(function(opcion) {
              const div = document.createElement('div');
              div.className = 'checkbox-option';

              const checkbox = document.createElement('input');
              checkbox.type = 'checkbox';
              checkbox.id = opcion;
              checkbox.value = opcion;

              const label = document.createElement('label');
              label.setAttribute('for', opcion);
              label.textContent = opcion;

              div.appendChild(checkbox);
              div.appendChild(label);
              checkboxSelect.appendChild(div);
          });
      } else {
          // Ocultar el contenedor si no se selecciona nada
          checkboxSelectContainer.style.display = 'none';
      }
  });
}

// Llamada a la función
generarCheckboxes('select1');


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
