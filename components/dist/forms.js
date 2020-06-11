"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.AddComment = exports.SignupForm = exports.LoginForm = void 0;
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var yup_1 = require("yup");
var formik_1 = require("formik");
var axios_1 = require("axios");
var swr_1 = require("swr");
var initialValues = {
    name: '',
    email: '',
    password: ''
};
function LoginForm() {
    var _this = this;
    var _a = react_1["default"].useState(false), loggedIn = _a[0], setLoggedIn = _a[1];
    return (react_1["default"].createElement(core_1.Box, { padding: 4, margin: 1, alignSelf: 'center', justifySelf: 'center', alignContent: 'center', justifyContent: 'center' },
        react_1["default"].createElement(core_1.Card, null,
            react_1["default"].createElement(core_1.CardContent, null,
                react_1["default"].createElement(core_1.Box, { marginBottom: 2 },
                    react_1["default"].createElement(core_1.Typography, null, loggedIn)),
                react_1["default"].createElement(formik_1.Formik, { initialValues: initialValues, validationSchema: yup_1.object({
                        email: yup_1.string()
                            .required('Your email is required')
                            .email(),
                        password: yup_1.string()
                            .required('Your password is required')
                            .min(4, 'Your password should atleast be 4 characters')
                    }), onSubmit: function (values, _a) {
                        var setSubmitting = _a.setSubmitting;
                        return __awaiter(_this, void 0, void 0, function () {
                            var email, password, resp, json;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        email = values.email, password = values.password;
                                        setSubmitting(true);
                                        return [4 /*yield*/, fetch('http://localhost:3000/api/login', {
                                                method: 'POST',
                                                headers: {
                                                    'content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    'email': email,
                                                    'password': password
                                                })
                                            })];
                                    case 1:
                                        resp = _b.sent();
                                        return [4 /*yield*/, resp.json()];
                                    case 2:
                                        json = _b.sent();
                                        setLoggedIn(json.message);
                                        setSubmitting(false);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    } }, function (_a) {
                    var 
                    // values,
                    // errors,
                    // handleChange,
                    // handleBlur,
                    handleSubmit = _a.handleSubmit, isSubmitting = _a.isSubmitting, isValidating = _a.isValidating;
                    return (react_1["default"].createElement(formik_1.Form, { onSubmit: handleSubmit },
                        react_1["default"].createElement(core_1.Box, { marginBottom: 2 },
                            react_1["default"].createElement(core_1.FormGroup, null,
                                react_1["default"].createElement(formik_1.Field, { name: 'email', as: core_1.TextField, label: 'Email' }),
                                react_1["default"].createElement(formik_1.ErrorMessage, { name: 'email' }))),
                        react_1["default"].createElement(core_1.Box, { marginBottom: 2 },
                            react_1["default"].createElement(core_1.FormGroup, null,
                                react_1["default"].createElement(formik_1.Field, { name: 'password', as: core_1.TextField, label: 'Password', type: 'password' }),
                                react_1["default"].createElement(formik_1.ErrorMessage, { name: 'password' }))),
                        react_1["default"].createElement(core_1.Box, { marginBottom: 2 },
                            react_1["default"].createElement(core_1.Button, { fullWidth: true, color: 'primary', type: "submit", disabled: isSubmitting || isValidating }, "Submit"))));
                })))));
}
exports.LoginForm = LoginForm;
function SignupForm(_a) {
    var _this = this;
    var setValue = _a.setValue;
    var _b = react_1["default"].useState(false), registered = _b[0], setRegistered = _b[1];
    return (react_1["default"].createElement(core_1.Box, { padding: 4, margin: 1, alignSelf: 'center', justifySelf: 'center', alignContent: 'center', justifyContent: 'center' },
        react_1["default"].createElement(core_1.Card, null,
            react_1["default"].createElement(core_1.CardContent, null,
                react_1["default"].createElement(core_1.Box, { marginBottom: 2 },
                    react_1["default"].createElement(core_1.Typography, null, registered)),
                react_1["default"].createElement(formik_1.Formik, { initialValues: initialValues, validationSchema: yup_1.object({
                        name: yup_1.string()
                            .required('Your name is required')
                            .min(2, 'Your name should be at least 2 characters')
                            .max(100, 'Your name should be at most 100 characters'),
                        email: yup_1.string()
                            .required('Your email is required')
                            .email(),
                        password: yup_1.string()
                            .required('Your password is required')
                            .min(4, 'Your password should atleast be 4 characters')
                    }), onSubmit: function (values, _a) {
                        var setSubmitting = _a.setSubmitting;
                        return __awaiter(_this, void 0, void 0, function () {
                            var email, password, name, resp, json;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        email = values.email, password = values.password, name = values.name;
                                        setSubmitting(true);
                                        return [4 /*yield*/, fetch('http://localhost:3000/api/signup', {
                                                method: 'POST',
                                                headers: {
                                                    'content-Type': 'application/json'
                                                },
                                                body: JSON.stringify({
                                                    'name': name,
                                                    'email': email,
                                                    'password': password
                                                })
                                            })];
                                    case 1:
                                        resp = _b.sent();
                                        return [4 /*yield*/, resp.json()];
                                    case 2:
                                        json = _b.sent();
                                        setRegistered(json.name);
                                        setSubmitting(false);
                                        setValue(0);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    } }, function (_a) {
                    var 
                    // values,
                    // errors,
                    // handleChange,
                    // handleBlur,
                    handleSubmit = _a.handleSubmit, isSubmitting = _a.isSubmitting, isValidating = _a.isValidating;
                    return (react_1["default"].createElement(formik_1.Form, { onSubmit: handleSubmit },
                        react_1["default"].createElement(core_1.Box, { marginBottom: 2 },
                            react_1["default"].createElement(core_1.FormGroup, null,
                                react_1["default"].createElement(formik_1.Field, { name: 'name', as: core_1.TextField, label: 'Name' }),
                                react_1["default"].createElement(formik_1.ErrorMessage, { name: 'name' }))),
                        react_1["default"].createElement(core_1.Box, { marginBottom: 2 },
                            react_1["default"].createElement(core_1.FormGroup, null,
                                react_1["default"].createElement(formik_1.Field, { name: 'email', as: core_1.TextField, label: 'Email' }),
                                react_1["default"].createElement(formik_1.ErrorMessage, { name: 'email' }))),
                        react_1["default"].createElement(core_1.Box, { marginBottom: 2 },
                            react_1["default"].createElement(core_1.FormGroup, null,
                                react_1["default"].createElement(formik_1.Field, { name: 'password', as: core_1.TextField, label: 'Password', type: 'password' }),
                                react_1["default"].createElement(formik_1.ErrorMessage, { name: 'password' }))),
                        react_1["default"].createElement(core_1.Box, { marginBottom: 2 },
                            react_1["default"].createElement(core_1.Button, { fullWidth: true, color: 'primary', type: "submit", disabled: isSubmitting || isValidating }, "Submit"))));
                })))));
}
exports.SignupForm = SignupForm;
var initialComments = {
    comment: ''
};
function AddComment(_a) {
    var _this = this;
    var authId = _a.authId;
    var data = swr_1["default"]('http://localhost:3000/api/comments').data;
    return (react_1["default"].createElement(formik_1.Formik, { initialValues: __assign(__assign({}, initialComments), { authId: authId }), onSubmit: function (values, _a) {
            var setSubmitting = _a.setSubmitting, resetForm = _a.resetForm;
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            resetForm();
                            setSubmitting(false);
                            // first mutate the data before you even send it to server and do not revalidate
                            values.id = data.length + 1;
                            swr_1.mutate('http://localhost:3000/api/comments', __spreadArrays(data, [values]), false);
                            return [4 /*yield*/, axios_1["default"].post('http://localhost:3000/api/comments', values)];
                        case 1:
                            _b.sent();
                            setSubmitting(false);
                            // something changed on that end point please trigger it
                            swr_1.trigger('http://localhost:3000/api/comments');
                            return [2 /*return*/];
                    }
                });
            });
        } }, function (_a) {
        var handleSubmit = _a.handleSubmit, isSubmitting = _a.isSubmitting, isValidating = _a.isValidating;
        return (react_1["default"].createElement(formik_1.Form, { onSubmit: handleSubmit },
            react_1["default"].createElement(core_1.Box, { marginBottom: 2 },
                react_1["default"].createElement(core_1.FormGroup, null,
                    react_1["default"].createElement(formik_1.Field, { autoComplete: 'off', name: 'comment', as: core_1.TextField, label: 'Comment' }),
                    react_1["default"].createElement(formik_1.ErrorMessage, { name: 'fullName' }))),
            react_1["default"].createElement(core_1.Box, { marginTop: 1 },
                react_1["default"].createElement(core_1.Button, { type: "submit", variant: 'contained', disabled: isSubmitting || isValidating, color: 'primary' }, "Add Comment"))));
    }));
}
exports.AddComment = AddComment;
