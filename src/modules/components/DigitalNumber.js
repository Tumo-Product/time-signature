import "src/assets/DigitalNumber.svg";
import { getSVG, timeout } from "src/modules/tools.js";
import UI from "src/modules/common.js";

const DigitalNumber = {
    /*
    The digital number has differnet parts and each one has an index,
    when we enable a number it lights up specific parts, laid out in this array.
    */
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

    animationOrder: [6, 0, 5, 2, 4, 1],

    build: async (className) => {
        let icon = await getSVG("DigitalNumber.svg", className);

        let element = $(/* html */`${icon}`);

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
                num.turnOff();

                for (let i = 0; i < 7; i++) {
                    if (layout.includes(i)) {
                        UI.setFill(element.find(`#Fill${i}`), "url(#Gradient)");
                        UI.setFilter(element.find(`#Fill${i}`), `url(#Filter${i})`);
                    }
                }
            },

            animate: async () => {
                for (let cycle = 0; cycle < 2; cycle++) {
                    for (let [index, segmentIndex] of DigitalNumber.animationOrder.entries()) {
                        num.turnOff();

                        UI.setFill(element.find(`#Fill${segmentIndex}`), "url(#Gradient)");
                        UI.setFilter(element.find(`#Fill${segmentIndex}`), `url(#Filter${segmentIndex})`);
                        await timeout(100);

                        if (cycle === 1 && index === 2) { // Do one and a half flip.
                            return;
                        }
                    }
                }
            }
        }
        
        return num;
    }
}

export default DigitalNumber;