<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DASHBOARD</title>
    <link rel="stylesheet" href="<?= base_url('public/css/framework/w3.css') ?>">
    <link rel="stylesheet" href="<?= base_url('public/css/font-awesome.min.css') ?>">
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
            background-color: #f8f9fa;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        canvas {
            margin: 15px 0;
            /* Reducido el margen superior e inferior */
            border: 1px solid #ddd;
            border-radius: 4px;
        }

        #historial-auditorias {
            list-style-type: none;
            padding: 0;
        }

        #historial-auditorias li {
            padding: 8px;
            background-color: #e9ecef;
            margin-bottom: 5px;
            border-radius: 4px;
        }
    </style>
</head>

<body>