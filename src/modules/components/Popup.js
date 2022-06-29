import "src/assets/texture.png";
import WalkthroughManager, { focusElements, STEPS_COUNT } from "../managers/WalkthroughManager.js";
import "./Popup.css";
import WalkthroughInfo from "./WalkthroughInfo.js";
import view from "../viewer/view.js";

const Popup = {
    build: () => {
        let element =
        $(/* html */ `
            <div id="Popup" class="invisible disabled">
                <p class="header"></p>
                <div class="minus"><div class="pulsing"></div></div>

                <div id="Blur" class="disabled">
                    <div class="texture"></div>
                </div>
            </div>
        `);

        let blur = element.find("#Blur");
        let header = element.find(".header");
        let minus = element.find(".minus");

        const popup = {
            element: element,
            info: WalkthroughInfo.build(STEPS_COUNT),
            
            show: () => element.removeClass("invisible"),
            hide: () => element.addClass("invisible"),
            showBlur: () => blur.removeClass("disabled"),
            hideBlur: () => blur.addClass("disabled"),
            setHeader: (text) => header.html(text),

            initFailState: (inFocus) => {
                header.hide().addClass("failState");
                minus.hide().addClass("failState");
                minus.off("click", WalkthroughManager.nextStep);
                minus.on("click", () => popup.hideFailPopup(inFocus));
            },

            hideFailPopup: (inFocus) => {
                popup.hideBlur();
                header.hide();
                minus.hide();
                blur.css("z-index", 0);

                view.resetHighlight(focusElements[inFocus]);
            },

            showFailPopup: (text) => {
                popup.show();
                blur.css("z-index", 1);
                popup.showBlur();
                popup.setHeader(text);
                header.show();
                minus.show();
            }
        }
        
        element.append(popup.info.element);
        minus.on("click", WalkthroughManager.nextStep);
        return popup;
    }
}

export default Popup;