<div class="w3-main">
    <div class="w3-container" id="contact" style="margin-top: 75px">
        <h1 class="w3-border-bottom w3-border-light-grey w3-padding-16 tittle" id="tittle">Audit Details</h1>

        <!-- Audit Information -->
        <div class="w3-row-padding">
            <div class="w3-third form-group">
                <label for="no_audit"><b>Audit Number</b></label>
                <input id="no_audit" class="w3-input w3-border w3-round" type="text" name="no_audit" required>
            </div>
            <div class="w3-third form-group">
                <label for="date"><b>Date Start</b></label>
                <input id="date" class="w3-input w3-border w3-round" type="date" name="date" required>
            </div>
            <div class="w3-third form-group">
                <label for="date"><b>Date Finish</b></label>
                <input id="date" class="w3-input w3-border w3-round" type="date" name="date" required>
            </div>
        </div>
        <div class="w3-row-padding">
            <div class="form-group">
                <label for="auditor"><b>Auditor</b></label>
                <input id="auditor" class="w3-input w3-border w3-round" type="text" name="auditor" required>
            </div>
        </div>
        <!-- Additional Information -->
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
                            <th>Evidencia</th>
                            <th>Acción</th>
                            <th>Responsable</th>
                            <th>Fecha</th>
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
            <select id="user-list" name="user" class="w3-input w3-border w3-round">
                <option selected>Selecciona un usuario</option>
                <!-- Opciones dinámicas se llenarán aquí -->
            </select>

            <div>
                <br>
                <button id="send-data" class="w3-button w3-green w3-block w3-round w3-animate-input">
                    Enviar al Supervisor
                </button>
            </div>
        </div>

        <!-- Verification Section -->
        <div class="verification w3-container w3-card w3-white">
            <h3 class="w3-text-black">VERIFICACION Y SEGUIMIENTO</h3>
            <div class="responsive-table">
                <table>
                    <thead>
                        <tr>
                            <th>Número de línea</th>
                            <th>Verificación de acciones</th>
                            <th>Descripción</th>
                            <th>Implementado</th>
                            <th>Mejorado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td><input type="text" class="w3-input w3-border w3-round"></td>
                            <td><input type="text" class="w3-input w3-border w3-round"></td>
                            <td>
                                <select class="w3-select w3-border">
                                    <option value="Sí">Sí</option>
                                    <option value="No">No</option>
                                </select>
                            </td>
                            <td>
                                <select class="w3-select w3-border">
                                    <option value="Sí">Sí</option>
                                    <option value="No">No</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Submit Button -->
        <button class="w3-button w3-indigo w3-right w3-margin-top" type="submit">Submit Audit</button>

        <!-- Modal for Camera and Photo Capture -->
        <div id="overlay" class="overlay"></div>
        <div id="photoModal" class="photo-modal">
            <video id="video" autoplay class="modal-video"></video>
            <canvas id="canvas" style="display: none;"></canvas>
            <button id="takePhoto" class="w3-button w3-blue w3-round">Tomar Foto</button>
            <button id="closeCamera" class="w3-button w3-red w3-round">Cerrar Cámara</button>
        </div>
    </div>
</div>