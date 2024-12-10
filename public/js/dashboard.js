document.addEventListener('DOMContentLoaded', function () {
    fetch('../accions/getDashboardData')
        .then(response => response.json())
        .then(data => {
            renderCharts(data);
        });

    function renderCharts(data) {
        // Gráfica de estados
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

        // Gráfica de áreas
        new Chart(document.getElementById('areaChart'), {
            type: 'pie',
            data: {
                labels: data.areaCounts.map(item => item.department),
                datasets: [{
                    data: data.areaCounts.map(item => item.total),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
                }]
            }
        });

        // Gráfica de turnos
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

        // Gráfica de departamentos
        new Chart(document.getElementById('departmentChart'), {
            type: 'bar',
            data: {
                labels: data.departmentCounts.map(item => item.machinery),
                datasets: [{
                    label: 'Cantidad de Auditorías',
                    data: data.departmentCounts.map(item => item.total),
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }]
            }
        });

        // Gráfica de progreso de acciones
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
    }
});
