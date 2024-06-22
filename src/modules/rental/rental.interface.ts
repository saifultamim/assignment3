
import { ObjectId } from "mongoose"

export interface TBooking {
    userId: ObjectId;
    bikeId: ObjectId; 
    startTime: Date; 
    returnTime: string | null; 
    totalCost: number; 
    isReturned: boolean; 
  }