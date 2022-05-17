import "./HeadphonesTip.css";

const HeadphonesTip = {
    getTemplate: () => /* html */ `<p id="HeadphonesTip" class="startTip">Use your headphones for the best experience</p>`,
    hide: () => $("#HeadphonesTip").addClass("invisible")
}

export default HeadphonesTip;