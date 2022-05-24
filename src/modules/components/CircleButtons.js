import "./CircleButtons.css";
import UI, { deactivateComponent } from "src/modules/common.js";

const CircleButtons = {
    build: async (className) => {
        let icon = await UI.getCircle();
        className = className ? className : "";

        let element = 
        $(/* html */ `
            <div class="button ${className}">
                ${icon}
            </div>
        `);

        let circleSvg = element.find(".circleSvg");

        let radioButton = {
            element: element,
            state: "off",

            changeColor: (color) => {
                element.addClass("disabled");
                radioButton.state = color;

                circleSvg.addClass("flip");
                setTimeout(() => circleSvg.removeClass("flip"), 500);

                circleSvg.find("use").removeClass("current");
                circleSvg.find(`.${color}`).addClass("current");
                UI.setFilter(circleSvg, `url(#${color}OvalFilter)`);
            },

            turnOff: (enable) => {
                radioButton.state = "Off";

                circleSvg.addClass("flip");
                setTimeout(() => circleSvg.removeClass("flip"), 500);

                circleSvg.find("use").removeClass("current");
                circleSvg.find(`.Off`).addClass("current");
                UI.setFilter(circleSvg, "");
                if (enable) element.removeClass("disabled");
            },
        }

        return radioButton;
    },
}

export default CircleButtons;