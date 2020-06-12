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
var formik_1 = require("formik");
var router_1 = require("next/router");
var interfaces_1 = require("interfaces");
var useStyles = core_1.makeStyles(function (theme) { return ({
    paper: {
        margin: 'auto',
        maxWidth: 500,
        padding: theme.spacing(3)
    }
}); });
var prices = [500, 1000, 5000, 15000, 25000, 50000, 250000];
function Home(_a) {
    var makes = _a.makes;
    var classes = useStyles();
    var query = router_1.useRouter().query;
    var initialValues = {
        make: query.make || 'all',
        model: query.model || 'all',
        minPrice: query.minPrice || 'all',
        maxPrice: query.maxPrice || 'all'
    };
    return (React.createElement(formik_1.Formik, { initialValues: initialValues, onSubmit: function () { } }, function (_a) {
        var values = _a.values;
        return (React.createElement(formik_1.Form, null,
            React.createElement(core_1.Paper, { elevation: 5, className: classes.paper },
                React.createElement(core_1.Grid, { container: true, spacing: 3 },
                    React.createElement(core_1.Grid, { item: true, xs: 12, sm: 6 },
                        React.createElement(core_1.FormControl, { fullWidth: true, variant: "outlined" },
                            React.createElement(core_1.InputLabel, { id: "search-make" }, "Make"),
                            React.createElement(formik_1.Field, { name: "make", as: core_1.Select, labelId: "search-make", label: "Make" },
                                React.createElement(core_1.MenuItem, { value: "all" },
                                    React.createElement("em", null, "All Makes")),
                                makes.map(function (make) { return (React.createElement(core_1.MenuItem, { value: make.make }, make.make + " (" + make.count + ")")); })))),
                    React.createElement(core_1.Grid, { item: true, xs: 12, sm: 6 }, "Model"),
                    React.createElement(core_1.Grid, { item: true, xs: 12, sm: 6 },
                        React.createElement(core_1.FormControl, { fullWidth: true, variant: "outlined" },
                            React.createElement(core_1.InputLabel, { id: "search-min-price" }, "Min Price"),
                            React.createElement(formik_1.Field, { name: "minPrice", as: core_1.Select, labelId: "search-min-price", label: "Min Price" },
                                React.createElement(core_1.MenuItem, { value: "all" },
                                    React.createElement("em", null, "No Min")),
                                prices.map(function (price) { return (React.createElement(core_1.MenuItem, { value: price }, price)); })))),
                    React.createElement(core_1.Grid, { item: true, xs: 12, sm: 6 },
                        React.createElement(core_1.FormControl, { fullWidth: true, variant: "outlined" },
                            React.createElement(core_1.InputLabel, { id: "search-max-price" }, "Max Price"),
                            React.createElement(formik_1.Field, { name: "maxPrice", as: core_1.Select, labelId: "search-max-price", label: "Max Price" },
                                React.createElement(core_1.MenuItem, { value: "all" },
                                    React.createElement("em", null, "No Max")),
                                prices.map(function (price) { return (React.createElement(core_1.MenuItem, { value: price }, price)); }))))))));
    }));
}
exports["default"] = Home;
exports.getServerSideProps = function () { return __awaiter(void 0, void 0, void 0, function () {
    var makes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, interfaces_1.getMakes()];
            case 1:
                makes = _a.sent();
                return [2 /*return*/, { props: { makes: makes } }];
        }
    });
}); };
