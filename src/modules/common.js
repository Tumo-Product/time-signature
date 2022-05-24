import "src/assets/Circle.svg";
import { getSVG } from "./tools.js";

const UI = {
    DEACTIVATED_COLOR: "#212427",

    getCircle: async () => {
        if (!UI.circleIcon) {
            UI.circleIcon = await getSVG("Circle.svg", "circleSvg");
        }
        
        return UI.circleIcon;
    },

    addPulse: (element) => element.addClass("pulsing"),
    removePulse: (element) => element.removeClass("pulsing"),

    disable: (element) => element.addClass("disabled"),
    enable: (element) => element.removeClass("disabled"),
    
    // Use is the tag that contains the path(shape), filters(blur for example) and fills(gradient or solid color) of an svg.
    setFill: (icon, fill) => icon.find("use:eq(1)").attr("fill", fill),
    setFilter: (icon, filter) => icon.find("use:eq(0)").attr("filter", filter),
    getFill: (icon) => icon.find("use:eq(1)").attr("fill"),
    getFilter: (icon) => icon.find("use:eq(0)").attr("filter")
}

export const deactivateComponent = (element, disable) => {
    UI.setFill(element.find("svg"), UI.DEACTIVATED_COLOR);
    UI.setFilter(element.find("svg"), "");
    if (disable) UI.disable(element);
}

export const activateComponent = (component, element, enable) => {
    if (component.fill && component.filter) {
        UI.setFill(element.find("svg"), component.fill);
        UI.setFilter(element.find("svg"), component.filter);
    }
    if (enable) UI.enable(element);
}

export const getSvgProperties = (component, element) => {
    component.fill = UI.getFill(element.find("svg"));
    component.filter = UI.getFilter(element.find("svg"));
}

export default UI;