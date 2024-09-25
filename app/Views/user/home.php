<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home Interface</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
        }
        .container {
            background-color: white;
            border-radius: 25px;
            padding: 5.5rem;
            width: 25rem;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            text-align: center;
            margin-bottom: 20px;
        }
        .button-container {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        .button {
            background-color: #ffeeba;
            border: none;
            border-radius: 10px;
            padding: 20px;
            font-size: 16px;
            cursor: pointer;
            text-align: center;
        }
    </style>
</head>
<body>
<div class="container">
        <h1>Home</h1>
        <div class="button-container">
            <button class="button">Audit Weekly</button>
            <button class="button">Dashboard</button>
            <button class="button">Add Question</button>
        </div>
    </div>
</body>
</html>