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
]
