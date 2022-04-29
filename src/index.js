import "./styles/fonts.css";
import "./styles/global.css"
import "./styles/states.css";

import pluginAPI from "./modules/pluginAPI.js";

import { onLoad as viewerLoader } from "./modules/viewer/main.js";
import { onLoad as editorLoader } from "./modules/editor/main.js";

const HEIGHT = 600;
let role;

const onLoad = async () => {
    pluginAPI.setHeight(HEIGHT);
    await pluginAPI.initialize();
    role = getRole();

    switch (role) {
        case "viewer":
            viewerLoader();
            break;
        case "editor":
            editorLoader();
            break;
        default:
            break;
    }
}

const getRole = () => {
    let path = window.location.pathname.split("/").pop();
    let role = path.substring(path.indexOf("/") + 1, path.lastIndexOf("."));
    return role;
}

$(onLoad);