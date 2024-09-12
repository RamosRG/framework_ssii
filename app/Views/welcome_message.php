<!DOCTYPE html>
<html lang="en">
<head>
  <title>Login | Auditoria Capas</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-blue-grey.css">
  <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Open+Sans'>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <style>
    html, body {
      height: 100%;
      margin: 0;
      padding: 0;
      font-family: 'Courier New', Courier, monospace;
    }

    .w3-theme-l7 {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .login-form {
      width: 100%; /* Ocupa el 100% del espacio disponible */
      max-width: 900px; /* Aumenta el tamaño máximo del formulario */
      padding: 50px; /* Agrega más padding */
    }

    .w3-input {
      font-size: 1rem; /* Aumenta el tamaño de la fuente de los inputs */
      padding: 15px; /* Agrega más espacio a los inputs */
    }

    .w3-button {
      width: 100%;
      padding: 20px; /* Aumenta el tamaño del botón */
      font-size: 1.5rem; /* Aumenta el tamaño de la fuente del botón */
    }

    footer {
      width: 100%;
      position: absolute;
      bottom: 0;
    }
  </style>
</head>
<body class="w3-theme-l7">

  <div class="w3-container w3-content login-form w3-card w3-round w3-white">
    <div class="w3-container">
      <div class="w3-section">
        <form action="/framework_ssii/auth/login" method="POST">
          <label for="username"><b>Username</b></label>
          <input id="username" class="w3-input w3-border w3-margin-bottom w3-round" type="text" placeholder="Enter Username" name="email" required>
          
          <label for="password"><b>Password</b></label>
          <input id="password" class="w3-input w3-border w3-round" type="password" placeholder="Enter Password" name="password" required>
          
          <label>
            <input class="w3-check w3-margin-top" type="checkbox" name="remember" checked="checked"> Remember me
          </label>

          <button class="w3-button w3-green w3-section" type="submit">Login</button>
        </form>
      </div>
      
      <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
        <span class="w3-right w3-padding w3-hide-small">Forgot <a href="user/forgotPassword">password?</a></span>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="w3-container w3-theme-d4 w3-padding-4">
    <h5>Footer</h5>
  </footer>

  <footer class="w3-container w3-theme-d5">
    <p>Powered by Orlando Ramos</p>
  </footer>

</body>
</html>
