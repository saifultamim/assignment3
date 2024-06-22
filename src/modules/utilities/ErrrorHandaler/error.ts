/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler, NextFunction } from "express"
import mongoose from "mongoose"





 const errorHandaler:ErrorRequestHandler = (err,req,res,next) => {
    let message = err.message || 'something went wrong'
    type TErrorSources = {
      path:string | number,
      message:string
    }[]
    let errorSources:TErrorSources = [
      {
        path:'',
        message:'Error message'
      }
    ]
    
    const mongooseHandleError = (err:mongoose.Error.ValidationError) =>{
       message = 'Validation Error'
        errorSources  = Object.values(err.errors).map((val)=>{
       return {
        path:val?.path,
        message:val.message
       }
       })
      return {
        message,
        errorSources
       }
  
    }
  const castHandleError = (err:mongoose.Error.CastError) => {
    message = ' Cast Error'
      errorSources  = [
     {
      path:err.path,
      message:err.message
     }
     ]
     return {
      message,
      errorSources
     }
  }
     if(err.name === 'ValidationError'){
      const simplifyError = mongooseHandleError(err)
      message=simplifyError.message
      errorSources=simplifyError.errorSources
    }else if(err.name === 'CastError'){
      const simplifyError = castHandleError(err)
      message=simplifyError.message
      errorSources=simplifyError.errorSources
    }
    return res.json({
      success:false,
      message:message,
      errorSources:errorSources,
      stack: "error stack"
    })
  }
export default errorHandaler