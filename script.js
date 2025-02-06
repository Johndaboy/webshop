const buttons = document.querySelectorAll('a');
const search = document.querySelector('input');
const login = document.getElementById('login');
const cssvariables = document.querySelector(':root');
const colortheme = document.getElementById('backgroundtheme');
const cart = document.getElementById('cart');

// ✅ Set underline for current page
buttons.forEach(button => {
    const currentPage = window.location.pathname.split("/").pop().split("?")[0];
    if (button.getAttribute('href') === currentPage) {
        button.style.textDecoration = 'underline';
    }
});

// ✅ Set search value from URL
search.addEventListener('change', function () {
    window.location.href = `search.html?search=${encodeURIComponent(search.value)}`;
});

// ✅ Toggle login/logout
if (sessionStorage.getItem("id")) {
    login.innerHTML = 'Logout';
} else {
    login.innerHTML = 'Login';
}

// ✅ Fetch products matching search query
if (window.location.pathname.includes('search.html')) {
    try {
        search.value = new URLSearchParams(window.location.search).get("search") || "";
    } catch (e) { }

    fetch('data.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ function: "getproducts" })
    })
    .then(response => response.json())
    .then(products => {
        const searchValue = search.value.toLowerCase();
        const searchResults = document.getElementById('search-results');
        
        products.forEach(product => {
            if (product.name.toLowerCase().includes(searchValue)) {
                const productCard = document.createElement('div');
                productCard.classList.add('productcard');
                
                productCard.innerHTML = `
                    <img src="${product.image}" />
                    <h6>${product.name}</h6>
                    <p>€${(product.price / 100).toFixed(2)}</p>
                    <button>Add to cart</button>
                `;

                productCard.querySelector('button').addEventListener('click', () => {
                    if (!sessionStorage.getItem("id")) {
                        alert("You need to be logged in to add products to your cart.");
                        return;
                    }
                    fetch('data.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ function: "addtocart", id: product.id, userid: sessionStorage.getItem("id") })
                    }).then(res => res.json()).then(console.log);
                });

                searchResults.appendChild(productCard);
            }
        });
    });
}

// ✅ Admin access with secret input
document.body.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && !window.location.pathname.includes('admin.php')) {
        const adminInput = document.createElement('input');
        document.body.appendChild(adminInput);
        adminInput.focus();
        adminInput.addEventListener('change', function () {
            if (adminInput.value === 'admin123') {
                window.location.href = "admin.php";
            }
        });
    }
});

// ✅ Set and change color theme
function applyTheme(theme) {
    sessionStorage.setItem("theme", theme);
    cssvariables.style.setProperty('--accent_color', theme === "dark" ? 'white' : 'black');
    cssvariables.style.setProperty('--background_color', theme === "dark" ? 'black' : 'white');
    colortheme.value = theme === "dark" ? 'dark' : 'light';
}

applyTheme(sessionStorage.getItem("theme") || "light");

colortheme.addEventListener('change', function () {
    applyTheme(colortheme.value);
});

// ✅ Add product to database
function addProduct() {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').value;
    const description = document.getElementById('description').value;

    fetch('data.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ function: "addproduct", name, price, image, description, userid: sessionStorage.getItem("id") })
    }).then(res => res.json()).then(console.log);
}

// ✅ Change user permission
async function changePermission(id) {
    return fetch('data.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ function: "changepermission", id })
    }).then(res => res.json());
}

// ✅ Remove product from database
async function removeProduct(id) {
    return fetch('data.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ function: "removeproduct", id })
    }).then(res => res.json());
}

// ✅ Remove user from database
async function removeUser(id) {
    return fetch('data.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ function: "removeuser", id })
    }).then(res => res.json());
}

// ✅ Fetch products in cart
async function getProductsInCart(id) {
    const response = await fetch('data.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ function: "getproductcart", id })
    });
    return response.json();
}

// ✅ Show cart
cart.addEventListener('click', async function () {
    if (!sessionStorage.getItem("id")) {
        alert("You need to be logged in to view your cart.");
        return;
    }

    const aside = document.querySelector('aside');
    if (aside.style.display === 'flex') {
        aside.style.display = 'none';
        document.getElementById('container').style.width = '100%';
    } else {
        aside.style.display = 'flex';
        const products = await getProductsInCart(sessionStorage.getItem("id"));
        aside.innerHTML = products.map(p => `<p>${p.name} - €${(p.price / 100).toFixed(2)}</p>`).join("");
        document.getElementById('container').style.width = '75%';
    }
});

// ✅ Login and Logout
login.addEventListener('click', function () {
    if (sessionStorage.getItem("id")) {
        sessionStorage.removeItem("id");
        login.innerHTML = 'Login';
        document.querySelector('aside').style.display = 'none';
        document.getElementById('container').style.width = '100%';
        return;
    }

    document.querySelector('aside').style.display = 'flex';
    document.querySelector('aside').innerHTML = `
        <form>
            <input placeholder="Username" id="username" />
            <input type="password" placeholder="Password" id="password" />
            <button type="button" id="login-btn">Login</button>
            <button type="button" id="register-btn">Register</button>
        </form>
    `;

    document.getElementById('login-btn').addEventListener('click', function () {
        fetch('data.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ function: "login", username: username.value, password: password.value })
        })
        .then(res => res.text())
        .then(id => {
            if (id !== "false") {
                sessionStorage.setItem("id", id);
                login.innerHTML = 'Logout';
            } else {
                alert("Invalid name or password.");
            }
        });
    });
});
