import "src/assets/Play.svg";
import { getSVG } from "src/modules/tools.js";
import UI from "src/modules/common.js";

const PlayIcon = {
    get: async () => {
        if (PlayIcon.asset === undefined) {
            PlayIcon.asset = await getSVG("Play.svg", "playIcon");
        }

        return PlayIcon.asset;
    },

    changeColor: (element, color) => {
        UI.setFill  (element, `url(#${color}Gradient)`);
        UI.setFilter(element, `url(#${color}Filter)`);
    },
}

export default PlayIcon;