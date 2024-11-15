<div class="w3-main">
    <header class="w3-container w3-top w3-hide-large w3-indigo w3-xlarge w3-padding">
        <a href="javascript:void(0)" class="w3-button w3-indigo w3-margin-right" onclick="w3_open()">☰</a>
        <span>Auditoria Por Capas</span>
    </header>

    <div class="w3-container" id="contact" style="margin-top: 75px">
    <h2 class="w3-border-bottom w3-border-light-grey w3-padding-16" id="audit_title"></h2>


        <!-- Formulario para agregar preguntas -->
        <div class="w3-container w3-card w3-white w3-margin-bottom w3-padding">
            <h3 class="w3-text-indigo"><b>Agregar Pregunta</b></h3>
            <div class="w3-row-padding">
                <!-- Categoría -->
                <div class="w3-third w3-margin-top">
                    <label for="category-list"><b>Categoría</b></label>
                    <select id="category-list" class="w3-input w3-border w3-round">
                        <!-- Opciones cargadas dinámicamente -->
                    </select>
                </div>
                <!-- Pregunta -->
                <div class="w3-third w3-margin-top">
                    <label for="questionInput"><b>Pregunta</b></label>
                    <input id="questionInput" class="w3-input w3-border w3-round" type="text" placeholder="Ingrese la pregunta">
                </div>
                <!-- Fuente -->
                <div class="w3-third w3-margin-top">
                    <label for="source-list"><b>Fuente</b></label>
                    <select id="source-list" class="w3-input w3-border w3-round">
                        <!-- Opciones cargadas dinámicamente -->
                    </select>
                </div>
            </div>
            <div class="w3-row-padding w3-margin-top">
                <div class="w3-col w3-right-align">
                <button id="addQuestionBtn" class="w3-button w3-green w3-round w3-margin-top">Añadir Pregunta</button>


                </div>
            </div>
        </div>

        <!-- Tabla de preguntas -->
        <div class="w3-container w3-card w3-white w3-margin-bottom">
            <h3 class="w3-text-indigo">Preguntas de la Auditoría</h3>
            <div class="responsive-table">
                <table class="w3-table-all w3-hoverable">
                    <thead>
                        <tr>
                            <th>Categoría</th>
                            <th>Pregunta</th>
                            <th>Fecha</th>
                            <th>Fuente</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="audit-questions-list">
                        <!-- Preguntas dinámicas aquí -->
                    </tbody>
                </table>
                <br>
                <!-- Botón para crear la nueva auditoría -->
                <button  id="editAuditBtn" class="w3-btn w3-grey w3-block w3-round">Editar Auditoría</button>
                <br>

            </div>
        </div>
    </div>
</div>