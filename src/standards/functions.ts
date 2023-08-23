import { HttpException, HttpStatus } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import  * as dotenv from 'dotenv';
dotenv.config();

export function response({message, code, data}:{message?: string, code?: number, data?: any}){
    if(!message) message = "Successful";
    if(!code) code = HttpStatus.OK;
    return {
      message,
      code,
      data
    }
}

export function exception(error?: any,  message?: string, status?: number){
    let m: string = "Internal Server error";
    let s: number;
    error && error.message?  m = error.message : message? m = message: m = m  ;
    error && error.status? s = error.status :status? s = status : s = 500;
   throw new HttpException(m, s);
}

export async function hashPassword(password: string){
    try{
        const s = await bcrypt.genSalt(parseInt(process.env.SALT));
        return  await bcrypt.hash(password, s);
    } catch (error){
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}