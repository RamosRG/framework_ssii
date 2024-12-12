<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../public/css/user/home.css">
    <title>Home</title>
</head>

<body>
    <header>
        <h2 id="welcome-message">WELCOME </h2>
        <a href="../auth/logout" class="button">
            <i class="fas fa-sign-out-alt"></i> Log Out
        </a>
    </header>

    <main>
        <div class="container">
            <h1>Home</h1>
            <!-- Input oculto para almacenar el ID del usuario -->
            <input type="hidden" id="userId"> <!-- Reemplaza "12345" con el valor real del ID -->
            <div class="button-container">
                <button class="button" id="auditForWeek">Audit Weekly</button>
                <button class="button" id="auditForReview">Audit to Review</button>
                <button class="button">Dashboard</button>
                <a href="createQuestion" class="button">Add Question</a>
            </div>
        </div>
    </main>

    <footer>
        <p>&copy; 2024 DART CONTAINER. All rights reserved to Orlando Ramos.</p>
    </footer>

    <!-- Archivo de JavaScript -->
    <script src="../public/js/framework/jquery-3.6.0.min.js"></script>
    <script src="../public/assets/sweetalert2/sweetalert2.all.min.js"></script>
    <script src="../public/js/user/functionsUser.js"></script>
</body>

</html>