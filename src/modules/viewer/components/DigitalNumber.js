import "./DigitalNumber.css";
import "src/assets/DigitalNumber.svg";
import { getSVG } from "src/modules/tools.js";
import UI from "src/modules/common.js";

const DigitalNumber = {
    numberLayout: [
        [0, 1, 2, 4, 5, 6],
        [0, 5],
        [6, 0, 4, 3, 2],
        [6, 3, 2, 5, 0],
        [1, 0, 3, 5],
        [2, 3, 6, 1, 5],
        [1, 2, 3, 4, 5, 6],
        [0, 5, 6],
        [0, 1, 2, 3, 4, 5, 6],
        [0, 1, 2, 3, 5, 6]
    ],

    build: async (className) => {
        let icon = await getSVG("DigitalNumber.svg", className);

        let element =
        $(/* html */`
        ${icon}
        `);

        let num = {
            element: element,

            turnOff: () => {
                for (let i = 0; i < 7; i++) {
                    UI.setFill(element.find(`#Fill${i}`), UI.DEACTIVATED_COLOR);
                    UI.setFilter(element.find(`#Fill${i}`), "");
                }
            },

            setNumber: (number) => {
                let layout = DigitalNumber.numberLayout[number];

                for (let i = 0; i < 7; i++) {
                    if (layout.includes(i)) {
                        UI.setFill(element.find(`#Fill${i}`), "url(#Gradient)");
                        UI.setFilter(element.find(`#Fill${i}`), `url(#Filter${i})`);
                    } else {
                        UI.setFill(element.find(`#Fill${i}`), UI.DEACTIVATED_COLOR);
                        UI.setFilter(element.find(`#Fill${i}`), "");
                    }
                }
            }
        }
        
        return num;
    }
}

export default DigitalNumber;