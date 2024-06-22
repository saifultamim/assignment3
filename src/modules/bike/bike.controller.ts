import { NextFunction, Request, Response} from "express";
import { bikeService } from "./bike.service";


const createBike = async(req:Request,res:Response,next:NextFunction) => {
  try{
    const result = await bikeService.createBike(req.body)
    res.json({
       success: true,
      statusCode: 200,
       message: "Bike added successfully",
       data:result
    })
  }catch(error){next(error)}
}
const getAllBike = async (req:Request,res:Response,next:NextFunction) => {
try{
  const result = await bikeService.getAllBike()
  return res.json({
    success: true,
    statusCode: 200,
    message: "Bikes retrieved successfully",
    data:result
  })
}catch(error){next(error)}
}


const updateBike = async (req:Request,res:Response,next:NextFunction) => {
try{
  const updatedData = req.body
  const id = req.params.id
  const result = await bikeService.updateBike(updatedData,id)
  return res.json({
    success: true,
    statusCode: 200,
    message: "Bike updated successfully",
    data:result
  })
}catch(error){next(error)}
}

const deleteBike = async (req:Request,res:Response,next:NextFunction) => {
 try{
  const id = req.params.id
  const result = await bikeService.deleteBike(id)
  return res.json({
    success: true,
    statusCode: 200,
    message: "Bike deleted successfully",
    data:result
  })
 }catch(error){next(error)}
}



export const bikeController = {
  createBike,
  getAllBike,
  updateBike,
  deleteBike,
}