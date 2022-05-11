import "./Slider.css";

const Slider = {
    build: (taskContainer, progressBar) => {
        let element =
        $(/* html */ `
        <div class="button slider">
            <div class="backdrop"></div>
            <div class="circle"></div>
        </div>
        `);

        const slider = {
            element: element,
            holding: false,

            bindEvents: () => {
                element.mousedown(() => slider.holding = true);
                taskContainer.mouseup(() => slider.holding = false);
                taskContainer.mouseleave(() => slider.holding = false);

                // console.log(progressBar);
                // let progress = progressBar.find(".progress");
                // progressBar.click((event) => {
                //     console.log(event.target);
                //     progress.css("width", event.clientX - 63);
                // });
            }
        }

        slider.bindEvents();
        return slider;
    }
}

export default Slider;