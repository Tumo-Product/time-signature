import "./StartTip.css";

const StartTip = {
    getTemplate: () => {
        let template = /* html */ `<p id="StartTip" class="startTip">Press to start</p>`;
        return template;
    },
    
    hide: () => {
        $("#StartTip").addClass("invisible");
    }
}

export default StartTip;