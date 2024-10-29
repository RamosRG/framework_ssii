$(document).ready(function() {
    cargarDashboard();
});

function cargarDashboard() {
    $.ajax({
        url: 'http://localhost/capas.com/accions/getDashboardData',  // Asegúrate de que esta URL sea correcta
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            console.log(response); // Para depuración
            if (response.status === 'success') {
                const auditoriasData = response.data.auditoriasData; // Asegúrate de que esto esté correcto

                // Actualiza los conteos del dashboard
                document.getElementById('total-auditorias').innerText = `Total Auditorías: ${auditoriasData.total}`;
                document.getElementById('auditorias-pendientes').innerText = `Pendientes: ${auditoriasData.pendientes}`;
                document.getElementById('auditorias-en-progreso').innerText = `En Progreso: ${auditoriasData.enProgreso}`;

                // Mostrar historial de auditorías
                const historial = document.getElementById('historial-auditorias');
                historial.innerHTML = '';  // Limpiar elementos existentes, si hay
                auditoriasData.historial.forEach(auditoria => {
                    const item = document.createElement('li');
                    item.innerText = `${auditoria.date} - ${auditoria.audit_title} - Status: ${auditoria.status}`;
                    historial.appendChild(item);
                });

                // Mostrar gráficas
                mostrarGraficas(response.data); // Llamar a la función para crear gráficas

            } else {
                console.error('Failed to load dashboard data');
            }
        },
        error: function(xhr, status, error) {
            console.error('AJAX request failed:', error);
        }
    });
}

function mostrarGraficas(data) {
    // Gráfica por Departamento
    const auditsByDepartment = data.auditsByDepartment.map(audit => audit.audit_count);
    const departments = data.auditsByDepartment.map(audit => audit.department);

    const ctxDepartment = document.getElementById('auditByDepartmentChart').getContext('2d');
    new Chart(ctxDepartment, {
        type: 'bar',
        data: {
            labels: departments,
            datasets: [{
                label: 'Auditorías por Departamento',
                data: auditsByDepartment,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Gráfica por Estado
    const auditsByStatus = data.auditsByStatus.map(audit => audit.audit_count);
    const statuses = data.auditsByStatus.map(audit => audit.status);

    const ctxStatus = document.getElementById('auditByStatusChart').getContext('2d');
    new Chart(ctxStatus, {
        type: 'pie',
        data: {
            labels: statuses,
            datasets: [{
                label: 'Auditorías por Estado',
                data: auditsByStatus,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
        }
    });

    // Gráfica por Turno
    const auditsByShift = data.auditsByShift.map(audit => audit.audit_count);
    const shifts = data.auditsByShift.map(audit => audit.shift);

    const ctxShift = document.getElementById('auditByShiftChart').getContext('2d');
    new Chart(ctxShift, {
        type: 'line',
        data: {
            labels: shifts,
            datasets: [{
                label: 'Auditorías por Turno',
                data: auditsByShift,
                fill: false,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
