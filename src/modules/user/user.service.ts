/* eslint-disable @typescript-eslint/no-explicit-any */

import { userModel } from "../auth/auth.model"
import { JwtPayload } from "jsonwebtoken"

const findMe = async(payLoads:Record<string,unknown>) => {
    const {payLoad}  = payLoads
    const {email,password} = payLoad as JwtPayload
    const result = await userModel.find({email,password}).select({password:0})
    return result
}

const updateMe = async(updatedData:any,payLoads:Record<string,unknown>) => {
  const {payLoad}  = payLoads
  const {email,password} = payLoad as JwtPayload
  const options = {
    new:true
  }
   const result = await userModel.findOneAndUpdate({email,password},updatedData,options).select({_id:1,name:1,email:1,phone:1,address:1,role:1})
   return result
}



export const userService = {
    findMe,
    updateMe,
}