import { User } from "../models/usersModel"
import bcrypt from "bcryptjs"
import { sendEmail } from "../utils/sendEmail"
import jwt from "jsonwebtoken"
import { Request, Response } from "express"

export const updatePassword = async(req,res)=>{
    try{
        const {oldPassword,newPassword} = req.body
        const user = await User.findById(req.user.id)
        if(!user){
            res.status(404).json({status:"error",message:"user not found"})
        }
        else{
            const isMatch = await bcrypt.compare(oldPassword,user.password)
            if(!isMatch){
                res.status(401).json({status:"fail",message:"old password does not match"})
            }
            else{
                const hashedPassword = await bcrypt.hash(newPassword,10)
                const updatedUser = await User.findByIdAndUpdate(req.user.id,{password:hashedPassword},{new:true,select:{"__v":false,"password":false}})
                res.status(200).json({status:"success",message:"password updated successfully",data:{user:updatedUser}})
            }
        }
    }catch(err:any){
        res.status(404).json({status:"error",message:err.message})
    }
}

export const forgotPassword = async(req:Request,res:Response)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user){
            res.status(404).json({status:"error",message:"user not found"})
        }
        else{
            const resetToken = jwt.sign({_id:user._id},process.env.RESET_TOKEN_SECRET as string,{expiresIn:"5m"})
            const resetURL = `${req.protocol}://${req.get("host")}/resetPassword/${resetToken}`
            sendEmail(user.email,resetURL,user.username)
            res.status(200).json({status:"success",message:"password reset link sent to your email"})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message:err.message})
    }
}

export const resetPassword = async(req:Request,res:Response)=>{
    try{
        const {token,newPassword} = req.body;
        jwt.verify(token,process.env.RESET_TOKEN_SECRET as string,async(err,user)=>{
            if(err){
                res.status(401).json({status:"fail",message:"Token expired or invalid"})
            }else{
                const hashedPassword = await bcrypt.hash(newPassword,10)
                await User.findByIdAndUpdate(user._id,{password:hashedPassword})
                res.status(200).json({status:"success",message:"password updated successfully"})
            }
        })
    }catch(err:any){
        res.status(404).json({status:"error",message:err.message})
    }
}