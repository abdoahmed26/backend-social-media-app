import { NextFunction, Response } from "express"

export const errorUploadFile = (req, res:Response, next:NextFunction) => {
    if(req.errorUploadFile){
        res.status(400).json({status:"fail",message:"file size too large"})
        return;
    }
    next()
}