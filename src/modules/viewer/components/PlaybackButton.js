import PlayIcon from "./icons/PlayIcon.js";
import { getSVG } from "src/modules/tools.js";
import "src/assets/Pause.svg";
import "./PlaybackButton.css";

const PlaybackButton = {
    build: async () => {
        let playIcon = $(await PlayIcon.get());
        let pauseIcon = await getSVG("Pause.svg", "pauseIcon");

        let element =
        $(/* html */ `
        <div class="button playback">
            ${pauseIcon}
        </div>
        `);

        PlayIcon.changeColor(playIcon, "Blue");
        element.append(playIcon);

        let playbackButton = {
            element: element,
            play    : () => { element.addClass("paused"); },
            pause   : () => { element.removeClass("paused"); }
        }

        return playbackButton;
    }
}

export default PlaybackButton;