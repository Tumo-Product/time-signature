import Tasks from "../components/Tasks.js";
import data from "src/index.json";
import AudioManager from "./AudioManager.js";

const TaskManager = {
    current: -1,
    tasks: [],

    nextTask: async () => {
        TaskManager.current++;
        let currTask = data.tasks[TaskManager.current];
        let currTrack = currTask.tracks[0];

        AudioManager.setSource(TaskManager.current, currTrack.url);
        let task = await Tasks.build(TaskManager.current, currTask.name, currTrack.upperSignature);
        TaskManager.tasks.push(task);
        
        $(".container").append(task.element);
    }
}

export default TaskManager;