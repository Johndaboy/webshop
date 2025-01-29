<?php

include("connect.php");

switch($_POST["function"]) {
    case "getProducts":
        echo json_encode(getProducts($pdo));
        break;
    case "getCart":
        echo json_encode(getCart($pdo));
        break;
    case "getUsers":
        echo json_encode(getUsers($pdo));
        break;
    case "login":
        echo login($pdo, $_POST["username"], $_POST["password"]);
        break;
    case "register":
        echo register($pdo, $_POST["username"], $_POST["password"]);
        break;
    case "changePermission":
        echo changePermission($pdo, $_POST["id"], $_POST["permission"]);
        break;
    case "addToCart":
        echo addToCart($pdo, $_POST["id"], $_POST["quantity"]);
        break;
    case "removeFromCart":
        echo removeFromCart($pdo, $_POST["id"]);
        break;
    case "removeUser":
        echo removeUser($pdo, $_POST["id"]);
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
        $response = $result["id"];
    } else {
        $response = "false";
    }
    $pdo->close();
    return $response;
}

function register($pdo, $username, $password) {
    $stmt = $pdo->prepare("INSERT INTO users (username, password, permission_level) VALUES ('$username', '$password', '0')");
    $stmt->execute();
    if ($stmt->execute() === TRUE) {
        $response = "success";
    } else {
        $response = "error";
    }
    return $response;
}

function changePermission($pdo, $id, $permission) {
    $sql = "UPDATE users SET permission_level='$permission' WHERE id='$id'";
    if ($pdo->query($sql) === TRUE) {
        $response = array("status" => "success");
    } else {
        $response = array("status" => "error", "message" => $pdo->error);
    }
    $pdo->close();
    return $response;
}

function removeUser($pdo, $id) {
    $sql = "DELETE FROM users WHERE id='$id'";
    if ($pdo->query($sql) === TRUE) {
        $response = array("status" => "success");
    } else {
        $response = array("status" => "error", "message" => $pdo->error);
    }
    $pdo->close();
    return $response;
}

function editProduct($pdo, $id, $name, $description, $price) {
    $sql = "UPDATE products SET name='$name', description='$description', price='$price' WHERE id='$id'";
    if ($pdo->query($sql) === TRUE) {
        $response = array("status" => "success");
    } else {
        $response = array("status" => "error", "message" => $pdo->error);
    }
    $pdo->close();
    return $response;
}

function removeProduct($pdo, $id) {
    $sql = "DELETE FROM products WHERE id='$id'";
    if ($pdo->query($sql) === TRUE) {
        $response = array("status" => "success");
    } else {
        $response = array("status" => "error", "message" => $pdo->error);
    }
    $pdo->close();
    return $response;
}

?>