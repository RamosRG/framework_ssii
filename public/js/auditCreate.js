// Inicializar el array vacío para almacenar las preguntas
let selectedCategory;
let categoryId; // Declarar la variable a nivel superior

// Función para obtener datos genéricos
function fetchData(url, selectId, placeholder, valueField, textField) {
    fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
        .then(response => response.json())
        .then(data => {
            if (data && data[valueField] && Array.isArray(data[valueField])) {
                const select = document.getElementById(selectId);
                select.innerHTML = `<option selected>${placeholder}</option>`;

                data[valueField].forEach(item => {
                    select.innerHTML += `<option value="${item.id_source}">${item[textField]}</option>`;
                });
            } else {
                console.error(`Error al obtener datos para ${selectId}: estructura de datos no válida o vacía`);
            }
        })
        .catch(error => console.error('Error en la solicitud:', error));
}

// Funciones para obtener datos específicos
function fetchShiftData() {
    // Hacemos la solicitud AJAX
    fetch('/capas.com/accions/getShift', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                let shiftSelect = document.getElementById('shift-list');
                shiftSelect.innerHTML = ''; // Limpiar las opciones anteriores

                // Añadimos de nuevo la opción inicial
                let defaultOption = document.createElement('option');
                defaultOption.text = "Open this select menu";
                defaultOption.selected = true;
                shiftSelect.appendChild(defaultOption);

                // Llenar el select con los datos de maquinaria
                data.shift.forEach(item => {
                    let option = document.createElement('option');
                    option.value = item.id_shift;  // Usamos id_shift como valor
                    option.textContent = item.shift;  // Usamos shift como el nombre a mostrar
                    shiftSelect.appendChild(option);
                });
            } else {
                console.error('Error al obtener los turnos');
            }
        })
        .catch(error => console.error('Error en la solicitud:', error));
}

function fetchMachineryData() {
    // Hacemos la solicitud AJAX
    fetch('/capas.com/accions/getMachinery', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                let machinerySelect = document.getElementById('machinery-list');
                machinerySelect.innerHTML = ''; // Limpiar las opciones anteriores

                // Añadimos de nuevo la opción inicial
                let defaultOption = document.createElement('option');
                defaultOption.text = "Open this select menu";
                defaultOption.selected = true;
                machinerySelect.appendChild(defaultOption);

                // Llenar el select con los datos de maquinaria
                data.machinery.forEach(item => {
                    let option = document.createElement('option');
                    option.value = item.id_machinery;  // Usamos id_machinery como valor
                    option.textContent = item.machinery;  // Usamos machinery como el nombre a mostrar
                    machinerySelect.appendChild(option);
                });
            } else {
                console.error('Error al obtener datos de maquinaria');
            }
        })
        .catch(error => console.error('Error en la solicitud:', error));
}

