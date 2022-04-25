import StartButton from "./components/StartButton.js";
import Headphones from "./components/Headphones.js";
import Header from "./components/Header.js";

const view = {
    start: {
        elements: [Headphones, Header, StartButton],

        build: async () => {
            $(".container").append(await Headphones.build());
            $(".container").append(await Header.build());
            $(".container").append(await StartButton.build());
        },

        begin: async () => {
            for (const element of view.start.elements) {
                await element.hide();
            }
        }
    }
}


export default view;