import { Comment } from "../models/commentModel"
import { FriendsRequest } from "../models/friendsRequestModel"
import { Post } from "../models/postModel"
import { Status } from "../models/statusModel"
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
        const user = await User.findByIdAndDelete(req.user.id)
        if(!user){
            res.status(404).json({status:"error",message: "User not found"})
        }else{
            const friends = user.friends
            await User.updateMany({_id:{$in: friends}},{$pull:{friends:user._id}})
            await Post.deleteMany({userId:user._id})
            await Status.deleteMany({userId:user._id})
            await Comment.deleteMany({userId:user._id})
            await FriendsRequest.deleteMany({$or:[{sender:user._id},{receiver:user._id}]})
            res.status(200).json({status:"success",message:"User deleted successfully"})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const getMyFriends = async(req,res)=>{
    try{
        const user = await User.findOne({_id:req.user.id});
        if(!user){
            res.status(404).json({status:"error",message: "User not found"})
        }else{
            const friends = user.friends;
            const friendsData = await User.find({_id:{$in:friends}});
            const data = friendsData.map((ele:any)=>{
                return {
                    _id:ele._id,
                    username:ele.username,
                    profilePic:ele.profilePic
                }
            })
            res.status(200).json({status:"success",data})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const deleteFriend = async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(req.user.id,{$pull:{friends:id}});
        if(!user){
            res.status(404).json({status:"error",message: "User not found"})
        }
        else{
            await User.findByIdAndUpdate(id,{$pull:{friends:req.user.id}});
            res.status(200).json({status:"success",message:"Friend deleted successfully"})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}