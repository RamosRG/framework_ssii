<div class="w3-main">
        <header class="w3-container w3-top w3-hide-large w3-indigo w3-xlarge w3-padding">
            <a href="javascript:void(0)" class="w3-button w3-indigo w3-margin-right" onclick="w3_open()">☰</a>
            <span>Auditoria Por Capas</span>
        </header>

        <div class="w3-container" id="dashboard" style="margin-top: 75px">
            <h2 class="w3-border-bottom w3-border-light-grey w3-padding-16">Dashboard</h2>
            
            <div class="w3-row-padding">
                <div class="w3-col m3">
                    <div class="dashboard-card">
                        <h3>Total Audits</h3>
                        <p class="value">125</p>
                    </div>
                </div>
                <div class="w3-col m3">
                    <div class="dashboard-card">
                        <h3>Completed Audits</h3>
                        <p class="value">98</p>
                    </div>
                </div>
                <div class="w3-col m3">
                    <div class="dashboard-card">
                        <h3>Pending Audits</h3>
                        <p class="value">27</p>
                    </div>
                </div>
                <div class="w3-col m3">
                    <div class="dashboard-card">
                        <h3>Average Score</h3>
                        <p class="value">85%</p>
                    </div>
                </div>
            </div>

            <div class="w3-row-padding">
                <div class="w3-col m6">
                    <div class="chart-container">
                        <canvas id="auditChart"></canvas>
                    </div>
                </div>
                <div class="w3-col m6">
                    <div class="chart-container">
                        <canvas id="scoreDistributionChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
