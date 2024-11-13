let currentStream;
let currentButton; // Almacena el botón de cámara activado
let takenQuestions = [];

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
        fetchTakenActions(idAudit);
    }


    function populateAuditDetails(auditDetails) {
        const audit = auditDetails[0];
        $("#tittle").text(audit.audit_title);
        $("#auditor").val(`${audit.name} ${audit.firstName} ${audit.lastName}`);
        $("#status").val(audit.status);
        $("#departament").val(audit.department);
        $("#machinery").val(audit.machinery);
        $("#shift").val(audit.shift);
        $("#audit-questions-list").empty();
        console.log(audit.audit_title);
        auditDetails.forEach(detail => {
            const isTaken = takenQuestions.includes(detail.id_question);
            const isAnswered = detail.is_answered || false;  // Asegúrate de tener esta propiedad de alguna manera

            // Marca la respuesta si está tomada
            const complianceCheckbox = `
            <input type="checkbox" class="w3-check" 
                ${isAnswered ? "disabled checked" : (isTaken ? "disabled" : "checked")} 
                data-question-id="${detail.id_question}"
            >
        `;

            // Si la pregunta está respondida, no permitir la cámara ni el envío
            const cameraButtonDisplay = isAnswered ? "none" : (isTaken ? "none" : "block");
            const sendButtonDisabled = isAnswered ? "disabled" : "";

            // Deshabilita la entrada de texto y cambia el estilo si la pregunta ya fue respondida
            const answerInputDisabled = isAnswered ? "disabled" : "";
            const rowClass = isAnswered ? "answered" : "";

            const row = `
            <tr data-question-id="${detail.id_question}" class="${rowClass}">
                <td>${detail.category}</td>
                <td>${detail.question}</td>
                <td>${detail.create_at}</td>
                <td>${detail.source}</td>
                <td>${complianceCheckbox}</td>
                <td><input type="text" class="w3-text answer-input" ${answerInputDisabled}></td>
                <td>
                    <button class="camera-button w3-btn w3-round w3-grey" 
                            style="display:${cameraButtonDisplay};" 
                            data-question-id="${detail.id_question}">
                        <i class="fa fa-camera"></i>
                    </button>
                </td>
                <td>
                    <button class="send-button w3-button w3-blue w3-round fa fa-send" 
                            data-question-id="${detail.id_question}" 
                            style="font-size:12px" ${sendButtonDisabled}>
                    </button>
                </td>
            </tr>
        `;

            $("#audit-questions-list").append(row);
        });
    }

    // Manejar la creación de preguntas
    $(document).on('click', '#createQuestion .AuditCreate', function (e) {
        e.preventDefault();

        var form = $('#questionForm');
        var formData = form.serialize();
        console.log(formData);

        $.ajax({
            url: '../accions/insertQuestions', // URL del controlador que inserta los datos
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    Swal.fire({
                        title: 'Éxito!',
                        text: 'Pregunta Creada con éxito!',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error al crear la pregunta: ' + response.message,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            },
            error: function () {
                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrió un error al intentar crear la pregunta.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        });
    });

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


    // Función para cerrar la cámara y detener el stream
    function closeCamera() {
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
            currentStream = null;
        }
    }

    // Función para capturar la foto
    function takePhoto() {
        const video = document.getElementById("video");
        const canvas = document.getElementById("canvas");

        const context = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataURL = canvas.toDataURL("image/png");

        currentButton.html(`<img src="${imageDataURL}" alt="Captured Photo" style="width: 100%; height: 100%;">`);

        $("#photoModal").hide();
        closeCamera();

        currentButton.data('imageData', imageDataURL); // Almacena la imagen en el botón
    }

    $(document).on("click", ".send-button", function () {
        const questionId = $(this).data("question-id");
        const answerInput = $(this).closest("tr").find(".answer-input").val();
        const imageData = $(this).closest("tr").find(".camera-button").data('imageData');
        const complianceCheckbox = $(this).closest("tr").find('input[type="checkbox"]').prop('checked') ? 1 : 0; // Cambié esta línea

        if (imageData) {
            sendPhotoData(questionId, imageData, answerInput, complianceCheckbox);
        } else {
            alert("Por favor, toma una foto antes de enviar.");
        }
    });

    function sendPhotoData(questionId, imageData, answerInput, complianceCheckbox) {
        const formData = new FormData();

        formData.append('fk_question', questionId);
        formData.append('answer', answerInput);
        formData.append('compliaceCheckBox', complianceCheckbox);

        const byteString = atob(imageData.split(',')[1]);
        const mimeString = imageData.split(',')[0].split(':')[1].split(';')[0];
        const ab = new Uint8Array(byteString.length);

        for (let i = 0; i < byteString.length; i++) {
            ab[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([ab], { type: mimeString });
        formData.append('photo', blob, 'photo.png');

        $.ajax({
            url: '../user/uploadPhoto',
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

                    fetchTakenActions(id_audit);
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
});
