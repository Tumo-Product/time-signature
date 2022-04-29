import "src/assets/Oval.svg";
import { getSVG } from "./tools.js";

const UI = {
    DEACTIVATED_COLOR: "#212427",

    getOval: async () => {
        if (UI.ovalIcon === undefined) {
            UI.ovalIcon = await getSVG("Oval.svg");
        }
        
        return UI.ovalIcon;
    },

    disable: (element) => {
        element.addClass("disabled");
    },
    enable: (element) => {
        element.removeClass("disabled");
    },
    setFill: (icon, fill) => {
        icon.find("use:eq(1)").attr("fill", fill);
    },
    setFilter: (icon, filter) => {
        icon.find("use:eq(0)").attr("filter", filter);
    },

    getFill: (icon) => {
        return icon.find("use:eq(1)").attr("fill");
    },
    getFilter: (icon) => {
        return icon.find("use:eq(0)").attr("filter");
    }
}

export const deactivateComponent = (element, disable) => {
    UI.setFill(element.find("svg"), UI.DEACTIVATED_COLOR);
    UI.setFilter(element.find("svg"), "");
    if (disable) UI.disable(element);
}

export const activateComponent = (component, element, enable) => {
    if (component.fill !== undefined && component.filter !== undefined) {
        UI.setFill(element.find("svg"), component.fill);
        UI.setFilter(element.find("svg"), component.filter);
    }
    if (enable) UI.enable(element);
}

export const getProperties = (component, element) => {
    component.fill = UI.getFill(element.find("svg"));
    component.filter = UI.getFilter(element.find("svg"));
}

export default UI;