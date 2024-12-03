<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./public/css/user/welcome_message.css">
    <link rel="stylesheet" href="./public/css/framework/all.min.css">
    <link rel="stylesheet" href="./public/css/font-awesome.min.css">
    <title>Login | Auditoria Capas</title>
</head>

<body>
    <div class="page-container">
        <header class="header">
            <img src="./public/images/LogoDart.jpg" alt="Left Logo">
            <img src="" alt="Right Logo">
        </header>

        <main class="content">
            <div id="login" class="login-form">
                <h2>Login | Auditoria Capas</h2>
                <form id="loginForm" action="/framework_ssii/auth/login" method="POST">
                    <label for="username"><b>EMAIL</b></label>
                    <input id="username" type="email" placeholder="Enter EMAIL" name="email" required>

                    <!-- Eliminado el campo oculto innecesario -->

                    <label for="password"><b>PASSWORD</b></label>
                    <input id="password" type="password" placeholder="Enter PASSWORD" name="password" required>

                    <div class="remember-me">
                        <input id="remember" type="checkbox" name="remember" checked>
                        <label for="remember">Remember me</label>
                    </div>

                    <button id="btnLogin" type="submit">Login</button>
                </form>

                <div class="forgot-password">
                    <a href="user/forgotpassword">Forgot password?</a>
                </div>
            </div>
        </main>
            <footer >
                <h5>DART ATLACOMULCO</h5>
                <p>Powered by Orlando Ramos</p>
            </footer>
    </div>
    <script src="./public/js/framework/script.js"></script>
    <script src="./public/assets/sweetalert2/sweetalert2.all.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./public/js/user/functionsUser.js"></script>
</body>

</html>