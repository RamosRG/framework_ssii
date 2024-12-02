<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte de Auditoría</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
        }
        .header, .section {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .header td {
            padding: 5px;
        }
        .section th, .section td {
            border: 1px solid black;
            padding: 5px;
            text-align: left;
        }
        .section th {
            background-color: #f2f2f2;
        }
        h4 {
            margin: 15px 0 5px 0;
        }
    </style>
</head>
<body>
    <table class="header">
        <tr>
            <td><b>Auditoría No:</b> <?= $auditData[0]['no_audit'] ?></td>
            <td><b>Auditor:</b> <?= $auditData[0]['auditor_name'] . ' ' . $auditData[0]['firstName'] ?></td>
        </tr>
        <tr>
            <td><b>Fecha Semana del:</b> <?= date('d/m/Y', strtotime($auditData[0]['date_start'])) ?></td>
            <td><b>Turno:</b> <?= $auditData[0]['shift'] ?></td>
        </tr>
        <tr>
            <td><b>Maquinaria:</b> <?= $auditData[0]['machinery'] ?></td>
            <td><b>Departamento:</b> <?= $auditData[0]['department'] ?></td>
        </tr>
    </table>

    <!-- Sección de preguntas -->
    <h4>Preguntas</h4>
    <table class="section">
        <thead>
            <tr>
                <th>Tema</th>
                <th>Fecha</th>
                <th>Fuente</th>
                <th>¿Se cumple?</th>
                <th>Evidencia</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($auditData as $item): ?>
            <tr>
                <td><?= $item['question'] ?></td>
                <td><?= date('d/m/Y', strtotime($item['created_at'])) ?></td>
                <td><?= $item['source'] ?></td>
                <td><?= $item['answer'] ?></td>
                <td><?= $item['evidence'] ?></td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>

    <!-- Sección de acciones -->
    <h4>Acciones Tomadas</h4>
    <table class="section">
        <thead>
            <tr>
                <th>Descripción</th>
                <th>Responsable</th>
                <th>Fecha</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($auditData as $item): ?>
            <?php if (!empty($item['action_description'])): ?>
            <tr>
                <td><?= $item['action_description'] ?></td>
                <td><?= $item['responsable'] ?></td>
                <td><?= !empty($item['date_response']) ? date('d/m/Y', strtotime($item['date_response'])) : '' ?></td>
            </tr>
            <?php endif; ?>
            <?php endforeach; ?>
        </tbody>
    </table>

    <!-- Sección de seguimiento -->
    <h4>Verificación y Seguimiento</h4>
    <table class="section">
        <thead>
            <tr>
                <th>Verificación</th>
                <th>Evidencia</th>
                <th>Implementado</th>
                <th>¿Mejoró?</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($auditData as $item): ?>
            <?php if (!empty($item['follow_up'])): ?>
            <tr>
                <td><?= $item['follow_up'] ?></td>
                <td><?= $item['evidence_accion'] ?></td>
                <td class="center"><?= $item['is_complete'] == '1' ? 'Sí' : 'No' ?></td>
                <td class="center"><?= $item['reviewed_by'] ?></td>
            </tr>
            <?php endif; ?>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>
</html>
