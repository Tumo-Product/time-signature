import view from "./view.js";
import TaskManager from "./managers/TaskManager.js";

export const onLoad = async () => {
    await view.start.build();
}

export const begin = async () => {
    await view.start.hide();
    await view.timeline.build("easy", 4);
    TaskManager.nextTask();
}