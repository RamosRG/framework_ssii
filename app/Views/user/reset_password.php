<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?= base_url('public/css/user/welcome_message.css') ?>">
    <link rel="stylesheet" href="<?= base_url('public/css/framework/w3.css') ?>">
    <link rel="stylesheet" href="<?= base_url('public/css/framework/all.min.css') ?>">
    <link rel="stylesheet" href="<?= base_url('public/css/font-awesome.min.css') ?>">
    <title>Recover Password | Auditoria Capas</title>
</head>

<body>
    <div class="page-container">
        <header class="header">
            <img src="./public/images/LogoDart.jpg" alt="Left Logo">
            <img src="" alt="Right Logo">
        </header>

        <main class="content">
            <div id="login" class="login-form">
                <h2>Reset Password | Auditoria Capas</h2>
                <form id="recoverPasswordForm">
                    <input type="hidden" name="token" id="token" value="<?= $token ?>">
                    <label for="password">Nueva contraseña:</label>
                    <input type="password" id="password" name="password" required>
                    <button type="submit">Restablecer contraseña</button>
                </form>
                <div class="forgot-password">
                    <a href="user/forgotpassword">Forgot password?</a>
                </div>
            </div>
        </main>
        <footer>
            <h5>DART ATLACOMULCO</h5>
            <p>Powered by Orlando Ramos</p>
        </footer>
    </div>

    <script src="<?= base_url('public/js/framework/script.js') ?>"></script>
    <script src="<?= base_url('public/assets/sweetalert2/sweetalert2.all.min.js') ?>"></script>
    <script src="<?= base_url('public/js/user/savePassword.js') ?>"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    </body>

</html>