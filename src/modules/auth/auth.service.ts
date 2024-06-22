
import { AnyObject } from "mongoose"
import { TUser } from "./auth.interface"
import { userModel, userModelLogin } from "./auth.model"
import { jwts } from "../utilities/jwt/jwt"
//import jwt from 'jsonwebtoken'
//import config from "../../config"

const authServiceSignUp = async (payLoad:TUser) => {
    const result = await userModel.create(payLoad)
    const updateResult = result.toObject()
    delete (updateResult as AnyObject).password
    return updateResult
}

const authServiceLogin = async (payLoad : Partial<TUser>) => {
    let jwt_token:string;
    let loginUser;
    let success:boolean;
    const {email,password} = payLoad
    const findUser = await userModel.find({email,password})
if(findUser.length>0){
    const id = findUser[0]._id.toHexString()
    const payLoads = {...payLoad,id}
    jwt_token = jwts.jwtSign(payLoads)
    await userModelLogin.create({email,password})
     loginUser = await userModel.findOne({email,password}).select({password:0,createdAt:0,updatedAt:0})
     success =true
    return {
        success,
        jwt_token,
        loginUser
    }
}else{
    success=false
    return success
}
   
}

export const userServices = {
    authServiceSignUp,
    authServiceLogin,
}