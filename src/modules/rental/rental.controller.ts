/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {  NextFunction, Request, Response } from "express"
import { rentalService } from "./rental.service"
import { jwts } from "../utilities/jwt/jwt"
import checkCollection from "../utilities/noDataFound/noDataFound"

const createRental = async(req:Request,res:Response,next:NextFunction) => {
   try{
    const data = req.body
    const access_token = req.headers.authorization?.split(' ')[1]
    const verifiedToken = jwts.jwtVerify(access_token as string)
    const {payLoad}:any = verifiedToken
    const id = payLoad.id
    const result = await rentalService.createRental(data,id)
    return res.json({
        success: true,
        statusCode: 200,
        message: "Rental created successfully",
        data:result
    })
   }catch(error){
    next(error)
   }
}

const returnBike = async(req:Request,res:Response,next:NextFunction) => {
  try{
    const accessToken = req.headers.authorization?.split(' ')[1]
    const id = req.params.id
    const result = await rentalService.returnBike(accessToken as string,id) 
    return res.json({
        success: true,
        statusCode: 200,
        message: "Bike returned successfully",
        data:result
    })
  }catch(error){
    next(error)
  }
}

const getAllRent = async(req:Request,res:Response,next:NextFunction) => {
    try{
        const accessToken = req.headers.authorization?.split(' ')[1]
        const result = await rentalService.getAllRent(accessToken as string)
        const statusCode= 200
        const message= "Rentals retrieved successfully"
       return res.json(checkCollection(result,statusCode,message))  
    }catch(error){
        next(error)
    }
    }
export const rentalController = {
    createRental,
    returnBike,
    getAllRent
}