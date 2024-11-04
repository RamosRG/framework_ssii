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
                        <button class="send-button w3-button w3-blue w3-round fa fa-send" data-question-id="${detail.id_question}" style="font-size:12px">
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

        formData.append('fk_question', questionId);
        formData.append('is_complete', isComplete);
        formData.append('answer', answerInput);

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
                    // Alerta de éxito con SweetAlert
                    Swal.fire({
                        icon: 'success',
                        title: 'Datos enviados correctamente',
                        text: response.message,
                        showConfirmButton: false,
                        timer: 1500
                    });

                    // Recargar la tabla después de enviar los datos
                    fetchTakenActions(id_audit);
                } else {
                    // Alerta de error con SweetAlert
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

                // Alerta de error en caso de fallo de la solicitud AJAX
                Swal.fire({
                    icon: 'error',
                    title: 'Error en la conexión',
                    text: 'Hubo un problema al enviar los datos. Inténtalo nuevamente.',
                    confirmButtonText: 'Aceptar'
                });
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

                    populateTakenActions(response.data, idAudit);
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
        const isTaken = takenQuestions.includes(actions.id_question);
        actions.forEach(action => {
            const row = `
    <tr data-question-id="${action.id_question}">
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
        <button class="camera-button" style="display:${isTaken ? "none" : "block"};" data-question-id="${action.id_question}">
            <i class="fa fa-camera"></i>
        </button>
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
        <input type="hidden" name="id_answer${action.id_question}" value="${action.id_answer}">
        <button class="btn-accions w3-button w3-blue w3-round" data-question-id="${action.id_question}" style="font-size:12px">
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


        $(document).on("click", ".btn-accions", function () {

            const questionId = $(this).data("question-id"); // Obtén el ID de la pregunta
            const action = $(`input[name="action${questionId}"]`).val(); // Obtén el valor del campo de acción
            const responsable = $(`input[name="responsable_${questionId}"]`).val(); // Obtén el responsable
            const date = $(`input[name="date_${questionId}"]`).val(); // Obtén la fecha
            const isComplete = $(`input[name="is_complete_${questionId}"]:checked`).val(); // Verifica si está completo
            const idAnswer = $(`input[name="id_answer${questionId}"]`).val(); // Obtén el ID de respuesta
            const imageData = currentButton.data('imageData');
            

            if (imageData) {
                sendAccionsData(questionId, action, responsable, date, isComplete, idAnswer, imageData);
            } else {
                alert("por favor, toma una foto");
            }

            function sendAccionsData(questionId, action, responsable, date, isComplete, idAnswer, imageData) {
                const formData = new FormData();

                formData.append('fk_answer', idAnswer);
                formData.append('responsable', responsable);
                formData.append('is_complete', isComplete);
                formData.append('create_at', date);

                const byteString = atob(imageData.split(',')[1]);
                const mimeString = imageData.split(',')[0].split(':')[1].split(';')[0];
                const ab = new Uint8Array(byteString.length);

                for (let i = 0; i < byteString.length; i++) {
                    ab[i] = byteString.charCodeAt(i);
                }

                const blob = new Blob([ab], { type: mimeString });
                formData.append('photo', blob, 'photo.png');
               
                $.ajax({
                    url: '../user/submitAnswer', // Cambia la URL según sea necesario
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
                            // Recargar la tabla después de enviar los datos
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
    }


    document.getElementById('closeCamera').addEventListener('click', function () {
        document.getElementById('photoModal').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
        let video = document.getElementById('video');
        video.pause(); // Pausar la cámara al cerrar el modal
        video.srcObject = null; // Detener el video
    });

});

