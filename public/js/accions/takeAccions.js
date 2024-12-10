// Función para obtener las acciones tomadas para un ID de auditoría específico
function fetchTakenActions(idAudit) {
  $.ajax({
    url: `../user/takenActions/${idAudit}`,
    type: "GET",
    dataType: "json",
    success: function (response) {
      if (response.status === "success") {
        populateTakenActions(response.data, idAudit);
        fetchUserData(); // Llama a los datos de usuarios después de llenar las acciones
      } else {
        console.error("No se encontraron acciones tomadas.");
      }
    },
    error: function (xhr, status, error) {
      console.error("Error en la solicitud AJAX:", error);
    },
  });
}

// Función para llenar la tabla de acciones tomadas
function populateTakenActions(actions, id_audit) {
  $("#taken-actions-list").empty(); // Limpia la tabla
  actions.forEach((action) => {
    const row = `
      <tr data-question-id="${action.id_question}">
        <td>${action.id_question || ""}</td>
        <td>${action.question || ""}</td>
        <td>${action.answer || ""}</td>
        <td>
          ${action.evidence
        ? `<img src="../public/images${action.evidence}" alt="Evidencia" style="width: 100px; height: auto;">`
        : "Sin evidencia"}
        </td>
        <td>
          <input type="text" name="action${action.id_question}" value="${action.action_description || ""}">
        </td>
        <td>
          <select name="responsable_${action.id_question}" class="responsable-select" data-question-id="${action.id_question}">
            <option value="" disabled ${!action.name ? "selected" : ""}>Selecciona un usuario</option>
            ${action.name ? `<option value="${action.name}" selected>${action.name} ${action.lastName || ""}</option>` : ""}
          </select>
        </td>
        <td>
          <input type="date" name="date_${action.id_question}" value="${action.created_at ? new Date(action.created_at).toISOString().split("T")[0] : ""}">
        </td>
        <td>
          <!-- Botón para seleccionar una foto -->
          <input type="file" class="file-input" accept="image/*" data-question-id="${action.id_question}">
        </td>
        <td>
          <label>
            <input type="radio" name="is_complete_${action.id_question}" value="1" ${action.is_complete == "1" ? "checked" : ""}>
            Sí <i class="fa fa-check" style="color: green;"></i>
          </label>
          <label>
            <input type="radio" name="is_complete_${action.id_question}" value="0" ${action.is_complete == "0" ? "checked" : ""}>
            No
          </label>
        </td>
        <td>
          <input type="hidden" name="id_answer" value="${action.id_answer || ""}">
          <button class="btn-accions w3-button w3-blue w3-round" data-question-id="${action.id_question}" style="font-size:12px">Enviar</button>
        </td>
      </tr>
    `;
    $("#taken-actions-list").append(row);
  });

  // Manejo de la selección de un archivo de imagen
  $(document).on("change", ".file-input", function () {
    const fileInput = $(this);
    const questionId = fileInput.data("question-id");
    const file = fileInput[0].files[0]; // Obtiene el archivo seleccionado

    if (file) {
      // Muestra una vista previa de la imagen
      const imageUrl = URL.createObjectURL(file);
      fileInput.after(`<img src="${imageUrl}" alt="Vista previa de la imagen" style="width: 100px; height: auto; margin-top: 10px;">`);

      // Guarda el archivo para enviarlo más tarde
      fileInput.data('imageFile', file);
    }
  });
}

$(document).off("click", ".btn-accions").on("click", ".btn-accions", function () {
  const $row = $(this).closest("tr"); // Encuentra la fila (tr) más cercana al botón clicado
  const questionId = $(this).data("question-id");
  const action = $row.find(`input[name="action${questionId}"]`).val();
  const responsable = $row.find(`select[name="responsable_${questionId}"]`).val();
  const date = $row.find(`input[name="date_${questionId}"]`).val();
  const isComplete = $row.find(`input[name="is_complete_${questionId}"]:checked`).val() === "1" ? 1 : 0;
  const idAnswer = $row.find(`input[name="id_answer"]`).val(); // Busca el id_answer solo dentro de la fila

  const imageFile = $row.find(".file-input").data('imageFile'); // Obtener el archivo
  // Crea un FormData para enviar los datos
  const formData = new FormData();
  formData.append("fk_answer", idAnswer);
  formData.append("action", action);
  formData.append("responsable", responsable);
  formData.append("is_complete", isComplete);
  formData.append("created_at", date);
  formData.append("photo", imageFile); // Adjunta el archivo de imagen

  $.ajax({
    url: "../user/submitAnswer",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      if (response.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Datos enviados correctamente",
          text: response.message,
          showConfirmButton: false,
          timer: 1500,
        });
        fetchTakenActions(questionId); // Actualiza las acciones tomadas
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al enviar los datos",
          text: response.message,
          confirmButtonText: "Aceptar",
        });
      }
    },
    error: function (xhr, status, error) {
      console.error("Error en la solicitud AJAX:", error);
    },
  });
});


function fetchUserData() {
  fetch("/capas.com/admin/getUsers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        let userSelect = document.getElementById("user-list");
        userSelect.innerHTML = ""; // Limpiar las opciones anteriores

        // Añadir opción inicial
        let defaultOption = document.createElement("option");
        defaultOption.text = "Open this select menu";
        defaultOption.value = ""; // Vacío para validación posterior
        defaultOption.selected = true;
        defaultOption.disabled = true;
        userSelect.appendChild(defaultOption);

        // Llenar el select con los datos de los usuarios
        data.user.forEach((item) => {
          let option = document.createElement("option");
          option.value = item.id_user; // Usamos id_user como valor
          option.textContent = item.email; // Mostrar email en el dropdown
          option.setAttribute("data-email", item.email); // Agregar el correo como atributo personalizado
          userSelect.appendChild(option);
        });

        // Inicializar Select2 con estilos
        $('#user-list').select2({
          placeholder: "Open this select menu", // Placeholder personalizado
          allowClear: true, // Agregar botón de limpieza
          theme: "classic", // Cambia el tema según tus preferencias
        });
      } else {
        console.error("Error al obtener datos de los usuarios");
      }
    })
    .catch((error) => console.error("Error en la solicitud:", error));
}
