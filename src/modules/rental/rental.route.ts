
import express, { NextFunction, Request, Response } from 'express'
import { rentalController } from './rental.controller'
import { AnyZodObject } from 'zod'
import rentValidation from './rental.validation'
import { auth } from '../bike/bike.route'

const rentalRoute = express.Router()

 const zodrentValidation = (zodValidation:AnyZodObject) =>{
 return (req:Request,res:Response,next:NextFunction)=>{
    try{
       
        const validData =  zodValidation.parse(req.body)
        req.body = validData
     
        next()
      }catch(err){
        next(err)
      }
 }
 
}
    
rentalRoute.post('/',zodrentValidation(rentValidation),rentalController.createRental)
rentalRoute.put('/:id/return',auth,zodrentValidation(rentValidation),rentalController.returnBike)
rentalRoute.get('/',rentalController.getAllRent)
export default rentalRoute