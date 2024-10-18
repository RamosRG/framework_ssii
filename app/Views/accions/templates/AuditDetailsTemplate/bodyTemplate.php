<div class="w3-main">
    <header class="w3-container w3-top w3-hide-large w3-indigo w3-xlarge w3-padding">
        <a href="javascript:void(0)" class="w3-button w3-indigo w3-margin-right" onclick="w3_open()">☰</a>
        <span>Auditoria Por Capas</span>
    </header>

    <div class="w3-container" id="contact" style="margin-top: 75px">
        <h2 class="w3-border-bottom w3-border-light-grey w3-padding-16" id="audit_title"></h2>
        
        <form action="../accions/saveAudit" method="POST" class="w3-container">
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

            <div class="w3-container w3-card w3-white w3-margin-bottom">
                <h3 class="w3-text-indigo">Acciones Tomadas</h3>
                <div class="responsive-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Número</th>
                                <th>Acción</th>
                                <th>Responsable</th>
                                <th>Fecha</th>
                                <th>Verificado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td><input type="text" class="w3-input w3-border w3-round" value="Se continua retroalimentando a personal"></td>
                                <td><input type="text" class="w3-input w3-border w3-round" value="Rosendo Miranda"></td>
                                <td><input type="date" class="w3-input w3-border w3-round"></td>
                                <td><input type="checkbox" class="w3-check"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="w3-container w3-card w3-white">
                <h3 class="w3-text-indigo">Verificación y Seguimiento</h3>
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

            <button class="w3-button w3-indigo w3-right w3-margin-top" type="submit">Submit Audit</button>
        </form>
    </div>