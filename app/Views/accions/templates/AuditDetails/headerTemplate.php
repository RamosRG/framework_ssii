<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create AUDIT</title>
    <!-- W3.CSS -->
    <link rel="stylesheet" href="../public/css/w3.css">
    <!-- DataTables CSS -->
    <link rel="stylesheet" href="../public/css/dataTables.dataTables.css">
    <link rel="stylesheet" href="../public/css/font-awesome.min.css">
    <link rel="stylesheet" href="../public/assets/sweetalert2/sweetalert2.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.1.0-rc.0/css/select2.min.css"  />


    <style>
        /* Estilos para la lista de preguntas */
    #questionsList {
      padding: 10px;
      border: 1px solid #ccc;
      background-color: #f9f9f9;
      border-radius: 5px;
      margin-top: 10px;
      max-height: 300px;
      overflow-y: auto; /* Para hacer scroll si hay muchas preguntas */
    }

    /* Estilos para los checkboxes y las etiquetas */
    .question-item {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      padding: 5px;
      border-bottom: 1px solid #eee;
    }

    /* Estilo para los checkboxes */
    .question-item input[type="checkbox"] {
      margin-right: 10px;
      width: 20px;
      height: 20px;
    }

    /* Estilo para las etiquetas */
    .question-item label {
      font-size: 16px;
      color: #333;
      cursor: pointer;
    }

    /* Efecto hover sobre los elementos */
    .question-item:hover {
      background-color: #f1f1f1;
    }

    /* Estilos para las preguntas seleccionadas */
    #selectedQuestions {
      padding: 10px;
      margin-top: 20px;
      border: 1px solid #ccc;
      background-color: #e9f5e9;
      border-radius: 5px;
      min-height: 50px;
    }

    /* Estilo para el título de preguntas seleccionadas */
    #selectedQuestionsTitle {
      font-weight: bold;
      margin-bottom: 10px;
    }

    /* Estilo para cada pregunta seleccionada */
    .selected-question-item {
      font-size: 16px;
      color: #333;
      margin-bottom: 5px;
    }
        body,h1,h2,h3,h4,h5 {font-family:'Courier New', Courier, monospace}
        body {font-size:16px;}
        .w3-sidebar {width:300px;}
        .w3-main {margin-left:21rem;margin-right:1rem;}
        #footer {
            width: 100%;
            position: absolute;
            bottom: 0;
           
          }
          #selected-frameworks {
            margin-top: 20px;
            /* Estilos para el select y los checkbox */
body {
    font-family: Arial, sans-serif;
    margin: 20px;
}

select {
    margin-bottom: 10px;
    padding: 5px;
}

#checkboxSelectContainer {
    margin-top: 10px;
}

.checkbox-option {
    display: flex;
    align-items: center;
    margin: 5px 0;
}

.checkbox-option input[type="checkbox"] {
    margin-right: 10px;
}

        }
            
    </style>
</head>
<body>
    
