import { sendNotification } from "../helpers/sendNotification"
import { FriendsRequest } from "../models/friendsRequestModel"
import { User } from "../models/usersModel"

export const getFriendsRequest = async(req,res)=>{
    try{
        const getRequest = await FriendsRequest.find({receiver:req.user.id}).populate("sender")
        const data = getRequest.map((ele:any)=>{
            return {
                requestId:ele._id,
                sender:{
                    senderId:ele.sender._id,
                    username:ele.sender.username,
                    profilePic:ele.sender.profilePic
                }
            }
        })
        res.status(200).json({status:"success",data})
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const addFriendRequest = async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user){
            res.status(404).json({status:"fail",message:"user not found"})
        }
        else{
            const newRequest = new FriendsRequest({
                sender:req.user.id,
                receiver:id
            })
            await newRequest.save();
            const message = `${req.user.username} sent you a friend request`
            await sendNotification(message,user._id.toString())
            res.status(201).json({status:"success",message:"Friend request sent"})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const acceptFriendRequest = async(req,res)=>{
    try{
        const {id} = req.params;
        const request = await FriendsRequest.findById(id)
        if(!request){
            res.status(404).json({status:"fail",message:"friend request not found"})
        }
        else{
            await User.findByIdAndUpdate(request.sender,{$push:{friends:request.receiver}},{new:true})
            const receiver = await User.findByIdAndUpdate(request.receiver,{$push:{friends:request.sender}},{new:true,select:{"password":false}})
            const message = `${req.user.username} accepted a friend request`
            await sendNotification(message,request.sender.toString())
            await FriendsRequest.findByIdAndDelete(id)
            res.status(200).json({status:"success",message:"Friend request accepted",data:receiver})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const deleteFriendRequest = async(req,res)=>{
    try{
        const {id} = req.params;
        const request = await FriendsRequest.findByIdAndDelete(id)
        if(!request){
            res.status(404).json({status:"fail",message:"friend request not found"})
        }
        else{
            res.status(200).json({status:"success",message:"Friend request deleted"})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}