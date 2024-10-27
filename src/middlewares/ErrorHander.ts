import { NextFunction, Request, Response } from "express";

export const ErrorHandler = (err:Error,req:Request,res:Response,netx:NextFunction)=>{
    if(process.env.NODE === "development"){
        res.status(500).json({status:"error",message: err.message,stack:err.stack})
    }else{
        res.status(500).json({status:"error",message: err.message})
    }
}