function fetchUserData() {
    fetch('/capas.com/admin/getUsers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                let userSelect = document.getElementById('user-list');
                userSelect.innerHTML = ''; // Limpiar las opciones anteriores

                // Añadir de nuevo la opción inicial
                let defaultOption = document.createElement('option');
                defaultOption.text = "Open this select menu";
                defaultOption.selected = true;
                userSelect.appendChild(defaultOption);

                // Llenar el select con los datos de los usuarios
                data.user.forEach(item => {  // Aquí cambiamos `machinery` por `users`
                    let option = document.createElement('option');
                    option.value = item.id_user;  // Usamos id_user como valor
                    option.textContent = item.email;  // Usamos email como el nombre a mostrar
                    userSelect.appendChild(option);
                });
            } else {
                console.error('Error al obtener datos de los usuarios');
            }
        })
        .catch(error => console.error('Error en la solicitud:', error));
}
// Función para obtener los datos de fuentes (sources) y llenar el select
function fetchSourceData(sourceSelect) {
    // Hacemos la solicitud AJAX
    fetch('/capas.com/accions/getSource', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            // Verificamos si la respuesta tiene la propiedad "fountain" y es un array
            if (data.status === 'success' && Array.isArray(data.fountain)) {
                // Limpiar opciones previas
                sourceSelect.innerHTML = '';

                // Añadir opción predeterminada
                let defaultOption = document.createElement('option');
                defaultOption.text = "Selecciona una fuente";
                defaultOption.selected = true;
                sourceSelect.appendChild(defaultOption);

                // Llenar el select con las fuentes
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

let categories = []; // Variable global para almacenar las categorías
// Función para obtener las categorías
function fetchCategoryData() {
    return fetch('/capas.com/accions/getCategory', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                let categorySelect = document.getElementById('category-list');
                categorySelect.innerHTML = '';

                let defaultOption = document.createElement('option');
                defaultOption.text = "Open this select menu";
                defaultOption.selected = true;
                categorySelect.appendChild(defaultOption);

                data.category.forEach(item => {
                    let option = document.createElement('option');
                    option.value = item.id_category;
                    option.textContent = item.category;
                    categorySelect.appendChild(option);
                });

                // Almacena las categorías globalmente
                categories = data.category;
            } else {
                console.error('Error al obtener las categorias');
            }
        });
}

// Manejar el cambio de categoría
let questionsData = []; // Arreglo global para almacenar las preguntas

document.getElementById('category-list').addEventListener('change', function () {
    categoryId = this.value; // Asignar el valor seleccionado a categoryId
    const questionContainer = document.getElementById('dynamic-questions');
    const inputWrapper = document.getElementById('new-question-wrapper');

    if (inputWrapper) {
        questionContainer.removeChild(inputWrapper);
    }

    if (categoryId) {
        const newInputWrapper = document.createElement('div');
        newInputWrapper.className = 'question-wrapper w3-padding w3-margin-top';
        newInputWrapper.id = 'new-question-wrapper';

        const questionInput = document.createElement('input');
        questionInput.className = 'w3-input w3-border w3-margin-bottom';
        questionInput.type = 'text';
        questionInput.placeholder = 'Ingresa la pregunta';
        questionInput.required = true;

        const sourceSelect = document.createElement('select');
        sourceSelect.className = 'w3-select w3-border w3-margin-bottom';
        sourceSelect.id = 'source-list-' + categoryId; // Cambia el ID para evitar duplicados

        fetchSourceData(sourceSelect); // Llenar el select con fuentes

        const addButton = document.createElement('button');
        addButton.className = 'w3-button w3-green w3-block';
        addButton.type = 'button';
        addButton.textContent = 'Agregar Pregunta';

        addButton.onclick = function () {
            const questionText = questionInput.value.trim();
            const sourceId = sourceSelect.value;

            if (questionText && categoryId) {
                questionsData.push({
                    id_category: categoryId,
                    question: questionText,
                    source: sourceId
                });
                console.log('ID de la fuente:', sourceId);
                console.log('Preguntas a enviar:', questionsData);
                renderQuestions(); // Actualizar la visualización de preguntas
                questionInput.value = ''; // Limpiar el campo
            } else {
                alert('Por favor, ingrese una pregunta válida y seleccione una categoría.');
            }
        };

        newInputWrapper.appendChild(questionInput);
        newInputWrapper.appendChild(sourceSelect);
        newInputWrapper.appendChild(addButton);
        questionContainer.appendChild(newInputWrapper);
    }
});

function renderQuestions() {
    const questionContainer = document.getElementById('dynamic-questions');
    questionContainer.querySelectorAll('.question-row').forEach(row => {
        questionContainer.removeChild(row);
    });

    questionsData.forEach(q => {
        const tableRow = document.createElement('tr');
        tableRow.className = 'question-row';

        const categoryName = categories.find(cat => String(cat.id_category) === String(q.id_category))?.category || 'Categoría no encontrada';
        const categoryCell = document.createElement('td');
        categoryCell.textContent = categoryName;

        const questionCell = document.createElement('td');
        questionCell.textContent = q.question;

        const sourceCell = document.createElement('td');
        sourceCell.textContent = q.source;

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.className = 'w3-button w3-red';
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = function () {
            questionsData = questionsData.filter(existingQuestion => existingQuestion !== q);
            renderQuestions(); // Actualiza la visualización
        };

        deleteCell.appendChild(deleteButton);
        tableRow.appendChild(categoryCell);
        tableRow.appendChild(questionCell);
        tableRow.appendChild(sourceCell);
        tableRow.appendChild(deleteCell);
        questionContainer.appendChild(tableRow);
    });
}

// Envío del formulario
$(document).on('click', '#createAudit .btnAudit', function (e) {
    e.preventDefault();

    const formData = $('#auditForm').serializeArray().filter(item => item.value.trim() !== ""); // Filtrar valores vacíos

    // Validaciones para maquinaria y correo electrónico
    const machinery = formData.find(item => item.name === 'machinery');
    const email = formData.find(item => item.name === 'email');

    if (!machinery || machinery.value === 'undefined') {
        alert('Por favor, selecciona una maquinaria válida.');
        return;
    }

    if (!email || email.value === 'undefined') {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    // Asegúrate de que questionsData no esté vacío antes de enviarlo
    console.log('Preguntas antes de enviar:', questionsData); // Para depuración
    if (questionsData.length === 0) {
        alert('No se han ingresado preguntas.');
        return;
    }

    // Agrega preguntas a formData
    formData.push({ name: 'questions', value: JSON.stringify(questionsData) });

    $.ajax({
        url: '../accions/insertAudit',
        type: 'POST',
        data: $.param(formData),
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                Swal.fire('Éxito!', '¡Auditoría Creada con éxito!', 'success').then(() => {
                    window.location.href = '../accions/showaudit';
                });
            } else {
                Swal.fire('Error!', 'Error al crear la auditoría: ' + response.message, 'error');
            }
        },
        error: function () {
            Swal.fire('Error!', 'Ocurrió un error al intentar crear la auditoría.', 'error');
        }
    });
});



