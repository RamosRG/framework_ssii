
function fetchCategoryData() {
    fetch('/capas.com/user/getCategory', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            let categorySelect = document.getElementById('category-list');
            categorySelect.innerHTML = ''; // Clear previous options

            // Add default option
            let defaultOption = document.createElement('option');
            defaultOption.text = "Seleccione una categoría"; // Spanish default text
            defaultOption.value = ""; // Ensure value is empty
            categorySelect.appendChild(defaultOption);

            // Populate select with category data
            data.category.forEach(item => {
                let option = document.createElement('option');
                option.value = item.id_category;  // Use id_category as value
                option.textContent = item.category;  // Use category as display name
                categorySelect.appendChild(option);
            });
        } else {
            console.error('Error al recuperar las categorías');
        }
    })
    .catch(error => {
        console.error('Error al obtener las categorías:', error);
    });
}

function fetchFountainData() {
    fetch('/capas.com/user/getFountain', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            let sourceSelect = document.getElementById('fountain-list');
            sourceSelect.innerHTML = ''; // Clear previous options

            // Add default option
            let defaultOption = document.createElement('option');
            defaultOption.text = "Seleccione una fuente"; // Spanish default text
            defaultOption.value = ""; // Ensure value is empty
            sourceSelect.appendChild(defaultOption);

            // Populate select with fountain data
            data.fountain.forEach(item => {
                let option = document.createElement('option');
                option.value = item.id_source;  // Use id_source as value
                option.textContent = item.source;  // Use source as display name
                sourceSelect.appendChild(option);
            });
        } else {
            console.error('Error al recuperar las fuentes');
        }
    })
    .catch(error => {
        console.error('Error al obtener las fuentes:', error);
    });
}

window.onload = function () {
    fetchCategoryData();
    fetchFountainData();
};

