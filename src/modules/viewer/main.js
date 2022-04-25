import view from "./view.js";

export const onLoad = async () => {
    await view.start.build();
}

export const begin = () => {
    view.start.begin();
}