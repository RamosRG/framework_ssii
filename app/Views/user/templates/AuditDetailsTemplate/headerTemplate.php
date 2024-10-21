<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create AUDIT</title>
    <link rel=" stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <style>
        body,
        h1,
        h2,
        h3,
        h4,
        h5 {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            font-size: 16px;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .w3-sidebar {
            width: 250px;
            background-color: #3f51b5;
            color: white;
        }

        .w3-main {
            margin-left: 120px;
            padding: 2rem;
            transition: margin-left .4s;
        }

        @media (max-width: 600px) {
            .w3-main {
                margin-left: 0;
            }
        }

        .w3-bar-item {
            padding: 16px;
        }

        .w3-bar-item:hover {
            background-color: #303f9f !important;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background-color: white;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        th,
        td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: #3f51b5;
            color: white;
        }

        tr:hover {
            background-color: #f5f5f5;
        }

        .form-group {
            margin-bottom: 1rem;
        }

        .w3-input,
        .w3-select {
            margin-top: 0.5rem;
        }

        .responsive-table {
            overflow-x: auto;
        }

        /* Estilo del modal */
        .modal {
            display: none;
            /* Oculto por defecto */
            position: fixed;
            /* Posicionamiento fijo */
            z-index: 1000;
            /* Asegúrate de que esté en la parte superior */
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            /* Desplazamiento si es necesario */
            background-color: rgba(0, 0, 0, 0.7);
            /* Fondo oscuro y semi-transparente */
        }

        /* Contenido del modal */
        .modal-content {
            background-color: #fff;
            /* Fondo blanco */
            margin: 15% auto;
            /* Centrado */
            padding: 20px;
            border: 1px solid #ccc;
            /* Borde */
            border-radius: 8px;
            /* Bordes redondeados */
            width: 80%;
            /* Ancho del modal */
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            /* Sombra */
        }

        /* Título del modal */
        .modal-content h2 {
            margin-top: 0;
            /* Sin margen superior */
            color: #333;
            /* Color del texto */
        }

        /* Estilo de los botones */
        .modal-content button {
            background-color: #007bff;
            /* Color de fondo azul */
            color: #fff;
            /* Color del texto blanco */
            border: none;
            /* Sin borde */
            padding: 10px 15px;
            /* Relleno */
            border-radius: 5px;
            /* Bordes redondeados */
            cursor: pointer;
            /* Cursor de mano */
            transition: background-color 0.3s;
            /* Transición suave */
        }

        .modal-content button:hover {
            background-color: #0056b3;
            /* Color más oscuro al pasar el ratón */
        }

        /* Ocultar el botón de cerrar */
        .close {
            color: #aaa;
            /* Color del texto */
            float: right;
            /* A la derecha */
            font-size: 28px;
            /* Tamaño de fuente */
            font-weight: bold;
            /* Negrita */
            cursor: pointer;
            /* Cursor de mano */
        }

        .close:hover,
        .close:focus {
            color: #000;
            /* Color al pasar el ratón */
            text-decoration: none;
            /* Sin subrayado */
            cursor: pointer;
            /* Cursor de mano */
        }

        /* Estilo para la vista previa de la foto */
        #photoPreview {
            width: 100%;
            /* Ancho completo */
            height: auto;
            /* Altura automática */
            margin-top: 10px;
            /* Margen superior */
            border: 1px solid #ccc;
            /* Borde */
            border-radius: 5px;
            /* Bordes redondeados */
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            /* Sombra */
        }
    </style>
</head>

<body>