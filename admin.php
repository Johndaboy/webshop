<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script defer src="script.js"></script>
    <style>
        .container {
            display: flex;
            width: 100%;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        td, th {
            border: 1px solid black;
            padding: 10px;
            margin: 0px;
        }
        table {
            border-collapse: collapse;
            margin: 10px;
            width: 50%;
        }
    </style>
    <title>Admin</title>
</head>

<body>
    <nav>
        <a href="index.html">Home</a>
        <div class="search">
            <input type="text" name="search" id="search" placeholder="Search">
            <a href="search.html">Search</a>
        </div>
        <a href="portfolio.html">Contact</a>
        <select name="backgroundtheme" id="backgroundtheme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
        </select>
    </nav>
    <div class="container">
        <table>
            <tr>
                <th>USERS</th>
            </tr>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>CreationDate</th>
                <th>E-mail</th>
                <th>Permissions</th>
                <th>Remove</th>
            </tr>
        </table>
        <table>
            <tr>
                <th>PRODUCTS</th>
            </tr>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>CreationDate</th>
                <th>Made by</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Remove</th>
            </tr>
        </table>
    </div>
</body>

</html>