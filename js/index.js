const navButtons = document.querySelectorAll(".nav-button");
const sections = document.querySelectorAll(".section");
const hamburger = document.querySelector(".hamburger input");
const menu = document.querySelector(".menu");

let selectedPage = navButtons[0].innerHTML.toLowerCase();

function onSelect() {
    if (menu.classList.contains("show")) {
        menu.classList.remove("show");
        hamburger.checked = false;
    }
}

function onScroll() {
    let scrollPosition = window.scrollY;
    let middle = sections[1].offsetTop - 100;
    let bottom = document.body.scrollHeight - window.innerHeight;
    if (bottom - scrollPosition <= 200) {
        selectedPage = navButtons[2].innerHTML.toLowerCase();
    } else if (scrollPosition < middle - 100) {
        selectedPage = navButtons[0].innerHTML.toLowerCase();
    }
    else {
        selectedPage = navButtons[1].innerHTML.toLowerCase();
    }
    navButtons.forEach(button => {
        button.classList.remove("selected");
    });
    navButtons.forEach(button => {
        if (button.innerHTML.toLowerCase() == selectedPage) {
            button.classList.add("selected");
        }
    });
}

function toggleMenu() {
    if (hamburger.checked) {
        menu.classList.add("show");
    } else {
        menu.classList.remove("show");
    }
}


window.onload = function() {
    let url = window.location.href;
    let extension = url.substring(url.lastIndexOf("#") + 1);
    if (extension) {
        selectedPage = extension;
    }
    navButtons.forEach(button => {
        if (button.innerHTML.toLowerCase() == selectedPage) {
            button.classList.add("selected");
        }
    });
}

window.addEventListener("scroll", onScroll);