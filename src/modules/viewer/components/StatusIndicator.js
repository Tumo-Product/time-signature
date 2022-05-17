import "./StatusIndicator.css";

let persistentStyles = ["correct", "wrong"];

const StatusIndicator = {
    build: async () => {
        let element =
        $(/* html */ `
            <div class="statusIndicator off">
                <div class="indicator"></div>
                <div class="indicator"></div>
            </div>
        `);

        let statusIndicator = {
            element: element,

            changeLook: (state) => {
                statusIndicator.state = state;
                
                for (let style of persistentStyles) {
                    if (element.attr("class").includes(style)) {
                        return;                        
                    }
                }

                element.attr("class", "statusIndicator");
                element.addClass(state);
            },

            turnOff: () => {
                element.attr("class", "statusIndicator");
            }
        }

        return statusIndicator;
    }
}

export default StatusIndicator;