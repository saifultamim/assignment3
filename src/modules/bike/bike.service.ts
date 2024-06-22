import { AnyObject } from "mongoose"
import { TBike } from "./bike.interface"
import { bikeModel } from "./bike.model"


const createBike = async(payLoad:TBike) => {
    const result = await bikeModel.create(payLoad)
    return result
}

const getAllBike = async () => {
    const result = await bikeModel.find({})
    return result
}

const updateBike = async (updatedData:AnyObject,id:string) => {
    const options = {
        new:true
    }
    const result = await bikeModel.findOneAndUpdate({_id:id},updatedData,options)
    return result
}

const deleteBike = async (id:string) => {
    const options = {new:true}
    const isAvailable = false
    const result = await bikeModel.findOneAndUpdate({_id:id},{isAvailable},options)
    return result
}


export const bikeService = {
    createBike,
    getAllBike,
    updateBike ,
    deleteBike,
} 