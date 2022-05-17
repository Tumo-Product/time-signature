import "./styles/fonts.css";
import "./styles/global.css"
import "./styles/states.css";
import "./styles/colors.css";

import pluginAPI from "./modules/pluginAPI.js";
import { onLoad as viewerLoader } from "./modules/viewer/main.js";

const HEIGHT = 600;

const onLoad = async () => {
    pluginAPI.setHeight(HEIGHT);
    await pluginAPI.initialize();
    // TODO: Implement all views.
    viewerLoader();
}

const getRole = () => {
    let path = window.location.pathname.split("/").pop();
    return path.split('.')[0];
}

$(onLoad);