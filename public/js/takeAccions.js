function fetchTakenActions(idAudit) {
  $.ajax({
    url: "../user/takenActions/" + idAudit,
    type: "GET",
    dataType: "json",
    success: function (response) {
      if (response.status === "success") {
        populateTakenActions(response.data, idAudit);
        fetchUserData();
        fetchUserData1();
        collectTableData();
      } else {
        console.error("No se encontraron acciones tomadas.");
      }
    },
    error: function (xhr, status, error) {
      console.error("Error en la solicitud AJAX:", error);
    },
  });
}

function populateTakenActions(actions, id_audit) {
  $("#taken-actions-list").empty();
  actions.forEach((action) => {
    const row = `
        <tr data-question-id="${action.id_question}">
            <td>${action.id_question || ""}</td>
            <td>${action.question || ""}</td>
            <td>${action.answer || ""}</td>
            <td>${
              action.evidence
                ? `<img src="${action.evidence}" alt="Evidencia" style="width: 100px; height: auto;">`
                : "Sin evidencia"
            }</td>
            <td>
                <input type="text" name="action${action.id_question}" value="${
      action.action_description || ""
    }">
            </td>
            <td>
                <select name="responsable_${
                  action.id_question
                }" class="responsable-select" data-question-id="${
      action.id_question
    }">
                    <option value="" disabled ${
                      !action.name ? "selected" : ""
                    }>Selecciona un usuario</option>
                    ${
                      action.name
                        ? `<option value="${action.name}" selected>${
                            action.name
                          } ${action.lastName || ""}</option>`
                        : ""
                    }
                </select>
            </td>
            <td>
                <input type="date" name="date_${action.id_question}" value="${
      action.created_at
        ? new Date(action.created_at).toISOString().split("T")[0]
        : ""
    }">
            </td>
            <td>
                <button class="w3-btn w3-round-large camera-button" style="display:${
                  action.is_complete == "1" ? "none" : "block"
                };" data-question-id="${action.id_question}">
                    <i class="fa fa-camera"></i>
                </button>
            </td>
           <td>
    <label>
        <input type="radio" name="is_complete_${
          action.id_question
        }" value="1" ${action.is_complete == "1" ? "checked" : ""}>
        Sí <i class="fa fa-check" style="color: green;"></i>
    </label>
    <label>
        <input type="radio" name="is_complete_${
          action.id_question
        }" value="0" ${action.is_complete == "0" ? "checked" : ""}>
        No
    </label>
</td>

            <td>
                <input type="hidden" name="id_answer${
                  action.id_answer
                }" value="${action.id_answer || ""}">
                <button class="btn-accions w3-button w3-blue w3-round" data-question-id="${
                  action.id_question
                }" style="font-size:12px">Enviar</button>
            </td>
        </tr>
    `;
    $("#taken-actions-list").append(row);
  });

  // Función para abrir la cámara y mostrar el video en tiempo real
  function openCamera() {
    const video = document.getElementById("video");
    const constraints = {
      video: { facingMode: "environment" },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        currentStream = stream;
        video.srcObject = stream;
        video.play();
      })
      .catch((error) => {
        console.error("Error al acceder a la cámara:", error);
        alert(
          "No se puede acceder a la cámara. Verifique los permisos del navegador."
        );
      });
  }

  // Detecta el clic en el botón de la cámara y asigna `currentButton`
  $(document)
    .off("click", ".camera-button")
    .on("click", ".camera-button", function () {
      const questionId = $(this).data("question-id");
      currentButton = $(this); // Asigna el botón actual a la variable global
      $("#photoModal").show(); // Muestra el modal para tomar la foto
      openCamera(); // Abre la cámara
    });

  // Función para capturar la foto
  function takePhoto() {
    if (!currentButton) {
      console.error("Error: currentButton no está definido.");
      alert("Por favor, selecciona una pregunta antes de capturar la foto.");
      return;
    }

    const canvas = document.createElement("canvas");
    const video = document.getElementById("video");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");

    // Asigna `imageData` al botón actual
    currentButton.data("imageData", imageData);
    console.log("Foto capturada y asignada:", imageData);

    // Oculta el modal y detén la cámara
    $("#photoModal").hide();
    stopCamera();
  }

  // Función que se ejecuta cuando se captura la foto
  function onPhotoCaptured(imageData) {
    if (imageData) {
      if (!currentButton) {
        console.error("currentButton no está definido en onPhotoCaptured.");
        return;
      }
      currentButton.data("imageData", imageData);
      console.log("Foto capturada y asignada:", imageData);

      // Cierra el modal de la cámara
      $("#photoModal").hide();
      stopCamera();
    } else {
      alert("Error al capturar la foto.");
    }
  }

  // Cierra el modal de la cámara sin capturar una foto
  $("#closeCamera").on("click", function () {
    $("#photoModal").hide();
    stopCamera();
  });
}

