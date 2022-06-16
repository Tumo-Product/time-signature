import StartButton from "../components/StartButton.js";
import Headphones from "../components/Headphones.js";
import Header from "../components/Header.js";
import Rails from "../components/Rails.js";
import Lives from "../components/Lives.js";
import NextButton from "../components/NextButton.js";
import Signature from "../components/Signature.js";
import texts from "src/texts.json";
import { timeout } from "src/modules/tools.js";
import Popup from "../components/Popup.js";
let container = $(".container");

const view = {
    popup: Popup.build(),

    highlight: (element) => {
        if (element instanceof $) {
            element.addClass("highlighted");
        } else {
            element.highlight();
        }
    },
    resetHighlight: (element) => {
        if (element instanceof $) {
            element.removeClass("highlighted");
        } else {
            element.resetHighlight();
        }
    },

    start: {
        build: async (lang) => container.append([ await Headphones.build(texts[lang].headphones), Header.build(texts[lang].header), await StartButton.build(texts[lang].startButton) ]),
        hide: async () => {
                    Headphones.hide();
                    Header.hide();
            await   StartButton.hide();
        },
    },

    timeline: {
        build: async () => {
            container.append(view.popup.element);

            container.append(Rails.build());
            container.append(await Lives.build());
            container.append(await NextButton.build());
        },

        buildSignature: async () => {
            let signature = await Signature.build();
            container.append(signature.element);
            view.mainSignature = signature;
        },

        hide: async () => {
            Lives.hide();
            NextButton.hide();
            view.mainSignature.hide();
        }
    },

    final: {
        build: async (levels) => {
            for (let level of levels) {
                level.addSignature();
            }

            await timeout(700);

            for (let i = levels.length - 1; i >= 0; i--) {
                $(`#${levels[i].id}`).addClass(`${levels[i].id}FinalPosition`);
                await timeout(300);
            }
        }
    }
}


export default view;