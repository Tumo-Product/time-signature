import PlayIcon from "./icons/PlayIcon.js";
import { getSVG } from "src/modules/tools.js";
import "src/assets/Pause.svg";
import "./PlaybackButton.css";

const PlaybackButton = {
    build: async () => {
        let play = await PlayIcon.get(true);
        let playIcon = $(play.asset);
        
        let pause = await getSVG("Pause.svg", "pauseIcon", "BlueFilter");
        let pauseIcon = pause.asset;
        
        let element =
        $(/* html */ `
            <div class="button playback">
                ${pauseIcon}
            </div>
        `);

        PlayIcon.changeColor(playIcon, "Blue");
        element.append(playIcon);

        let btn = {
            element: element,
            play    : () => { element.addClass("paused"); },
            pause   : () => { element.removeClass("paused"); }
        }

        return btn;
    }
}

export default PlaybackButton;