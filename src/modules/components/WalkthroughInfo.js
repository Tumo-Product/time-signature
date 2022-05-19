import "./WalkthroughInfo.css";
import { timeout } from "src/modules/tools.js";
import Circles from "./Circles.js";
import WalkthroughManager from "../managers/WalkthroughManager.js";

let currCircle = -1;

const WalkthroughInfo = {
    build: (circlesCount) => {
        let element =
        $(/* html */ `
            <div id="WalkthroughInfo" class="invisible">
                <div class="textContainer">
                    <p class="title"></p>
                    <p class="description"></p>
                </div>

                <div class="controls">
                    <p id="next">Next</p>
                </div>
            </div>
        `);

        let circles = Circles.build(circlesCount);
        element.find(".controls").prepend(circles.element);
        element.find("#next").on("click", WalkthroughManager.nextStep);

        let title = element.find(".title");

        const info = {
            element: element,

            hideNext: () => element.find("#next").hide(),
            changeVisibility: async (show) => {
                if (show) {
                    element.removeClass("invisible");
                } else {
                    element.addClass("invisible");
                }

                await timeout(300);
            },

            setPosition: (pos) => element.css({ left: pos.x, top: pos.y }),
            setTitle: (text) => {
                if (!text) {
                    title.hide();
                    return;
                }

                title.show();
                title.html(text);
            },
            setDescription: (text) => element.find(".description").html(text),

            updateCircles: (amount) => {
                if (currCircle > -1) circles.turnOff(currCircle || 0)
                currCircle += amount;
                circles.turnOn(currCircle);
            }
        }

        return info;
    }
}

export default WalkthroughInfo;