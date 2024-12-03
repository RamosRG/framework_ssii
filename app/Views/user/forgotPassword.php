<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../public/css/user/forgot_password.css">
    <title>Recover Password | Auditoria Capas</title>

</head>

<body>
    <header class="header-images">
        <img src="" alt="Left Logo">
        <img src="" alt="Right Logo">
    </header>

    <main class="main-container">
        <div class="form-container">
            <h2>Recover Password</h2>
            <form id="recoverPasswordForm">
                <input type="email" name="email" placeholder="Enter your email" required />
                <button type="submit">Reset Password</button>
            </form>
            <p id="responseMessage"></p> <!-- Este es el elemento que se actualiza con el mensaje -->

        </div>
    </main>

    <footer>
        <p>Powered by Orlando Ramos</p>
    </footer>
    <script src="../public/js/framework/script.js"></script>
    <script src="<?= base_url('public/assets/sweetalert2/sweetalert2.all.min.js') ?>"></script>
    <script src="../public/js/user/recoverPassword.js"></script>
</body>

</html>