const navButtons = document.querySelectorAll(".nav-button");
const sections = document.querySelectorAll(".section");
const hamburger = document.querySelector(".hamburger input");
const menu = document.querySelector(".menu");

const oliver = document.querySelector(".o");

const profile = document.querySelector(".profile");
const content = document.querySelector(".content");

const player = document.querySelector(".player");

let selectedPage = null;

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
    let newSelectedPage = "";
    if (bottom - scrollPosition <= 200) {
        newSelectedPage = navButtons[2].innerHTML.toLowerCase();
    } else if (scrollPosition < middle - 100) {
        newSelectedPage = navButtons[0].innerHTML.toLowerCase();
    }
    else {
        newSelectedPage = navButtons[1].innerHTML.toLowerCase();
    }
    if (newSelectedPage != selectedPage) {
        selectedPage = newSelectedPage;
        triggerAnimation(newSelectedPage);
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

function triggerAnimation(newSelectedPage) {
    if (newSelectedPage == "home") {
        oliver.classList.add("visible");
        profile.classList.remove("visible");
        content.classList.remove("visible");
    }
    else if (newSelectedPage == "about") {
        oliver.classList.remove("visible");
        profile.classList.add("visible");
        content.classList.add("visible");
    } else {
        oliver.classList.remove("visible");
        profile.classList.remove("visible");
        content.classList.remove("visible");
    }
}

function toggleMenu() {
    if (hamburger.checked) {
        menu.classList.add("show");
    } else {
        menu.classList.remove("show");
    }
}

function openPlayer() {
    player.classList.add("visible");
}

window.addEventListener("scroll", onScroll);
onScroll();