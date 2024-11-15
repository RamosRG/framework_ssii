$(document).ready(function () {
    fetchCategoryData();
  var auditData = localStorage.getItem("auditData");

  if (auditData) {
    var response = JSON.parse(auditData);
    var auditDetails = response.data;
    displayAuditDetails(auditDetails);
  }

  function displayAuditDetails(details) {
    $("#audit-questions-list").empty();

    details.forEach(function (detail, index) {

      var questionRow = `
                <tr>
                    <td>${detail.category}</td>
                    <td>${detail.question}</td>
                    <td>${detail.created_at}</td>
                    <td>${detail.source}</td>

                    <td><button onclick="deleteQuestion(${index})" class="w3-button w3-red w3-round">Eliminar</button></td>
                </tr>
            `;
      $("#audit-questions-list").append(questionRow);
    });
  }

  // Función para eliminar una pregunta
  window.deleteQuestion = function (index) {
    if (confirm("¿Está seguro de que desea eliminar esta pregunta?")) {
      // Eliminar la pregunta de `auditData`
      var auditData = JSON.parse(localStorage.getItem("auditData"));
      auditData.data.splice(index, 1);
      localStorage.setItem("auditData", JSON.stringify(auditData));
      displayAuditDetails(auditData.data); // Actualizar la vista
    }
  };
});

// Función para agregar una pregunta
function addQuestion() {
  var category = $("#categorySelect").val();
  var questionText = $("#questionInput").val();

  if (category && questionText) {
    var newQuestion = {
      category: category,
      question: questionText,
      created_at: new Date().toISOString().split("T")[0],
      source: "Manual",
      compliance: "No",
    };

    // Obtener datos actuales, añadir la nueva pregunta y guardar en localStorage
    var auditData = JSON.parse(localStorage.getItem("auditData"));
    auditData.data.push(newQuestion);
    localStorage.setItem("auditData", JSON.stringify(auditData));

    // Limpiar campos y actualizar tabla
    $("#categorySelect").val("");
    $("#questionInput").val("");
    displayAuditDetails(auditData.data);
  } else {
    alert("Seleccione una categoría e ingrese la pregunta.");
  }
}
function fetchCategoryData() {
  return fetch("/capas.com/accions/getCategory", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        let categorySelect = document.getElementById("category-list");
        categorySelect.innerHTML = "";

        let defaultOption = document.createElement("option");
        defaultOption.text = "Open this select menu";
        defaultOption.selected = true;
        categorySelect.appendChild(defaultOption);

        data.category.forEach((item) => {
          let option = document.createElement("option");
          option.value = item.id_category;
          option.textContent = item.category;
          categorySelect.appendChild(option);
        });

        // Almacena las categorías globalmente
        categories = data.category;
      } else {
        console.error("Error al obtener las categorias");
      }
    });
}
