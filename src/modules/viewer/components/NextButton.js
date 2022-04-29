import "./NextButton.css";
import "src/assets/NextButton.svg";
import { getSVG } from "src/modules/tools.js";
import UI, { activateComponent, deactivateComponent, getProperties } from "src/modules/common.js";

const NextButton = {
    build: async () => {
        let icon = await getSVG("NextButton.svg");

        let template = 
        $(/* html */ `
        <div id="NextButton" class="button">
            ${icon}
        </div>
        `);
        
        getProperties(NextButton, template);
        NextButton.deactivate(template);
        return template;
    },

    deactivate: (element) => {
        deactivateComponent(element !== undefined ? element : $("#NextButton"), true);
    },

    activate: (element) => {
        activateComponent  (NextButton, element !== undefined ? element : $("#NextButton"), true);
    }
}

export default NextButton;