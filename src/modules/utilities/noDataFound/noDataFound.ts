/* eslint-disable @typescript-eslint/no-explicit-any */
//import { Response } from "express"


const checkCollection = (param:any,statusCode:number,message:string) => {

    if(param.length > 0  ){
        return {
            success: true,
            statusCode: statusCode,
            message: message,
            data:param
           }
   }
   else {
    return {
        success: false,
        message: "No Data Found",
        data: param 
    }
   }
}

export default checkCollection