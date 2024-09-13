<div id="createUser" class="w3-main">
    <div class="w3-container" id="contact" style="margin-top:75px">
        <h1 class="w3-xxxlarge w3-text-indigo"><b>Add Questions</b></h1>
        <hr style="width:50px;border:5px solid indigo" class="w3-round">
        <div>
            <form id="userForm" action="../admin/insertData" method="post">
                <div style="display: flex; flex-wrap: wrap; gap: 15px;">
                    <div style="flex: 1;">
                        <label for="email"><b>Email</b></label>
                        <input id="email" class="w3-input w3-border w3-round" type="text" name="email" style="width:100%;" required>
                    </div>
                    <div style="flex: 1;">
                        <label for="name"><b>Name</b></label>
                        <input id="name" class="w3-input w3-border w3-round" type="text" name="name" style="width:100%;" required>
                    </div>
                </div>
                
                <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px;">
                    <div style="flex: 1;">
                        <label for="firstname"><b>First Name</b></label>
                        <input id="firstname" class="w3-input w3-border w3-round" type="text" name="firstName" style="width:100%;" required>
                    </div>
                    <div style="flex: 1;">
                        <label for="lastname"><b>Last Name</b></label>
                        <input id="lastname" class="w3-input w3-border w3-round" type="text" name="lastName" style="width:100%;" required>
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
