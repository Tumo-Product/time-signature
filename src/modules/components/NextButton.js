import "./NextButton.css";
import "src/assets/NextButton.svg";
import { getSVG } from "src/modules/tools.js";
import { activateComponent, deactivateComponent, getSvgProperties } from "src/modules/common.js";
import LevelManager from "../managers/LevelManager.js";
import WalkthroughManager from "../managers/WalkthroughManager.js";

let btn;

const NextButton = {
    build: async () => {
        let icon = await getSVG("NextButton.svg");

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
            if (LevelManager.current === 0) WalkthroughManager.end();
            LevelManager.nextLevel();
        });
        return element;
    },

    deactivate: () => {
        deactivateComponent(btn, true);
    },

    activate: () => {
        activateComponent(NextButton, btn, true);
    },

    hide: () => {
        btn.remove();
    }
}

export default NextButton;