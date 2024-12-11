<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../public/css/framework/w3.css">
    <link rel="stylesheet" href="../public/css/font-awesome.min.css">
    <link rel="stylesheet" href="../public/css/user/home.css">
    <title>Home</title>
</head>

<body>
    <header>
        <h2 color="olive">AUDITORIA POR CAPAS</h2>
        <h2 id="welcome-message">WELCOME</h2>

    </header>

    <main>
        <div class="container">
            <h1>Home</h1>
            <!-- Input oculto para almacenar el ID del usuario -->
            <input type="hidden" id="userId"> <!-- Reemplaza "12345" con el valor real del ID -->
            <div class="button-container">
                <button id="auditForWeek" class="w3-button w3-light-blue w3-round-large fa fa-calendar"  style="font-size:24px" > AUDIT WEEKLY</button>
                <button id="dashboard" class="w3-button w3-light-blue w3-round-large fa fa-dashboard" style="font-size:24px" > DASHBOARD</button>
                <button class="w3-button w3-light-blue w3-round-large fa fa-thumbs-o-up" style="font-size:24px"> CONCLUDED AUDITS</button>
                <button class="w3-button w3-light-blue w3-round-large fa fa-external-link-square" style="font-size:24px"> LOG OUT</button>
            </div>
        </div>
    </main>

    <footer>
        <p>&copy; 2024 DART CONTAINER. All rights reserved to Orlando Ramos.</p>
    </footer>

    <!-- Archivo de JavaScript -->
    <script src="../public/js/framework/jquery-3.6.0.min.js"></script>
    <script src="../public/assets/sweetalert2/sweetalert2.all.min.js"></script>
    <script src="./../public/js/user/functionsUser.js"></script>

</body>

</html>