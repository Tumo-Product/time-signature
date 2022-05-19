import "./Circles.css";

const Circles = {
    build: (count) => {
        let parent = $(/* html */ `<div id="Circles" class="disabled"></div>`);

        let elements = [];
        for (let i = 0; i < count; i++) {
            let circleElement = $(/* html */ `
                <svg class="walkthroughCircle deactivated" width="8px" height="8px">
                    <circle stroke="var(--walkthrough-text-color)" fill="transparent" stroke-width="1" cx="4" cy="4" r="3" fill="transparent"/>
                </svg>
            `);

            elements.push(circleElement);
            parent.append(circleElement);
        }

        const circles = {
            element: parent,
            turnOn: (i) => elements[i].removeClass("deactivated"),
            turnOff: (i) => elements[i].addClass("deactivated")
        }

        return circles;
    }
}

export default Circles;