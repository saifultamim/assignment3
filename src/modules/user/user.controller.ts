/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../../config";
import { jwts } from "../utilities/jwt/jwt";

const findMe = async(req:Request,res:Response,next:NextFunction) => {
try{
  const accessToken = req.headers.authorization?.split(' ')[1]
  if (!accessToken) {return('No Access Token')}
    const verfiedToken = jwts.jwtVerify(accessToken as string)
const result = await userService.findMe(verfiedToken  as JwtPayload)
 res.json({
  success: true,
  statusCode: 200,
  message: "User profile retrieved successfully",
  data:result
 })
}
catch(error){next(error)}
   
}

const updateMe = async(req:Request,res:Response,next:NextFunction) => {
try{
  const updatedData = req.body
  const accessToken = req.headers.authorization?.split(' ')[1]
   if (!accessToken) {return('No Access Token')}
     const verfiedToken = jwt.verify(
       accessToken as string,
       config.access_token_secret as string
     )
 const result = await userService.updateMe(updatedData,verfiedToken as JwtPayload)
  res.json({
   success: true,
   statusCode: 200,
   message: "Profile updated successfully",
   data:result
  })
}catch(error){next(error)}
 
 
}






export const userController = {
    findMe,
    updateMe,
}