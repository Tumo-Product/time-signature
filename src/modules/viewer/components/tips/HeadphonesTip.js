import "./HeadphonesTip.css";

const HeadphonesTip = {
    getTemplate: () => {
        let template = /* html */ `<p id="HeadphonesTip" class="startTip">Use your headphones for the best experience</p>`;
        return template;
    },
    
    hide: () => {
        $("#HeadphonesTip").addClass("invisible");
    }
}

export default HeadphonesTip;