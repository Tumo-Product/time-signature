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

        const slider = {
            element: element,
            pressedDown: false,

            bindEvents: () => {
                element.on("mousedown", () => slider.pressedDown = true);
                levelContainer.on("mouseup", () => slider.pressedDown = false);
                levelContainer.on("mouseleave", () => slider.pressedDown = false);

                let progress = progressBar.element.find(".progress");

                progressBar.element.on("click", (event) => {
                    let target = $(event.target);
                    
                    if (target.hasClass("progressBar") || target.hasClass("progress"))
                    {
                        let oldWidth = parseFloat(progress.css("width"));
                        progress.css("width", event.clientX - 63);
                        let newWidth = parseFloat(progress.css("width"));
                        
                        let diff = newWidth - oldWidth;
                        let multiplier = diff / PROGRESS_WIDTH;
                        let amount = (progressBar.duration || 0) * multiplier;

                        AudioManager.scrub(index, amount);
                    }
                });
            }
        }

        slider.bindEvents();
        return slider;
    }
}

export default Slider;