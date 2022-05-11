import UI, { deactivateComponent } from "src/modules/common.js";

const RadioButtons = {
    build: async (className) => {
        let icon = await UI.getOval();
        className = className !== undefined ? className : "";

        let element = 
        $(/* html */ `
        <div class="button ${className}">
            ${icon}
        </div>
        `);

        let radioButton = {
            element: element,
            state: "Green",

            changeColor: (color) => {
                element.addClass("disabled");
                radioButton.state = color;
                UI.setFill  (element.find("svg"), `url(#${color}OvalGradient)`);
                UI.setFilter(element.find("svg"), `url(#${color}OvalFilter)`);
            },

            turnOff: (enable) => {
                radioButton.state = "Off";
                deactivateComponent(element);
                if (enable) element.removeClass("disabled");
            },
        }

        return radioButton;
    },
}

export default RadioButtons;