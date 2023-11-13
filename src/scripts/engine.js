const soundBank = {
    piano: {
        label: "Piano",
        src: "./src/tunes/piano/"
    },
    tranceSynth: {
        label: "Trance Synth",
        src: "./src/tunes/trance-synth/"
    },
    littleBells: {
        label: "Little Bells",
        src: "./src/tunes/little-bells/"
    },
    musicBoxLullably: {
        label: "Music Box Lullably",
        src: "./src/tunes/music-box-lullably/"
    },
    guitar: {
        label: "Guitar",
        src: "./src/tunes/guitar/"
    },
    drums: {
        label: "Drums",
        src: "./src/tunes/drums/"
    }
}

const pianoKeys = document.querySelectorAll('.piano-keys .key');
const volumeSlider = document.querySelector('.volume-slide input');
const keysCheck = document.querySelector('.keys-check input');
var displaySoundBank = document.querySelector('.selectedSoundBank');
var displayVolume = document.querySelector('.volumeSound');
let mapedKeys = [];
let audio = new Audio();
var soundBankIndex = 0;

var listTunes = Object.values(soundBank);
var selectedBank = listTunes[0];
displaySoundBank.textContent = selectedBank.label;

function selectSoundBank(position){
    if(position == "next"){
        ++soundBankIndex;
    } else if (position == "previous"){
        --soundBankIndex;
        console.log(soundBankIndex);
    }

    if(soundBankIndex < 0){
        soundBankIndex += (listTunes.length);
    }

    if(soundBankIndex > (listTunes.length) - 1){
        soundBankIndex -= (listTunes.length);
    }
    selectedBank = listTunes[soundBankIndex];
    displaySoundBank.textContent = selectedBank.label;
}


const playTune = (key) => {
    audio.src = `${selectedBank.src}${key}.mp3`;
    
    audio.play();
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add('active');
    setTimeout(()=>{
        clickedKey.classList.remove('active');
    }, 150);
}

pianoKeys.forEach((key) => {
    key.addEventListener('click', () => playTune(key.dataset.key));
    mapedKeys.push(key.dataset.key);
});

document.addEventListener('keydown', (e) => {
    if(mapedKeys.includes(e.key)){
        playTune(e.key);
    }
})

const handleVolume = (e) => {
    audio.volume=e.target.value;
    displayVolume.textContent = e.target.value * 10;
}

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle('hide'));
}

volumeSlider.addEventListener('input', handleVolume)
keysCheck.addEventListener('click', showHideKeys)
