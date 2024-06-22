


/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyObject } from "mongoose"
import { bookingModel } from "./rental.model"
import { bikeModel } from "../bike/bike.model"
import { jwts } from "../utilities/jwt/jwt"
import { JwtPayload } from "jsonwebtoken"


const createRental = async(data:AnyObject,userId:string) => {
    const allData = {...data,userId}
    const availableCheck = await bikeModel.findOne({_id:data.bikeId}).select({isAvailable:1})
    const {isAvailable}:any = availableCheck
    if(!isAvailable){
        const result = await bookingModel.create(allData)
        const modifyTime : any= result.startTime
        const datePart1 =  JSON.stringify(modifyTime).slice(1,18)
        const datePart2 = JSON.stringify(modifyTime).slice(22,25)
        const finalmodified : string= `${datePart1}${datePart2}`
        const {...result2}:any=result
        result2._doc.startTime  = finalmodified;
        return result2._doc
    }else{
        return 'Alrady Rent This Bike'
    }
    
}

const returnBike = async(accessToken:string,id:string) => {
    const BikeAvailabilityStatus1 = await bookingModel.findOne({_id:id}).select({bikeId:1})
    const _id = BikeAvailabilityStatus1?.bikeId
    const options = {
        new:true
    } 
   const  BikeAvailabilityStatus2 = await bikeModel.findOneAndUpdate({_id},{isAvailable:true},options)
  if(BikeAvailabilityStatus2?.isAvailable){
    const timeReturn = new Date()
    const BikeAvailabilityStatus3 = await bookingModel.findOneAndUpdate({_id:id},{returnTime:timeReturn},options)
    const startTime: Date = new Date(BikeAvailabilityStatus3?.startTime as any);
    const returnTime: Date = new Date(BikeAvailabilityStatus3?.returnTime as any);
    const diffHours: number = Math.abs((returnTime.getTime() - startTime.getTime()) / 36e5)
    const totalCost = (diffHours*15).toFixed(2)
    const BikeAvailabilityStatus4 = await bookingModel.findOneAndUpdate({_id:id},{totalCost:totalCost,
        isReturned:true},options)
    return BikeAvailabilityStatus4
  }
 
   
}
const getAllRent = async(accessToken:string) => {
   
const decode=jwts.jwtVerify(accessToken)
const {payLoad} = decode as JwtPayload
const id:string = payLoad.id
const userRent = await bookingModel.find({userId:id})
return userRent
}

export const rentalService = {
    createRental,
    returnBike,
    getAllRent
}