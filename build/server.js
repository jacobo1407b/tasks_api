"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var connect_1 = __importDefault(require("db/connect"));
var passport_1 = __importDefault(require("passport"));
var middelware_1 = require("helpers/middelware");
var dotenv_1 = require("dotenv");
var user_router_1 = __importDefault(require("routes/user.router"));
var task_router_1 = __importDefault(require("routes/task.router"));
var cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.set('json spaces', 2);
app.use(express_1.default.json());
connect_1.default.query('CREATE SCHEMA IF NOT EXISTS public')
    .then(function (r) {
    console.log('Conexion successfully');
})
    .catch(function (err) {
    console.log(err);
});
require('helpers/passport');
app.use(passport_1.default.initialize());
app.get('/', function (req, res) {
    res.send('HOLA MUNDO');
});
app.use('/api', user_router_1.default);
app.use('/api', task_router_1.default);
app.use(middelware_1.middlewares.errorHandler);
app.use(middelware_1.middlewares.notFoundHandler);
app.listen(port, function () {
    console.log("Server started at http://localhost:".concat(port));
});
//# sourceMappingURL=server.js.map