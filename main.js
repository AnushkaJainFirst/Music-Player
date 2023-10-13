let songList = document.getElementById("song-list");
let progress = document.getElementById("progress");
let playBtn = document.getElementById("play-btn");
let backward = document.getElementById("backward");
let forward = document.getElementById("forward");

let songs = [
    {
        id: 0,
        name: "song-1"
    },
    {
        id: 1,
        name: "song-2"
    },
    {
        id: 2,
        name: "song-3"
    },
    {
        id: 3,
        name: "song-4"
    }
]

const audio = new Audio("./assets/song-0.mp3");

// showing all songs in ul
for (let song of songs) {
    const li = document.createElement("li");
    li.innerText = song.name;
    li.setAttribute("id", song.id);
    li.classList.add("song-item");
    songList.append(li);
}

// play button
playBtn.addEventListener("click", () => {
    audio.paused ? audio.play() : audio.pause();
    playBtn.children[0].classList.toggle("fa-play");
    playBtn.children[0].classList.toggle("fa-pause");
})

// gaane ke hisaab se input bar(progress) change hona
audio.addEventListener("timeupdate", () => {
    progress.value = audio.currentTime * 100 / audio.duration;
})

// input ke hisaab se chlna mtlb progress bar ke change hone se gaana change hona 
progress.addEventListener("change", () => {
    audio.currentTime = progress.value * audio.duration / 100;
})

// jis song par click krru wo chal jaaeye
songList.addEventListener("click", (e) => {
    if (e.target.closest("li")) {
        // The closest() method of the Element interface traverses the element and its parents (heading toward the document root) until it finds a node that matches the specified CSS selector.
        let songID = e.target.getAttribute("id");
        audio.src = `./assets/song-${songID}.mp3`;
        audio.currentTime = 0;
        audio.play();
    }
    playBtn.children[0].classList.remove('fa-play');
    playBtn.children[0].classList.add('fa-pause');
})

// forward button functionality
forward.addEventListener("click", function (e) {
    let index = Number(audio.src.split(".")[3].split("-")[1]);
    console.log(index + 1);
    let songID = (index + 1) % songs.length;
    audio.src = `./assets/song-${songID}.mp3`;
    audio.currentTime = 0;
    audio.play();
    playBtn.children[0].classList.remove('fa-play');
    playBtn.children[0].classList.add('fa-pause');
})

// backward button functionality
backward.addEventListener("click", function (e) {
    let index = Number(audio.src.split(".")[3].split("-")[1]);
    let songID;
    if (index) {
        songID = (index - 1) % songs.length;
    }
    else {
        songID = 3;
    }
    audio.src = `./assets/song-${songID}.mp3`;
    audio.currentTime = 0;
    audio.play();
    playBtn.children[0].classList.remove('fa-play');
    playBtn.children[0].classList.add('fa-pause');
})




