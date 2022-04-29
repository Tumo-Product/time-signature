import "./Lives.css";
import RadioButtons from "./RadioButtons.js";

const Lives = {
    _count: 3,

    get count() {
        return Lives._count;
    },
    set count (value) {
        Lives.buttons[Lives._count - 1].turnOff();
        Lives._count = value;

        if (Lives._count === 0) {
            console.log("game over");
        }
    },

    buttons: [],
    build: async () => {
        let template = $(/* html */ `<div id="Lives"></div>`);

        for (let i = 0; i < Lives.count; i++) {
            let button = await RadioButtons.build();
            template.append(button.element);
            button.changeColor("Red");
            Lives.buttons.push(button);
        }

        return template;
    }
}

export default Lives;