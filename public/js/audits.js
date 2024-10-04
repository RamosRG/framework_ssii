$(document).ready(function () {

  // Obtener los datos de la auditoría desde localStorage
  var auditData = localStorage.getItem("auditData");
  if (auditData) {
    var audit = JSON.parse(auditData);
console.log(auditData);
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
  
      // Agregar la opción predeterminada
      $categorySelect.append($('<option>', {
        value: '',  // Valor vacío o puedes asignar algún valor predeterminado
        text: 'Escoge una CAPA',  // Texto que se muestra
        disabled: true,  // Opción deshabilitada para obligar al usuario a escoger otra
        selected: true   // Marcada por defecto
      }));
  
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
            var categoryName = $(this).find('option:selected').text(); // Obtener el nombre de la categoría
            if (categoryId) {
                loadQuestionsByCategory(categoryId, categoryName);
            } else {
                $('#questionsList').empty(); // Limpiar si no hay categoría seleccionada
            }
        });
    }

    // Cargar preguntas según la categoría seleccionada
    function loadQuestionsByCategory(categoryId, categoryName) {
        $.ajax({
            url: '../accions/getQuestionsByCategory',
            type: 'POST',
            dataType: 'json',
            data: { category_id: categoryId },
            success: function (response) {
                if (response.status === 'success') {
                    populateQuestionsList(response.data.questions, categoryName);
                } else {
                    alert('Error al cargar las preguntas: ' + response.message);
                }
            },
            error: function () {
                alert('Error al obtener las preguntas.');
            }
        });
    }

    // Rellenar la lista de preguntas divididas por categoría
    function populateQuestionsList(questions, categoryName) {
        var $questionsList = $('#questionsList');

        // Verificar si ya existe un contenedor para la categoría
        var $categoryContainer = $('#category_' + categoryName.replace(/\s+/g, '_'));
        if ($categoryContainer.length === 0) {
            // Crear un nuevo contenedor si no existe
            $categoryContainer = $('<div>', { id: 'category_' + categoryName.replace(/\s+/g, '_') });
            $categoryContainer.append($('<h3>', { text: categoryName }));
            $questionsList.append($categoryContainer);
        }

        // Agregar preguntas a la categoría correspondiente
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
                    addSelectedQuestion(question, categoryName);
                } else {
                    localStorage.removeItem('question_' + questionId);
                    removeSelectedQuestion(questionId, categoryName);
                }
            });

            var label = $('<label>', {
                for: 'question_' + question.id_question,
                text: question.question
            });

            var questionItem = $('<div>', { class: 'question-item' });
            questionItem.append(checkbox).append(label);

            $categoryContainer.append(questionItem);

            if (isChecked) {
                addSelectedQuestion(question, categoryName);
            }
        });
    }

    // Función para agregar una pregunta seleccionada a la vista, agrupada por categoría
    function addSelectedQuestion(question, categoryName) {
        var $selectedQuestionsList = $('#selectedQuestionsList');

        // Verificar si ya existe un contenedor para la categoría
        var $categoryContainer = $('#selectedCategory_' + categoryName.replace(/\s+/g, '_'));
        if ($categoryContainer.length === 0) {
            // Crear un nuevo contenedor si no existe
            $categoryContainer = $('<div>', { id: 'selectedCategory_' + categoryName.replace(/\s+/g, '_') });
            $categoryContainer.append($('<h3>', { text: categoryName }));
            $selectedQuestionsList.append($categoryContainer);
        }

        if ($('#selected_' + question.id_question).length === 0) { // Evitar duplicados
            var questionElement = $('<div>', {
                id: 'selected_' + question.id_question,
                class: 'selected-question-item',
                text: question.question
            });
            $categoryContainer.append(questionElement);
        }
    }

    // Función para eliminar una pregunta seleccionada de la vista
    function removeSelectedQuestion(questionId, categoryName) {
        $('#selected_' + questionId).remove();

        // Si no quedan más preguntas seleccionadas en la categoría, eliminar el contenedor de categoría
        var $categoryContainer = $('#selectedCategory_' + categoryName.replace(/\s+/g, '_'));
        if ($categoryContainer.children('.selected-question-item').length === 0) {
            $categoryContainer.remove();
        }
    }
});

