$(document).on('click', '#createAudit .btnAudit', function (e) {
    e.preventDefault();
    const formData = $('#auditForm').serializeArray().filter(item => item.value.trim() !== ""); // Filter out empty values

    // Validar que los campos obligatorios tengan valores
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

function fetchData(url, selectId, placeholder, valueField, textField) {
    fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
        .then(response => response.json())
        .then(data => {
            console.log(data);
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
let categories = [];

function fetchCategoryData() {
    // Petición fetch para obtener las categorías
    fetch('/capas.com/accions/getCategory')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la red');
            }
            return response.json(); // Convertimos la respuesta a JSON
        })
        .then(data => {
            // Guardamos las categorías en la variable global
            categories = data.category;

            // Accedemos al select donde queremos cargar las categorías
            const select = document.getElementById('category-list');
            // Limpiamos las opciones previas
            select.innerHTML = '';

            // Creamos una opción por defecto
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Selecciona una categoría';
            select.appendChild(defaultOption);

            // Iteramos sobre los datos de categorías y creamos opciones
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id_category; // ID de la categoría
                option.textContent = category.category; // Nombre de la categoría
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Hubo un problema con la operación fetch:', error);
        });
}

function fetchShiftData() { fetchData('/capas.com/accions/getShift', 'shift-list', 'Selecciona un turno', 'shift', 'shift'); }
function fetchMachineryData() { fetchData('/capas.com/accions/getMachinery', 'machinery-list', 'Selecciona una maquinaria', 'machinery', 'machinery'); }
function fetchUserData() { fetchData('/capas.com/admin/getUsers', 'user-list', 'Selecciona un usuario', 'user', 'email'); }
function fetchSourceData() { fetchData('/capas.com/accions/getFountain', 'source-list', 'Selecciona una fuente', 'fountain', 'source'); }
// Fetch departments based on selected area
//Funcion para mandar a llamar los departamentos que se utilizan en la auditoria
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

const questionsData = []; // Array para almacenar las preguntas con sus categorías y fuentes

document.getElementById('category-list').addEventListener('change', function () {
    const categoryId = this.value;
    const questionContainer = document.getElementById('dynamic-questions');
    
    // Limpiar solo el contenedor de las nuevas preguntas
    questionContainer.innerHTML = '';

    if (categoryId) {
        // Encontrar el nombre de la categoría correspondiente al categoryId seleccionado
        const selectedCategory = categories.find(cat => cat.id_category === categoryId)?.category;

        // Crear un contenedor para la nueva pregunta y el select
        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'question-wrapper w3-padding w3-margin-top';

        // Estilo del input para la pregunta
        const questionInput = document.createElement('input');
        questionInput.className = 'w3-input w3-border w3-margin-bottom';
        questionInput.type = 'text';
        questionInput.placeholder = 'Ingresa la pregunta';
        questionInput.required = true;
        questionInput.id = 'new-question-input';

        // Estilo del select para la fuente
        const sourceSelect = document.createElement('select');
        sourceSelect.className = 'w3-select w3-border w3-margin-bottom';
        sourceSelect.id = 'source-list'; // ID para el select de la fuente
        fetchSourceData(); // Llamar a la función para cargar las fuentes

        // Botón para agregar la pregunta
        const addButton = document.createElement('button');
        addButton.className = 'w3-button w3-green w3-block';
        addButton.textContent = 'Agregar Pregunta';

        // Función del botón para agregar la pregunta a la tabla
        addButton.onclick = function () {
            const questionText = questionInput.value.trim();
            const sourceText = sourceSelect.options[sourceSelect.selectedIndex].text; // Texto de la fuente seleccionada
            
            if (questionText) {
                // Almacenar la pregunta, categoría y fuente
                questionsData.push({
                    category: selectedCategory,
                    question: questionText,
                    source: sourceText
                });

                // Crear una fila para la tabla
                const tableRow = document.createElement('tr');

                // Crear las celdas de la tabla para la categoría, pregunta y fuente
                const categoryCell = document.createElement('td');
                categoryCell.textContent = selectedCategory;

                const questionCell = document.createElement('td');
                questionCell.textContent = questionText;

                const sourceCell = document.createElement('td');
                sourceCell.textContent = sourceText;

                // Crear el botón de eliminar
                const deleteCell = document.createElement('td');
                const deleteButton = document.createElement('button');
                deleteButton.className = 'w3-button w3-red';
                deleteButton.textContent = 'Eliminar';
                deleteButton.onclick = function () {
                    questionContainer.removeChild(tableRow);
                    // También podemos eliminar la pregunta del array
                    const index = questionsData.findIndex(q => q.question === questionText && q.source === sourceText);
                    if (index > -1) {
                        questionsData.splice(index, 1);
                    }
                };

                deleteCell.appendChild(deleteButton);

                // Añadir las celdas a la fila
                tableRow.appendChild(categoryCell);
                tableRow.appendChild(questionCell);
                tableRow.appendChild(sourceCell);
                tableRow.appendChild(deleteCell);

                // Añadir la fila a la tabla
                questionContainer.appendChild(tableRow);

                // Limpiar el input y el select
                questionInput.value = '';
                sourceSelect.selectedIndex = 0;
            } else {
                alert('Por favor, ingrese una pregunta válida.');
            }
        };

        // Añadir los elementos al contenedor del formulario
        inputWrapper.appendChild(questionInput);
        inputWrapper.appendChild(sourceSelect);
        inputWrapper.appendChild(addButton);
        questionContainer.appendChild(inputWrapper);

        // Mostrar preguntas existentes de la categoría seleccionada
        questionsData.forEach(q => {
            if (q.category === selectedCategory) {
                const tableRow = document.createElement('tr');

                const categoryCell = document.createElement('td');
                categoryCell.textContent = q.category;

                const questionCell = document.createElement('td');
                questionCell.textContent = q.question;

                const sourceCell = document.createElement('td');
                sourceCell.textContent = q.source;

                const deleteCell = document.createElement('td');
                const deleteButton = document.createElement('button');
                deleteButton.className = 'w3-button w3-red';
                deleteButton.textContent = 'Eliminar';
                deleteButton.onclick = function () {
                    questionContainer.removeChild(tableRow);
                    // También eliminar de questionsData
                    const index = questionsData.findIndex(existingQuestion => existingQuestion.question === q.question && existingQuestion.source === q.source);
                    if (index > -1) {
                        questionsData.splice(index, 1);
                    }
                };

                deleteCell.appendChild(deleteButton);

                tableRow.appendChild(categoryCell);
                tableRow.appendChild(questionCell);
                tableRow.appendChild(sourceCell);
                tableRow.appendChild(deleteCell);
                questionContainer.appendChild(tableRow);
            }
        });
    }
});



// Fetch initial data on page load
window.onload = function () {
    fetchShiftData();
    fetchAreaData();
    fetchMachineryData();
    fetchCategoryData();
    fetchUserData();
    const dateField = document.getElementById('date-field');
    dateField.value = new Date().toISOString().split('T')[0];
};
