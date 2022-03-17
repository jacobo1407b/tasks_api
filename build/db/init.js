"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
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
var pg = new pg_1.Pool(pgConf);
var pathSchema = 'src/db/schema.sql';
var pathTask = 'src/db/task.sql';
var readSchema = (0, fs_1.readFileSync)(pathSchema, 'utf8');
var readTask = (0, fs_1.readFileSync)(pathTask, 'utf8');
pg.query(readSchema).then(function () {
    console.log('Schema initialized');
    pg.query(readTask).then(function () {
        console.log('DB is initialized');
    }).catch(function (err) {
        throw err;
    });
}).catch(function (err) {
    throw err;
});
//# sourceMappingURL=init.js.map