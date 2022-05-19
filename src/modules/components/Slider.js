import "./Slider.css";
import { PROGRESS_WIDTH } from "./ProgressBar.js";
import AudioManager from "../managers/AudioManager.js";

const Slider = {
    build: (index, levelContainer, progressBar) => {
        let element =
        $(/* html */ `
            <div class="button slider">
                <div class="backdrop"></div>
                <div class="circle"></div>
            </div>
        `);

        let progress = progressBar.element.find(".progress");

        const slider = {
            element: element,
            pressedDown: false,
            oldWidth: 0,

            bindEvents: () => {
                element.on("mousedown", (event) => {
                    progressBar.pause();
                    slider.pressedDown = true;
                    AudioManager.tracks[index].pause();

                    slider.oldWidth = parseFloat(progress.css("width"));
                });

                const endMove = (event) => {
                    if (!slider.pressedDown) return;
                    slider.scrub(event);
                }

                levelContainer.on("mouseup", endMove);
                levelContainer.on("mouseleave", endMove);
                levelContainer.on("mousemove", (event) => {
                    let width = event.clientX - 63;
                    if (width > PROGRESS_WIDTH) width = PROGRESS_WIDTH;
                    if (slider.pressedDown) progress.css("width", width);
                });

                progressBar.element.on("click", (event) => {
                    let target = $(event.target);
                    
                    if (target.hasClass("progressBar") || target.hasClass("progress")) {
                        slider.oldWidth = parseFloat(progress.css("width"));
                        slider.scrub(event);
                    }
                });
            },

            scrub: (event) => {
                slider.pressedDown = false;
                let width = event.clientX - 63;
                if (width > PROGRESS_WIDTH) width = PROGRESS_WIDTH;
                progress.css("width", width);
                let newWidth = parseFloat(progress.css("width"));
                
                let diff = newWidth - slider.oldWidth;
                let multiplier = diff / PROGRESS_WIDTH;
                let amount = (progressBar.duration || 0) * multiplier;

                AudioManager.scrub(index, amount);
            }
        }

        slider.bindEvents();
        return slider;
    }
}

export default Slider;