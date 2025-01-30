const buttons = document.querySelectorAll('a');
const search = document.querySelector('input');
const login = document.getElementById('login');

// set underline to current page
buttons.forEach(button => {
    console.log(window.location.href);
    console.log(button.getAttribute('href'));
    if(button.getAttribute('href') == window.location.href.split("/")[window.location.href.split("/").length - 1].split("?")[0]) {
        button.style.textDecoration = 'underline';
    }
});

// set search value to url search value
search.addEventListener('change', function() {
    console.log(search.value);
    window.location.href = 'search.html?search=' + search.value;
});

// change login text to logout if user is logged in and vice versa
if(sessionStorage.getItem("id")) {
    login.innerHTML = 'Logout';
} else {
    login.innerHTML = 'Login';
}

// show products that match the search value
if(window.location.href.split("/")[window.location.href.split("/").length - 1].split("?")[0] == 'search.html') {
    try {
        search.value = window.location.href.split("?")[1].split("=")[1];
    } catch(e) {}

    $.ajax({
        type: "POST",
        url: "data.php",
        data: { function: "getproducts" },
        success: function(response) {
            let products = JSON.parse(response);
            let searchresults = search.value;

            for(let i = 0; i < products.length; i++) {
                if(products[i].name.toLowerCase().includes(search.value.toLowerCase())) {
                    let product = document.createElement('div');
                    product.classList.add('productcard');
                    let img = document.createElement('img');
                    img.src = products[i].image;
                    let name = document.createElement('h6');
                    name.innerHTML = products[i].name;
                    let price = document.createElement('p');
                    price.innerHTML = "€" + products[i].price / 100;
                    let button = document.createElement('button');
                    button.innerHTML = 'Add to cart';
                    button.addEventListener('click', function() {
                        if(!sessionStorage.getItem("id")) {
                            alert("You need to be logged in to add products to your cart.");
                            return;
                        }
                        $.ajax({
                            type: "POST",
                            url: "data.php",
                            data: { function: "addtocart", id: products[i].id, userid: sessionStorage.getItem("id") },
                            success: function(response) {
                                console.log(response);
                            }
                        });
                    });

                    product.append(img);
                    product.append(name);
                    product.append(price);
                    product.append(button);
                    searchresults.append(product);
                }
            }
        }
    });
}

// admin accessability
document.body.onkeydown = function(e) {
    if (e.key == "Escape") {
        let admin = document.createElement('input');
        let div = document.createElement('div');
        div.append(admin);
        document.body.appendChild(div);
        console.log("admin");

        admin.addEventListener('change', function() {
            if(admin.value == 'admin123') {
                window.location.href = "admin.php";
            }
        });
    }
}
const cssvariables = document.querySelector(':root');
const colortheme = document.getElementById('backgroundtheme');

// set color theme
if(sessionStorage.getItem("theme") == "dark") {
    colortheme.value = "dark";
    cssvariables.style.setProperty('--accent_color', 'white');
    cssvariables.style.setProperty('--background_color', 'black');
} else {
    colortheme.value = "light";
    cssvariables.style.setProperty('--accent_color', 'black');
    cssvariables.style.setProperty('--background_color', 'white');
}

// change color theme
colortheme.addEventListener('change', function() {
    if(colortheme.value == 'dark') {
        cssvariables.style.setProperty('--accent_color', 'white');
        cssvariables.style.setProperty('--background_color', 'black');
        sessionStorage.setItem("theme", "dark");
    } else {
        cssvariables.style.setProperty('--accent_color', 'black');
        cssvariables.style.setProperty('--background_color', 'white');
        sessionStorage.setItem("theme", "light");
    }
});

// add product to database
function addProduct() {
    let name = document.getElementById('name').value;
    let price = document.getElementById('price').value;
    let image = document.getElementById('image').value;
    let description = document.getElementById('description').value;

    $.ajax({
        type: "POST",
        url: "data.php",
        data: { function: "addproduct", name: name, price: price, image: image, userid: sessionStorage.getItem("id"), description, description },
        success: function(response) {
            console.log(response);
        }
    });
}

// change permission of a user
function changePermission(id) {
    $.ajax({
        type: "POST",
        url: "data.php",
        data: { function: "changepermission", id: id },
        success: function(response) {
            console.log(response);
        }
    });
}

// remove product from database
function removeProduct(id) {
    $.ajax({
        type: "POST",
        url: "data.php",
        data: { function: "removeproduct", id: id },
        success: function(response) {
            console.log(response);
        }
    });
}

// remove user from database
function removeUser(id) {
    $.ajax({
        type: "POST",
        url: "data.php",
        data: { function: "removeuser", id: id },
        success: function(response) {
            console.log(response);
        }
    });
}

// get products in cart
function getProductsInCart(id) {
    return $.ajax({
        type: "POST",
        url: "data.php",
        data: { function: "getproductcart", id: id },
        success: function(response) {
            return response;
        }
    });
}

// show cart
let cart = document.getElementById('cart');
cart.addEventListener('click', function() {
    if(!sessionStorage.getItem("id")) {
        alert("You need to be logged in to view your cart.");
        return;
    }
    if(document.getElementsByTagName('aside')[0].style.display == 'flex') {
        document.getElementsByTagName('aside')[0].style.display = 'none';
        document.getElementById('container').style.width = '100%';
        return;
    } else {
        document.getElementsByTagName('aside')[0].style.display = 'flex';
        document.getElementsByTagName('aside')[0].innerHTML = getProductsInCart(sessionStorage.getItem("id"));
        document.getElementById('container').style.width = '75%';
    }
});

// login and logout
login.addEventListener('click', function() {
    if(sessionStorage.getItem("id")) {
        sessionStorage.removeItem("id");
        login.innerHTML = 'Login';
        document.getElementsByTagName('aside')[0].style.display = 'none';
        document.getElementById('container').style.width = '100%';
        return;
    }
    document.getElementsByTagName('aside')[0].style.display = 'flex';
    const loginform = document.createElement('form');
    const username = document.createElement('input');
    const password = document.createElement('input');
    const submit = document.createElement('button');
    const register = document.createElement('button');
    register.innerText = 'Register';
    register.type = 'button';
    username.placeholder = 'Username';
    password.placeholder = 'Password';
    password.type = 'password';
    submit.type = 'button';
    submit.innerText = 'Login';
    loginform.append(username);
    loginform.append(password);
    loginform.append(submit);
    loginform.append(register);
    document.getElementsByTagName('aside')[0].innerHTML = '';
    document.getElementsByTagName('aside')[0].append(loginform);
    document.getElementById('container').style.width = '75%';
    register.addEventListener('click', function() {
        $.ajax({
            type: "POST",
            url: "data.php",
            data: { function: "register", username: username.value, password: password.value },
            success: function(response) {
                console.log(response);
            }
        });
    });
    submit.addEventListener('click', function() {
        $.ajax({
            type: "POST",
            url: "data.php",
            data: { function: "login", username: username.value, password: password.value },
            success: function(response) {
                if(response != "false") {
                    sessionStorage.setItem("id", response);
                    login.innerHTML = 'Logout';
                    document.getElementsByTagName('aside')[0].style.display = 'none';
                    document.getElementById('container').style.width = '100%';
                } else {
                    alert("Username or password is incorrect.");
                }
            }
        });
    });
});