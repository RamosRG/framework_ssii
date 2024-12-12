<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DASHBOARD</title>
    <link rel="stylesheet" href="../public/css/framework/w3.css">
    <link rel="stylesheet" href="../public/css/font-awesome.min.css">
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
            margin-left: 150px;
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

          #dashboard {
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 1200px;
            margin: 0 auto;
        }

        .chart-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr); /* Dos columnas */
            gap: 20px;
        }

        .chart-item {
            background-color: #ffffff;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        canvas {
            width: 100%;
            max-width: 400px;
            height: auto;
            margin: 0 auto;
            border: 1px solid #ddd;
            border-radius: 4px;
        }

        h2 {
            font-size: 1.2em;
            margin-bottom: 10px;
        }

        /* Ajuste para pantallas pequeñas */
        @media (max-width: 768px) {
            .chart-container {
                grid-template-columns: 1fr; /* Una sola columna */
            }

            h2 {
                font-size: 1em;
            }

            canvas {
                max-width: 300px;
            }
        }

        /* Ajuste para pantallas muy pequeñas */
        @media (max-width: 480px) {
            h2 {
                font-size: 0.9em;
            }

            canvas {
                max-width: 250px;
            }
        }
    </style>
</head>

<body>