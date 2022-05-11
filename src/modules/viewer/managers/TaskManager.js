import Tasks from "../components/Tasks.js";
import data from "src/index.json";
import AudioManager from "./AudioManager.js";
import Lives from "../components/Lives.js";
import NextButton from "../components/NextButton.js";
import view from "../view.js";
import { timeout } from "src/modules/tools.js";

const TaskManager = {
    current: -1,
    tasks: [],
    currTrack: 0,

    nextTask: async () => {
        view.mainSignature.turnOff();
        NextButton.deactivate();
        let task = TaskManager.tasks[TaskManager.current];
        TaskManager.currTrack = 0;

        if (task !== undefined) {
            AudioManager.tracks[TaskManager.current].pause();
            task.goOffScreen();
            task.progressBar.pause();
        }

        TaskManager.current++;

        if (TaskManager.current === data.tasks.length) {
            view.timeline.hide();
            
            for (let task of TaskManager.tasks) {
                task.addSignature();
            }

            await timeout(700);

            for (let task of data.tasks.reverse()) {
                $(`#${task.name}`).addClass(`${task.name}FinalPosition`);
                await timeout(300);
            }
            return;
        }

        let currTask = data.tasks[TaskManager.current];
        let track = currTask.tracks[TaskManager.currTrack];

        AudioManager.setSource(TaskManager.current, track.url);
        let taskObj = await Tasks.build(TaskManager.current, currTask.name, track.upperSignature, track.lowerSignature, track.bars);
        TaskManager.tasks.push(taskObj);
        
        Lives.reset();
        $(".container").append(taskObj.element);
        return taskObj;
    },

    nextTrack: () => {
        view.mainSignature.turnOff();
        NextButton.deactivate();
        let currTask = data.tasks[TaskManager.current];
        let track;

        if (currTask.tracks[TaskManager.currTrack + 1] !== undefined) {
            TaskManager.currTrack++;
            track = currTask.tracks[TaskManager.currTrack];
        } else {
            TaskManager.currTrack = 0;
            track = currTask.tracks[0];
        }

        let task = TaskManager.tasks[TaskManager.current];

        Lives.reset();
        AudioManager.tracks[TaskManager.current].pause();
        AudioManager.setSource(TaskManager.current, track.url);
        task.reset(track.upperSignature, task.lowerSignature, track.bars);
    }
}

export default TaskManager;