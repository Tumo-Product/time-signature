import view from "../viewer/view.js";
import walkthrough from "src/walkthrough.json";
import LevelManager from "./LevelManager.js";
import { timeout } from "src/modules/tools.js";

const CALL_FOR_ACTION_AWAIT_MS = 5000;
export const STEPS_COUNT = 6;

let firstBeatStep = 4;

export let focusElements = {};
let firstFail = true;
let ended = false;
let inFocus;

const WalkthroughManager = {
    currStep: -1,

    setup: () =>  {
        focusElements["Lives"] = $("#Lives");
        focusElements["Signature"] = view.mainSignature;
        focusElements["ProgressBar"] = LevelManager.levels[0].progressBar;
        focusElements["Level"] = LevelManager.levels[0];
        focusElements["Beat"] = LevelManager.levels[0].getCorrectBeat();

        view.popup.show();
        view.popup.showBlur();
        view.popup.setHeader(walkthrough.header);
    },

    popupFirstFailMsg: () => {
        if (!firstFail) return;
        firstFail = false;
        view.popup.showFailPopup(walkthrough.firstFail.header);
        view.highlight(focusElements[walkthrough.firstFail.inFocus]);
    },

    popupFailMsg: () => {
        walkthrough.steps[firstBeatStep].hideBlur = false;
        
        focusElements["Beat"] = LevelManager.levels[0].getCorrectBeat(1);
        view.popup.showFailPopup(walkthrough.trackFailed.header);
        view.highlight(focusElements[walkthrough.trackFailed.inFocus]);
        view.popup.info.updateCircles(-1);

        if (!ended) WalkthroughManager.nextStep(firstBeatStep);
    },

    callForAction: async () => {
        await timeout(CALL_FOR_ACTION_AWAIT_MS);
        focusElements["Beat"] = LevelManager.levels[0].getCorrectBeat();
        if (!focusElements["Beat"]) return;
        
        let currStep = walkthrough.callForAction;
        if (inFocus) view.resetHighlight(inFocus);

        let infoAnimationDelay = view.popup.info.changeVisibility(false);
        WalkthroughManager.handleParameters(currStep);

        await infoAnimationDelay;
        WalkthroughManager.changeInfo(currStep);
    },

    nextStep: async (goBackTo) => {
        if (inFocus) view.resetHighlight(inFocus);
        let infoAnimationDelay;

        if (WalkthroughManager.currStep === -1) view.popup.initFailState();
        else infoAnimationDelay = view.popup.info.changeVisibility(false);
        
        if (parseInt(goBackTo)) WalkthroughManager.currStep = goBackTo;
        else WalkthroughManager.currStep++;
        let currStep = walkthrough.steps[WalkthroughManager.currStep];
        if (WalkthroughManager.handleParameters(currStep)) WalkthroughManager.callForAction();
        
        await infoAnimationDelay;
        WalkthroughManager.changeInfo(currStep);
    },

    handleParameters: (currStep) => {
        if (!currStep) return;
        if (currStep.inFocus) {
            inFocus = focusElements[currStep.inFocus];
            view.highlight(focusElements[currStep.inFocus]);
        }
        if (currStep.showBlur) view.popup.showBlur();
        if (currStep.hideBlur) view.popup.hideBlur();
        if (currStep.hideNext) view.popup.info.hideNext();
        if (currStep.initCallForAction) return true;
    },

    changeInfo: (currStep) => {
        view.popup.info.setPosition(currStep.position);
        view.popup.info.setTitle(currStep.title);
        view.popup.info.setDescription(currStep.description);
        view.popup.info.changeVisibility(true);
        if (currStep.staticCircles) return;
        view.popup.info.updateCircles(1);
    },

    end: () => {
        view.popup.info.changeVisibility(false);
        view.popup.hide();
        ended = true;
    }
}

export default WalkthroughManager;