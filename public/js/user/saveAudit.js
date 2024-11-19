
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
        window.location.href = "/capas.com/user/home";
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
  function submitAuditComment(auditElement) {
    // Extraemos el id_audit del atributo data-audit-id del botón o elemento
    const idAudit = auditElement.dataset.auditId; // Usamos dataset para acceder al atributo data-audit-id
    const comment = document.getElementById("audit-comment").value; // Obtenemos el comentario
    console.log(idAudit); // Verificamos que el idAudit se obtuvo correctamente
  
    // Validación para asegurarse de que el comentario no esté vacío
    if (comment.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Comentario requerido",
        text: "Por favor, añade un comentario antes de finalizar la auditoría.",
        confirmButtonText: "Aceptar",
      });
      return;
    }
  
    // Enviar los datos al servidor mediante AJAX
    $.ajax({
      url: "../user/submitAuditComment", // Asegúrate de que esta URL sea correcta
      type: "POST", // Usamos POST para enviar datos
      data: JSON.stringify({ id_audit: idAudit, comment }), // Enviamos el id_audit y el comentario en JSON
      contentType: "application/json", // Especificamos que el contenido es JSON
      success: function (response) {
        if (response.status === "success") {
          Swal.fire({
            icon: "success",
            title: "Comentario guardado",
            text: "El comentario se ha guardado correctamente.",
            timer: 1500,
          });
  
          // Actualizamos dinámicamente la fila en la tabla
          const row = document.querySelector(`tr[data-audit-id="${idAudit}"]`);
          if (row) {
            const commentCell = row.querySelector(".comment-cell"); // Encontramos la celda del comentario
            if (commentCell) {
              commentCell.textContent = comment; // Actualizamos el contenido de la celda
            }
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Error al guardar",
            text: response.message || "No se pudo guardar el comentario.",
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
  