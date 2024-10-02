<div class="w3-main">
    <div class="w3-container" id="contact" style="margin-top:75px">
       
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
            <h2 class="w3-container w3-center">  Select her questions</h2>
            <div>
                <label for="select1">Selecciona una opción:</label>
                <select class="w3-padding w3-block" id="select1">
                    <option value="">Selecciona una opción</option>
                    <!-- Las opciones se cargarán dinámicamente aquí -->
                </select>
            </div>
            <div id="questionsList"></div>

  <!-- Contenedor para mostrar las preguntas seleccionadas -->
  <div id="selectedQuestions">
    <div id="selectedQuestionsTitle">Preguntas seleccionadas:</div>
    <div id="selectedQuestionsList"></div>
  </div>

              
              
            
        
            
</div>
</div>
