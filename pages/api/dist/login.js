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
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var cookie_1 = require("cookie");
var openDb_1 = require("model/openDb");
exports["default"] = (function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, person, result, claims, authToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                res.statusCode = 200;
                console.log(req.statusCode);
                return [4 /*yield*/, openDb_1.openDB()];
            case 1:
                db = _a.sent();
                if (!(req.method === 'POST')) return [3 /*break*/, 5];
                return [4 /*yield*/, db.get('select * from person where email=?', req.body.email)];
            case 2:
                person = _a.sent();
                result = false;
                if (!person) return [3 /*break*/, 4];
                return [4 /*yield*/, bcrypt_1["default"].compare(req.body.password, person.password)];
            case 3:
                result = _a.sent();
                _a.label = 4;
            case 4:
                if (result) {
                    claims = { sub: person.id };
                    authToken = jsonwebtoken_1.sign(claims, process.env.SECRET, { expiresIn: '1h' });
                    res.setHeader('Set-Cookie', cookie_1.serialize('auth', authToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                        maxAge: 3600,
                        path: '/'
                    }));
                    //  res.json({authToken})
                    res.json({ message: 'You are authenticated' });
                }
                else {
                    res.json({ message: 'Oops, something went wrong' });
                }
                return [3 /*break*/, 6];
            case 5:
                res.status(405).json('We only support POST');
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); });
