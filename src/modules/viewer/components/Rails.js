import { timeout } from "src/modules/tools.js";
import "./Rails.css";

const Rails = {
    build: async () => {
        let template = 
        /* html */ `
        <div id="Rails">
            <div class="rail"></div>
            <div class="rail"></div>
        </div>
        `;

        await timeout(500);
        return template;
    }
}

export default Rails;