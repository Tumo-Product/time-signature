import PlaybackButton from "./PlaybackButton.js";
import AudioManager from "../managers/AudioManager.js";
import "./ProgressBar.css";

export const PROGRESS_WIDTH = 782;

const ProgressBar = {
    build: async (index) => {
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
            audio: AudioManager.tracks[index],

            pause: () => {
                playbackButton.pause();
                cancelAnimationFrame(progressBar.animationId);
            },

            play: () => {
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
                let width = PROGRESS_WIDTH * (progressBar.audio.currentTime / progressBar.audio.duration);
                $(".progress").css("width", `${width}px`);
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
            }
        }

        return progressBar;
    }
}

export default ProgressBar;