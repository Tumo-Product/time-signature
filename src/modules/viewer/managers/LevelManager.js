import Levels from "../components/Levels.js";
import data from "src/index.json";
import AudioManager from "./AudioManager.js";
import Lives from "../components/Lives.js";
import NextButton from "../components/NextButton.js";
import view from "../view.js";
import { shuffle } from "src/modules/tools.js";

for (const level of data.levels) shuffle(level.tracks);

const LevelManager = {
    current: -1,
    levels: [],
    currTrack: 0,

    nextLevel: async () => {
        view.mainSignature.turnOff();
        NextButton.deactivate();
        let level = LevelManager.levels[LevelManager.current];

        if (level) LevelManager.hideLevel(level);
        LevelManager.current++;

        if (LevelManager.current === data.levels.length) {
            view.timeline.hide();
            view.final.build(LevelManager.levels, data.levels);
            return;
        }

        let currLevel = data.levels[LevelManager.current];
        LevelManager.currTrack = 0;
        let track = currLevel.tracks[LevelManager.currTrack];

        AudioManager.setSource(LevelManager.current, track.url);
        let levelObj = await Levels.build(LevelManager.current, currLevel.name, track.upperSignature, track.lowerSignature, track.bars);
        LevelManager.levels.push(levelObj);
        
        Lives.reset();
        $(".container").append(levelObj.element);
        return levelObj;
    },

    hideLevel: (level) => {
        AudioManager.tracks[LevelManager.current].pause();
        level.goOffScreen();
        level.progressBar.pause();
    },

    nextTrack: () => {
        view.mainSignature.turnOff();
        NextButton.deactivate();
        let currLevel = data.levels[LevelManager.current];
        let track;

        if (currLevel.tracks[LevelManager.currTrack + 1]) {
            LevelManager.currTrack++;
            track = currLevel.tracks[LevelManager.currTrack];
        } else {
            LevelManager.currTrack = 0;
            track = currLevel.tracks[0];
        }

        let level = LevelManager.levels[LevelManager.current];

        Lives.reset();
        AudioManager.tracks[LevelManager.current].pause();
        AudioManager.setSource(LevelManager.current, track.url);
        level.reset(track.upperSignature, level.lowerSignature, track.bars);
    }
}

export default LevelManager;