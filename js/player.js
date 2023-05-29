const audio = document.querySelector("audio");

const timeSlider = document.querySelector("#time");
const volumeSlider = document.querySelector("#volume");
const trackName = document.querySelector("#track-name");

const player = document.querySelector(".player");
const playButton = document.querySelector(".play-button");
const volumeButton = document.querySelector(".volume-button");
const currentTime = document.querySelector(".current-time");
const totalTime = document.querySelector(".total-time");

let calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}

let getStoredVolume = () => {
    return Number(localStorage.getItem("volume")) || 100;
}

let setAudioVolume = (volume) => {
    audio.volume = volume / 100;
    localStorage.setItem("volume", volume);
}

let setAudioTime = (time) => {
    audio.currentTime = time;
}

let setCurrentTime = (time) => {
    currentTime.innerHTML = calculateTime(time);
}

let setSliderTime = (time) => {
    timeSlider.value = Math.floor(time);
}

let setTotalTime = (time) => {
    totalTime.innerHTML = calculateTime(time);
    timeSlider.max = Math.floor(time);
}

let setTrack = (name) => {
    trackName.innerText = decodeURI(name.split("/").pop().split(".")[0]);
}

let calculateExtent = (w, pw) => {
    return (w - pw + 10) / 2;
}

let setTrackMarquee = () => {
    const extent = calculateExtent(trackName.offsetWidth, trackName.parentElement.offsetWidth)
    document.documentElement.style.setProperty('--extent',`${extent}px`)
    if (extent > 5) {
        trackName.classList.add("marquee")
    } else {
        trackName.classList.remove("marquee")
    }
}

let setupPlayer = () => {
    setTrack(audio.src);
    setCurrentTime(0);
    setTotalTime(audio.duration);
    volumeSlider.value = getStoredVolume();
    setAudioVolume(volumeSlider.value);
}

let _adjustSetting = (s, c, on, off) => {
    if (s.classList.contains(c)) {
        s.classList.remove(c)
        off()
    } else {
        s.classList.add(c);
        on()
    }
}

let _forceSetting = (s, c, a) => {
    s.classList.add(c);
    a()
}

let togglePlay = () => {
    _adjustSetting(playButton, 'playing', () => audio.play(), () => audio.pause())
}

let toggleMute = () => {
    _adjustSetting(volumeButton, 'muted', () => audio.muted = true, () => audio.muted = false)
}

let resetAndPlay = () => {
    setSliderTime(0);
    setCurrentTime(0);
    _forceSetting(playButton, 'playing', () => audio.play())
}

audio.addEventListener("timeupdate", () => {
    setCurrentTime(audio.currentTime);
    setSliderTime(audio.currentTime);
});

audio.addEventListener("ended", () => {
    togglePlay();
    setSliderTime(0);
    setCurrentTime(0);
})

time.addEventListener("input", () => {
    setCurrentTime(timeSlider.value);
    setAudioTime(timeSlider.value);
})

volume.addEventListener("input", () => {
    setAudioVolume(volumeSlider.value);
})

playButton.addEventListener('click', togglePlay)

volumeButton.addEventListener('click', toggleMute)

window.addEventListener("resize", setTrackMarquee)
window.addEventListener("load", setTrackMarquee)

let setupTrack = (track) => {
    audio.src = track;
    if (audio.readyState > 0) {
        setupPlayer();
    } else {
        audio.addEventListener('loadedmetadata', () => {
            setupPlayer();
        })
    }
}

let lastPlayed = null;
const musicItems = document.querySelectorAll(".music-item");

musicItems.forEach((item) => {
    const button = item.querySelector(".music-button");

    if (item.dataset.track === localStorage.getItem("track")) {
        item.classList.add("playing");
        setupTrack(item.dataset.track);
        lastPlayed = item;
    }

    button.addEventListener("click", (e) => {
        e.stopPropagation();
        if (item.dataset.track !== localStorage.getItem("track")) {
            if (lastPlayed) {
                lastPlayed.classList.remove("playing");
            }
            item.classList.add("playing");
            lastPlayed = item;
            setupTrack(item.dataset.track);
            resetAndPlay();
            localStorage.setItem("track", item.dataset.track);
        }
    });
});