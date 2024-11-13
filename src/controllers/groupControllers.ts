import { Group } from "../models/groupModel"
import { Post } from "../models/postModel"

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

export const updateGroup = async(req,res)=>{
    try{
        const group = await Group.findById(req.params.id)
        if(!group){
            res.status(404).json({status:"fail",message:"group not found"})
        }
        else{
            if(group.ownerId.toString() === req.user.id){
                const updateGroup = await Group.findByIdAndUpdate(req.params.id,{...req.body,groupImage:req.file?.path},{new:true})
                res.status(200).json({status:"success",data:updateGroup})
            }
            else{
                res.status(403).json({status:"fail",message:"this resource is not allowed"})
            }
        }
    }catch(err:any){
        res.status(404).json({status:"error",message:err.message})
    }
}

export const getPostGroup = async(req,res)=>{
    try{
        const posts = await Post.find({groupId:req.params.id}).populate("userId")
        const data = posts.map((ele:any)=>{
            return{
                _id:ele._id,
                text:ele.text,
                media:ele.media,
                groupId:ele.groupId,
                userId:{
                    _id:ele.userId._id,
                    username:ele.userId.username,
                    profilePic:ele.userId.profilePic
                },
                likesCount:ele.likesCount,
                commentsCount:ele.commentsCount,
                createdAt:ele.createdAt,
                updatedAt:ele.updatedAt
            }
        })
        res.status(200).json({status:"success",data})
    }catch(err:any){
        res.status(404).json({status:"error",message:err.message})
    }
}

export const getMembers = async(req,res)=>{
    try{
        const group:any = await Group.findById(req.params.id).populate("ownerId members supervisors")
        if(!group){
            res.status(404).json({status:"fail",message:"group not found"})
        }
        else{
            const dataMembers = group.members.map((ele:any)=>{
                return{
                    _id:ele._id,
                    username:ele.username,
                    profilePic:ele.profilePic,
                    role:"member"
                }
            })
            const dataSupervisors = group.supervisors.map((ele:any)=>{
                return{
                    _id:ele._id,
                    username:ele.username,
                    profilePic:ele.profilePic,
                    role:"supervisors"
                }
            })
            const dataOwner = {
                _id:group.ownerId._id,
                username:group.ownerId.username,
                profilePic:group.ownerId.profilePic,
                role:"owner"
            }
            const data = [dataOwner,...dataSupervisors,...dataMembers]
            res.status(200).json({status:"success",data})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message:err.message})
    }
}