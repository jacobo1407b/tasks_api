import { readFileSync } from 'fs';
import { Pool } from 'pg';
import { config } from 'dotenv';

config();
const pgConf: any = {
    user: process.env.USERDB,
    host: process.env.HOSTDB,
    database: process.env.DBNAME,
    password: process.env.DBPASSWORD,
    port: process.env.DBPORT
};
let pg = new Pool(pgConf);
const pathSchema = 'src/db/schema.sql';
const pathTask = 'src/db/task.sql';

const readSchema = readFileSync(pathSchema, 'utf8');
const readTask = readFileSync(pathTask, 'utf8');

pg.query(readSchema).then(() => {
    console.log('Schema initialized');
    pg.query(readTask).then(() => {
        console.log('DB is initialized')
    }).catch(err => {
        throw err
    })
}).catch(err => {
    throw err
})