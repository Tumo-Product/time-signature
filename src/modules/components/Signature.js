import { getSVG } from "src/modules/tools.js";
import DigitalNumber from "./DigitalNumber.js";
import "src/assets/Bar.svg";
import "./Signature.css";
import UI from "src/modules/common.js";

const Signature = {
    build: async () => {
        let upperElement = await DigitalNumber.build("upper");
        let lowerElement = await DigitalNumber.build("lower");
        let bar = await Bar.build();
        let element = $(/* html */ `<div class="signature"></div>`);

        element.append(upperElement.element);
        element.append(bar.element);
        element.append(lowerElement.element);
        
        const signature = {
            element: element,
            enabled: false,

            set: async (upperSignature, lowerSignature) => {
                signature.enabled = true;
                let waitTime = upperElement.animate(signature); lowerElement.animate(signature);
                await waitTime;
                if (!signature.enabled) return; // If state changed while animating then don't activate number.                
                upperElement.setNumber(upperSignature);
                lowerElement.setNumber(lowerSignature);
                bar.enable();
            },

            turnOff: () => {
                signature.enabled = false;
                upperElement.turnOff();
                lowerElement.turnOff();
                bar.disable();
            },

            hide: () => {
                element.remove();
            },

            highlight: () => {
                element.addClass("highlighted");
                signature.set(5, 4);
            },

            resetHighlight: () => {
                signature.turnOff();
                element.removeClass("highlighted");
            }
        }

        return signature;
    }
}

const Bar = {
    build: async () => {
        let icon = await getSVG("Bar.svg", "bar");
        let element = $(icon);

        const bar = {
            element: element,
            disable: () => {
                UI.setFill(element, UI.DEACTIVATED_COLOR);
                UI.setFilter(element, "");
            },
            enable: () => {
                UI.setFill(element, "url(#BarGradient)");
                UI.setFilter(element, "url(#BarFilter)");
            }
        }
        return bar;
    }
}

export default Signature;