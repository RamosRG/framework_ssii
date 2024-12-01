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
    $("#id_audit").val(id_audit);


    if (id_audit) {
        fetchAuditDetails(id_audit);
        getFollowUp(id_audit);
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
        $("#auditor").val(`${audit.name} ${audit.firstName} ${audit.lastName}`).prop('disabled', true);
        $("#status").val(audit.status).prop('disabled', true);
        $("#departament").val(audit.department).prop('disabled', true);
        $("#machinery").val(audit.machinery).prop('disabled', true);
        $("#shift").val(audit.shift).prop('disabled', true);
        $("#date_start").val(audit.date_start).prop('disabled', true);
        $("#date_end").val(audit.date_end).prop('disabled', true);
        $("#audit-questions-list").empty().prop('disabled', true);
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
                <td>${detail.created_at}</td>
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

    $(document).on("click", ".camera-button", function () {
        currentButton = $(this);
        const fileInput = $("<input type='file' accept='image/*' style='display:none;'>");
        $("body").append(fileInput);

        fileInput.on("change", function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const imageDataURL = e.target.result;
                    if (imageDataURL) {
                        currentButton.html(`<img src="${imageDataURL}" alt="Selected Photo" style="width: 100%; height: 100%;">`);
                        currentButton.data('imageData', imageDataURL);
                    } else {
                        console.error("Error: La imagen no se cargó correctamente.");
                    }
                };
                reader.readAsDataURL(file);
            }
            fileInput.remove();
        });

        fileInput.click();
    });

    $(document).on("click", ".send-button", function () {
        const questionId = $(this).data("question-id");
        const answerInput = $(this).closest("tr").find(".answer-input").val();
        const imageData = $(this).closest("tr").find(".camera-button").data('imageData');
        const complianceCheckbox = $(this).closest("tr").find('input[type="checkbox"]').prop('checked') ? 1 : 0;

        if (imageData) {
            sendPhotoData(questionId, imageData, answerInput, complianceCheckbox);
        } else {
            Swal.fire({
                icon: "warning",
                title: "Faltan datos",
                text: "Por favor, completa todos los campos antes de enviar.",
            });
            return;
        }
    });

    function sendPhotoData(questionId, imageData, answerInput, complianceCheckbox) {
        const formData = new FormData();
        formData.append('fk_question', questionId);
        formData.append('answer', answerInput);
        formData.append('complianceCheckBox', complianceCheckbox);

        // Verifica y convierte la imagen base64 a un Blob
        const base64Data = imageData.split(',')[1];
        const mimeType = imageData.split(',')[0].split(':')[1].split(';')[0];
        try {
            const byteString = atob(base64Data);
            const ab = new Uint8Array(byteString.length);

            for (let i = 0; i < byteString.length; i++) {
                ab[i] = byteString.charCodeAt(i);
            }

            const blob = new Blob([ab], { type: mimeType });
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
                        // Llamada a funciones adicionales si es necesario
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
        } catch (e) {
            console.error("Error al convertir la imagen a Blob:", e);
            Swal.fire({
                icon: 'error',
                title: 'Error de procesamiento',
                text: 'Hubo un problema al procesar la imagen. Inténtalo nuevamente.',
                confirmButtonText: 'Aceptar'
            });
        }
    }
});
function getFollowUp(idAudit) {
    $.ajax({
        url: '../accions/getVerificaciones/' + idAudit,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            console.log(response)
            if (response.status === 'success') {
                var auditDetails = response.data;

                // Limpiar la tabla antes de llenarla
                $("#taken-followUp-list").empty();

                // Iterar los detalles y rellenar la tabla
                auditDetails.forEach(function (detail) {
                    // Manejo de valores vacíos
                    var question = detail.question || "Sin descripción";
                    var actionDescription = detail.action_description || "Sin descripción";
                    var evidenceAccion = detail.evidence_accion
                        ? `<img src="../accions/${detail.evidence_accion}" alt="Evidencia" style="width: 100px; height: auto;">`
                        : "No hay evidencia";
                    var followUp = detail.follow_up || "Sin seguimiento";
                    var isResolved = detail.is_resolved === "1"
                        ? '<i class="fa fa-check-circle" style="color: green;"></i>'
                        : '<i class="fa fa-remove" style="color: red;"></i>';

                    // Crear la fila de la tabla
                    var questionsRow = `
                        <tr>
                            <td>${question}</td>
                            <td>${actionDescription}</td>
                            <td>${evidenceAccion}</td>
                            <td>${followUp}</td>
                            <td>${isResolved}</td>
                        </tr>
                    `;

                    // Agregar la fila a la tabla
                    $("#taken-followUp-list").append(questionsRow);
                });
            } else {
                console.error('Error al obtener los detalles de la auditoría');
            }
        },
        error: function (xhr, status, error) {
            console.error('Error en la solicitud AJAX:', error);
        }
    });

}


