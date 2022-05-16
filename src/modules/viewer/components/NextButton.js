import "./NextButton.css";
import "src/assets/NextButton.svg";
import { getSVG } from "src/modules/tools.js";
import { activateComponent, deactivateComponent, getSvgProperties } from "src/modules/common.js";
import LevelManager from "../managers/LevelManager.js";

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
        element.on("click", LevelManager.nextLevel);
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