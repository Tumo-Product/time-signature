import "./Tasks.css";
import "src/assets/Pause.svg";
import Beat from "./Beat.js";
import ProgressBar, { PROGRESS_WIDTH } from "./ProgressBar.js";
import Lives from "./Lives.js";
import NextButton from "./NextButton.js";

const MAX_BEATS = 16;

const Tasks = {
    build: async (index, id, upperSignature, lowerSignature, bars) => {
        let beatsCount = Math.floor(MAX_BEATS / upperSignature);
        let beatsLength = upperSignature * beatsCount;
        let progressDivider = bars / beatsCount;
        
        let progressBar = await ProgressBar.build(index, progressDivider);
        let element =
        $(/* html */ `
        <div id="${id}" class="task">
            <div class="taskContainer">
                <div class="subContainer" style="gap: ${PROGRESS_WIDTH/beatsLength}px"></div>
            </div>
        </div>
        `);

        element.find(".taskContainer").prepend(progressBar.element);
        
        let beats = [];
        for (let i = 0; i < beatsLength; i++) {
            beats.push(await Tasks.buildBeat(element));
        }
        beats[0].changeState("correct");
        
        let task = {
            element: element,
            progressBar: progressBar,
            beats: beats,
            correctCount: 1,

            upperSignature: upperSignature,
            lowerSignature: lowerSignature,

            bindEvents: () => {
                for (let i = 0; i < beats.length; i++) {
                    task.beats[i].button.element.click(() => {
                        for (let beat of beats) {
                            if (beat.state === "wrong") {
                                beat.button.turnOff();
                            }
                        }

                        let correct = i % task.upperSignature === 0;
                        task.beats[i].changeState(correct ? "correct" : "wrong");

                        if (!correct) {
                            Lives.count--;
                        } else {
                            task.correctCount++;

                            if(task.correctCount === beatsCount) {
                                NextButton.activate();
                            }
                        }
                    });
                }
            },

            reset: async (signature, bars) => {
                progressBar.pause();
                task.upperSignature = signature;
                task.correctCount = 1;

                beatsCount = Math.floor(MAX_BEATS / signature);
                beatsLength = signature * beatsCount;
                progressDivider = bars / beatsCount;

                let modificationCount = beatsLength - task.beats.length;

                if (modificationCount !== 0) {
                    if (Math.sign(modificationCount) === 1) {
                        for (let i = 0; i < modificationCount; i++) {
                            task.beats.push(await Tasks.buildBeat(element));
                        }
                    } else {
                        for (let i = task.beats.length + modificationCount; i < task.beats.length; i++) {
                            task.beats[i].element.remove();
                        }

                        task.beats = task.beats.slice(0, modificationCount);
                    }
                }

                for (let beat of task.beats) {
                    beat.button.turnOff();
                    beat.statusIndicator.turnOff();
                }

                task.beats[0].changeState("correct");

                element.find(".subContainer").css("gap", `${PROGRESS_WIDTH/beatsLength}px`);
                progressBar.reset(task.beats, progressDivider);
            },

            goOffScreen: () => {
                element.addClass("offScreen");
            }
        };

        task.bindEvents();
        progressBar.bindEvents(beats);
        return task;
    },

    buildBeat: async (element) => {
        let beat = await Beat.build();
        element.find(".subContainer").append(beat.element);
        return beat;
    }
}

export default Tasks;