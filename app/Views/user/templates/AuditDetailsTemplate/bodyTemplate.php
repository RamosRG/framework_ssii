<div class="w3-main">
    <div class="w3-container" id="contact" style="margin-top: 75px">
        <h1 class="w3-border-bottom w3-border-light-grey w3-padding-16 tittle" id="tittle">Audit Details</h1>

        <!-- Audit Information -->
        <div class="w3-row-padding">
            <div class="w3-third form-group">
                <label for="no_audit"><b>Audit Number</b></label>
                <input id="no_audit" class="w3-input w3-border w3-round" type="text" name="no_audit">
            </div>
            <div class="w3-third form-group">
                <label for="date_start"><b>Date Start</b></label>
                <input id="date_start" class="w3-input w3-border w3-round" type="text" name="date_start">
            </div>
            <div class="w3-third form-group">
                <label for="date_end"><b>Date Finish</b></label>
                <input id="date_end" class="w3-input w3-border w3-round" type="text" name="date_end">
            </div>
        </div>
        <div class="w3-row-padding">
            <div class="form-group">
                <label for="auditor"><b>Auditor</b></label>
                <input id="auditor" class="w3-input w3-border w3-round" type="text" name="auditor">
            </div>

        </div>
        <!-- Additional Information -->
        <div class="w3-row-padding">
            <div class="w3-third form-group">
                <label for="departament"><b>Department</b></label>
                <input id="departament" class="w3-input w3-border w3-round" type="text" name="departament">
            </div>
            <div class="w3-third form-group">
                <label for="machinery"><b>Machinery</b></label>
                <select id="machinery-list" name="machinery" class="w3-input w3-border w3-round" data-live-search="true">
                    <option selected>Open this select menu</option>
                </select>
            </div>
            <div class="w3-third form-group">
                <label for="shift"><b>Shift</b></label>
                <input id="shift" class="w3-input w3-border w3-round" type="text" name="shift">
            </div>
        </div>

        <!-- Audit Questions Table -->
        <div class="w3-container w3-card w3-white w3-margin-bottom">
            <h3 class="w3-text-black">PREGUNTAS DE LA AUDITORIA</h3>
            <div class="responsive-table">
                <table>
                    <thead>
                        <tr>
                            <th>Área</th>
                            <th>Tema</th>
                            <th>Fecha</th>
                            <th>Fuente</th>
                            <th>¿Se cumplió?</th>
                            <th>¿Qué se encontró?</th>
                            <th>Evidencia</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody id="audit-questions-list">
                        <!-- Dynamic rows inserted here -->
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Actions Taken Section -->
        <div class="accions w3-container w3-card w3-white w3-margin-bottom">
            <h3 class="w3-text-black">ACCIONES TOMADAS</h3>
            <div class="responsive-table">
                <table>
                    <thead>
                        <tr>
                            <th>Número</th>
                            <th>Pregunta</th>
                            <th>¿Qué se encontró?</th>
                            <th>Foto evidencia</th>
                            <th>Acción</th>
                            <th>Responsable</th>
                            <th>Fecha</th>
                            <th>foto</th>
                            <th>Verificado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody id="taken-actions-list">
                        <!-- Las filas de acciones se llenan dinámicamente -->
                    </tbody>
                </table>
            </div>

            <!-- Select principal para escoger al responsable -->
            <select id="user-list" name="user" class="js-example-responsive" style="width: 100%">
                <option selected>Selecciona un usuario</option>
                <!-- Opciones dinámicas se llenarán aquí -->
            </select>
            <div>
                <br>
                <button id="send-data" class="w3-button w3-green w3-block w3-round w3-animate-input">
                    Enviar al Supervisor
                </button>
            </div>
            <br>
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
        <br>
        <div class="descripcion w3-container w3-card w3-white">
            <h3 class="w3-text-black">Comentarios de la auditoría</h3>
            <div class="responsive-table">
                <table>
                    <thead>
                        <tr>
                            <th>Añadir comentarios</th>
                        </tr>

                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="status"><b>Status</b></label>
                                    <select id="status-list" name="status" class="w3-input w3-border w3-round" data-live-search="true">
                                        <option selected>Open this select menu</option>
                                    </select>
                                </div>
                                <input type="text" id="audit-commentario" class="w3-input w3-border w3-round"
                                    placeholder="Escribe tu comentario aquí">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <button id="save-audit" data-id="id_audit" class="w3-button w3-block w3-red">Guardar Auditoria</button>



    </div>
</div>