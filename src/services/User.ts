import pg from 'db/connect';
import Crypto from './Crypto';
import {Userts} from 'types';
const mongoid = require('mongoid-js')

class User extends Crypto{
    constructor(){
        super();
    }

    async createUser(email: string, password: string, username: string):Promise<Userts>{
        const hasPassword = await this.encrypt(password);
        const text: string = 'INSERT INTO df.users (id_user,username,email,password) VALUES ($1,$2,$3,$4) RETURNING *';
        const values = [mongoid(),username,email,hasPassword];
        return new Promise((resolve, reject)=>{
            pg.query(text,values,function(err,result){
                if(err) reject(err)
                resolve(result.rows[0])
            })
        })
    }
    
    getUser(email: string):Promise<Userts>{
        const text:string = 'SELECT * FROM df.users WHERE email=$1';
        const values = [email];
        return new Promise((resolve, reject)=>{
            pg.query(text,values,function(err,result){
                if(err) reject(err)
                resolve(result.rows[0])
            })
        })
    }

}

export default User;