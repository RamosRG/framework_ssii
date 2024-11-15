<div class="w3-main">
    <header class="w3-container w3-top w3-hide-large w3-indigo w3-xlarge w3-padding">
        <a href="javascript:void(0)" class="w3-button w3-indigo w3-margin-right" onclick="w3_open()">☰</a>
        <span>Auditoria Por Capas</span>
    </header>

    <div class="w3-container" id="contact" style="margin-top: 75px">
        <h2 class="w3-border-bottom w3-border-light-grey w3-padding-16" id="audit_title"></h2>

    <h1></h1>
       
            <!-- Preguntas de la Auditoría -->
          <!-- Select para Categoría y campo de texto para ingresar pregunta -->
<div class="w3-container w3-card w3-white w3-margin-bottom">
    <h3 class="w3-text-indigo">Agregar Pregunta</h3>
    <div class="w3-row-padding">
        <div class="w3-third form-group">
            <label for="category-list"><b>Categoría</b></label>
            <select id="category-list" class="w3-input w3-border w3-round">

            </select>
        </div>
        <div class="w3-third form-group">
            <label for="questionInput"><b>Pregunta</b></label>
            <input id="questionInput" class="w3-input w3-border w3-round" type="text" placeholder="Ingrese la pregunta">
        </div>
        <div class="w3-third form-group">
            <button id="addQuestionBtn" class="w3-button w3-indigo w3-round" onclick="addQuestion()">Añadir Pregunta</button>
        </div>
    </div>
</div>

<!-- Tabla de Preguntas con Botón de Eliminar -->
<div class="w3-container w3-card w3-white w3-margin-bottom">
    <h3 class="w3-text-indigo">Preguntas de la Auditoría</h3>
    <div class="responsive-table">
        <table>
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
                <!-- Las preguntas se insertarán dinámicamente aquí -->
            </tbody>
        </table>
    </div>
</div>
          
    </div>
</div>