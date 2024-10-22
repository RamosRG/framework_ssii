$(document).ready(function () {
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
        fetchTakenActions(id_audit);
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
                        <input type="file" class="file-input" accept="image/*" data-question-id="${detail.id_question}" style="display:none;">
                        <button class="select-photo-button" data-question-id="${detail.id_question}">Seleccionar Foto</button>
                    </td>
                </tr>
            `;
            $("#audit-questions-list").append(row);
        });

        // Event listeners
        setupEventListeners();
    }

    function setupEventListeners() {
        $("#audit-questions-list").on("change", ".w3-check", function () {
            const isChecked = $(this).is(":checked");
            const cameraButton = $(this).closest('tr').find('.camera-button');
            cameraButton.toggle(!isChecked);
        });

        // Abrir cámara
        $("#audit-questions-list").on("click", ".camera-button", function (e) {
            e.preventDefault();
            const questionId = $(this).data("question-id");
            $("#photoModal").data("question-id", questionId).show();
            startCamera();
        });

        // Seleccionar foto desde sistema
        $("#audit-questions-list").on("click", ".select-photo-button", function () {
            $(this).siblings('.file-input').trigger('click');
        });

        // Cargar archivo seleccionado
        $("#audit-questions-list").on("change", ".file-input", handleFileChange);

        $("#takePhoto").on("click", function () {
            const questionId = $("#photoModal").data("question-id");
            takePhotoAndUpload(questionId);
        });

        $("#photoModal").on("hide", function () {
            stopCamera();
            $("#photoPreview").hide();
        });
    }

    function handleFileChange(event) {
        const file = event.target.files[0];
        const questionId = $(this).data("question-id");
        if (file) {
            previewAndUploadPhoto(file, questionId);
        }
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
                    console.error("Error al obtener las acciones tomadas");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error en la solicitud AJAX:", error);
            },
        });
    }

    function populateTakenActions(actions) {
        $("#taken-actions-list").empty();
        takenQuestions = [];

        actions.forEach(action => {
            takenQuestions.push(action.id_question);
            const row = `
                <tr>
                    <td>${action.id_question}</td>
                    <td>${action.question}</td>
                    <td>${action.answer}</td>
                    <td>${action.responsable}</td>
                    <td>${action.create_at}</td>
                    <td>
                        ${action.evidence ? `<img src="${action.evidence}" alt="Evidencia" style="width: 100px; height: auto;">` : 'Sin evidencia'}
                    </td>
                    <td>${action.is_complete ? 'Sí' : 'No'}</td>
                </tr>
            `;
            $("#taken-actions-list").append(row);
        });

        fetchAuditDetails(id_audit);
    }

    function startCamera() {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                const video = document.getElementById("video");
                video.srcObject = stream;
                video.style.display = "block";
                video.stream = stream; // Guardar el stream para detenerlo después
            })
            .catch(error => {
                console.error("Error al acceder a la cámara: ", error);
                alert("No se puede acceder a la cámara.");
            });
    }

    function stopCamera() {
        const video = document.getElementById("video");
        const stream = video.stream;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            video.srcObject = null;
            video.style.display = "none";
        }
    }

    function takePhotoAndUpload(questionId) {
        const canvas = document.getElementById("canvas");
        const video = document.getElementById("video");
        canvas.width = 640;
        canvas.height = 480;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(blob => {
            uploadPhoto(questionId, blob);
        }, 'image/png');
    }

    function previewAndUploadPhoto(file, questionId) {
        const reader = new FileReader();
        reader.onload = function (e) {
            $("#photoPreview").attr("src", e.target.result).show();
            uploadPhoto(questionId, file);
        };
        reader.readAsDataURL(file);
    }

    function uploadPhoto(questionId, photoBlob) {
        const formData = new FormData();
        const checkbox = $(`input[data-question-id="${questionId}"]`);
        const isComplete = checkbox.is(":checked") ? 1 : 0;
        const answerText = checkbox.closest('tr').find('.answer-input').val();

        formData.append('fk_question', questionId);
        formData.append('is_complete', isComplete);
        formData.append('answer', answerText);
        formData.append('photo', photoBlob, 'photo.png');

        $.ajax({
            url: "../user/uploadPhoto",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                handleUploadResponse(response);
            },
            error: function (error) {
                console.error("Error al guardar la foto:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo guardar la foto. Intenta nuevamente.',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    }

    function handleUploadResponse(response) {
        if (response.status === "success") {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Foto guardada exitosamente.',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                $("#photoModal").hide();
                $("#photoPreview").hide();
                stopCamera();
                fetchTakenActions(id_audit);
            });
        } else {
            console.error("Error al guardar la foto:", response.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo guardar la foto. Intenta nuevamente.',
                confirmButtonText: 'Aceptar'
            });
        }
    }
});
