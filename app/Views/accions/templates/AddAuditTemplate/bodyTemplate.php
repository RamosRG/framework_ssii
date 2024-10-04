<div class="w3-main" id="createAudit" method="POST">
    <div class="w3-container" id="contact" style="margin-top:70px">
        <h1 class="w3-xxxlarge w3-text-indigo"><b>Add Audit </b></h1>
        <hr style="width:50px;border:5px solid indigo" class="w3-round">
        <div>
            <form id="auditForm" action="../accions/insertAudit" method="post">
                <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px;">
                    <div style="flex: 1;">
                        <label for="machinery"><b>Maquinary</b></label>
                        <select id="machinery-list" name="machinery" value="fk_machinery" class="w3-input w3-border w3-round">
                            <option selected>Open this select menu</option>
                            <!-- Aquí se llenarán las opciones con JavaScript -->
                        </select>
                    </div>
                    <div style="flex: 1;">
                        <label for="shift"><b>Shift</b></label>
                        <select id="shift-list" value="fk_shift" name="shift" class="w3-input w3-border w3-round">
                            <option selected>Open this select menu</option>
                            <!-- Aquí se llenarán las opciones con JavaScript -->
                        </select>
                    </div>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px;">
                    <div style="flex: 1;">
                        <label for="departament"><b>Departament</b></label>
                        <select id="departament-list" name="departament" class="w3-input w3-border w3-round">
                            <option selected>Open this select menu</option>
                            <!-- Aquí se llenarán las opciones con JavaScript -->
                        </select>
                    </div>
                    <div style="flex: 1;">
                        <label for="auditor"><b>Name of Audit</b></label>
                        <input id="audit" class="w3-input w3-border w3-round" type="text" name="auditor" required>
                    </div>
                </div>
                <br>
                <h2 class="w3-container w3-center">Select her questions</h2>
                <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px;">
                    <div style="flex: 1;">
                        <label for="date"><b>Date</b></label>
                        <input id="date-field" class="w3-input w3-border w3-round" type="text" name="date" readonly>
                    </div>
                </div>
                <hr>

                <!-- Contenedor para preguntas dinámicas -->
                <div class="w3-container" id="dynamic-sections"></div>

                <select id="user-list" name="email" class="w3-input w3-border w3-round">
                    <option selected>Open this select menu</option>
                    <!-- Aquí se llenarán las opciones con JavaScript -->
                </select>
                

                <!-- Botón de envío -->
                <button class="w3-button w3-block w3-green w3-section w3-padding btnAudit" id="btnAudit" type="submit">Add</button>
            </form>
        </div>
    </div>
</div>
