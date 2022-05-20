import "src/sounds/nextButtonClick.wav";
import "src/sounds/trackFailed.wav";
import "src/sounds/startSound.wav";
import "src/sounds/nextLevel.wav";

const AudioManager = {
    ctx: new AudioContext(),
    tracks: [],
    currTrack: 0,

    setSource: (index, source) => {
        let audio = new Audio(source);
        audio.crossOrigin = "anonymous";
        audio.loop = true;

        let mediaElement = AudioManager.ctx.createMediaElementSource(audio);
        mediaElement.connect(AudioManager.ctx.destination);
        AudioManager.tracks[index] = audio;
    },

    toggle: (index) => {
        if (AudioManager.ctx.state === 'suspended') { AudioManager.ctx.resume(); }
        let track = AudioManager.tracks[index];

        if (track.paused) {
            track.play();
        } else {
            track.pause();
        }

        return track.paused;
    },

    scrub: (index, amount) => {
        AudioManager.tracks[index].currentTime += amount;
    },

    getTrackSources: () => {
        let sources = [];

        for (const track of AudioManager.tracks) {
            sources.push(track.src);
        }

        return sources;
    },
    
    playSoundFX: (name) => {
        AudioManager.soundFX = new Audio(`${name}.wav`);
        AudioManager.soundFX.play();
    }
}

export default AudioManager;