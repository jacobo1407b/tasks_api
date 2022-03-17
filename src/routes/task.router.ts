import express, { Request, Response, NextFunction } from "express";
import { middlewares } from 'helpers/middelware';
import Task from "services/Task";
import { Error500 } from "services/Error";
const router = express.Router();


router.get('/tasks', middlewares.ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskService = new Task(req.user?.sub);
        const tasks = await taskService.get();
        let re = {
            error: false,
            message: 'Success',
            data: tasks
        }
        res.status(200).json(re);
    } catch (error: any) {
        let re = {
            error: true,
            message: error.message,
            code: '500'
        };
        next(new Error500(re));
    }
});

router.post('/create/task', middlewares.ensureAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskService = new Task(req.user?.sub);
        const {title,descriptio} = req.body;
        let addTask = {
            title,
            descriptio
        }
        const save = await taskService.create(addTask);
        let re = {
            error:false,
            message:'Tarea creada con exito',
            data:save
        }
        res.status(200).json(re)
    } catch (error: any) {
        let re = {
            error: true,
            message: error.message,
            code: '500'
        };
        next(new Error500(re));
    }
});

router.put('/update/task/:id', middlewares.ensureAuthenticated,async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const taskService = new Task(req.user?.sub);
        const {title,descriptio} = req.body;
        let upt = {
            title,
            descriptio,
            id_task: req.params.id
        }
        let save = await taskService.update(upt);
        let re = {
            error:false,
            message:'Tarea actualizada con exito',
            data:save
        }
        res.status(200).json(re);
    } catch (error:any) {
        let re = {
            error: true,
            message: error.message,
            code: '500'
        };
        next(new Error500(re));
    }
});

router.put('/done/task/:id',middlewares.ensureAuthenticated,async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const taskService = new Task(req.user?.sub);
        const doneUpdate = await taskService.onDone(req.params.id);
        let re = {
            error:false,
            message:'Tarea realizada con exito',
            data:doneUpdate
        };

        res.status(200).json(re);
    } catch (error:any) {
        let re = {
            error: true,
            message: error.message,
            code: '500'
        };
        next(new Error500(re));
    }
});

router.delete('/delete/task/:id',middlewares.ensureAuthenticated,async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const taskService = new Task(req.user?.sub);
        const deleteTask = await taskService.delete(req.params.id);
        let re = {
            error:false,
            message: 'Tarea eliminada con exito',
            data:deleteTask
        };
        res.status(200).json(re);
    } catch (error:any) {
        let re = {
            error: true,
            message: error.message,
            code: '500'
        };
        next(new Error500(re));
    }
});

export default router;