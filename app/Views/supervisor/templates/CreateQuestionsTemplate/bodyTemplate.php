<div id="createQuestion" class="w3-main">
    <div class="w3-container" id="contact" style="margin-top:75px">
        <h1 class="w3-xxxlarge w3-text-indigo"><b>Add Questions</b></h1>
        <hr style="width:50px;border:5px solid indigo" class="w3-round">
        <div>
            <form id="questionForm" action="../accions/insertQuestions" method="post">

                <div style="display: flex; flex-wrap: wrap; gap: 15px;">
                    <label for="category"><b>Category</b></label>
                    <select id="category-list" name="category" class="w3-input w3-border w3-round" required>
                        <option value="" disabled selected>Open this select menu</option>
                        <!-- Aquí debes agregar las opciones de categorías -->
                    </select>

                    <label for="question"><b>Question</b></label>
                    <input id="question" class="w3-input w3-border w3-round" type="text" name="question" style="width:100%;" required>
                    <input type="hidden" name="status" value="0">
                    <label for="create_for"><b>Create For</b></label>
                    <input id="create_for" class="w3-input w3-border w3-round" type="text" name="create_for" style="width:100%;" required>

                    <label for="source"><b>Select Source</b></label>
                    <select id="fountain-list" name="source" class="w3-input w3-border w3-round" required>
                        <option value="" selected disabled>Open this select menu</option>
                        <!-- Las opciones se agregarán aquí dinámicamente por JavaScript -->
                    </select>

                </div>
                <button class="w3-button w3-block w3-green w3-section w3-padding btnQuestion" type="submit">Add</button>
            </form>
        </div>
    </div>
</div>