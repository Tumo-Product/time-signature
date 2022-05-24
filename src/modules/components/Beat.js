import UI from "src/modules/common.js";
import "./Beat.css";
import CircleButtons from "./CircleButtons.js";
import StatusIndicator from "./StatusIndicator.js";

const Beat = {
    build: async () => {
        let element =
        $(/* html */ `
            <div class="beat">
                <div class="division"></div>
            </div>
        `);

        let button = await CircleButtons.build("beatButton");
        let statusIndicator = await StatusIndicator.build();
        element.append(button.element);
        element.append(statusIndicator.element);

        let beat = {
            element: element,
            button: button,
            statusIndicator: statusIndicator,

            state: "off",

            changeLook: (state) => {
                beat.state = state;
                
                button.changeColor(state === "correct" ? "Green" : "Red");
                statusIndicator.changeLook(state);
            },

            highlight: () => {
                
                UI.addPulse(button.element);
                button.element.on("click", beat.resetHighlight);
            },
            resetHighlight: () => UI.removePulse(button.element)
        }

        return beat;
    }
}

export default Beat;