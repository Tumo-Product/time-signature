import "./NextButton.css";
import "src/assets/NextButton.svg";
import { getSVG } from "src/modules/tools.js";
import UI, { activateComponent, deactivateComponent, getProperties } from "src/modules/common.js";
import TaskManager from "../managers/TaskManager.js";

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
        NextButton.deactivate(element);

        element.click(TaskManager.nextTask);
        return element;
    },

    deactivate: () => {
        deactivateComponent($("#NextButton"), true);
    },

    activate: () => {
        activateComponent  (NextButton, $("#NextButton"), true);
    },

    hide: () => {
        $("#NextButton").remove();
    }
}

export default NextButton;