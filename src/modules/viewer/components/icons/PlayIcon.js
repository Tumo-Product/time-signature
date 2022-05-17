import "src/assets/Play.svg";
import { getSVG } from "src/modules/tools.js";
import UI from "src/modules/common.js";

const PlayIcon = {
    get: async (blue) => {
        let icon = await getSVG("Play.svg", "playIcon", "BlueFilter");

        if (blue) {
            icon.asset = $(icon.asset);
            icon.asset.find("filter:eq(0)").remove();
            icon.asset.find("use:eq(0)").attr("filter", `url(#${icon.id})`);
        }

        return icon;
    },

    changeColor: (element, color) => {
        UI.setFill  (element, `url(#${color}Gradient)`);
    }
}

export default PlayIcon;