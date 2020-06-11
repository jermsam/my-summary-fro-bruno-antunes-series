"use strict";
exports.__esModule = true;
var styles_1 = require("@material-ui/core/styles");
var red_1 = require("@material-ui/core/colors/red");
// Create a theme instance.
var theme = styles_1.createMuiTheme({
    palette: {
        primary: {
            main: '#556cd6'
        },
        secondary: {
            main: '#19857b'
        },
        error: {
            main: red_1["default"].A400
        },
        background: {
            "default": '#fff'
        }
    },
    spacing: 8
});
exports["default"] = theme;
