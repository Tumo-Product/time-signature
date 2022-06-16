import view from "./view.js";
import LevelManager from "../managers/LevelManager.js";
import { timeout } from "../tools.js";
import WalkthroughManager from "../managers/WalkthroughManager.js";

const lang = new URL(document.location.href).searchParams.get("lang") || "en";

export const onLoad = async () => await view.start.build(lang);
export const begin  = async () => {
    await view.start.hide();
    await view.timeline.build();
    await view.timeline.buildSignature();

    view.mainSignature.turnOff();
    await timeout(200);
    await LevelManager.nextLevel();

    await timeout(400);
    WalkthroughManager.setup(lang);
}