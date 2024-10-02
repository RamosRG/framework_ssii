$(document).ready(function () {

  // Obtener los datos de la auditoría desde localStorage
  var auditData = localStorage.getItem("auditData");
  if (auditData) {
    var audit = JSON.parse(auditData);

    // Rellenar las cajas de texto con los datos de la auditoría
    $("#no_audit").val(audit.no_audit);
    $("#date").val(audit.date);
    $("#auditor").val(audit.auditor);
    $("#status").val(audit.status);
    $("#departament").val(audit.departament);
    $("#machinery").val(audit.machinery);
    $("#shift").val(audit.shift);
  }

  // Cargar las categorías
  $.ajax({
    url: '../accions/getCategory', // URL para obtener las categorías
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      var $categorySelect = $('#select1');
      $categorySelect.empty(); // Limpiar las opciones actuales

      if (response.status == 'success') {
        // Llenar el select con las áreas
        $.each(response.category, function (index, category) {
          $categorySelect.append($('<option>', {
            value: category.id_category,  // valor de la opción (ajusta según tu base de datos)
            text: category.category       // texto que se muestra
          }));
        });
      } else {
        alert('Error al cargar las categorías: ' + response.message);
      }
    },
    error: function () {
      alert('Error al obtener las categorías.');
    }
  });

  // Invocar la función para obtener las preguntas según la categoría seleccionada
  getQuestions();
});
$(document).ready(function () {
  // Cargar categorías y establecer evento de cambio
  loadCategories();

  // Función para cargar categorías
  function loadCategories() {
      $.ajax({
          url: '../accions/getCategory',
          type: 'GET',
          dataType: 'json',
          success: function (response) {
              if (response.status === 'success') {
                  populateCategorySelect(response.category);
              } else {
                  alert('Error al cargar las categorías: ' + response.message);
              }
          },
          error: function () {
              alert('Error al obtener las categorías.');
          }
      });
  }

  // Rellenar el select de categorías
  function populateCategorySelect(categories) {
      var $categorySelect = $('#select1');
      $categorySelect.empty(); // Limpiar las opciones

      $.each(categories, function (index, category) {
          $categorySelect.append($('<option>', {
              value: category.id_category,
              text: category.category
          }));
      });

      // Llamar a la función para obtener preguntas cuando cambia la categoría
      $categorySelect.on('change', function () {
          var categoryId = $(this).val();
          if (categoryId) {
              loadQuestionsByCategory(categoryId);
          } else {
              $('#questionsList').empty(); // Limpiar si no hay categoría seleccionada
          }
      });
  }

  // Cargar preguntas según la categoría seleccionada
  function loadQuestionsByCategory(categoryId) {
      $.ajax({
          url: '../accions/getQuestionsByCategory',
          type: 'POST',
          dataType: 'json',
          data: { category_id: categoryId }, // Ajuste en el nombre del parámetro
          success: function (response) {
              if (response.status === 'success') {
                  populateQuestionsList(response.data.questions);
              } else {
                  alert('Error al cargar las preguntas: ' + response.message);
              }
          },
          error: function () {
              alert('Error al obtener las preguntas.');
          }
      });
  }

  // Rellenar la lista de preguntas
  function populateQuestionsList(questions) {
      var $questionsList = $('#questionsList');
      $questionsList.empty(); // Limpiar la lista

      $.each(questions, function (index, question) {
          var isChecked = localStorage.getItem('question_' + question.id_question) === 'checked';

          var checkbox = $('<input>', {
              type: 'checkbox',
              value: question.id_question,
              id: 'question_' + question.id_question,
              checked: isChecked // Mantener la selección
          }).on('change', function () {
              var questionId = $(this).val();
              if (this.checked) {
                  localStorage.setItem('question_' + questionId, 'checked');
                  addSelectedQuestion(question);
              } else {
                  localStorage.removeItem('question_' + questionId);
                  removeSelectedQuestion(questionId);
              }
          });

          var label = $('<label>', {
              for: 'question_' + question.id_question,
              text: question.question
          });

          var questionItem = $('<div>', { class: 'question-item' });
          questionItem.append(checkbox).append(label);

          $questionsList.append(questionItem);

          if (isChecked) {
              addSelectedQuestion(question);
          }
      });
  }

  // Función para agregar una pregunta seleccionada a la vista
  function addSelectedQuestion(question) {
      var $selectedQuestionsList = $('#selectedQuestionsList');
      if ($('#selected_' + question.id_question).length === 0) { // Evitar duplicados
          var questionElement = $('<div>', {
              id: 'selected_' + question.id_question,
              class: 'selected-question-item',
              text: question.question
          });
          $selectedQuestionsList.append(questionElement);
      }
  }

  // Función para eliminar una pregunta seleccionada de la vista
  function removeSelectedQuestion(questionId) {
      $('#selected_' + questionId).remove();
  }
});
