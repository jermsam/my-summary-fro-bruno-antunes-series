"use strict";
exports.__esModule = true;
var link_1 = require("next/link");
function Home() {
    return (React.createElement("div", null,
        React.createElement("h2", null, "Index"),
        React.createElement("hr", null),
        React.createElement(link_1["default"], { href: '/comments' },
            React.createElement("a", null, "Comments")),
        React.createElement("div", null),
        React.createElement("div", null),
        React.createElement(link_1["default"], { href: '/login' },
            React.createElement("a", null, "Login")),
        React.createElement("div", null),
        React.createElement(link_1["default"], { href: '/faq' },
            React.createElement("a", null, "Faq"))));
}
exports["default"] = Home;
