<div class="w3-main">
    <header class="w3-container w3-top w3-hide-large w3-indigo w3-xlarge w3-padding">
        <a href="javascript:void(0)" class="w3-button w3-indigo w3-margin-right" onclick="w3_open()">☰</a>
        <span>Auditoría Por Capas</span>
    </header>

    <div class="row mt-4">
        <!-- Tarjetas de estadísticas principales -->
        <div class="col-md-4">
            <div class="card text-white bg-primary mb-4 shadow-sm rounded">
                <div class="card-header font-weight-bold">Auditorías Asignadas</div>
                <div class="card-body">
                    <h5 class="card-title display-4" id="totalAudits">0</h5>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card text-white bg-success mb-4 shadow-sm rounded">
                <div class="card-header font-weight-bold">Preguntas Respondidas</div>
                <div class="card-body">
                    <h5 class="card-title display-4" id="answeredQuestions">0</h5>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card text-white bg-warning mb-4 shadow-sm rounded">
                <div class="card-header font-weight-bold">Acciones Pendientes</div>
                <div class="card-body">
                    <h5 class="card-title display-4" id="pendingActions">0</h5>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <!-- Tarjetas adicionales -->
        <div class="col-md-4">
            <div class="card text-white bg-info mb-4 shadow-sm rounded">
                <div class="card-header font-weight-bold">Porcentaje Completado</div>
                <div class="card-body">
                    <h5 class="card-title display-4" id="completionPercentage">0%</h5>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card text-white bg-secondary mb-4 shadow-sm rounded">
                <div class="card-header font-weight-bold">Acciones Cerradas</div>
                <div class="card-body">
                    <h5 class="card-title display-4" id="closedActions">0</h5>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card text-white bg-dark mb-4 shadow-sm rounded">
                <div class="card-header font-weight-bold">Promedio de Tiempo de Respuesta</div>
                <div class="card-body">
                    <h5 class="card-title display-4" id="averageResponseTime">0 hrs</h5>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <!-- Gráficos -->
        <div class="col-md-6 mb-4">
            <div class="card shadow-sm rounded">
                <div class="card-header font-weight-bold bg-light">Resumen de Auditorías</div>
                <div class="card-body">
                    <canvas id="auditChart"></canvas>
                </div>
            </div>
        </div>
        <div class="col-md-6 mb-4">
            <div class="card shadow-sm rounded">
                <div class="card-header font-weight-bold bg-light">Porcentaje de Completitud</div>
                <div class="card-body">
                    <canvas id="completionChart"></canvas>
                </div>
            </div>
        </div>
    </div>
</div>