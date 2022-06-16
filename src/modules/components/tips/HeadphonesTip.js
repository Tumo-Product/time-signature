import "./HeadphonesTip.css";

const HeadphonesTip = {
    getTemplate: (text) => /* html */ `<p id="HeadphonesTip" class="startTip">${text}</p>`,
    hide: () => $("#HeadphonesTip").addClass("invisible")
}

export default HeadphonesTip;