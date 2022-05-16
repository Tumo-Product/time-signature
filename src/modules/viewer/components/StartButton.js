import "./StartButton.css";
import PlayIcon from "./icons/PlayIcon";

import StartTip from "./tips/StartTip.js";
import { begin } from "./../main.js";
import { timeout, getSVG } from "../../tools.js";

let btn;

const StartButton = {
    build: async () => {
        let icon = await PlayIcon.get();
        icon = icon.asset;

        let element = 
        $(/* html */ `
            <div id="StartButton" class="button"></div>
            ${StartTip.getTemplate()}
        `);

        btn = element.first();
        btn.append(icon);
        StartButton.events.bind();
        return element;
    },

    hide: async () => {
        $("#StartButton").addClass("hidden");
        await timeout(1000);
        $("#StartButton").remove();
    },

    events: {
        bind: () => {
            btn.on("click", StartButton.events.click);
            btn.hover(StartButton.events.hover);
        },
        click: () => {
            $("#StartButton").off("click");
            begin();
        },
        hover: () => {
            StartTip.hide();
        }
    }
}

export default StartButton;