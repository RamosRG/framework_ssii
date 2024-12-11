$(document).ready(function () {
  $.ajax({
      url: "../getDashboardData",
      method: "GET",
      dataType: "json",
      success: function (data) {
          // Actualizar valores en las tarjetas
          $('#totalAudits').text(data.audits.length || 0);
          $('#answeredQuestions').text(data.answered || 0);
          $('#pendingActions').text(data.pendingActions || 0);
          $('#closedActions').text(data.closedActions || 0);

          // Calcular y actualizar porcentaje completado
          const totalQuestions = (data.answered || 0) + (data.notAnswered || 0);
          const completionPercentage = totalQuestions > 0 ? ((data.answered / totalQuestions) * 100).toFixed(2) : 0;
          $('#completionPercentage').text(`${completionPercentage}%`);

          // Actualizar tiempo promedio de respuesta
          $('#averageResponseTime').text(data.averageResponseTime || "0 hrs");

          // Configuración del gráfico de auditorías
          const ctx = document.getElementById('auditChart').getContext('2d');
          new Chart(ctx, {
              type: 'doughnut',
              data: {
                  labels: ['Respondidas', 'No Respondidas', 'Acciones Pendientes'],
                  datasets: [{
                      label: 'Resumen',
                      data: [data.answered || 0, data.notAnswered || 0, data.pendingActions || 0],
                      backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
                  }]
              },
          });

          // Configuración del gráfico de completitud
          const ctx2 = document.getElementById('completionChart').getContext('2d');
          new Chart(ctx2, {
              type: 'bar',
              data: {
                  labels: ['Completadas', 'Pendientes'],
                  datasets: [{
                      label: 'Completitud',
                      data: [completionPercentage, 100 - completionPercentage],
                      backgroundColor: ['#007bff', '#6c757d'],
                  }]
              },
              options: {
                  plugins: {
                      legend: {
                          display: false
                      }
                  },
                  scales: {
                      y: {
                          beginAtZero: true,
                          max: 100
                      }
                  }
              }
          });
      },
      error: function (err) {
          Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'No se pudieron cargar los datos del dashboard.',
              confirmButtonText: 'OK'
          });
          console.error("Error al obtener los datos:", err);
      }
  });
});