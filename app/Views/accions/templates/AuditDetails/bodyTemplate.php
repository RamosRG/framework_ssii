<div class="w3-main">
    <div class="w3-container" id="contact" style="margin-top:75px">
        <form action="../accions/saveAudit" method="POST">
            <div id="auditData"></div>
            <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px;">
                <div style="flex: 1;">
                    <label for="no_audit"><b>Audit Number</b></label>
                    <input id="no_audit" class="w3-input w3-border w3-round" type="text" name="no_audit" required>
                </div>
                <div style="flex: 1;">
                    <label for="date"><b>Date</b></label>
                    <input id="date" class="w3-input w3-border w3-round" type="date" name="date" required>
                </div>
                <div style="flex: 1;">
                    <label for="auditor"><b>Auditor</b></label>
                    <input id="auditor" class="w3-input w3-border w3-round" type="text" name="auditor" required>
                    <input id="id_audit" class="w3-input w3-border w3-round" type="hidden" name="id_audit" required>
                </div> 
            </div>
            
            <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px;">
                <div style="flex: 1;">
                    <label for="departament"><b>Department</b></label>
                    <input id="departament" class="w3-input w3-border w3-round" type="text" name="departament" required>
                </div>
                <div style="flex: 1;">
                    <label for="machinery"><b>Machinery</b></label>
                    <input id="machinery" class="w3-input w3-border w3-round" type="text" name="machinery" required>
                </div>
                <div style="flex: 1;">
                    <label for="shift"><b>Shift</b></label>
                    <input id="shift" class="w3-input w3-border w3-round" type="text" name="shift" required>
                </div>
            </div>
            <br>

</form> 
<div id="audit-questions-list" class="w3-ul w3-card-4">
    <!-- Aquí se llenarán los detalles de las preguntas de la auditoría -->
</div>


    </div>
    </div>
