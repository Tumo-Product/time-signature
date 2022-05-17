import "./Levels.css";
import "src/assets/Pause.svg";
import Beat from "./Beat.js";
import ProgressBar, { PROGRESS_WIDTH } from "./ProgressBar.js";
import Lives from "./Lives.js";
import NextButton from "./NextButton.js";
import view from "../view.js";
import UI from "src/modules/common.js";
import Signature from "./Signature.js";

const MAX_BEATS = 16;

const Levels = {
    build: async (index, id, upperSignature, lowerSignature, bars) => {
        let beatsCount = Math.floor(MAX_BEATS / upperSignature);
        let beatsLength = upperSignature * beatsCount;
        let progressDivider = bars / beatsCount;
        
        let element =
        $(/* html */ `
            <div id="${id}" class="levelContainer">
                <div class="level">
                    <div class="levelContents">
                        <div class="subContainer" style="gap: ${PROGRESS_WIDTH/beatsLength}px"></div>
                    </div>
                </div>
            </div>
        `);
        
        let progressBar = await ProgressBar.build(index, progressDivider, element);
        element.find(".levelContents").prepend(progressBar.element);
        
        let beats = [];
        for (let i = 0; i < beatsLength; i++) {
            beats.push(await Levels.buildBeat(element));
        }
        beats[0].changeLook("correct");
        
        let level = {
            element: element,
            progressBar: progressBar,
            beats: beats,
            correctCount: 1,

            upperSignature: upperSignature,
            lowerSignature: lowerSignature,

            bindEvents: () => {
                for (let i = 0; i < level.beats.length; i++) {
                    level.beats[i].button.element.off("click");
                    level.beats[i].button.element.on("click", () => {
                        for (let beat of level.beats) {
                            if (beat.state === "wrong") {
                                beat.button.turnOff(true);
                            }
                        }

                        let correct = i % level.upperSignature === 0;
                        level.beats[i].changeLook(correct ? "correct" : "wrong");

                        if (!correct) {
                            Lives.count--;
                        } else {
                            level.correctCount++;

                            if(level.correctCount === beatsCount) {
                                for (let beat of level.beats) { UI.disable(beat.element) }
                                NextButton.activate();
                                view.mainSignature.set(level.upperSignature, level.lowerSignature);
                            }
                        }
                    });
                }
            },

            reset: async (upperSignature, lowerSignature, bars) => {
                progressBar.pause();
                level.upperSignature = upperSignature;
                level.lowerSignature = lowerSignature;
                level.correctCount = 1;

                beatsCount = Math.floor(MAX_BEATS / upperSignature);
                beatsLength = upperSignature * beatsCount;
                progressDivider = bars / beatsCount;

                let modificationCount = beatsLength - level.beats.length;

                if (modificationCount !== 0) {
                    if (Math.sign(modificationCount) === 1) {
                        for (let i = 0; i < modificationCount; i++) {
                            level.beats.push(await Levels.buildBeat(element));
                        }
                    } else {
                        for (let i = level.beats.length + modificationCount; i < level.beats.length; i++) {
                            level.beats[i].element.remove();
                        }

                        level.beats = level.beats.slice(0, modificationCount);
                    }
                }

                for (let beat of level.beats) {
                    beat.button.turnOff(true);
                    beat.statusIndicator.turnOff();
                }

                level.beats[0].changeLook("correct");

                element.find(".subContainer").css("gap", `${PROGRESS_WIDTH/beatsLength}px`);
                progressBar.reset(level.beats, progressDivider);
                level.bindEvents();
            },

            goOffScreen: () => {
                element.addClass("offScreen");
            },

            addSignature: async () => {
                let signature = await Signature.build();
                let signatureContainer = $(/* html */ `<div class="signatureContainer"></div>`);
                signature.set(level.upperSignature, level.lowerSignature);
                signatureContainer.append(signature.element);
                element.append(signatureContainer);
            }
        };

        level.bindEvents();
        progressBar.bindEvents(level.beats);
        return level;
    },

    buildBeat: async (element) => {
        let beat = await Beat.build();
        element.find(".subContainer").append(beat.element);
        return beat;
    }
}

export default Levels;