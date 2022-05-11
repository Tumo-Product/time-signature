import "./Beat.css";
import RadioButtons from "./RadioButtons.js";
import StatusIndicator from "./StatusIndicator.js";

const Beat = {
    build: async () => {
        let element =
        $(/* html */
        `<div class="beat">
            <div class="division"></div>
            <div class="statusIndicator">
                <div class="indicator"></div>
                <div class="indicator"></div>
            </div>
        </div>`
        );

        let button = await RadioButtons.build("beatButton");
        let statusIndicator = await StatusIndicator.build();
        element.append(button.element);
        element.append(statusIndicator.element);
        button.turnOff(true);

        let beat = {
            element: element,
            button: button,
            statusIndicator: statusIndicator,

            state: "off",

            changeState: (state) => {
                beat.state = state;
                
                button.changeColor(state === "correct" ? "Green" : "Red");
                statusIndicator.changeState(state);
            }
        }

        return beat;
    }
}

export default Beat;