import { User } from "../models/usersModel"

export const getUser = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id,{"__v":false,"password":false})
        res.status(200).json({status:"success",data:user})
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const updateUser = async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.user.id,{...req.body,profilePic:req.file?.path},{new:true,select:{"__v":false,"password":false}})
        res.status(200).json({status:"success",data:user})
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const deleteUser = async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.user.id)
        res.status(200).json({status:"success",message:"User deleted successfully"})
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}