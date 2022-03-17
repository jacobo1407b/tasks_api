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
var connect_1 = __importDefault(require("db/connect"));
var mongoid = require('mongoid-js');
var Task = /** @class */ (function () {
    function Task(user) {
        this.id_user = user;
    }
    Task.prototype.create = function (task) {
        var title = task.title, descriptio = task.descriptio;
        var text = 'INSERT INTO df.task (id_task,title,descriptio,id_user)VALUES($1,$2,$3,$4) RETURNING *';
        var values = [mongoid(), title, descriptio, this.id_user];
        return new Promise(function (resolve, reject) {
            connect_1.default.query(text, values, function (err, result) {
                if (err)
                    reject(err);
                resolve(result.rows[0]);
            });
        });
    };
    Task.prototype.get = function () {
        var _this = this;
        var text = 'SELECT * FROM df.task WHERE id_user = $1';
        return new Promise(function (resolve, reject) {
            connect_1.default.query(text, [_this.id_user], function (err, result) {
                if (err)
                    reject(err);
                resolve(result.rows);
            });
        });
    };
    Task.prototype.update = function (task) {
        var title = task.title, descriptio = task.descriptio, id_task = task.id_task;
        var text = "UPDATE df.task SET title=$1,descriptio=$2 WHERE id_task=$3 RETURNING *";
        var values = [title, descriptio, id_task];
        return new Promise(function (resolve, reject) {
            connect_1.default.query(text, values, function (err, result) {
                if (err)
                    reject(err);
                resolve(result.rows[0]);
            });
        });
    };
    Task.prototype.getOne = function (id) {
        var text = 'SELECT * FROM df.task WHERE id_task = $1';
        return new Promise(function (resolve, reject) {
            connect_1.default.query(text, [id], function (err, result) {
                if (err)
                    reject(err);
                resolve(result.rows[0]);
            });
        });
    };
    Task.prototype.onDone = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var stateTask, text, values;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOne(id)];
                    case 1:
                        stateTask = _a.sent();
                        text = "UPDATE df.task SET done=$1 WHERE id_task=$2 RETURNING *";
                        values = [!stateTask.done, id];
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                connect_1.default.query(text, values, function (err, result) {
                                    if (err)
                                        reject(err);
                                    resolve(result.rows[0]);
                                });
                            })];
                }
            });
        });
    };
    Task.prototype.delete = function (id) {
        var text = 'DELETE FROM df.task WHERE id_task=$1';
        var values = [id];
        return new Promise(function (resolve, reject) {
            connect_1.default.query(text, values, function (err, result) {
                if (err)
                    reject(err);
                resolve(true);
            });
        });
    };
    return Task;
}());
exports.default = Task;
//# sourceMappingURL=Task.js.map