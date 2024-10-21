$(document).ready(function () {
    // Obtener el ID de auditoría de la URL
    var urlParams = new URLSearchParams(window.location.search);
    var id_audit = urlParams.get("id_audit");

    // Verificar si existe el id_audit
    if (id_audit) {
        console.log("ID de auditoría encontrado: " + id_audit);
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
                if (response.status === "success") {
                    var auditDetails = response.data;

                    if (auditDetails.length > 0) {
                        var audit = auditDetails[0];

                        // Rellenar los campos de la auditoría
                        $("#no_audit").val(audit.no_audit);
                        $("#date").val(audit.date);
                        $("#auditor").val(audit.name + " " + audit.firstName + " " + audit.lastName);
                        $("#status").val(audit.status);
                        $("#departament").val(audit.department);
                        $("#machinery").val(audit.machinery);
                        $("#shift").val(audit.shift);

                        // Limpiar la tabla antes de agregar nuevas filas
                        $("#audit-questions-list").empty();

                        // Llenar la tabla de preguntas
                        auditDetails.forEach(function (detail) {
                            var isChecked = "checked";
                            var complianceCheckbox = `
                              <input type="checkbox" class="w3-check" ${isChecked} data-question-id="${detail.id_question}">
                          `;
                            var row = `
                              <tr>
                                  <td>${detail.category}</td>
                                  <td>${detail.question}</td>
                                  <td>${detail.create_at}</td>
                                  <td>${detail.source}</td>
                                  <td>${complianceCheckbox}</td>
                                  <td><input type="text" class="w3-text"></td>
                                  <td><button class="camera-button" style="display:none;" data-question-id="${detail.id_question}"><i class="fa fa-camera"></i></button></td>
                              </tr>
                          `;
                            $("#audit-questions-list").append(row);
                        });

                        // Evento para los checkboxes
                        $("#audit-questions-list").on("change", ".w3-check", function () {
                            var isChecked = $(this).is(":checked");
                            var cameraButton = $(this).closest('tr').find('.camera-button');
                            cameraButton.toggle(!isChecked); // Alternar visibilidad
                        });

                        // Manejar clic en el botón de la cámara
                        $("#audit-questions-list").on("click", ".camera-button", function (e) {
                            e.preventDefault();
                            var questionId = $(this).data("question-id");
                            $("#photoModal").data("question-id", questionId).show(); // Mostrar modal
                            startCamera(); // Iniciar la cámara al abrir el modal
                        });

                        // Tomar foto con la cámara
                        $("#takePhoto").on("click", function () {
                            var canvas = document.getElementById("canvas");
                            var video = document.getElementById("video");
                            canvas.width = 640;
                            canvas.height = 480;
                            var context = canvas.getContext("2d");
                            context.drawImage(video, 0, 0, canvas.width, canvas.height);
                            
                            // Convertir el canvas a Blob
                            canvas.toBlob(function(blob) {
                                // Obtener el ID de la pregunta
                                var questionId = $("#photoModal").data("question-id");
                                uploadPhoto(questionId, blob); // Llama a la función de carga aquí
                            }, 'image/png');
                            
                            $("#photoPreview").attr("src", canvas.toDataURL("image/png")).show();
                        });

                        // Limpiar y detener la cámara al cerrar el modal
                        $("#photoModal").on("hidden.bs.modal", function () {
                            stopCamera(); // Detener la cámara
                            $("#photoPreview").hide(); // Ocultar la vista previa
                        });

                        // Cerrar el modal
                        $("#closeModal").on("click", function () {
                            $("#photoModal").hide(); // Cerrar el modal
                            stopCamera(); // Detener la cámara
                            $("#photoPreview").hide(); // Ocultar la vista previa
                        });

                        // Función para iniciar la cámara
                        function startCamera() {
                            navigator.mediaDevices.getUserMedia({ video: true })
                                .then(function (stream) {
                                    var video = document.getElementById("video");
                                    video.srcObject = stream;
                                    video.style.display = "block"; // Mostrar el video
                                })
                                .catch(function (error) {
                                    console.error("Error al acceder a la cámara: ", error);
                                    alert("No se puede acceder a la cámara.");
                                });
                        }

                        // Función para detener la cámara
                        function stopCamera() {
                            var video = document.getElementById("video");
                            var stream = video.srcObject;
                            if (stream) {
                                var tracks = stream.getTracks();
                                tracks.forEach(function (track) {
                                    track.stop();
                                });
                                video.srcObject = null;
                                video.style.display = "none"; // Ocultar el video
                            }
                        }
                    } else {
                        console.error("No se encontraron detalles de auditoría.");
                    }
                } else {
                    console.error("Error al obtener los detalles de la auditoría");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error en la solicitud AJAX:", error);
            },
        });
    }

    // Modificar la función de subida de fotos para enviar el Blob directamente
    function uploadPhoto(questionId, photoBlob) {
        var formData = new FormData();
        formData.append('question_id', questionId);
        formData.append('photo', photoBlob, 'photo.png'); // Añadir el Blob al FormData con un nombre de archivo
    
        $.ajax({
            url: "../user/uploadPhoto", // Cambia esta URL a tu endpoint
            type: "POST",
            data: formData,
            contentType: false, // Importante para enviar el archivo
            processData: false, // No procesar los datos
            success: function (response) {
                // Utilizar SweetAlert para mostrar un mensaje de éxito
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Foto guardada exitosamente.',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    $("#photoModal").hide(); // Cerrar el modal
                    $("#photoPreview").hide(); // Ocultar la vista previa
                });
            },
            error: function (error) {
                console.error("Error al guardar la foto:", error);
                // Utilizar SweetAlert para mostrar un mensaje de error
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo guardar la foto. Intenta nuevamente.',
                    confirmButtonText: 'Aceptar'
                });
            }
        });
    }    
});