function fetchAreaData() {
    fetch('/capas.com/accions/getArea', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                let areaSelect = document.getElementById('area-list');
                areaSelect.innerHTML = ''; // Limpiar las opciones anteriores

                // Añadimos la opción inicial
                let defaultOption = document.createElement('option');
                defaultOption.text = "Open this select menu";
                defaultOption.selected = true;
                areaSelect.appendChild(defaultOption);

                // Llenar el select con los datos de áreas
                data.areas.forEach(item => {
                    let option = document.createElement('option');
                    option.value = item.id_area;  // Usamos id_area como valor
                    option.textContent = item.area;  // Usamos area como el nombre a mostrar
                    areaSelect.appendChild(option);
                });
            } else {
                console.error('Error al obtener las áreas');
            }
        })
        .catch(error => console.error('Error en la solicitud:', error));
}
document.getElementById('area-list').addEventListener('change', function () {
    let areaId = this.value;  // Obtener el ID del área seleccionada

    if (areaId) {
        fetch(`/capas.com/accions/getDepartamentById/${areaId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    let departmentSelect = document.getElementById('department-list');
                    departmentSelect.innerHTML = ''; // Limpiar las opciones anteriores

                    // Añadimos la opción inicial
                    let defaultOption = document.createElement('option');
                    defaultOption.text = "Seleccione un departamento";
                    defaultOption.selected = true;
                    departmentSelect.appendChild(defaultOption);

                    // Llenar el select con los datos de departamentos
                    data.departments.forEach(item => {
                        let option = document.createElement('option');
                        option.value = item.id_department;  // Usamos id_department como valor
                        option.textContent = item.department;  // Usamos department como el nombre a mostrar
                        departmentSelect.appendChild(option);
                    });
                } else {
                    console.error('Error al obtener los departamentos');
                }
            })
            .catch(error => console.error('Error en la solicitud:', error));
    }
});


// Fetch initial data on page load
window.onload = function () {
    fetchShiftData();
    fetchAreaData();
    fetchMachineryData();
    fetchCategoryData();
    fetchUserData();

    // Selecciona el elemento select que quieres llenar con las fuentes
    const sourceSelect = document.getElementById('source-list');
    if (sourceSelect) {
        fetchSourceData(sourceSelect); // Pasa el select a la función
    }

    const dateField = document.getElementById('date-field');
    dateField.value = new Date().toISOString().split('T')[0];
};
