<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Show AUDIT</title>
    <link rel="stylesheet" href="../public/css/framework/w3.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="../public/assets/select2/select2.min.css" rel="stylesheet" />
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
        .photo-modal {
            display: none;
            /* Hide initially */
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 20;
            background: #fff;
            padding: 20px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
            border-radius: 8px;
        }

        .modal-video {
            width: 100%;
            height: auto;
            border: 1px solid black;
        }

        .overlay {
            position: fixed;
            display: none;
            /* Hide initially */
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10;
        }

        .accions th {
            background-color: #4caf50 !important;
            /* Fondo verde */
            color: white !important;
            /* Texto blanco */
        }

        /* Estilo específico para Verificación y Seguimiento */
        .verification th {
            background-color: #ff9800 !important;
            /* Fondo naranja */
            color: white !important;
            /* Texto blanco */
        }
    </style>
</head>

<body>