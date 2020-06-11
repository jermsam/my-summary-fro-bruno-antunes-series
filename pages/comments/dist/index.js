"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getServerSideProps = void 0;
var core_1 = require("@material-ui/core");
var react_1 = require("react");
var swr_1 = require("swr");
var openDb_1 = require("model/openDb");
var interfaces_1 = require("interfaces");
function Profile(_a) {
    var comments = _a.comments;
    var data = swr_1["default"](interfaces_1.apiEndpoint + "/comments", { initialData: comments }).data;
    return react_1["default"].createElement(core_1.Box, null,
        react_1["default"].createElement(core_1.Toolbar, null,
            react_1["default"].createElement(core_1.Grid, { justify: "space-between" // Add it here :)
                , container: true },
                react_1["default"].createElement(core_1.Grid, { item: true },
                    react_1["default"].createElement(core_1.Typography, { variant: 'h5' }, "All Comments")),
                react_1["default"].createElement(core_1.Grid, { item: true },
                    react_1["default"].createElement(core_1.Box, null,
                        react_1["default"].createElement(core_1.Button, { variant: "contained", href: "/" }, "Home"))))),
        react_1["default"].createElement("hr", null),
        react_1["default"].createElement(core_1.Box, { margin: 1 },
            "Number of Comments: ", data === null || data === void 0 ? void 0 :
            data.length),
        react_1["default"].createElement(core_1.Box, null,
            react_1["default"].createElement(core_1.TableContainer, { component: core_1.Paper },
                react_1["default"].createElement(core_1.Table, { "aria-label": "simple table" },
                    react_1["default"].createElement(core_1.TableHead, null,
                        react_1["default"].createElement(core_1.TableRow, null,
                            react_1["default"].createElement(core_1.TableCell, null, "Id"),
                            react_1["default"].createElement(core_1.TableCell, null, "Comment"),
                            react_1["default"].createElement(core_1.TableCell, { align: "right" }, "Actions"))),
                    react_1["default"].createElement(core_1.TableBody, null, data === null || data === void 0 ? void 0 : data.map(function (_a) {
                        var id = _a.id, comment = _a.comment;
                        return (react_1["default"].createElement(core_1.TableRow, { key: id },
                            react_1["default"].createElement(core_1.TableCell, { component: "th", scope: "row" }, id),
                            react_1["default"].createElement(core_1.TableCell, null, comment)));
                    }))))));
}
exports["default"] = Profile;
exports.getServerSideProps = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var db, comments;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, openDb_1.openDB()];
            case 1:
                db = _a.sent();
                return [4 /*yield*/, db.all('select * from comment')];
            case 2:
                comments = _a.sent();
                console.log("all comments: ", comments);
                return [2 /*return*/, { props: { comments: comments } }];
        }
    });
}); };
