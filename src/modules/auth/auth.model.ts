import { Schema, model } from "mongoose";
import { TUser, TUserlogin } from "./auth.interface";



const userSchema = new Schema<TUser>({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:String,required:true},
    address:{type:String,required:true},
    role: { type: String, required: true, enum: ['admin', 'user'] }
},
{
    timestamps:true,
})

const userSchemaLogin = new Schema<TUserlogin>({
    email:{type:String,required:true},
    password:{type:String,required:true}
})

export const userModel = model<TUser>('user',userSchema)
export const userModelLogin = model<TUserlogin>('userLogin',userSchemaLogin)