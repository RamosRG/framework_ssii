let currentStream;
let currentButton; // Almacena el botón de cámara activado

$(document).ready(function () {
    // Función para obtener la semana actual
    function getCurrentWeek() {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const dayOfWeek = firstDayOfMonth.getDay();
        const adjustedDate = today.getDate() + dayOfWeek - 1;
        return Math.ceil(adjustedDate / 7);
    }

    const currentWeek = getCurrentWeek();
    $("#no_audit").val(currentWeek);

    const urlParams = new URLSearchParams(window.location.search);
    const id_audit = urlParams.get("id_audit");
    let takenQuestions = [];

    if (id_audit) {
        fetchAuditDetails(id_audit);
    } else {
        console.error("No se encontró el ID de auditoría en la URL.");
    }

    function fetchAuditDetails(idAudit) {
        $.ajax({
            url: "../user/auditDetails/" + idAudit,
            type: "GET",
            dataType: "json",
            success: function (response) {
                if (response.status === "success" && response.data.length > 0) {
                    populateAuditDetails(response.data);
                } else {
                    console.error("No se encontraron detalles de auditoría.");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error en la solicitud AJAX:", error);
            },
        });
        fetchTakenActions(idAudit)
    }

    function populateAuditDetails(auditDetails) {
        const audit = auditDetails[0];
        $("#date").val(audit.date);
        $("#auditor").val(`${audit.name} ${audit.firstName} ${audit.lastName}`);
        $("#status").val(audit.status);
        $("#departament").val(audit.department);
        $("#machinery").val(audit.machinery);
        $("#shift").val(audit.shift);
        $("#audit-questions-list").empty();

        auditDetails.forEach(detail => {
            const isTaken = takenQuestions.includes(detail.id_question);
            const complianceCheckbox = `<input type="checkbox" class="w3-check" ${isTaken ? "disabled" : "checked"} data-question-id="${detail.id_question}">`;
            const row = `
                <tr data-question-id="${detail.id_question}">
                    <td>${detail.category}</td>
                    <td>${detail.question}</td>
                    <td>${detail.create_at}</td>
                    <td>${detail.source}</td>
                    <td>${complianceCheckbox}</td>
                    <td><input type="text" class="w3-text answer-input"></td>
                    <td>
                        <button class="camera-button" style="display:${isTaken ? "none" : "block"};" data-question-id="${detail.id_question}">
                            <i class="fa fa-camera"></i>
                        </button>
                    </td>
                    <td>
                        <button class="send-button w3-button w3-blue w3-round" data-question-id="${detail.id_question}" style="font-size:12px">
                            Enviar
                        </button>
                    </td>
                </tr>
            `;
            $("#audit-questions-list").append(row);
        });
    }

    // Abre la cámara al hacer clic en el botón de cámara
    $(document).on("click", ".camera-button", function () {
        $("#photoModal").show(); // Muestra el modal de la cámara
        currentButton = $(this); // Almacena el botón que activó la cámara
        openCamera();
    });

    $("#takePhoto").on("click", function () {
        takePhoto();
    });

    // Cierra el modal y detiene el stream de la cámara
    $("#closeCamera").on("click", function () {
        $("#photoModal").hide();
        closeCamera();
    });

    // Función para abrir la cámara y mostrar el video en tiempo real
    function openCamera() {
        const video = document.getElementById("video");
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                currentStream = stream;
                video.srcObject = stream; // Muestra el stream en el elemento <video>
                video.play();
            })
            .catch(error => {
                console.error("Error al acceder a la cámara:", error);
                alert("No se puede acceder a la cámara. Verifique los permisos del navegador.");
            });
    }

    // Función para cerrar la cámara y detener el stream
    function closeCamera() {
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop()); // Detiene todos los tracks
            currentStream = null;
        }
    }

    // Función para capturar la foto
    function takePhoto() {
        const video = document.getElementById("video");
        const canvas = document.getElementById("canvas");

        if (!canvas || !video) {
            console.error("Canvas o video no encontrado");
            return;
        }

        const context = canvas.getContext("2d");
        if (!context) {
            console.error("No se pudo obtener el contexto del canvas");
            return;
        }

        // Ajusta el tamaño del canvas al del video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Dibuja el fotograma actual del video en el canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Obtiene la imagen como una URL de datos
        const imageDataURL = canvas.toDataURL("image/png");

        // Reemplaza el ícono de la cámara en el botón con la imagen capturada
        currentButton.html(`<img src="${imageDataURL}" alt="Captured Photo" style="width: 100%; height: 100%;">`);

        // Oculta el modal y detiene la cámara
        $("#photoModal").hide();
        closeCamera();
        
        // Guarda la imagen en un lugar accesible (por ejemplo, en una variable)
        currentButton.data('imageData', imageDataURL); // Almacena la imagen en el botón
    }

    // Enviar datos al servidor cuando se presiona el botón "Enviar"
    $(document).on("click", ".send-button", function () {
        const questionId = $(this).data("question-id");
        const isComplete = true; // Ajusta según tu lógica
        const answerInput = $(this).closest("tr").find(".answer-input").val(); // Obtiene la respuesta del input
        const imageData = currentButton.data('imageData'); // Obtiene la imagen almacenada

        if (imageData) {
            sendPhotoData(questionId, imageData, isComplete, answerInput);
        } else {
            alert("Por favor, toma una foto antes de enviar.");
        }
    });

    function sendPhotoData(questionId, imageData, isComplete, answerInput) {
        const formData = new FormData();
        
        // Agregar datos al FormData
        formData.append('fk_question', questionId);
        formData.append('is_complete', isComplete);
        formData.append('answer', answerInput);
        
        // Convierte la imagen base64 a un Blob
        const byteString = atob(imageData.split(',')[1]); // Decodifica base64
        const mimeString = imageData.split(',')[0].split(':')[1].split(';')[0]; // Extrae el tipo MIME
        const ab = new Uint8Array(byteString.length);
        
        // Rellena el Uint8Array con los bytes de la imagen
        for (let i = 0; i < byteString.length; i++) {
            ab[i] = byteString.charCodeAt(i);
        }
        
        const blob = new Blob([ab], { type: mimeString }); // Crea el Blob a partir de los bytes
        formData.append('photo', blob, 'photo.png'); // Agrega el Blob a FormData
        
        // Verifica el tamaño y tipo del Blob
        console.log("Tamaño del Blob:", blob.size); // Debe ser mayor que 0 si la imagen se capturó correctamente
        console.log("Tipo de Blob:", blob.type); // Debe coincidir con el tipo MIME de la imagen
    
        // Muestra los datos en FormData
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }
    
        $.ajax({
            url: '../user/uploadPhoto', // Asegúrate de que esta URL sea correcta
            type: 'POST',
            data: formData,
            processData: false, // Evita que jQuery procese los datos
            contentType: false, // Evita que jQuery configure el tipo de contenido
            success: function (response) {
                console.log("Respuesta del servidor:", response);
                if (response.status === 'success') {
                    console.log("Datos enviados correctamente:", response.message);
                    // Aquí puedes hacer lo que necesites después de enviar los datos
                } else {
                    console.error("Error al enviar los datos:", response.message);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error en la solicitud AJAX:", error);
            }
        });
    }
    
    function fetchTakenActions(idAudit) {
        $.ajax({
            url: "../user/takenActions/" + idAudit,
            type: "GET",
            dataType: "json",
            success: function (response) {
                if (response.status === "success") {
                    populateTakenActions(response.data);
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
        $("#taken-actions-list").empty(); // Limpia la lista existente
 
        actions.forEach(action => {
            takenQuestions.push(action.id_question); // Agrega el id de la pregunta al array
 
            const row = `
                <tr>
                    <td>${action.id_question}</td>
                    <td>${action.question}</td>
                    <td>${action.answer}</td>
                    <td>
                        ${action.evidence ? `<img src="${action.evidence}" alt="Evidencia" style="width: 100px; height: auto;">` : 'Sin evidencia'}
                    </td>
                    <td><input type="text" name="action${action.id_question}" placeholder="Escribe aquí..."></td>
                    <td><input type="text" name="responsable_${action.id_question}" value="${action.name} ${action.firstName} ${action.lastName}"></td>
                    <td><input type="date" name="date_${action.id_question}"></td>
                    <td>
                        <button style="font-size:12px" class="camera-button" data-question-id="1">
                            <i class="fa fa-camera w3-button w3-round-long"></i>
                        </button>
                            <img src="" alt="Thumbnail" class="thumbnail" style="display:none; width: 40px; height: auto; border-radius: 5px;">
                    </td>
                    <td>
                        <label>
                            <input type="radio" name="is_complete_${action.id_question}" value="1" ${action.is_complete ? 'checked' : ''}> Sí
                        </label>
                        <label>
                            <input type="radio" name="is_complete_${action.id_question}" value="0" ${!action.is_complete ? 'checked' : ''}> No
                        </label>
                    </td>
                    <td>
                        <button class="send-button w3-button w3-blue w3-round"" data-question-id="${action.id_question}" style="font-size:12px">
                            Enviar
                        </button>
                    </td>
                </tr>
            `;
 
            $("#taken-actions-list").append(row); // Agrega la nueva fila a la tabla
        });
 
        $("#closeCamera").on("click", function () {
            stopCamera();
            $("#photoModal").hide();
        });
        // Asigna el evento de clic al botón "Enviar" de cada fila
        $(".send-button").on("click", function () {
            const questionId = $(this).data("question-id");
            const data = {
                fk_question: questionId,
                action: $(`input[name="action${questionId}"]`).val(),
                responsable: $(`input[name="responsable_${questionId}"]`).val(),
                date: $(`input[name="date_${questionId}"]`).val(),
                customInput3: $(`input[name="evidence_${questionId}"]`).val(),
                is_complete: $(`input[name="is_complete_${questionId}"]:checked`).val()
            };
 
            // Realizar la solicitud AJAX para enviar los datos al servidor
            $.ajax({
                url: "../user/submitAnswer", // Cambia la URL al endpoint correcto
                type: "POST",
                data: data,
                success: function (response) {
                    console.log(response);
                    return false;
                    if (response.status === "success") {
                        alert("Datos enviados con éxito.");
                    } else {
                        alert("Error al enviar los datos.");
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error en la solicitud AJAX:", error);
                }
            });
        });
 
    }
});
    
