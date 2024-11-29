<div class="w3-main">
    <header class="w3-container w3-top w3-hide-large w3-indigo w3-xlarge w3-padding">
        <a href="javascript:void(0)" class="w3-button w3-indigo w3-margin-right" onclick="w3_open()">☰</a>
        <span>Auditoria Por Capas</span>
    </header>

    <div class="w3-container" id="dashboard" style="margin-top: 75px">
        <h2 class="w3-border-bottom w3-border-light-grey w3-padding-16">Dashboard</h2>

        <!-- Gráficas de dos en dos -->
        <div class="w3-row-padding">
            <div class="w3-half">
                <canvas id="auditByDepartmentChart"></canvas>
            </div>
            <div class="w3-half">
                <canvas id="auditByStatusChart"></canvas>
            </div>
        </div>
        <div class="w3-row-padding" style="margin-top: 20px;">
            <div class="w3-half">
                <canvas id="auditByShiftChart"></canvas>
            </div>
            <div class="w3-half">
                <canvas id="additionalChart"></canvas>
            </div>
        </div>

        <!-- Información del dashboard -->
        <div class="w3-container w3-margin-top">
            <h4>Resumen</h4>
            <div id="total-auditorias" class="w3-padding">Total de Auditorías: <span id="total"></span></div>
            <div id="auditorias-pendientes" class="w3-padding">Pendientes: <span id="pendientes"></span></div>
            <div id="auditorias-en-progreso" class="w3-padding">En Progreso: <span id="enProgreso"></span></div>
        </div>

        <!-- Tablas de datos adicionales -->
        <div class="w3-container w3-margin-top">
            <h4>Detalle de Auditorías</h4>
            <table class="w3-table-all" id="tabla-auditorias-capas">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Departamento</th>
                        <th>Estado</th>
                        <th>Turno</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Contenido generado dinámicamente -->
                </tbody>
            </table>
        </div>

        <!-- Historial -->
        <div class="w3-container w3-margin-top">
            <h4>Historial de Auditorías</h4>
            <ul id="historial-auditorias">
                <!-- Contenido generado dinámicamente -->
            </ul>
        </div>

    </div>
</div>

<script>
    // Lógica para renderizar las gráficas y el contenido dinámico
  
</script>
