import Levels from "../components/Levels.js";
import Rails from "../components/Rails.js"
import AudioManager from "../managers/AudioManager.js";
import LevelManager from "../managers/LevelManager.js";
import pluginAPI from "../pluginAPI.js";
import view from "../viewer/view.js";

export const onLoad = async (answer) => {
    $(".container").append(Rails.build());
    
    if (answer) {
        for (const [index, source] of answer.sources.entries()) {
            AudioManager.setSource(index, source);
        }

        let levels = [];
        for (const [index, template] of answer.templates.entries()) {
            let level = await Levels.build(index, template.id, template.upperSignature, template.lowerSignature, template.bars);
            level.finalize(template.wrongIndicators);
            $(".container").append(level.element);
            levels.push(level);
        }

        levels.forEach(level => level.addAttempts());
        LevelManager.levels = levels;
        view.final.build(levels);
        pluginAPI.examine(levels.length === 3);
        return;
    }

    pluginAPI.examine(false);
}