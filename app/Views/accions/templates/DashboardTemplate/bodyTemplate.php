<div class="w3-main">
    <header class="w3-container w3-top w3-hide-large w3-indigo w3-xlarge w3-padding">
        <a href="javascript:void(0)" class="w3-button w3-indigo w3-margin-right" onclick="w3_open()">☰</a>
        <span>Auditoria Por Capas</span>
    </header>
    <br>
    <br>
    <div id="dashboard">
        <div class="chart-container">
            <div>
                <h2>Estado de Auditorías</h2>
                <canvas id="statusChart"></canvas>
            </div>
            <div>
                <h2>Distribución por Áreas</h2>
                <canvas id="areaChart"></canvas>
            </div>
            <div>
                <h2>Turnos</h2>
                <canvas id="shiftChart"></canvas>
            </div>
            <div>
                <h2>Departamentos</h2>
                <canvas id="departmentChart"></canvas>
            </div>
            <div>
                <h2>Progreso de Acciones</h2>
                <canvas id="actionProgressChart"></canvas>
            </div>
            <div>
            <h2>Auditorias Ralizadas por Usuario</h2>

                <canvas id="auditorChart"></canvas>
            </div>
            <div>
            <h2>Auditorias Revisadas</h2>

                <canvas id="reviewedByChart"></canvas>
           
        </div>
    </div>
</div>