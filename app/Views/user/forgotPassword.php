<!DOCTYPE html>
<html lang="en">

<head>
  <title>Login | Auditoria Capas</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
  <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-blue-grey.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="../public/css/styles.css">

</head>

<body class="w3-theme-l7">

  <!-- Header Images -->
  <div class="header-images">
    <img src="/placeholder.svg?height=50&width=100&text=Left+Logo" alt="Left Logo">
    <img src="/placeholder.svg?height=50&width=100&text=Right+Logo" alt="Right Logo">
  </div>

  <!-- Main Container -->
  <div class="w3-container w3-content" style="max-width:1200px;">
    <div class="w3-row">
      <!-- Centered Main Column -->
      <div class="w3-col m12">
        <div class="w3-card w3-round w3-white form-container">
          <div class="w3-container">
            <h2 class="w3-center">Login</h2>
            <form action="/framework_ssii/auth/login" method="post">
              <label for="email"><b>EMAIL</b></label>
              <input id="email" class="w3-input w3-border w3-margin-bottom w3-round" type="email" placeholder="Enter EMAIL" name="email" required>

              <button class="w3-button w3-block w3-green w3-section w3-padding" type="submit">Send</button>
            </form>

            <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
              <span class="w3-right w3-padding w3-hide-small">
                Forgot <a href="#">password?</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer>
    <div class="w3-container w3-theme-d4 w3-padding-16">
      <h5>Footer</h5>
    </div>
    <div class="w3-container w3-theme-d5">
      <p>Powered by Orlando Ramos</p>
    </div>
  </footer>

</body>

</html>