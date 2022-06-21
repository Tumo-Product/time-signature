const soundFX = {};
const AudioManager = {
    ctx: new AudioContext(),
    tracks: [],
    currTrack: 0,

    setup: async () => {
        soundFX["nextButtonClick"]  = await import("src/sounds/nextButtonClick.wav");
        soundFX["trackFailed"]      = await import("src/sounds/trackFailed.wav");
        soundFX["startSound"]       = await import("src/sounds/startSound.wav");
        soundFX["nextLevel"]        = await import("src/sounds/nextLevel.wav");
    },

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

    getTrackSources: () => AudioManager.tracks.map(track => track.src),
    playSoundFX: (name) => AudioManager.soundFX = new Audio(soundFX[name].default).play()
}

export default AudioManager;