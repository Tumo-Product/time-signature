import "./Loader.css";

const Loader = {
    build: () => {
        let element = $(/* html */ `<div class="parent" id="loadingScreen"><div id="loader"></div></div>`);
        $(".container").append(element);
        return {
            hide: () => element.addClass("hidden"),
            show: () => element.removeClass("hidden"),
        };
    }
}

export default Loader;