import { sendNotification } from "../helpers/sendNotification";
import { Group } from "../models/groupModel"
import { GroupRequest } from "../models/groupRequestModel";

export const joinToGroup = async(req,res)=>{
    try{
        const group = await Group.findById(req.params.id);
        if(!group){
            res.status(400).json({status:"fail",message:"group not found"})
        }
        else{
            if(group.ownerId.toString() === req.user.id || group.supervisors.includes(req.user.id) || group.members.includes(req.user.id)){
                res.status(400).json({status:"fail",message:"You are already in the group"})
            }
            else{
                const newGroupRequest = new GroupRequest({
                    groupId: req.params.id,
                    userId: req.user.id
                })
                await newGroupRequest.save();
                const message = `${req.user.username} requested to join your group`
                await sendNotification(message,group.ownerId.toString())
                res.status(201).json({status:"success",message:"group request sent"})
            }
        }
    }catch(err:any){
        res.status(404).json({status:"error",message:err.message})
    }
}

export const getGroupRequest = async(req,res)=>{
    try{
        const group = await Group.findById(req.params.id);
        if(!group){
            res.status(400).json({status:"fail",message:"group not found"})
        }
        else{
            const groupRequests = await GroupRequest.find({groupId:req.params.id}).populate("userId")
            const data = groupRequests.map((ele:any)=>{
                return {
                    _id:ele._id,
                    groupId:ele.groupId,
                    userId:{
                        _id:ele.userId._id,
                        username:ele.userId.username,
                        profilePic:ele.userId.profilePic
                    }
                }
            })
            res.status(200).json({status:"success",data})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message:err.message})
    }
}

export const acceptGroupRequest = async(req,res)=>{
    try{
        const groupReq = await GroupRequest.findById(req.params.id)
        if(!groupReq){
            res.status(400).json({status:"fail",message:"Group request not found"})
        }
        else{
            const group = await Group.findById(groupReq.groupId);
            group?.members.push(groupReq.userId)
            await group?.save()
            const message = `The owner has approved your request to join the group`
            await sendNotification(message,groupReq.userId.toString())
            await GroupRequest.findByIdAndDelete(req.params.id)
            res.status(200).json({status:"success",message:"Group request accepted"})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const cancelGroupRequest = async(req,res)=>{
    try{
        const {id} = req.params;
        const request = await GroupRequest.findByIdAndDelete(id)
        if(!request){
            res.status(400).json({status:"fail",message:"Group request not found"})
        }
        else{
            res.status(200).json({status:"success",message:"Group request deleted"})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}