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

let pool = new Pool(pgConf)
export default pool;