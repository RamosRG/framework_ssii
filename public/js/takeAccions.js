
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
    actions.forEach(action => {
        const row = `
            <tr data-question-id="${action.id_question}">
                <td>${action.id_question}</td>
                <td>${action.question}</td>
                <td>${action.answer}</td>
                <td>${action.evidence ? `<img src="${action.evidence}" alt="Evidencia" style="width: 100px; height: auto;">` : 'Sin evidencia'}</td>
                <td><input type="text" name="action${action.id_question}" placeholder="Escribe aquí..."></td>
                <td>
    <select name="responsable_${action.id_question}" class="responsable-select" data-question-id="${action.id_question}">
        <option value="" selected disabled>Selecciona un usuario</option>
        <!-- Opciones de usuarios se llenarán dinámicamente -->
    </select>
</td>
                <td><input type="date" name="date_${action.id_question}"></td>
                <td>
                    <button class="w3-btn w3-round-large camera-button" style="display:${takenQuestions.includes(action.id_question) ? "none" : "block"};" data-question-id="${action.id_question}">
                        <i class="fa fa-camera"></i>
                    </button>
                </td>
                <td>
                    <label><input type="radio" name="is_complete_${action.id_question}" value="1" ${action.is_complete ? 'checked' : ''}> Sí</label>
                    <label><input type="radio" name="is_complete_${action.id_question}" value="0" ${!action.is_complete ? 'checked' : ''}> No</label>
                </td>
                <td>
                    <input type="hidden" name="id_answer${action.id_question}" value="${action.id_answer}">
                    <button class="btn-accions w3-button w3-blue w3-round " data-question-id="${action.id_question}" style="font-size:12px">Enviar</button>
                </td>
            </tr>
        `;
        $("#taken-actions-list").append(row);
    });
    // Función para abrir la cámara y mostrar el video en tiempo real
    function openCamera() {
        const video = document.getElementById("video");

        // Configuración para usar la cámara trasera o la cámara frontal según el dispositivo
        const constraints = {
            video: {
                facingMode: "environment", // Usa "environment" para la cámara trasera o "user" para la cámara frontal
            },
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                currentStream = stream;
                video.srcObject = stream;
                video.play();
            })
            .catch(error => {
                console.error("Error al acceder a la cámara:", error);
                alert("No se puede acceder a la cámara. Verifique los permisos del navegador.");
            });
    }

    // Detecta el clic en el botón de la cámara y asigna `currentButton`
    $(document).off("click", ".camera-button").on("click", ".camera-button", function () {
        const questionId = $(this).data("question-id");
        currentButton = $(this);  // Asigna el botón actual a la variable global
        $("#photoModal").show();   // Muestra el modal para tomar la foto
        openCamera();              // Abre la cámara
    });

    // Función para capturar la foto
    function takePhoto() {
        if (!currentButton) {
            console.error("Error: currentButton no está definido.");
            alert("Por favor, selecciona una pregunta antes de capturar la foto.");
            return;
        }

        // Aquí iría el código para capturar la foto
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

    // Evento para enviar datos de la acción
    $(document).off("click", ".btn-accions").on("click", ".btn-accions", function () {
        const questionId = $(this).data("question-id");
        const action = $(`input[name="action${questionId}"]`).val();
        
        // Cambiado de input a select para obtener el valor del responsable
        const responsable = $(`select[name="responsable_${questionId}"]`).val();  // Ahora es un select
        const date = $(`input[name="date_${questionId}"]`).val();
        const isComplete = $(`input[name="is_complete_${questionId}"]:checked`).val();
        const idAnswer = $(`input[name="id_answer${questionId}"]`).val();
        const imageData = $(this).closest("tr").find(".camera-button").data("imageData");  // Obtén el imageData específico del botón de la cámara para esta fila
    
        if (action && responsable && date && isComplete !== undefined) {
            if (imageData) {
                // Llama a sendAccionsData solo si imageData está presente
                sendAccionsData(questionId, action, responsable, date, isComplete, idAnswer, imageData, id_audit);
            } else {
                alert("Por favor, toma una foto.");
            }
        } else {
            alert("Por favor, completa todos los campos antes de enviar.");
        }
        return false;
    });
    
}

function sendAccionsData(questionId, action, responsable, date, isComplete, idAnswer, imageData, id_audit) {
    const formData = new FormData();
    formData.append('fk_answer', idAnswer);
    formData.append('action', action);  // Agregar acción
    formData.append('responsable', responsable);
    formData.append('is_complete', isComplete);
    formData.append('create_at', date);
    formData.append('id_audit', id_audit);  // Agregar id_audit

    // Convertir imagen a Blob y agregarla como archivo
    const byteString = atob(imageData.split(',')[1]);
    const mimeString = imageData.split(',')[0].split(':')[1].split(';')[0];
    const ab = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
        ab[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });
    const photoName = `photo_${questionId}_${new Date().getTime()}.png`;  // Nombre único basado en ID de pregunta y timestamp
    formData.append('photo', blob, photoName);  // Asigna un nombre único a la foto

    $.ajax({
        url: '../user/submitAnswer',  // Cambiar URL si es necesario
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {

            if (response.status === 'success') {
                Swal.fire({
                    icon: 'success',
                    title: 'Datos enviados correctamente',
                    text: response.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                fetchTakenActions(id_audit); // Recargar tabla
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al enviar los datos',
                    text: response.message,
                    confirmButtonText: 'Aceptar'
                });
            }
        },
        error: function (xhr, status, error) {
            console.error("Error en la solicitud AJAX:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error en la conexión',
                text: 'Hubo un problema al enviar los datos. Inténtalo nuevamente.',
                confirmButtonText: 'Aceptar'
            });
        }
    });

}
function fetchUserData() {
    fetch('/capas.com/admin/getUsers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {

            if (data.status === 'success') {
                let userSelect = document.getElementById('user-list');
                userSelect.innerHTML = ''; // Limpiar las opciones anteriores

                // Añadir de nuevo la opción inicial
                let defaultOption = document.createElement('option');
                defaultOption.text = "Open this select menu";
                defaultOption.selected = true;
                defaultOption.disabled = true;
                userSelect.appendChild(defaultOption);

                // Llenar el select con los datos de los usuarios
                data.user.forEach(item => {
                    let option = document.createElement('option');
                    option.value = item.id_user;
                    option.textContent = item.email;
                    userSelect.appendChild(option);
                });

                // Inicializamos Select2 en el elemento
                $(userSelect).select2({
                    placeholder: "Select a user",
                    width: '100%'  // Ajustar al ancho del contenedor
                });
            } else {
                console.error('Error al obtener datos de los usuarios');
            }
        })
        .catch(error => console.error('Error en la solicitud:', error));
}
function fetchUserData1() {
    fetch('/capas.com/admin/getUsers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Llenar todos los selects de la página con los usuarios
            document.querySelectorAll('.responsable-select').forEach(select => {
                select.innerHTML = ''; // Limpiar opciones anteriores

                // Añadir la opción predeterminada
                let defaultOption = document.createElement('option');
                defaultOption.text = "Selecciona un usuario";
                defaultOption.value = "";
                defaultOption.selected = true;
                defaultOption.disabled = true;
                select.appendChild(defaultOption);

                // Llenar el select con los datos de los usuarios
                data.user.forEach(item => {
                    let option = document.createElement('option');
                    option.value = item.id_user;
                    option.textContent = `${item.email}`; // Mostrar nombre completo
                    select.appendChild(option);
                });
            });
        } else {
            console.error('Error al obtener datos de los usuarios');
        }
    })
    .catch(error => console.error('Error en la solicitud:', error));
}

