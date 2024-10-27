import { Request, Response } from "express"
import { User } from "../models/usersModel";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const login = async(req:Request,res:Response) => {
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user){
            res.status(404).json({status:"error",message: "User not found"})
        }
        else{
            const isMatch = await bcrypt.compare(req.body.password,user.password)
            if(!isMatch){
                res.status(401).json({status:"fail",message: "email or password is incorrect"})
            }
            else{
                const token = jwt.sign({id:user._id,username:user.username,email:user.email},process.env.JWT_SECRET_KEY as string,{expiresIn:"10m"})
                res.status(200).json({status:"success",data:{token}})
            }
        }
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const register = async(req:Request, res:Response):Promise<void> => {
    try {
        const oldUser = await User.findOne({email:req.body.email})
        
        if(oldUser){
            res.status(400).json({status:"error",message: "email already exists"})
        }
        else{
            const hashedPassword = await bcrypt.hash(req.body.password,10)
        
            const newUser = new User({
                ...req.body,
                password: hashedPassword,
                profilePic: req.file?.path
            })
    
            await newUser.save()
    
            res.status(200).json({status:"success",message: "User registered successfully"})
        }
    }
    catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}