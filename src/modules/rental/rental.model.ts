import { Schema, model } from "mongoose";
import { TBooking } from "./rental.interface";

const bookingSchema = new Schema<TBooking>({
    userId: { type: Schema.Types.ObjectId},
    bikeId: { type: Schema.Types.ObjectId , required: true },
    startTime: { type: Date, required: true },
    returnTime: { type: Date, default: null },
    totalCost: { type: Number, required: true, default: 0 },
    isReturned: { type: Boolean, required: true, default: false },
  });

 export  const bookingModel = model<TBooking>('booking', bookingSchema)
  