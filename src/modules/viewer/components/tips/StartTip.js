import "./StartTip.css";

const StartTip = {
    getTemplate: () => /* html */ `<p id="StartTip" class="startTip">Press to start</p>`,
    hide: () => $("#StartTip").addClass("invisible")
}

export default StartTip;