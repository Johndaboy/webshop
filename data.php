<?php

include("connect.php");

switch($_POST["function"]) {
    case "getProducts":
        echo json_encode(getProducts($pdo));
        break;
    case "getCart":
        echo json_encode(getCart($pdo));
        break;
    case "addToCart":
        echo json_encode(addToCart($pdo, $_POST["id"], $_POST["quantity"]));
        break;
    case "removeFromCart":
        echo json_encode(removeFromCart($pdo, $_POST["id"]));
        break;
    case "getUsers":
        echo json_encode(getUsers($pdo));
        break;
    case "login":
        echo json_encode(login($pdo, $_POST["username"], $_POST["password"]));
        break;
    default:
        break;
}

function getProducts($pdo) {
    $sql = "SELECT * FROM products";
    $products = $pdo->query($sql);
    return $products;
}

function getCart($pdo) {
    $sql = "SELECT * FROM cart";
    $result = $pdo->query($sql);

    $cart = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $cart[] = $row;
        }
    }
    $pdo->close();
    return $cart;
}

function addToCart($pdo, $id, $quantity) {
    $sql = "INSERT INTO cart (product_id, quantity) VALUES ('$id', '$quantity')";
    if ($pdo->query($sql) === TRUE) {
        $response = array("status" => "success");
    } else {
        $response = array("status" => "error", "message" => $pdo->error);
    }
    $pdo->close();
    return $response;
}

function removeFromCart($pdo, $id) {
    $sql = "DELETE FROM cart WHERE product_id='$id'";
    if ($pdo->query($sql) === TRUE) {
        $response = array("status" => "success");
    } else {
        $response = array("status" => "error", "message" => $pdo->error);
    }
    $pdo->close();
    return $response;
}

function getUsers($pdo) {
    $sql = "SELECT * FROM users";
    $result = $pdo->query($sql);

    $users = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
    }
    $pdo->close();
    return $users;
}

function login($pdo, $username, $password) {
    $sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    $result = $pdo->query($sql);

    if ($result->num_rows > 0) {
        $response = array("status" => "success");
    } else {
        $response = array("status" => "error", "message" => "Invalid credentials");
    }
    $pdo->close();
    return $response;
}