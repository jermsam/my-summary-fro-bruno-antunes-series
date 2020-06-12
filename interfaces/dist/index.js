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
exports.getMakes = exports.getAuthId = exports.getCookie = exports.myGet = exports.authenticated = exports.apiEndpoint = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var router_1 = require("next/router");
var jwt_decode_1 = require("jwt-decode");
var openDb_1 = require("model/openDb");
exports.apiEndpoint = process.env.API_ENDPOINT;
exports.authenticated = function (fn) { return function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        jsonwebtoken_1.verify(req.cookies.auth, process.env.SECRET, function (err, decoded) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!err && decoded)) return [3 /*break*/, 2];
                        return [4 /*yield*/, fn(req, res)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        res.status(401).json({ message: 'Sorry, you are not authenticated!' });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); }; };
exports.myGet = function (url, ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var cookie, response;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                cookie = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.req) === null || _a === void 0 ? void 0 : _a.headers.cookie;
                return [4 /*yield*/, fetch(url, {
                        headers: {
                            cookie: cookie
                        }
                    })];
            case 1:
                response = _d.sent();
                if (response.status === 401) {
                    if (!(ctx === null || ctx === void 0 ? void 0 : ctx.req)) {
                        router_1["default"].replace('/login');
                        return [2 /*return*/];
                    }
                    else {
                        (_b = ctx.res) === null || _b === void 0 ? void 0 : _b.writeHead(302, {
                            Location: process.env.URL + "/login"
                        });
                        (_c = ctx.res) === null || _c === void 0 ? void 0 : _c.end();
                        return [2 /*return*/];
                    }
                }
                else {
                    return [2 /*return*/, response];
                }
                return [2 /*return*/];
        }
    });
}); };
function getCookie(cname, ctx) {
    var _a;
    console.log(cname);
    var name = cname + "=";
    var cookie = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.req) === null || _a === void 0 ? void 0 : _a.headers.cookie;
    var decodedCookie = decodeURIComponent(cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
exports.getCookie = getCookie;
function getAuthId(ctx) {
    var _a, _b;
    if (ctx) {
        var jwt = getCookie('auth', ctx);
        if (jwt) {
            var sub = jwt_decode_1["default"](jwt).sub;
            console.log(sub);
            return sub;
        }
        if (!(ctx === null || ctx === void 0 ? void 0 : ctx.req)) {
            router_1["default"].replace('/login');
            return;
        }
        else {
            (_a = ctx.res) === null || _a === void 0 ? void 0 : _a.writeHead(302, {
                Location: process.env.URL + "/login"
            });
            (_b = ctx.res) === null || _b === void 0 ? void 0 : _b.end();
            return;
        }
    }
}
exports.getAuthId = getAuthId;
function getMakes() {
    return __awaiter(this, void 0, void 0, function () {
        var db, makes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, openDb_1.openDB()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.all("\n      SELECT make, count(*) as count\n      FROM car\n      GROUP BY make\n  ")];
                case 2:
                    makes = _a.sent();
                    return [2 /*return*/, makes];
            }
        });
    });
}
exports.getMakes = getMakes;
