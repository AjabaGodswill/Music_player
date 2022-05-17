let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_artist = document.querySelector('.track-artist');
let track_name = document.querySelector('.track-name');


let playPause_btn = document.querySelector('.playpause-track');
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
        img: 'Images/Arrdee-come-and-go.jpg',
        name: 'Come Go',
        artist: 'Arrdee',
        music: 'Music/ArrDee  Come  Go Official Music Video.mp3'
    },
    {
        img: 'Images/the-nights.jpg',
        name: 'The Night',
        artist: 'Avicii',
        music: 'Music/Avicii  The Nights Audio_360p.mp3'
    },
    {
        img: 'Images/Dont-go-yet.jpg',
        name: 'Dont Go Yet',
        artist: 'Camila Cabello',
        music: 'Music/Camila Cabello  Dont Go Yet Official Video.mp3'
    },
    {
        img: 'Images/Moon-Knight.png',
        name: 'A Man Without Love _ Moon Knight 🌙',
        artist: 'Engelbert Humperdinck',
        music: 'Music/Engelbert Humperdinck - A Man Without Love _ Moon Knight 🌙 Soundtrack _ - YouTube.mp3'
    },
    {
        img: 'Images/obsessed.jpg',
        name: 'Obsessed',
        artist: 'Central Cee',
        music: 'Music/Central Cee  Obsessed With You Official Video.mp3'
    },
    {
        img: 'Images/Johnny-Drille.png',
        name: 'Something Better',
        artist: 'Johnny Drille',
        music: 'Music/Johnny Drille - Something Better (Lyric Video).mp3'
    },

    {
        img: 'Images/Euphoria.png',
        name: "Still don't know my name",
        artist: 'Labrinth',
        music: 'Music/Labrinth – Still Don’t Know My Name (Official Audio) - Euphoria (Original Score from the HBO Series).mp3'
    },
    {
        img: 'Images/Be-alright.jpg',
        name: 'Be Alright',
        artist: 'Dean Lewis',
        music: 'Music/Dean Lewis  Be Alright Official Video.mp3'
    },
    {
        img: 'Images/Almost-me-again.jpg', 
        name: 'Almost Sweet',
        artist: 'Hozier',
        music: 'Music/Hozier  Almost Sweet Music Audio_1080p.mp3'
    },
    {
        img: 'Images/Words-on-bathroom-wall.png', 
        name: 'If walls could talk',
        artist: 'Chain smokers',
        music: 'Music/If Walls Could Talk (Words on Bathroom Walls).mp3'
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

    let gradient = 'linear-gradient(' + angle + ',' + color1 + ', ' + color2 + ")";
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
    playPause_btn.innerHTML = '<ion-icon name="pause-circle" id="play-btn"></ion-icon>'
};

function pauseTrack () {
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playPause_btn.innerHTML = '<ion-icon name="play-circle" id="play-btn"></ion-icon>'
}

function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}

function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}


function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationMinutes;
    }
}

