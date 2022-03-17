"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var pgConf = {
    user: process.env.USERDB,
    host: process.env.HOSTDB,
    database: process.env.DBNAME,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT
};
var pool = new pg_1.Pool(pgConf);
exports.default = pool;
//# sourceMappingURL=connect.js.map