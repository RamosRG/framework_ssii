<div class="w3-main" id="createAudit">
    <div class="w3-container" id="contact" style="margin-top:70px">
        <h1 class="w3-xxxlarge w3-text-indigo"><b>Add Audit</b></h1>
        <hr style="width:50px;border:5px solid indigo" class="w3-round">
        <div>
            <form id="auditForm" action="../accions/insertAudit" method="post">
                <div style="flex: 1;">
                    <label for="name-of-audit"><b>NAME OF THE AUDIT</b></label>
                    <input id="name-of-audit" class="w3-input w3-border w3-round" type="text" name="name-of-audit" required>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px;">
                    <div style="flex: 1;">
                        <label for="machinery"><b>MACHINERY</b></label>
                        <select id="machinery-list" name="machinery" class="w3-input w3-border w3-round">
                            <option selected>Open this select menu</option>
                            <!-- Aquí se llenarán las opciones con JavaScript -->
                        </select>
                    </div>
                    <div style="flex: 1;">
                        <label for="shift"><b>SHIFT</b></label>
                        <select id="shift-list" name="shift" class="w3-input w3-border w3-round">
                            <option selected>Open this select menu</option>
                            <!-- Aquí se llenarán las opciones con JavaScript -->
                        </select>
                    </div>
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px;">
                    <div style="flex: 1;">
                        <label for="area"><b>AREA</b></label>
                        <select id="area-list" name="area" class="w3-input w3-border w3-round" data-live-search="true">
                            <option selected>Open this select menu</option>
                            <!-- Aquí se llenarán las opciones con JavaScript -->
                        </select>
                    </div>
                    <div style="flex: 1;">
                        <label for="departament"><b>DEPARTMENT</b></label>
                        <select id="department-list" name="departament" class="w3-input w3-border w3-round">
                            <option selected>Open this select menu</option>
                            <!-- Aquí se llenarán las opciones con JavaScript -->
                        </select>
                    </div>
                </div>

                <br>
                <h2 class="w3-container w3-center">Insert your questions</h2>
                <div id="dynamic-questions"></div> <!-- Contenedor para preguntas dinámicas -->

                <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px;">
                    <div style="flex: 1;">
                        <label for="date"><b>Date</b></label>
                        <input id="date-field" class="w3-input w3-border w3-round" type="text" name="date" readonly>
                    </div>
                </div>
                <hr>
                <div style="flex: 1;">
                    <label for="area"><b>CATEGORY</b></label>
                    <select id="category-list" name="category" class="w3-input w3-border w3-round" data-live-search="true">
                        <option selected>Open this select menu</option>
                    </select>
                    <!-- Aquí se llenarán las opciones con JavaScript -->
                </div>
                <br>
                <div style="flex: 1;">
                    <label for="area"><b>USER</b></label>
                    <select id="user-list" name="email" class="w3-input w3-border w3-round">
                        <option selected>Open this select menu</option>
                        <!-- Aquí se llenarán las opciones con JavaScript -->
                    </select>
                    
                </div>
                <br>
                <div class="w3-center">
                    <button class="w3-button w3-blue btnAudit" type="submit">Submit</button>
                </div>
            </form>
        </div>
    </div>
</div>