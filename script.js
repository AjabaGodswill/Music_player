let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_artist = document.querySelector('.track-artist');
let track_name = document.querySelector('.track-name');


let playPause_btn = document.querySelector('playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek-slider');
let volume_slider = document.querySelector('.volume-slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track  = document.createElement('audio')


let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img: 'Images/outnumbered.jpg',
        name: 'Outnumbered',
        artist: 'Dermot Kennedy',
        music: 'Music/Dermot Kennedy -Outnumbered.mp3'
    },
    {
        img: 'Images/Arrdee come and go.jpg',
        name: 'Come Go',
        artist: 'Arrdee',
        music: 'Music/ArrDee  Come  Go Official Music Video.mp3'
    },
    {
        img: 'Images/the nights.jpg',
        name: ' The Night',
        artist: 'Avicii',
        music: 'Music/Avicii  The Nights Audio_360p.mp3'
    },
    {
        img: 'Images/Dont go yet.jpg',
        name: 'Dont Go Yet',
        artist: 'Camila Cabello',
        music: 'Music/Camila Cabello  Dont Go Yet Official Video.mp3'
    },
    {
        img: 'Images/obsessed.jpg',
        name: 'Obsessed',
        artist: 'Central Cee',
        music: 'Music/Central Cee  Obsessed With You Official Video.mp3'
    }
];

loadTrack(track_index);

function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();
    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}
function random_bg_color (){
    let hex = ["0", "1", "2", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];
    let a;

    function populate (a) {
        for (let i = 0; i < 6; i++) {
            let x = Math.round(Math.random() * 14);
            let y = hex[x]
            a += y
        }

        return a
    }

    let color1 = populate('#');
    let color2 = populate('#');
    let angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient
}

function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0
}

function randomTrack  () {
    isRandom ? pauseRandom() : playRandom();
}

function playRandom () {
    isRandom = true;
    randomIcon.classList.add('randomActive')
}

function pauseRandom  ()  {
    isRandom = false;
    randomIcon.classList.remove('randomActive')
}

function repeatTrack () {
    let current_index = track_index;
    loadTrack = current_index;
    playTrack();
};

function playpauseTrack  () {
    isPlaying ? pauseTrack() : playTrack();
};

function playTrack  () {
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playPause_btn.innerHTML = '<ion-icon name="pause-circle"></ion-icon>'
};

function pauseTrack () {
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playPause_btn.innerHTML = '<ion-icon name="play-circle"></ion-icon>'
}

