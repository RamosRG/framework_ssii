<div class="w3-main">
    <header class="w3-container w3-top w3-hide-large w3-indigo w3-xlarge w3-padding">
        <a href="javascript:void(0)" class="w3-button w3-indigo w3-margin-right" onclick="w3_open()">☰</a>
        <span>Auditoria Por Capas</span>
    </header>

    <div class="w3-container" id="dashboard" style="margin-top: 75px">
        <h2 class="w3-border-bottom w3-border-light-grey w3-padding-16">Dashboard</h2>

        <canvas id="auditByDepartmentChart"></canvas>
        <canvas id="auditByStatusChart"></canvas>
        <canvas id="auditByShiftChart"></canvas>

        <!-- Información del dashboard -->
        <div id="total-auditorias"></div>
        <div id="auditorias-pendientes"></div>
        <div id="auditorias-en-progreso"></div>

        <!-- Tablas de datos adicionales -->
        <table id="tabla-auditorias-capas">
            <!-- Contenido generado dinámicamente -->
        </table>
        <ul id="historial-auditorias">
            <!-- Contenido generado dinámicamente -->
        </ul>

    </div>
</div>