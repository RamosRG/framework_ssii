<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Audit System</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        header {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 1em;
        }
        main {
            flex: 1;
            padding: 1em;
        }
        #auditCardsContainer {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1em;
        }
        .card {
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .card h2 {
            margin: 0;
            font-size: 1.5em;
        }
        .card p {
            margin: 10px 0;
            font-size: 1.2em;
        }
        .card.selected {
            background-color: #f0f0f0;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
            border-color: #007bff;
            transform: scale(1.05);
        }
        footer {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 1em;
        }
    </style>
</head>
<body>
    <header>
        <h1>Audit System</h1>
    </header>

    <main>
        <div id="auditCardsContainer"></div>
    </main>

    <footer>
        <p>&copy; 2024 Audit System. All rights reserved.</p>
    </footer>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./../public/js/user/functionsUser.js"></script>
</body>
</html>
