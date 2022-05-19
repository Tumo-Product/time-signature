import UI from "src/modules/common.js";
import { timeout } from "src/modules/tools.js";
import LevelManager from "../managers/LevelManager.js";
import "./Lives.css";
import CircleButtons from "./CircleButtons.js";
import WalkthroughManager from "../managers/WalkthroughManager.js";

const Lives = {
    _count: 3,

    get count() {
        return Lives._count;
    },
    set count(value) {
        Lives.buttons[Lives._count - 1].turnOff();
        Lives._count = value;

        if (Lives._count === 0) {
            LevelManager.nextTrack();
            WalkthroughManager.popupFailMsg();
        }
    },

    buttons: [],
    build: async () => {
        let template = $(/* html */ `<div id="Lives"></div>`);

        for (let i = 0; i < Lives.count; i++) {
            let button = await CircleButtons.build();
            template.append(button.element);
            UI.disable(button.element);
            button.changeColor("Red");
            Lives.buttons.push(button);
        }

        return template;
    },

    reset: () => {
        Lives._count = 3;
        
        for (let button of Lives.buttons) {
            button.changeColor("Red");
        }
    },

    hide: async() => {
        $("#Lives").addClass("hidden");
        await timeout(500);
        $("#Lives").remove();
    }
}

export default Lives;