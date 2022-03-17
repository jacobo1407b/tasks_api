import { Taskts } from 'types';
import pg from 'db/connect';
const mongoid = require('mongoid-js')

interface ITask {
    id_user: string
}
class Task implements ITask {
    id_user: string;
    constructor(user: any) {
        this.id_user = user
    }
    create(task: Taskts): Promise<Taskts> {
        const { title, descriptio } = task;
        const text: string = 'INSERT INTO df.task (id_task,title,descriptio,id_user)VALUES($1,$2,$3,$4) RETURNING *'
        const values = [mongoid(), title, descriptio, this.id_user];
        return new Promise((resolve, reject) => {
            pg.query(text, values, function (err, result) {
                if (err) reject(err)
                resolve(result.rows[0])
            })
        })
    }

    get(): Promise<Taskts[]> {
        const text: string = 'SELECT * FROM df.task WHERE id_user = $1';
        return new Promise((resolve, reject) => {
            pg.query(text, [this.id_user], function (err, result) {
                if (err) reject(err);
                resolve(result.rows)
            });
        });
    }

    update(task: Taskts): Promise<Taskts> {
        const { title, descriptio, id_task } = task;
        const text = "UPDATE df.task SET title=$1,descriptio=$2 WHERE id_task=$3 RETURNING *";
        const values = [title, descriptio, id_task];

        return new Promise((resolve, reject) => {
            pg.query(text, values, function (err, result) {
                if (err) reject(err);
                resolve(result.rows[0])
            });
        });
    }
    getOne(id: string): Promise<Taskts> {
        const text: string = 'SELECT * FROM df.task WHERE id_task = $1';
        return new Promise((resolve, reject) => {
            pg.query(text, [id], function (err, result) {
                if (err) reject(err);
                resolve(result.rows[0])
            });
        });
    }
    async onDone(id: string): Promise<Taskts> {
        const stateTask = await this.getOne(id);
        const text = "UPDATE df.task SET done=$1 WHERE id_task=$2 RETURNING *";
        const values = [!stateTask.done, id];
        return new Promise((resolve, reject) => {
            pg.query(text, values, function (err, result) {
                if (err) reject(err);
                resolve(result.rows[0])
            });
        });
    }
    delete(id: string): Promise<boolean> {
        const text = 'DELETE FROM df.task WHERE id_task=$1';
        const values = [id];
        return new Promise((resolve, reject) => {
            pg.query(text, values, function (err, result) {
                if (err) reject(err)
                resolve(true);
            })
        });
    }
}

export default Task;