import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const errorValidation  = (req: Request, res: Response, next:NextFunction) => {
    const errorMessage = validationResult(req);
    if(!errorMessage.isEmpty()){
        res.status(400).json({status:"fail" ,data: errorMessage.array() });
        return;
    }
    else{
        next();
    }
}