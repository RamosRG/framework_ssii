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
            <form action="/framework_ssii/auth/login" method="post">
                <label for="email">EMAIL</label>
                <input id="email" type="email" placeholder="Enter your email" name="email" required>
                <button type="submit">Send</button>
            </form>
        </div>
    </main>

    <footer>
        <p>Powered by Orlando Ramos</p>
    </footer>
</body>
</html>