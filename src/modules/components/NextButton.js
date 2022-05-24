import "./NextButton.css";
import "src/assets/NextButton.svg";
import { getSVG } from "src/modules/tools.js";
import { activateComponent, deactivateComponent, getSvgProperties } from "src/modules/common.js";
import LevelManager from "../managers/LevelManager.js";
import WalkthroughManager from "../managers/WalkthroughManager.js";
import AudioManager from "../managers/AudioManager.js";

let btn;

const NextButton = {
    build: async () => {
        let icon = await getSVG("NextButton.svg", "nextBtn");

        let element = 
        $(/* html */ `
            <div id="NextButton" class="button">
                ${icon}
            </div>
        `);
        
        getSvgProperties(NextButton, element);
        btn = element;
        NextButton.deactivate();
        element.on("click", () => {
            AudioManager.playSoundFX("nextButtonClick");

            if (LevelManager.current === 0) WalkthroughManager.end();
            LevelManager.nextLevel();
        });
        return element;
    },

    deactivate: () => {
        deactivateComponent(btn, true);
        btn.removeClass("enabled");
    },

    activate: () => {
        AudioManager.playSoundFX("nextLevel");
        activateComponent(NextButton, btn, true);
        btn.addClass("enabled");
    },

    hide: () => {
        btn.addClass("hidden");
    }
}

export default NextButton;