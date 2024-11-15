$(document).ready(function () {
  // Obtener los datos de la auditoría desde localStorage
  var auditData = localStorage.getItem("auditData");

  // Cargar los detalles de la auditoría si existen
  if (auditData) {
      try {
          var response = JSON.parse(auditData);
          var auditDetails = response.data;
          if (auditDetails && auditDetails.length > 0) {
              var firstAudit = auditDetails[0];
              document.getElementById("audit_title").textContent = firstAudit.audit_title || "Título no disponible";
          } else {
              document.getElementById("audit_title").textContent = "No se encontraron auditorías";
          }
      } catch (error) {
          console.error("Error al procesar los datos de la auditoría:", error);
          document.getElementById("audit_title").textContent = "Error al cargar la auditoría";
      }
  } else {
      document.getElementById("audit_title").textContent = "No se encontró la auditoría";
  }

  // Cargar las categorías y fuentes
  fetchCategoryData();
  const sourceSelect = document.getElementById('source-list');
  fetchSourceData(sourceSelect);

  // Función para mostrar las preguntas de la auditoría
  function displayAuditDetails(details) {
      $("#audit-questions-list").empty();
      details.forEach(function (detail, index) {
          var questionRow = `
              <tr>
                  <td>${detail.category}</td>
                  <td>${detail.question}</td>
                  <td>${detail.created_at}</td>
                  <td>${detail.source}</td>
                  <td><button onclick="deleteQuestion(${index}, ${detail.id_question})" class="w3-button w3-red w3-round">Desactivar</button></td>
              </tr>
          `;
          $("#audit-questions-list").append(questionRow);
      });
  }

  // Agregar una nueva pregunta
  $("#addQuestionBtn").click(function () {
      addQuestion();
  });

  function addQuestion() {
      var categoryId = $("#category-list").val();
      var categoryText = $("#category-list option:selected").text();
      var questionText = $("#questionInput").val();
      var sourceId = $("#source-list").val();
      var sourceText = $("#source-list option:selected").text();

      if (categoryId && questionText && sourceId) {
          var newQuestion = {
              category_id: categoryId,
              category: categoryText,
              question: questionText,
              created_at: new Date().toISOString().split("T")[0],
              source_id: sourceId,
              source: sourceText,
              compliance: "No",
          };

          var auditData = JSON.parse(localStorage.getItem("auditData")) || { data: [] };
          auditData.data.push(newQuestion);
          localStorage.setItem("auditData", JSON.stringify(auditData));

          // Limpiar campos y actualizar tabla
          $("#category-list").val("");
          $("#questionInput").val("");
          $("#source-list").val("");
          displayAuditDetails(auditData.data);
      } else {
          alert("Seleccione una categoría, una fuente e ingrese la pregunta.");
      }
  }

  // Función para eliminar una pregunta
  window.deleteQuestion = function (index, id_question) {
      Swal.fire({
          title: '¿Está seguro de que desea desactivar esta pregunta?',
          text: "Esta acción quitará la pregunta de la lista",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, desactivar',
          cancelButtonText: 'Cancelar'
      }).then((result) => {
          if (result.isConfirmed) {
              $.ajax({
                  url: '/capas.com/accions/updateStatus',
                  type: 'POST',
                  data: { questionId: id_question, status: 0 },
                  success: function (response) {
                      if (response.success) {
                          Swal.fire('Eliminado', 'La pregunta ha sido desactivada con éxito.', 'success');
                      } else {
                          Swal.fire('Error', response.error || 'No se pudo desactivar la pregunta.', 'error');
                      }
                  },
                  error: function () {
                      Swal.fire('Error', 'Ocurrió un error al intentar desactivar la pregunta.', 'error');
                  }
              });
          }
      });
  };

  // Cargar las categorías desde el servidor
  function fetchCategoryData() {
      fetch("/capas.com/accions/getCategory", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
      })
      .then(response => response.json())
      .then(data => {
          if (data.status === "success") {
              let categorySelect = document.getElementById("category-list");
              categorySelect.innerHTML = "";
              let defaultOption = document.createElement("option");
              defaultOption.text = "Seleccione una categoría";
              defaultOption.selected = true;
              categorySelect.appendChild(defaultOption);

              data.category.forEach(item => {
                  let option = document.createElement("option");
                  option.value = item.id_category;
                  option.textContent = item.category;
                  categorySelect.appendChild(option);
              });
          } else {
              console.error("Error al obtener las categorías");
          }
      });
  }

  // Cargar las fuentes desde el servidor
  function fetchSourceData(sourceSelect) {
      fetch('/capas.com/accions/getSource', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
      })
      .then(response => response.json())
      .then(data => {
          if (data.status === 'success' && Array.isArray(data.fountain)) {
              sourceSelect.innerHTML = '';
              let defaultOption = document.createElement('option');
              defaultOption.text = "Selecciona una fuente";
              defaultOption.selected = true;
              sourceSelect.appendChild(defaultOption);

              data.fountain.forEach(item => {
                  let option = document.createElement('option');
                  option.value = item.id_source;
                  option.textContent = item.source;
                  sourceSelect.appendChild(option);
              });
          } else {
              throw new Error('La respuesta no es un array de fuentes');
          }
      })
      .catch(error => console.error('Error:', error));
  }

  // Crear y guardar la auditoría
  function createAudit() {
      var createdAt = new Date().toISOString().split("T")[0];
      var auditData = JSON.parse(localStorage.getItem("auditData")) || { data: [] };
      if (auditData.data.length > 0) {
          var auditTitle = document.getElementById("audit_title").textContent;
          var audit = {
              title: auditTitle,
              created_at: createdAt,
              questions: auditData.data,
          };

          $.ajax({
              url: "/capas.com/accions/editAudit",
              type: "POST",
              data: JSON.stringify(audit),
              contentType: "application/json",
              success: function (response) {
                  if (response.status === "success") {
                      alert("Auditoría guardada con éxito");
                  } else {
                      alert("Error al guardar la auditoría");
                  }
              },
              error: function () {
                  alert("Error al comunicarse con el servidor.");
              },
          });
      } else {
          alert("No hay preguntas para guardar.");
      }
  }

  // Crear la auditoría cuando se presiona el botón
  $("#editAuditBtn").click(function () {
      createAudit();
  });

  // Cargar las preguntas guardadas al cargar la página
  if (localStorage.getItem("auditData")) {
      displayAuditDetails(JSON.parse(localStorage.getItem("auditData")).data);
  }
});
