import "./Header.css";

const Header = {
    build: (text) => /* html */ `<h1 id="Header">${text}</h1>`,
    hide: () => $("#Header").addClass("invisible")
}

export default Header;