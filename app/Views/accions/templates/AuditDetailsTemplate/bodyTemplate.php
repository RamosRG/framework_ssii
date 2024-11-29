<div class="w3-main">
    <header class="w3-container w3-top w3-hide-large w3-indigo w3-xlarge w3-padding">
        <a href="javascript:void(0)" class="w3-button w3-indigo w3-margin-right" onclick="w3_open()">☰</a>
        <span>Auditoria Por Capas</span>
    </header>

    <div class="w3-container" id="contact" style="margin-top: 75px">
        <h2 class="w3-border-bottom w3-border-light-grey w3-padding-16" id="audit_title"></h2>

        <!-- Datos Generales de la Auditoría -->
        <div class="w3-row-padding">
            <div class="w3-third form-group">
                <label for="no_audit"><b>Audit Number</b></label>
                <input id="no_audit" class="w3-input w3-border w3-round" type="text" name="no_audit" required>
            </div>
            <div class="w3-third form-group">
                <label for="date"><b>Date</b></label>
                <input id="date" class="w3-input w3-border w3-round" type="date" name="date" required>
            </div>
            <div class="w3-third form-group">
                <label for="auditor"><b>Auditor</b></label>
                <input id="auditor" class="w3-input w3-border w3-round" type="text" name="auditor" required>
            </div>
        </div>

        <div class="w3-row-padding">
            <div class="w3-third form-group">
                <label for="departament"><b>Department</b></label>
                <input id="departament" class="w3-input w3-border w3-round" type="text" name="departament" required>
            </div>
            <div class="w3-third form-group">
                <label for="machinery"><b>Machinery</b></label>
                <input id="machinery" class="w3-input w3-border w3-round" type="text" name="machinery" required>
            </div>
            <div class="w3-third form-group">
                <label for="shift"><b>Shift</b></label>
                <input id="shift" class="w3-input w3-border w3-round" type="text" name="shift" required>
            </div>
        </div>

        <!-- Preguntas de la Auditoría -->
        <div class="w3-container w3-card w3-white w3-margin-bottom">
            <h3 class="w3-text-indigo">Audit Questions</h3>
            <div class="responsive-table">
                <table>
                    <thead>
                        <tr>
                            <th>Área</th>
                            <th>Tema</th>
                            <th>Fecha</th>
                            <th>Fuente</th>
                            <th>Se cumplió?</th>
                            <th>Qué se encontró y recomendación</th>
                        </tr>
                    </thead>
                    <tbody id="audit-questions-list">
                        <!-- Aquí se inyectarán dinámicamente las filas de la tabla -->
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Acciones Tomadas -->
        <div class="accions w3-container w3-card w3-white w3-margin-bottom">
            <h3 class="w3-text-indigo">Acciones Tomadas</h3>
            <div class="responsive-table">
                <table>
                    <thead>
                        <tr>
                            <th>Categoria</th>
                            <th>Pregunta</th>
                            <th>¿Qué se encontró?</th>
                            <th>Evidencia Pregunta</th>
                            <th>Fecha Respuesta</th>
                            <th>Accion tomada</th>
                            <th>Responsable</th>
                            <th>Revisado</th>
                            <th>Evidencia Accion</th>
                            <th>Fecha respuesta Accion</th>
                        </tr>
                    </thead>
                    <tbody id="taken-actions-list">
                        <!-- Aquí se inyectarán dinámicamente las filas de la tabla -->
                    </tbody>
                </table>

            </div>
        </div>

        <!-- Verificación y Seguimiento -->
        <div class="verification w3-container w3-card w3-white">
            <h3 class="w3-text-indigo">Verificación y Seguimiento</h3>
            <div class="responsive-table">
                <table>
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Acciones</th>
                            <th>Imagen de la Descripcion</th>
                            <th>Comentario</th>
                            <th>Mejorado</th>
                        </tr>
                    </thead>
                    <tbody id="taken-followUp-list">


                        <!-- Aquí se insertarán las filas dinámicamente -->
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</div>