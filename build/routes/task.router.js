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
var middelware_1 = require("helpers/middelware");
var Task_1 = __importDefault(require("services/Task"));
var Error_1 = require("services/Error");
var router = express_1.default.Router();
router.get('/tasks', middelware_1.middlewares.ensureAuthenticated, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var taskService, tasks, re, error_1, re;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                taskService = new Task_1.default((_a = req.user) === null || _a === void 0 ? void 0 : _a.sub);
                return [4 /*yield*/, taskService.get()];
            case 1:
                tasks = _b.sent();
                re = {
                    error: false,
                    message: 'Success',
                    data: tasks
                };
                res.status(200).json(re);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                re = {
                    error: true,
                    message: error_1.message,
                    code: '500'
                };
                next(new Error_1.Error500(re));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.post('/create/task', middelware_1.middlewares.ensureAuthenticated, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var taskService, _a, title, descriptio, addTask, save, re, error_2, re;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                taskService = new Task_1.default((_b = req.user) === null || _b === void 0 ? void 0 : _b.sub);
                _a = req.body, title = _a.title, descriptio = _a.descriptio;
                addTask = {
                    title: title,
                    descriptio: descriptio
                };
                return [4 /*yield*/, taskService.create(addTask)];
            case 1:
                save = _c.sent();
                re = {
                    error: false,
                    message: 'Tarea creada con exito',
                    data: save
                };
                res.status(200).json(re);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _c.sent();
                re = {
                    error: true,
                    message: error_2.message,
                    code: '500'
                };
                next(new Error_1.Error500(re));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put('/update/task/:id', middelware_1.middlewares.ensureAuthenticated, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var taskService, _a, title, descriptio, upt, save, re, error_3, re;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                taskService = new Task_1.default((_b = req.user) === null || _b === void 0 ? void 0 : _b.sub);
                _a = req.body, title = _a.title, descriptio = _a.descriptio;
                upt = {
                    title: title,
                    descriptio: descriptio,
                    id_task: req.params.id
                };
                return [4 /*yield*/, taskService.update(upt)];
            case 1:
                save = _c.sent();
                re = {
                    error: false,
                    message: 'Tarea actualizada con exito',
                    data: save
                };
                res.status(200).json(re);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _c.sent();
                re = {
                    error: true,
                    message: error_3.message,
                    code: '500'
                };
                next(new Error_1.Error500(re));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.put('/done/task/:id', middelware_1.middlewares.ensureAuthenticated, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var taskService, doneUpdate, re, error_4, re;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                taskService = new Task_1.default((_a = req.user) === null || _a === void 0 ? void 0 : _a.sub);
                return [4 /*yield*/, taskService.onDone(req.params.id)];
            case 1:
                doneUpdate = _b.sent();
                re = {
                    error: false,
                    message: 'Tarea realizada con exito',
                    data: doneUpdate
                };
                res.status(200).json(re);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                re = {
                    error: true,
                    message: error_4.message,
                    code: '500'
                };
                next(new Error_1.Error500(re));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.delete('/delete/task/:id', middelware_1.middlewares.ensureAuthenticated, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var taskService, deleteTask, re, error_5, re;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                taskService = new Task_1.default((_a = req.user) === null || _a === void 0 ? void 0 : _a.sub);
                return [4 /*yield*/, taskService.delete(req.params.id)];
            case 1:
                deleteTask = _b.sent();
                re = {
                    error: false,
                    message: 'Tarea eliminada con exito',
                    data: deleteTask
                };
                res.status(200).json(re);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                re = {
                    error: true,
                    message: error_5.message,
                    code: '500'
                };
                next(new Error_1.Error500(re));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
//# sourceMappingURL=task.router.js.map