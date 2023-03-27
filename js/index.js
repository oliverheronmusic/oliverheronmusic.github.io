const navButtons = document.querySelectorAll(".nav-button");
const sections = document.querySelectorAll(".section");
const hamburger = document.querySelector(".hamburger input");
const menu = document.querySelector(".menu");

const oliver = document.querySelector(".o");

const profile = document.querySelector(".profile");
const content = document.querySelector(".content");

const audio = document.querySelector("audio");
const player = document.querySelector(".player");
const playButton = document.querySelector(".play-button");
const volumeButton = document.querySelector(".volume-button");
const time = document.querySelector("#time");
const volume = document.querySelector("#volume");
const currentTime = document.querySelector(".current-time");
const totalTime = document.querySelector(".total-time");

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

function calculateTime(secs) {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

function setDuration() {
    totalTime.innerHTML = calculateTime(audio.duration);
    time.max = Math.floor(audio.duration);
}

audio.addEventListener("timeupdate", () => {
    currentTime.innerHTML = calculateTime(audio.currentTime);
    time.value = Math.floor(audio.currentTime);
});

time.addEventListener("input", () => {
    currentTime.innerHTML = calculateTime(time.value);
    audio.currentTime = time.value;
});

volume.addEventListener("input", () => {
    audio.volume = volume.value / 100;
});

playButton.addEventListener('click', () => {
    if (playButton.classList.contains('playing')) {
        audio.pause();
        playButton.classList.remove('playing');
    } else {
        audio.play();
        playButton.classList.add('playing');
    }
});

volumeButton.addEventListener('click', () => {
    if (volumeButton.classList.contains('muted')) {
        audio.muted = false;
        volumeButton.classList.remove('muted');
    } else {
        audio.muted = true;
        volumeButton.classList.add('muted');
    }
});

if (audio.readyState > 0) {
    setDuration();
} else {
    audio.addEventListener('loadedmetadata', () => {
        setDuration();
    });
}

window.addEventListener("scroll", onScroll);
onScroll();

audio.volume = volume.value / 100;