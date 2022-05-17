import view from "./view.js";
import LevelManager from "./managers/LevelManager.js";

export const onLoad = async () => {
    await view.start.build();
}

export const begin = async () => {
    await view.start.hide();
    await view.timeline.build("easy", 4);
    await view.timeline.buildSignature();
    LevelManager.nextLevel();
}