<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> AUDIT | Show AUDITS</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <style>
        body, h1, h2, h3, h4, h5 {
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
            margin-left: 130px;
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
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        th, td {
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
        .w3-input, .w3-select {
            margin-top: 0.5rem;
        }
        .responsive-table {
            overflow-x: auto;
        }
    </style>
</head>
<body>