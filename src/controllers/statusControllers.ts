import { Comment } from "../models/commentModel"
import { Status } from "../models/statusModel"
import { User } from "../models/usersModel"

export const createStatus = async(req,res)=>{
    try{
        const newStatus = new Status({
            ...req.body,
            media:req.file?.path,
            userId:req.user.id
        })
        await newStatus.save()
        res.status(201).json({status:'success',message:"status created successfully"})
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const getMyStatus = async(req, res) => {
    try{
        const statuses = await Status.find({userId:req.user.id})
        res.status(200).json({status:'success',data:statuses})
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const getStatusFriends = async(req, res) =>{
    try{
        const user = await User.findById(req.user.id)
        if(!user){
            res.status(404).json({status:"error",message: "User not found"})
        }
        else{
            const friends = user.friends
            const statuses = await Status.find({userId:{$in:friends}}).populate("userId")
            const data = statuses.map((ele:any)=>{
                return {
                    _id:ele._id,
                    text:ele.text,
                    media:ele.media,
                    userId:{
                        _id:ele.userId._id,
                        username:ele.userId.username,
                        profilePic:ele.userId.profilePic
                    },
                    likesCount:ele.likesCount,
                    commentsCount:ele.commentsCount,
                    createdAt:ele.createdAt,
                }
            })
            res.status(200).json({status:'success',data})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const deleteStatus = async(req, res) => {
    try{
        const status = await Status.findByIdAndDelete(req.params.id)
        if(!status){
            res.status(404).json({status:"error",message: "Status not found"})
        }
        else{
            await Comment.deleteMany({postId:status._id})
            res.status(200).json({status:'success',message:"Status deleted successfully"})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}