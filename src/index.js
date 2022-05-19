import "./styles/fonts.css";
import "./styles/global.css"
import "./styles/states.css";
import "./styles/colors.css";

import pluginAPI from "./modules/pluginAPI.js";
import { onLoad as viewerLoader } from "./modules/viewer/main.js";
import { onLoad as examinerLoader } from "./modules/examiner/main.js";

const HEIGHT = 600;

const onLoad = async () => {
    pluginAPI.setHeight(HEIGHT);
    let role = getRole();

    switch(role) {
        case "viewer":
            viewerLoader();
            break;
        case "examiner":
            let answer = await pluginAPI.initialize();
            examinerLoader(answer);
            break;
    }
}

const getRole = () => {
    let path = window.location.pathname.split("/").pop();
    return path.split('.')[0];
}

$(onLoad);