function sendAccionsData(
  questionId,
  action,
  responsable,
  date,
  isComplete,
  idAnswer,
  imageData,
  id_audit,
  userId, // Nuevo parámetro para el ID del usuario
  auditeeId // Nuevo parámetro para el destinatario de la auditoría
) {
  const formData = new FormData();
  formData.append("fk_answer", idAnswer);
  formData.append("action", action);
  formData.append("responsable", responsable);
  formData.append("is_complete", isComplete);
  formData.append("created_at", date);
  formData.append("id_audit", id_audit);

  // Agrega el ID del usuario y el destinatario de la auditoría
  formData.append("user_id", userId);
  formData.append("auditee_id", auditeeId);

  // Procesamiento de la imagen
  const byteString = atob(imageData.split(",")[1]);
  const mimeString = imageData.split(",")[0].split(":")[1].split(";")[0];
  const ab = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    ab[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ab], { type: mimeString });
  const photoName = `photo_${questionId}_${new Date().getTime()}.png`;
  formData.append("photo", blob, photoName);

  // Enviar datos al servidor
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
        fetchTakenActions(id_audit);
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
      Swal.fire({
        icon: "error",
        title: "Error en la conexión",
        text: "Hubo un problema al enviar los datos. Inténtalo nuevamente.",
        confirmButtonText: "Aceptar",
      });
    },
  });
}

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

        // Añadir de nuevo la opción inicial
        let defaultOption = document.createElement("option");
        defaultOption.text = "Open this select menu";
        defaultOption.selected = true;
        defaultOption.disabled = true;
        userSelect.appendChild(defaultOption);

        // Llenar el select con los datos de los usuarios
        data.user.forEach((item) => {
          let option = document.createElement("option");
          option.value = item.id_user; // El valor es el ID del usuario
          option.textContent = item.email; // El texto visible es el correo
          userSelect.appendChild(option);
        });

        // Inicializamos Select2 en el elemento
        $(userSelect).select2({
          placeholder: "Select a user",
          width: "100%", // Ajustar al ancho del contenedor
        });
      } else {
        console.error("Error al obtener datos de los usuarios");
      }
    })
    .catch((error) => console.error("Error en la solicitud:", error));
}

function fetchUserData1() {
  fetch("/capas.com/admin/getUsers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        const userList = document.getElementById("user-list");
        userList.innerHTML = ""; // Limpiar opciones anteriores

        // Añadir opción predeterminada
        let defaultOption = document.createElement("option");
        defaultOption.text = "Selecciona un usuario";
        defaultOption.value = "";
        defaultOption.selected = true;
        defaultOption.disabled = true;
        userList.appendChild(defaultOption);

        // Llenar el select principal con los datos de los usuarios
        data.user.forEach((item) => {
          let option = document.createElement("option");
          option.value = item.id_user;
          option.textContent = `${item.email}`; // Mostrar correo como opción
          userList.appendChild(option);
        });
      } else {
        console.error("Error al obtener datos de los usuarios");
      }
    })
    .catch((error) => console.error("Error en la solicitud:", error));
}
function collectTableData() {
  let tableData = [];
  const rows = document.querySelectorAll("#taken-actions-list tr");
  const userId = document.getElementById("user-list").value;

  rows.forEach((row) => {
    const idAnswer = row.querySelector("input[name^='id_answer']").value; // Obtener el id_answer
    const responsible =
      row.querySelector(`select[name^='responsable_']`)?.value || null; // Obtener el ID del supervisor

    // Solo se envían los datos relevantes para la actualización
    tableData.push({
      idAnswer, // El ID de la respuesta
      responsible, // El supervisor al que se asignará
      userId, // Agregar el userId que es el ID del supervisor
    });
  });


  return { tableData }; // Aseguramos que enviamos un objeto con el campo tableData
}

// Enviar los datos al hacer clic en el botón de enviar
document.getElementById("send-data").addEventListener("click", function () {
  const tableData = collectTableData();
  sendDataToSupervisor(tableData);
});

function sendDataToSupervisor(data) {
  const formattedData = JSON.stringify(data);

  $.ajax({
    url: "../user/savedAudit", // URL al controlador en el backend
    type: "POST",
    contentType: "application/json",
    data: formattedData,
    success: function (response) {
      if (response.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Datos enviados correctamente al supervisor",
          text: response.message,
          showConfirmButton: false,
          timer: 1500,
        });
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
      Swal.fire({
        icon: "error",
        title: "Error en la conexión",
        text: "Hubo un problema al enviar los datos. Inténtalo nuevamente.",
        confirmButtonText: "Aceptar",
      });
    },
  });
}



document.getElementById("user-list").addEventListener("change", function () {
  const selectedUserId = this.value; // ID del usuario seleccionado
  const selectedUserName = this.options[this.selectedIndex].text; // Nombre del usuario seleccionado

  // Asignar el usuario seleccionado a todos los selects de la tabla
  document.querySelectorAll(".responsable-select").forEach((select) => {
    // Añadir la opción seleccionada si no existe
    let optionExists = Array.from(select.options).some(
      (option) => option.value === selectedUserId
    );

    if (!optionExists) {
      let option = document.createElement("option");
      option.value = selectedUserId;
      option.textContent = selectedUserName;
      select.appendChild(option);
    }

    // Seleccionar el usuario en el select correspondiente
    select.value = selectedUserId;
  });
});
