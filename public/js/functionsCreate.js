//funcion para crear una nueva auditoria
$(document).on('click', '#createAudit .btnAudit', function (e) {
    e.preventDefault(); // Evita el comportamiento predeterminado del botón

    var form = $('#auditForm'); // Encuentra el formulario
    var formData = form.serialize(); // Serializa los datos del formulario
    console.log(formData);
    $.ajax({
        url: '../accions/insertAudit', // URL de tu controlador que inserta los datos
        type: 'POST',
        data: formData, // Envía los datos serializados del formulario
        dataType: 'json',
        success: function (response) {
            console.log(response);
            if (response.status === 'success') {
                Swal.fire({
                    title: 'Éxito!',
                    text: '¡Auditoria Creada con exito!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(function () {
                    // Redirige a otra página después de que el usuario cierre el mensaje de éxito
                    window.location.href = '../accions/showAudit'; // Cambia esta URL a la página deseada
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Error al crear el Crear la auditoria: ' + response.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        },
        error: function () {
            Swal.fire({
                title: 'Error!',
                text: 'Ocurrió un error al intentar crear la auditoria.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    });
});

//funcion para crear un usuario
$(document).on('click', '#createUser .btnCreate', function (e) {
    e.preventDefault(); // Evita el comportamiento predeterminado del botón

    var form = $('#userForm'); // Encuentra el formulario
    var formData = form.serialize(); // Serializa los datos del formulario

    $.ajax({
        url: '../admin/insertData', // URL de tu controlador que inserta los datos
        type: 'POST',
        data: formData, // Envía los datos serializados del formulario
        dataType: 'json',
        success: function (response) {
            if (response.status === 'success') {
                Swal.fire({
                    title: 'Éxito!',
                    text: '¡Usuario creado con éxito!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(function () {
                    // Redirige a otra página después de que el usuario cierre el mensaje de éxito
                    window.location.href = '../admin/home'; // Cambia esta URL a la página deseada
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Error al crear el usuario: ' + response.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        },
        error: function () {
            Swal.fire({
                title: 'Error!',
                text: 'Ocurrió un error al intentar crear el usuario.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    });
    
});

$('#loginForm').on('submit', function (e) {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario
    console.log('Formulario de login enviado');

    var formData = $(this).serialize(); // Serializa los datos del formulario

    $.ajax({
        url: '/framework_ssii/auth/login',
        type: 'POST',
        data: formData,
        dataType: 'json',
        success: function (response) {
           // Muestra la respuesta en la consola
            if (response.status === 'success') {
                    window.location.href = './admin/home'; // Cambia la URL a la página de destino
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Seguro que eres tu? ' + response.message,
                    icon: 'question',
                    confirmButtonText: 'Ok'
                });
            }
        },
        error: function () {
            Swal.fire({
                title: 'Error!',
                text: 'Ocurrió un error al intentar iniciar sesión.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    });
});

window.onload = function() {
    fetchMachineryData();
    fetchShiftData();
    fetchDepartamentData();
};

//Funcion para mandar a llamar la maquinaria que se utilizara
function fetchMachineryData() {
    // Hacemos la solicitud AJAX
    fetch('/framework_ssii/accions/getMachinery', {
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


//Funcion para mandar a llamar los roles que se utilizan en la auditoria
function fetchShiftData() {
    // Hacemos la solicitud AJAX
    fetch('/framework_ssii/accions/getShift', {
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


function fetchDepartamentData() {
    // Hacemos la solicitud AJAX
    fetch('/framework_ssii/accions/getDepartament', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            let departamentSelect = document.getElementById('departament-list');
            departamentSelect.innerHTML = ''; // Limpiar las opciones anteriores
            
            // Añadimos de nuevo la opción inicial
            let defaultOption = document.createElement('option');
            defaultOption.text = "Open this select menu";
            defaultOption.selected = true;
            departamentSelect.appendChild(defaultOption);

            // Llenar el select con los datos de maquinaria
            data.departament.forEach(item => {
                let option = document.createElement('option');
                option.value = item.id_departament;  // Usamos id_departament como valor
                option.textContent = item.departament;  // Usamos departament como el nombre a mostrar
                departamentSelect.appendChild(option);
            });
        } else {
            console.error('Error al obtener los departamentos');
        }
    })
    .catch(error => console.error('Error en la solicitud:', error));
}

