import "./Header.css";

const Header = {
    build: () => {
        let template = /* html */ `<h1 id="Header">Welcome to Time Signature</h1>`;
        return template;
    },

    hide: () => {
        $("#Header").addClass("invisible");
    }
}

export default Header;