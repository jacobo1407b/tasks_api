"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewares = void 0;
var Error_1 = require("services/Error");
var passport_1 = __importDefault(require("passport"));
exports.middlewares = {
    ensureAuthenticated: function (req, res, next) {
        passport_1.default.authenticate('jwt', { session: false }, function (err, user, info) {
            if (info) {
                var m = { error: true, message: info.message, code: '401' };
                return next(new Error_1.Error401(m));
            }
            if (err) {
                return next(err);
            }
            req.user = user;
            next();
        })(req, res, next);
    },
    errorHandler: function (error, req, res, next) {
        if (error instanceof Error_1.Error200)
            res.status(200).json(error);
        else if (error instanceof Error_1.Error404)
            res.status(404).json(error);
        else if (error instanceof Error_1.Error403)
            res.status(403).json(error);
        else if (error instanceof Error_1.Error401)
            res.status(401).json(error);
        else if (error instanceof Error_1.Error400)
            res.status(400).json(error);
        else if (error instanceof Error_1.Error500)
            res.status(500).json(error);
        else if (error.name == "ValidationError")
            res.status(200).json(error);
        else if (error.message)
            res.status(500).json(error);
        else
            next();
    },
    notFoundHandler: function (req, res, next) {
        res.status(404).json({ error: true, message: 'API not found', code: '400' });
    },
};
//# sourceMappingURL=middelware.js.map