document.addEventListener('DOMContentLoaded', function () {
    fetch('../accions/getDashboardData')
        .then(response => response.json())
        .then(data => {
            renderCharts(data);
        })
        .catch(error => {
            console.error('Error al cargar los datos del dashboard:', error);
        });

    function renderCharts(data) {
        // Gráfico de estados
        if (data.statusCounts) {
            new Chart(document.getElementById('statusChart'), {
                type: 'bar',
                data: {
                    labels: data.statusCounts.map(item => item.status),
                    datasets: [{
                        label: 'Cantidad de Auditorías',
                        data: data.statusCounts.map(item => item.total),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                }
            });
        } else {
            console.warn('No se encontraron datos para los estados.');
        }

        // Gráfico de áreas
        if (data.areaCounts) {
            new Chart(document.getElementById('areaChart'), {
                type: 'pie',
                data: {
                    labels: data.areaCounts.map(item => item.area), // Cambiar a 'item.area'
                    datasets: [{
                        data: data.areaCounts.map(item => item.department_count), // Cambiar a 'item.department_count'
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
                    }]
                }
            });
        } else {
            console.warn('No se encontraron datos para las áreas.');
        }


        // Gráfico de turnos
        if (data.shiftCounts) {
            new Chart(document.getElementById('shiftChart'), {
                type: 'doughnut',
                data: {
                    labels: data.shiftCounts.map(item => item.shift),
                    datasets: [{
                        data: data.shiftCounts.map(item => item.total),
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                    }]
                }
            });
        } else {
            console.warn('No se encontraron datos para los turnos.');
        }

        // Gráfico de departamentos
        if (data.departmentCounts) {
            new Chart(document.getElementById('departmentChart'), {
                type: 'bar',
                data: {
                    labels: data.departmentCounts.map(item => item.department), // Cambiar 'machinery' por 'department'
                    datasets: [{
                        label: 'Cantidad de Auditorías',
                        data: data.departmentCounts.map(item => item.total),
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }]
                }
            });
        } else {
            console.warn('No se encontraron datos para los departamentos.');
        }


        // Gráfico de progreso de acciones
        if (data.actionProgress) {
            new Chart(document.getElementById('actionProgressChart'), {
                type: 'line',
                data: {
                    labels: data.actionProgress.map(item => `Mes ${item.month}`),
                    datasets: [{
                        label: 'Progreso de Acciones',
                        data: data.actionProgress.map(item => item.total),
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                        fill: true
                    }]
                }
            });
        } else {
            console.warn('No se encontraron datos para el progreso de acciones.');
        }

        // Gráfico de auditorías por auditor
        if (data.auditorCounts) {
            new Chart(document.getElementById('auditorChart'), {
                type: 'bar',
                data: {
                    labels: data.auditorCounts.map(item => item.auditor),
                    datasets: [{
                        label: 'Auditorías Realizadas',
                        data: data.auditorCounts.map(item => item.total),
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                }
            });
        } else {
            console.warn('No se encontraron datos para las auditorías por auditor.');
        }

        // Gráfico de auditorías revisadas por capas
        if (data.reviewedByCounts) {
            new Chart(document.getElementById('reviewedByChart'), {
                type: 'pie',
                data: {
                    // Concatenate the name and total for each label
                    labels: data.reviewedByCounts.map(item => `${item.name} (${item.total})`),
                    datasets: [{
                        data: data.reviewedByCounts.map(item => item.total),
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
                    }]
                }
            });
        } else {
            console.warn('No se encontraron datos para las auditorías revisadas por capas.');
        }
    }
});
