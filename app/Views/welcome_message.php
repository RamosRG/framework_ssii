<!DOCTYPE html>
<html lang="en">

<head>
  <title>Login | Auditoria Capas</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-blue-grey.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="./public/assets/sweetalert2/sweetalert2.min.css">
  <link rel="stylesheet" href="./public/css/styles.css">

</head>

<body>
  <div class="page-container">
    <header class="header">
      <img src="/placeholder.svg?height=50&width=100&text=Left+Logo" alt="Left Logo">
      <img src="/placeholder.svg?height=50&width=100&text=Right+Logo" alt="Right Logo">
    </header>

    <main class="content">
      <div id="login" class="login-form w3-card w3-round w3-white">
        <div class="w3-container">
          <h2 class="w3-center">Login | Auditoria Capas</h2>
          <div class="w3-section">
            <form id="loginForm" action="/framework_ssii/auth/login" method="POST">
              <label for="username"><b>EMAIL</b></label>
              <input id="username" class="w3-input w3-border w3-margin-bottom w3-round" type="email" placeholder="Enter EMAIL" name="email" required>

              <label for="password"><b>PASSWORD</b></label>
              <input id="password" class="w3-input w3-border w3-round" type="password" placeholder="Enter PASSWORD" name="password" required>

              <div class="w3-margin-top">
                <input id="remember" class="w3-check" type="checkbox" name="remember" checked>
                <label for="remember">Remember me</label>
              </div>

              <button class="w3-button w3-green w3-section" id="btnLogin" type="submit">Login</button>
            </form>
          </div>

          <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
            <span class="w3-right w3-padding w3-hide-small">Forgot <a href="user/forgotpassword">password?</a></span>
          </div>
        </div>
      </div>
    </main>

    <footer>
      <h5>Footer</h5>
      <p>Powered by Orlando Ramos</p>
    </footer>
  </div>

  <script src="./public/js/script.js"></script>
  <script src="./public/assets/sweetalert2/sweetalert2.all.min.js"></script>
  <script src="./public/js/functionsCreate.js"></script>
</body>