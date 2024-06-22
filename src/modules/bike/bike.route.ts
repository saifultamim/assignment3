/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { bikeController } from './bike.controller'
import { bikeValidation } from './bike.validation';
import zodValidation from '../utilities/validation/zodValidation';
import  { NextFunction } from 'express'
import { Request, Response } from "express";
import { JwtPayload } from 'jsonwebtoken';
import { userModel } from '../auth/auth.model';
import { jwts } from '../utilities/jwt/jwt';




const bikeRoute = express.Router()

export const auth =  async(req:Request,res:Response,next:NextFunction) => {
    const accessToken = req.headers.authorization?.split(' ')[1]
 const decode = jwts.jwtVerify(accessToken as string)
    const {payLoad} = decode as JwtPayload
    const {email,password} = payLoad
    const adminCheck = await  userModel.findOne({email,password})
    const {role}:any = adminCheck
    if(role === 'admin'){
       next()
    }
    else{
        res.json({
            message:'you are not admin'
        })
    }
}



bikeRoute.post('/',auth,zodValidation(bikeValidation),bikeController.createBike)
bikeRoute.get('/',bikeController.getAllBike)
bikeRoute.put('/:id',auth,bikeController.updateBike)
bikeRoute.delete('/:id',auth,bikeController.deleteBike)


export default bikeRoute