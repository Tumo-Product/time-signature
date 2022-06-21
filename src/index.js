import "./styles/global.css"
import "./styles/states.css";
import "./styles/colors.css";

import pluginAPI from "./modules/pluginAPI.js";
import { onLoad as viewerLoader } from "./modules/viewer/main.js";
import { onLoad as examinerLoader } from "./modules/examiner/main.js";
import AudioManager from "./modules/managers/AudioManager.js";
import Loader from "./modules/components/Loader.js";

const HEIGHT = 600;
export const lang = new URL(document.location.href).searchParams.get("lang") || "en";
import(`./styles/${lang === "am" ? "fonts_am" : "fonts"}.css`);

const onLoad = async () => {
    const loader = Loader.build();
    
    pluginAPI.setHeight(HEIGHT);
    let role = getRole();

    switch(role) {
        case "viewer":
            await viewerLoader();
            break;
        case "examiner":
            let answer = await pluginAPI.initialize();
            await examinerLoader(answer);
            break;
    }

    await AudioManager.setup();
    loader.hide();
}

const getRole = () => {
    let path = window.location.pathname.split("/").pop();
    return path.split('.')[0];
}

$(onLoad);