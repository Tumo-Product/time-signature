import PlaybackButton from "./PlaybackButton.js";
import AudioManager from "../managers/AudioManager.js";
import "./ProgressBar.css";
import LevelManager from "../managers/LevelManager.js";
import Slider from "./Slider.js";

export const PROGRESS_WIDTH = 782;

const ProgressBar = {
    build: async (index, divider, levelContainer) => {
        let playbackButton = await PlaybackButton.build();

        let element =
        $(/* html */ `
            <div class="progressBar">
                <div class="progress"></div>
            </div>
        `);

        element.append(playbackButton.element);

        let audio = AudioManager.tracks[index];
        
        const progressBar = {
            element: element,
            playbackButton: playbackButton,
            audio: audio,
            duration: audio.duration / divider,
            divider: divider,
            playing: false,

            pause: () => {
                progressBar.playing = false;
                playbackButton.pause();
                cancelAnimationFrame(progressBar.animationId);
            },

            play: () => {
                for (let [i, level] of LevelManager.levels.entries()) {
                    if (level.progressBar.playing) {
                        AudioManager.tracks[i].pause();
                        level.progressBar.pause();
                    }
                }

                progressBar.playing = true;
                progressBar.audio = AudioManager.tracks[index];
                progressBar.duration = progressBar.audio.duration / progressBar.divider;
                playbackButton.play();
                progressBar.update();
            },

            bindEvents: (beats) => {
                progressBar.beats = beats;

                playbackButton.element.on("click", () => {
                    let paused = AudioManager.toggle(index);

                    if (paused) {
                        progressBar.pause();
                    } else {
                        progressBar.play();
                    }
                });
            },

            update: () => {
                let currTime = progressBar.audio.currentTime;
                let nthLap = Math.floor(currTime / progressBar.duration);

                if (currTime >= progressBar.duration) {
                    currTime -= progressBar.duration * nthLap;
                }

                let width = PROGRESS_WIDTH * (currTime / progressBar.duration);
                
                element.find(".progress").css("width", `${width}px`);
                progressBar.animationId = requestAnimationFrame(progressBar.update);

                let beats = progressBar.beats;
                let index = Math.floor(width / (PROGRESS_WIDTH/beats.length));
                
                for (let i = 0; i < beats.length; i++) {
                    let beatStatus = beats[i].statusIndicator;

                    if (i === index) {
                        beatStatus.changeLook("near");
                    } else {
                        beatStatus.changeLook("off");
                    }
                }
            },

            reset: (beats, divider) => {
                progressBar.audio = AudioManager.tracks[LevelManager.current];
                element.find(".progress").css("width", 0);
                progressBar.beats = beats;
                progressBar.divider = divider;
            }
        }

        let slider = Slider.build(index, levelContainer, progressBar);
        element.find(".progress").append(slider.element);

        return progressBar;
    }
}

export default ProgressBar;