<div id="createUser" class="w3-main">
    <div class="w3-container" id="contact" style="margin-top:75px">
        <h1 class="w3-xxxlarge w3-text-indigo"><b>Add Audit</b></h1>
        <hr style="width:50px;border:5px solid indigo" class="w3-round">
        <div>
            <form id="auditForm" action="../accions/insertAudit" method="post">
                <div style="display: flex; flex-wrap: wrap; gap: 15px;">
                    <div style="flex: 1;">
                        <label for="maquinary"><b>Maquinary</b></label>
                        <select id="area" name="area" class="w3-input w3-border w3-round">
                            <option selected>Open this select menu</option>
                            <option value=""></option>
                        </select>
                     </div>
                    <div style="flex: 1;">
                        <label for="shift"><b>Shift</b></label>
                        <select id="area" name="area" class="w3-input w3-border w3-round">
                            <option selected>Open this select menu</option>
                            <option value=""></option>
                        </select>
                    </div>
                </div>

                <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px;">
                    <div style="flex: 1;">
                        <label for="date"><b>Date</b></label>
                        <input id="date" class="w3-input w3-border w3-round" type="date" name="date" style="width:100%;" required>
                    </div>
                    <div style="flex: 1;">
                        <label for="departament"><b>Departament</b></label>
                        <select id="area" name="area" class="w3-input w3-border w3-round">
                            <option selected>Open this select menu</option>
                            <option value=""></option>
                        </select>
                    </div>
                </div>

                <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px;">
                    <div style="flex: 1;">
                        <label for="password"><b>Password</b></label>
                        <input id="password" class="w3-input w3-border w3-round" type="password" name="password" style="width:100%;" required>
                    </div>
                </div>

                <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px;">
                    <div style="flex: 1;">
                        <label for="area"><b>Select Area</b></label>
                        <select id="area" name="area" class="w3-input w3-border w3-round">
                            <option selected>Open this select menu</option>
                            <option value=""></option>
                        </select>
                    </div>
                </div>
                <button class="w3-button w3-block w3-green w3-section w3-padding btnCreate" type="button" id="btnCreate">Add</button>
            </form>
        </div>
    </div>
</div>
