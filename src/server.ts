import express from 'express';
import db from 'db/connect';
import passport from "passport";
import { middlewares } from 'helpers/middelware';
import { config } from 'dotenv';
import routerUser from 'routes/user.router';
import routerTask from 'routes/task.router';
import cors from 'cors';
config()
const app = express();
const port = process.env.PORT || 3000;
app.use(cors())
app.set('json spaces', 2);
app.use(express.json());

db.query('CREATE SCHEMA IF NOT EXISTS public')
    .then((r) => {
        console.log('Conexion successfully')
    })
    .catch(err => {
        console.log(err)
    })
require('helpers/passport');
app.use(passport.initialize());
app.get('/', (req, res) => {
    res.send('HOLA MUNDO')
});
app.use('/api',routerUser);
app.use('/api',routerTask);
app.use(middlewares.errorHandler);
app.use(middlewares.notFoundHandler);
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
});