import  { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

const zodValidation = (zodValidation:AnyZodObject) => {
    return (req:Request,res:Response,next:NextFunction)=>{
       try{
        const data = req.body
        const validData = zodValidation.parse(data)
        req.body = validData 
        next()
       }catch(err){
        next(err)
       }
    }
}
export default zodValidation
