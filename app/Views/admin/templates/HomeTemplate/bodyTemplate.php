
<div class="w3-main">
  <div class="w3-container" id="contact" style="margin-top:5rem">
    <h1 class="w3-xxxlarge w3-text-indigo"><b>Show USERS.</b></h1>
    <hr style="width:50px;border:5px solid indigo" class="w3-round">
    <a href="../admin/create">
      <button class="w3-button w3-pink w3-round-large w3-block">Create USER</button>
    </a>
  </div>
  <br>
  <div id="loader" style="display: none; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);">
  <img src="../public/images/load.gif" alt="Cargando..." />
</div>
  <!-- DataTables Example -->
  <div class="w3-responsive">

    <table id="userTable" class="display" style="width:95%">
      <thead>
        <tr>
          <th>EMAIL</th>
          <th>NAME</th>
          <th>FIRSTNAME</th>
          <th>ROLE</th>
          <th>AREA</th>
          <th>DEPARTMENT</th>
          <th>STATUS</th>
          <th>CREATED</th>
          <th>UPDATED</th>
          <th>EDITAR</th>
        </tr>
      </thead>
      <tbody>
      <tr id="loaderRow">
        <td colspan="10" style="text-align: center;">
          <img src="../public/images/load.gif" alt="Cargando datos..." />
        </td>
      </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>EMAIL</th>
          <th>NAME</th>
          <th>FIRSTNAME</th>
          <th>ROLE</th>
          <th>AREA</th>
          <th>DEPARTMENT</th>
          <th>STATUS</th>
          <th>CREATED</th>
          <th>UPDATED</th>
          <th>EDITAR</th>
        </tr>
      </tfoot>
    </table>
  </div>
</div>

<div id="id01" class="w3-modal">
  <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px">

    <div class="w3-center"><br>
      <span onclick="document.getElementById('id01').style.display='none'" class="w3-button w3-xlarge w3-transparent w3-display-topright" title="Close Modal">×</span>
    </div>

    <form id="updateUserForm" class="w3-container" action="./update" method="POST">
      <div class="w3-section">
        <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px;">
          <div style="flex: 1;">
            <label><b>EMAIL</b></label>
            <input class="w3-input w3-border w3-margin-bottom" type="text" name="email" id=email required>
            <input type="hidden" id="id_user" name="id_user" value="id_user">
            <input type="hidden" id="fk_area" name="fk_area" value="fk_area">
          </div>
          <div style="flex: 1;">
            <label><b>NAME</b></label>
            <input class="w3-input w3-border" type="text" name="name" id="name" required>
          </div>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px;">
          <div style="flex: 1;">
            <label><b>FIRSTNAME</b></label>
            <input class="w3-input w3-border" type="text" name="firstName" id="firstName" required>
          </div>
          <div style="flex: 1;">
            <label><b>LASTNAME</b></label>
            <input class="w3-input w3-border" type="text" name="lastName" id="lastName" required>
          </div>
        </div>
        <label><b>STATUS</b></label>
        <input class="w3-input w3-border" type="number" min="0" max="1" name="status" id="status" required>
        <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px;">
          <div style="flex: 1;">
            <label for="area"><b>AREA</b></label>
            <select id="area-list" name="area" class="w3-input w3-border w3-round">
              <option selected>Open this select menu</option>
            </select>
          </div>
          <div style="flex: 1;">
            <label for="department"><b>DEPARTMENT</b></label>
            <select id="department-list" name="department" class="w3-input w3-border w3-round">
              <option selected>Seleccione un departamento</option>
            </select>
          </div>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 15px; margin-top: 15px;">
          <div style="flex: 1;">
            <label><b>CREATED</b></label>
            <input class="w3-input w3-border" type="date" name="created_at" id="created_at" required>
          </div>
          <div style="flex: 1;">
            <label><b>UPDATED</b></label>
            <input class="w3-input w3-border" type="date" name="updated_at" value="updated_at" required>
          </div>
        </div>
        <button class="w3-button w3-block w3-green w3-section w3-padding" id="updateBtn">UPDATE USER</button>
      </div>
    </form>


  </div>
</div>
</div>