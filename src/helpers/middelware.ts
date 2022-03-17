import { Request, Response, NextFunction } from 'express';
import { Error200, Error400, Error401, Error404, Error500, Error403 } from 'services/Error';
import passport from 'passport';

export let middlewares = {
    ensureAuthenticated: (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (info) {
                let m = { error: true, message: info.message, code: '401' }
                return next(new Error401(m));
            }
            if (err) {
                return next(err);
            }
            req.user = user;
            next();
        })(req, res, next);
    },
    errorHandler: (error: any, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof Error200)
            res.status(200).json(error);
        else if (error instanceof Error404)
            res.status(404).json(error);
        else if (error instanceof Error403)
            res.status(403).json(error);
        else if (error instanceof Error401)
            res.status(401).json(error);
        else if (error instanceof Error400)
            res.status(400).json(error);
        else if (error instanceof Error500)
            res.status(500).json(error);
        else if (error.name == "ValidationError")
            res.status(200).json(error);
        else if (error.message) res.status(500).json(error);
        else next();
    },
    notFoundHandler: (req: Request, res: Response, next: NextFunction) => {
        res.status(404).json({ error: true, message: 'API not found', code: '400' })
    },
};