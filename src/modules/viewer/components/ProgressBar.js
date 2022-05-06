import PlaybackButton from "./PlaybackButton.js";
import AudioManager from "../managers/AudioManager.js";
import "./ProgressBar.css";
import TaskManager from "../managers/TaskManager.js";

export const PROGRESS_WIDTH = 782;

const ProgressBar = {
    build: async (index, divider) => {
        let playbackButton = await PlaybackButton.build();

        let element =
        $(/* html */ `
        <div class="progressBar">
            <div class="progress">
                <div class="button slider">
                    <div class="backdrop"></div>
                    <div class="circle"></div>
                </div>
            </div>
        </div>
        `);

        element.append(playbackButton.element);

        const progressBar = {
            element: element,
            playbackButton: playbackButton,
            audio: AudioManager.tracks[TaskManager.current],
            divider: divider,

            pause: () => {
                playbackButton.pause();
                cancelAnimationFrame(progressBar.animationId);
            },

            play: () => {
                progressBar.audio = AudioManager.tracks[TaskManager.current];
                playbackButton.play();
                progressBar.update();
            },

            bindEvents: (beats) => {
                progressBar.beats = beats;

                playbackButton.element.click(() => {
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
                let duration = progressBar.audio.duration / progressBar.divider;

                if (currTime >= duration) {
                    currTime -= duration;
                }

                let width = PROGRESS_WIDTH * (currTime / duration);
                
                element.find(".progress").css("width", `${width}px`);
                progressBar.animationId = requestAnimationFrame(progressBar.update);

                let beats = progressBar.beats;
                let index = Math.floor(width / (PROGRESS_WIDTH/beats.length));
                
                for (let i = 0; i < beats.length; i++) {
                    let sid = beats[i].statusIndicator;

                    if (i === index) {
                        sid.changeState("near");
                    } else {
                        sid.changeState("off");
                    }
                }
            },

            reset: (beats, divider) => {
                progressBar.audio = AudioManager.tracks[TaskManager.current];
                element.find(".progress").css("width", 0);
                progressBar.beats = beats;
                progressBar.divider = divider;
            }
        }

        return progressBar;
    }
}

export default ProgressBar;