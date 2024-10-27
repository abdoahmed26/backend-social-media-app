import { Conversation } from "../models/conversation"
import { Message } from "../models/messagesModel"

export const getUserChat = async(req,res)=>{
    try{
        const getChats = await Conversation.find({$or:[{sender:req.user.id},{receiver:req.user.id}]}).populate("sender").populate("receiver")
        const data = getChats.map((ele:any)=>{
            return {
                _id:ele._id,
                sender:{
                    _id:ele.sender._id,
                    username:ele.sender.username,
                    profilePic:ele.sender.profilePic
                },
                receiver:{
                    _id:ele.receiver._id,
                    username:ele.receiver.username,
                    profilePic:ele.receiver.profilePic
                }
            }
        })
        res.status(200).json({status:"success",data})
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const getMessages = async(req,res)=>{
    try{
        const {id} = req.params;
        const conversation = await Conversation.findById(id).populate("messages")
        if(!conversation){
            res.status(404).json({status:"error",message:"conversation not found"})
        }
        else{
            res.status(200).json({status:"success",data:conversation.messages})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const updateMessage = async(req,res)=>{
    try{
        const {id} = req.params;
        const message = await Message.findByIdAndUpdate(id,req.body,{new:true,select:{"__v":false}})
        if(!message){
            res.status(404).json({status:"error",message:"message not found"})
        }
        else{
            res.status(200).json({status:"success",data:message})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const deleteMessage = async(req,res)=>{
    try{
        const {id} = req.params;
        const message = await Message.findByIdAndDelete(id)
        if(!message){
            res.status(404).json({status:"error",message:"message not found"})
        }
        else{
            await Conversation.findByIdAndUpdate(message.conversationId,{$pull:{messages:message._id}})
            res.status(200).json({status:"success",message:"message deleted successfully"})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}