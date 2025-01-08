const buttons = document.querySelectorAll('a');
const search = document.querySelector('input');

buttons.forEach(button => {
    console.log(window.location.href);
    console.log(button.getAttribute('href'));
    if(button.getAttribute('href') == window.location.href.split("/")[window.location.href.split("/").length - 1].split("?")[0]) {
        button.style.backgroundColor = 'gray';
        button.style.boxShadow = '0px 0px 10px black';
    }
});

search.addEventListener('change', function() {
    console.log(search.value);
    window.location.href = 'search.html?search=' + search.value;
});

if(window.location.href.split("/")[window.location.href.split("/").length - 1].split("?")[0] == 'search.html') {
    try {
        search.value = window.location.href.split("?")[1].split("=")[1];
    } catch(e) {}

    // $.ajax({
    //     type: "POST",
    //     url: "data.php",
    //     data: { function: "getproducts" },
    //     success: function(response) {
    //         console.log(response);
    //     }
    // });
}

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

if(sessionStorage.getItem("theme") == "dark") {
    colortheme.value = "dark";
    cssvariables.style.setProperty('--accent_color', 'white');
    cssvariables.style.setProperty('--background_color', 'black');
} else {
    colortheme.value = "light";
    cssvariables.style.setProperty('--accent_color', 'black');
    cssvariables.style.setProperty('--background_color', 'white');
}

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