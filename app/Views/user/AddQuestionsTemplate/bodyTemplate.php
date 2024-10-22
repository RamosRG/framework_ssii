<div id="createQuestion" class="w3-main">
    <div class="w3-container" id="contact" style="margin-top:75px">
        <h1 class="w3-xxxlarge w3-text-indigo"><b>Add Questions</b></h1>
        <hr style="width:50px;border:5px solid indigo" class="w3-round">
        <div>
            <form id="questionForm" action="../accions/insertQuestions" method="post">
                <div style="display: flex; flex-wrap: wrap; gap: 15px;">
                    <label for="category"><b>Category</b></label>
                    <select id="category-list" name="fk_category" class="w3-input w3-border w3-round" required>
                        <option value="" disabled selected>Open this select menu</option>
                        <!-- Aquí debes agregar las opciones de categorías -->
                    </select>

                    <label for="question"><b>Question</b></label>
                    <input id="question" class="w3-input w3-border w3-round" type="text" name="question" style="width:100%;" required>

                    <label for="create_for"><b>Create For</b></label>
                    <input id="create_for" class="w3-input w3-border w3-round" type="text" name="create_for" style="width:100%;" required>

                    <label for="fountain"><b>Select Fountain</b></label>
                    <select id="fountain-list" name="fk_fountain" class="w3-input w3-border w3-round" required>
                        <option value="" disabled selected>Open this select menu</option>
                        <!-- Aquí debes agregar las opciones de fuentes -->
                    </select>
                </div>
                <button class="w3-button w3-block w3-green w3-section w3-padding btnQuestion" type="submit">Add</button>
            </form>
        </div>
    </div>
</div>
