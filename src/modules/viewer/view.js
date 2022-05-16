import StartButton from "./components/StartButton.js";
import Headphones from "./components/Headphones.js";
import Header from "./components/Header.js";
import Rails from "./components/Rails.js";
import Lives from "./components/Lives.js";
import NextButton from "./components/NextButton.js";
import Signature from "./components/Signature.js";

import { timeout } from "src/modules/tools.js";
let container = $(".container");

const view = {
    start: {
        build: async () => {
            container.append([ await Headphones.build(), Header.build(), await StartButton.build() ]);
        },

        hide: async () => {
                    Headphones.hide();
                    Header.hide();
            await   StartButton.hide();
        },
    },

    timeline: {
        build: async () => {
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
        build: async (levels, levelsData) => {
            for (let level of levels) {
                level.addSignature();
            }

            await timeout(700);

            for (let level of levelsData.reverse()) {
                $(`#${level.name}`).addClass(`${level.name}FinalPosition`);
                await timeout(300);
            }
        }
    }
}


export default view;