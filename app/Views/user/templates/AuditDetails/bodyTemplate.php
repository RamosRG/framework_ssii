<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalles de la Auditoría</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        #auditDetailsContainer {
            padding: 16px;
            border: 1px solid #ccc;
            border-radius: 8px;
            margin: 10px;
        }
    </style>
</head>
<body>
    <div id="auditDetailsContainer"></div>

    <script>
        window.onload = function() {
            const params = new URLSearchParams(window.location.search);
            const id_audit = params.get('id_audit');

            // Aquí puedes hacer una solicitud AJAX o una llamada a tu base de datos para obtener los detalles de la auditoría con id_audit
            // Por ejemplo:
            fetch('../user/getAuditDetails?id_audit=' + id_audit)
                .then(response => response.json())
                .then(data => {
                    // Mostrar los detalles de la auditoría en la página
                    document.getElementById('auditDetailsContainer').innerHTML = `
                        <h2>Detalles de la Auditoría</h2>
                        <p><strong>Auditor:</strong> ${data.auditor}</p>
                        <p><strong>Título de Auditoría:</strong> ${data.audit_tittle}</p>
                        <p><strong>Fecha:</strong> ${data.create_at}</p>
                        <p><strong>Shift:</strong> ${data.shift}</p>
                        <p><strong>Maquinaria:</strong> ${data.machinery}</p>
                        <p><strong>Departamento:</strong> ${data.departament}</p>
                        <p><strong>Categoría:</strong> ${data.category}</p>
                        <p><strong>Preguntas:</strong></p>
                        <ul>
                            ${data.questions.map(question => `<li>${question}</li>`).join('')}
                        </ul>
                    `;
                })
                .catch(error => {
                    console.error('Error al obtener los detalles de la auditoría:', error);
                });
        };
    </script>
</body>
</html>
