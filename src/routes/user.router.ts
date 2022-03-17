import express, { Request, Response, NextFunction } from "express";
import { Payload, Userts } from "types";
import jwt from 'jsonwebtoken';
import { Error400,Error500 } from "services/Error";
import passport from 'passport';
import User from "services/User";
const router = express.Router();

router.post('/auth', async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, async function (err, user: Userts, inf) {
        try {
            if (err || !user) {
                throw {
                    error: true,
                    message: 'Email o Password no correcto',
                    code: '404'
                }
            } else {
                delete user.password;
                const payload: Payload = {
                    sub: user.id_user,
                    exp: Date.now() + 400000,
                    username: user.username,
                    email: user.email,
                }
                const token = jwt.sign(JSON.stringify(payload), process.env.SECRET_TOKEN!, { algorithm: 'HS256' });
                res.status(200).json({
                    error: false,
                    message: "Login success",
                    user,
                    token
                })
            }
        } catch (error:any) {
            if(error?.code){
                next(new Error400(error))
            }else{
                let er = {
                    error:true,
                    message:error.message,
                    code:'500',
                    stack:'Internal Server Error'
                }
                next(new Error400(er))
            }
        }
    })(req, res, next)
});

router.post('/create/user', async (req: Request, res: Response,next: NextFunction) => {
    try {
        const userService = new User();
        const { username, password, email } = req.body;
        const getUser = await userService.getUser(email);
        if (!getUser) {
            const resolve = await userService.createUser(email, password, username);
            delete resolve.password;
            res.status(200).json({ error: false, message: 'Usuario creado con exito', user: resolve })
        } else {
            throw {
                error: true,
                message: 'Este usuario ya existe',
                code: '400'
            }
        }
    } catch (error:any) {
        if(error?.code){
            next(new Error400(error))
        }else{
            let er = {
                error:true,
                message:error.message,
                code:'500',
                stack:'Internal Server Error'
            }
            next(new Error400(er))
        }
    }
})

export default router