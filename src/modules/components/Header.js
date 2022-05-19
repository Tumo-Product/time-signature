import "./Header.css";

const Header = {
    build: () => /* html */ `<h1 id="Header">Welcome to Time Signature</h1>`,
    hide: () => $("#Header").addClass("invisible")
}

export default Header;