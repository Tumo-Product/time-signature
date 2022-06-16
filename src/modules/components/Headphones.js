import "src/assets/Headphones.svg";
import "./Headphones.css";

import HeadphonesTip from "./tips/HeadphonesTip.js";
import { getSVG } from "src/modules/tools.js";

const Headphones = {
    build: async (text) => {
        let icon = await getSVG("Headphones.svg");

        let template = /* html */
        `
            ${HeadphonesTip.getTemplate(text)}
            <div id="Headphones">${icon}</div>
        `;

        return template;
    },

    hide: () => {
        HeadphonesTip.hide();
        $("#Headphones").addClass("invisible");
    }
}

export default Headphones;