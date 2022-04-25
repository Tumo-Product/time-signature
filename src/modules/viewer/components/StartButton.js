import "./StartButton.css";
import "src/assets/StartButton.svg";

import StartTip from "./tips/StartTip.js";
import { begin } from "./../main.js";
import { timeout, getSVG } from "../../tools.js";

const StartButton = {
    build: async () => {
        let icon = await getSVG("StartButton.svg");

        let element = 
        $(/* html */ `
        <div id="StartButton" class="button circle playback">
            ${icon}
        </div>
        ${StartTip.getTemplate()}
        `);

        StartButton.events.bind(element.first());
        return element;
    },

    hide: async () => {
        $("#StartButton").addClass("hidden");
        await timeout(1000);
    },

    events: {
        bind: (element) => {
            element.click(StartButton.events.click);
            element.hover(StartButton.events.hover);
        },
        click: () => {
            $("#StartButton").unbind("click");
            begin();
        },
        hover: () => {
            $("#StartButton").unbind("hover mouseenter mouseleave");
            StartTip.hide();
        }
    }
}

export default StartButton;