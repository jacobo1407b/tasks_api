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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Error_1 = require("services/Error");
var passport_1 = __importDefault(require("passport"));
var User_1 = __importDefault(require("services/User"));
var router = express_1.default.Router();
router.post('/auth', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        passport_1.default.authenticate('local', { session: false }, function (err, user, inf) {
            return __awaiter(this, void 0, void 0, function () {
                var payload, token, er;
                return __generator(this, function (_a) {
                    try {
                        if (err || !user) {
                            throw {
                                error: true,
                                message: 'Email o Password no correcto',
                                code: '404'
                            };
                        }
                        else {
                            delete user.password;
                            payload = {
                                sub: user.id_user,
                                exp: Date.now() + 400000,
                                username: user.username,
                                email: user.email,
                            };
                            token = jsonwebtoken_1.default.sign(JSON.stringify(payload), process.env.SECRET_TOKEN, { algorithm: 'HS256' });
                            res.status(200).json({
                                error: false,
                                message: "Login success",
                                user: user,
                                token: token
                            });
                        }
                    }
                    catch (error) {
                        if (error === null || error === void 0 ? void 0 : error.code) {
                            next(new Error_1.Error400(error));
                        }
                        else {
                            er = {
                                error: true,
                                message: error.message,
                                code: '500',
                                stack: 'Internal Server Error'
                            };
                            next(new Error_1.Error400(er));
                        }
                    }
                    return [2 /*return*/];
                });
            });
        })(req, res, next);
        return [2 /*return*/];
    });
}); });
router.post('/create/user', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userService, _a, username, password, email, getUser, resolve, error_1, er;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                userService = new User_1.default();
                _a = req.body, username = _a.username, password = _a.password, email = _a.email;
                return [4 /*yield*/, userService.getUser(email)];
            case 1:
                getUser = _b.sent();
                if (!!getUser) return [3 /*break*/, 3];
                return [4 /*yield*/, userService.createUser(email, password, username)];
            case 2:
                resolve = _b.sent();
                delete resolve.password;
                res.status(200).json({ error: false, message: 'Usuario creado con exito', user: resolve });
                return [3 /*break*/, 4];
            case 3: throw {
                error: true,
                message: 'Este usuario ya existe',
                code: '400'
            };
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                if (error_1 === null || error_1 === void 0 ? void 0 : error_1.code) {
                    next(new Error_1.Error400(error_1));
                }
                else {
                    er = {
                        error: true,
                        message: error_1.message,
                        code: '500',
                        stack: 'Internal Server Error'
                    };
                    next(new Error_1.Error400(er));
                }
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=user.router.js.map