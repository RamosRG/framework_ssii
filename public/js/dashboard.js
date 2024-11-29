fetch('../accions/getDashboardData')
.then(response => response.json())
.then(data => {
    if (data.status === 'success') {
        const { auditsByDepartment, auditsByStatus, auditsByShift, auditoriasData } = data.data;

        // Configuración de las gráficas
        renderChart('auditByDepartmentChart', 'Auditorías por Departamento', auditsByDepartment);
        renderChart('auditByStatusChart', 'Auditorías por Estado', auditsByStatus);
        renderChart('auditByShiftChart', 'Auditorías por Turno', auditsByShift);
        renderChart('additionalChart', 'Datos Adicionales', { /* datos adicionales */ });

        // Resumen del dashboard
        document.getElementById('total').textContent = auditoriasData.total;
        document.getElementById('pendientes').textContent = auditoriasData.pendientes;
        document.getElementById('enProgreso').textContent = auditoriasData.enProgreso;

        // Historial
        const historialList = document.getElementById('historial-auditorias');
        auditoriasData.historial.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.fecha}: ${item.descripcion}`;
            historialList.appendChild(li);
        });

        // Tabla de detalles
        const tableBody = document.getElementById('tabla-auditorias-capas').querySelector('tbody');
        auditsByDepartment.forEach((audit, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${audit.departamento}</td>
                <td>${audit.estado}</td>
                <td>${audit.turno}</td>
                <td>${audit.fecha}</td>
            `;
            tableBody.appendChild(row);
        });
    }
})
.catch(error => console.error('Error al cargar los datos del dashboard:', error));

function renderChart(id, label, data) {
const ctx = document.getElementById(id).getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: Object.keys(data),
        datasets: [{
            label,
            data: Object.values(data),
            backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#FF5722'],
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});
}