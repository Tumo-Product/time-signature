import "./Tasks.css";
import "src/assets/Pause.svg";
import Beat from "./Beat.js";
import ProgressBar, { PROGRESS_WIDTH } from "./ProgressBar.js";
import Lives from "./Lives.js";

const MAX_BEATS = 16;

const Tasks = {
    build: async (index, id, signature) => {
        let beatsCount = signature * Math.floor(MAX_BEATS / signature);
        let progressBar = await ProgressBar.build(index);
        
        let template =
        $(/* html */ `
        <div id="${id}" class="task">
            <div class="taskContainer">
                <div class="subContainer" style="gap: ${PROGRESS_WIDTH/beatsCount}px"></div>
            </div>
        </div>
        `);

        template.find(".taskContainer").prepend(progressBar.element);
        
        let beats = [];
        for (let i = 0; i < beatsCount; i++) {
            let beat = await Beat.build();
            template.find(".subContainer").append(beat.element);
            if (i === 0) beat.changeState("correct");
            beats.push(beat);
        }
        
        let task = {
            element: template,
            progressBar: progressBar,
            beats: beats,

            bindEvents: () => {
                for (let i = 0; i < beats.length; i++) {
                    beats[i].button.element.click(() => {
                        for (let beat of beats) {
                            if (beat.state === "wrong") {
                                beat.button.turnOff();
                            }
                        }

                        let correct = i % signature === 0;
                        beats[i].changeState(correct ? "correct" : "wrong");

                        if (!correct) {
                            Lives.count--;
                        }
                    });
                }
            }
        };

        task.bindEvents();
        progressBar.bindEvents(beats);
        return task;
    }
}

export default Tasks;