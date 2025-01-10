<?php

include("connect.php");

$users = $pdo->query("SELECT * FROM users");
$products = $pdo->query("SELECT * FROM products");
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script defer src="script.js"></script>
    <title>Admin</title>
</head>

<body>
    <nav>
        <a href="index.html">Home</a>
        <div class="search">
            <input type="text" name="search" id="search" placeholder="Search">
            <a href="search.html">Search</a>
        </div>
        <a href="https://johndaboy.github.io/Portfolio-Johan-Tol/">Contact</a>
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
                <th>Creation date</th>
                <th>E-mail</th>
                <th>Permission level</th>
                <th>Remove</th>
            </tr>
            <?php
            foreach ($users as $user) {
                ?>
                <tr>
                    <td><?=$user["id"]?></td>
                    <td><?=$user["name"]?></td>
                    <td><?=$user["creation_date"]?></td>
                    <td><?=$user["email"]?></td>
                    <td>
                        <select name="permission" id="permission" onchange='changePermission(<?=$user["id"]?>)' value="<?=$user["permission_level"]?>">
                            <option value="1">User</option>
                            <option value="2">Seller</option>
                            <option value="3">Admin</option>
                        </select>
                    </td>
                    <td><button onclick='removeUser(<?=$user["id"]?>)'>Remove</button></td>
                </tr>
                <?php
            }
            ?>
        </table>
        <table>
            <tr>
                <th>PRODUCTS</th>
            </tr>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Creation date</th>
                <th>Made by</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Remove</th>
            </tr>
            <?php
            foreach ($products as $product) {
                ?>
                <tr>
                    <td><?=$product["id"]?></td>
                    <td><?=$product["name"]?></td>
                    <td><?=$product["description"]?></td>
                    <td><?=$product["creation_date"]?></td>
                    <td><?=$product["Made_by"]?></td>
                    <td><?=$product["Price"]?></td>
                    <td><button onclick='editProduct(<?=$product["id"]?>)'>Edit</button></td>
                    <td><button onclick='removeProduct(<?=$product["id"]?>)'>Remove</button></td>
                </tr>
                <?php
            }
            ?>
        </table>
    </div>
</body>

</html>