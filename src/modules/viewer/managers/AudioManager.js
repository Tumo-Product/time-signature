const AudioManager = {
    ctx: new AudioContext(),
    tracks: [],

    setSource: (index, source) => {
        let audio = new Audio(source);
        audio.crossOrigin = "anonymous";
        audio.loop = true;

        let mediaElement = AudioManager.ctx.createMediaElementSource(audio);
        mediaElement.connect(AudioManager.ctx.destination);
        AudioManager.tracks[index] = audio;
        return audio;
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

    rewind: (index, amount) => {
        AudioManager.tracks[index].currentTime += amount;
    }
}

export default AudioManager;