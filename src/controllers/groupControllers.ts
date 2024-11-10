import { Group } from "../models/groupModel"

export const createGroup = async(req,res)=>{
    try{
        const newGroup = new Group({...req.body,groupImage:req.file?.path,ownerId:req.user.id})
        await newGroup.save()
        res.status(201).json({status:"success",message:"group created successfully"})
    }catch(err:any){
        res.status(404).json({status:"error",message:err.message})
    }
}

export const getMyGroups = async(req,res)=>{
    try{
        const groups = await Group.find({$or:[{ownerId:req.user.id},{supervisors: req.user.id},{members: req.user.id}]})
        res.status(200).json({status:"success",data:groups})
    }catch(err:any){
        res.status(404).json({status:"error",message:err.message})
    }
}