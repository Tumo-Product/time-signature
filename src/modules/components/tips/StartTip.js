import "./StartTip.css";

const StartTip = {
    getTemplate: (text) => /* html */ `<p id="StartTip" class="startTip">${text}</p>`,
    hide: () => $("#StartTip").addClass("invisible")
}

export default StartTip;