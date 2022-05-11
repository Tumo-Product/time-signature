import "./NextButton.css";
import "src/assets/NextButton.svg";
import { getSVG, timeout } from "src/modules/tools.js";
import UI, { activateComponent, deactivateComponent, getProperties } from "src/modules/common.js";
import TaskManager from "../managers/TaskManager.js";

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
        
        getProperties(NextButton, element);
        btn = element;
        NextButton.deactivate();
        element.click(TaskManager.nextTask);
        return element;
    },

    deactivate: () => {
        deactivateComponent(btn, true);
    },

    activate: () => {
        activateComponent  (NextButton, btn, true);
    },

    hide: () => {
        btn.remove();
    }
}

export default NextButton;