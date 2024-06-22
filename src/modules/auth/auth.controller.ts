/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import { userServices } from "./auth.service"
const authControllerSignUp = async (req:Request,res:Response,next:NextFunction) => {
try{
    const payLoad = req.body
    const result = await userServices.authServiceSignUp(payLoad)
    res.json({
        success: true,
        statusCode: 201,
        message: "User registered successfully",
        data:result
    })
}catch(error){next(error)}
}

const authControllerLogin = async (req:Request,res:Response,next:NextFunction) => {
  try{
    const payLoad = req.body
    const {success,jwt_token,loginUser}:any= await userServices.authServiceLogin(payLoad)
     res.json({
        success: success ? true : false,
         statusCode: success ? 200 : 401,
         message: success ? "User logged in successfully" : "plz sign up first" ,
         token: success ? jwt_token : 'not jwt token',
         data: success ? loginUser : 'no data found'
     })
  }catch(error){next(error)}
}




export const authControllers = {
    authControllerSignUp,
    authControllerLogin,
}