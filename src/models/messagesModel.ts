import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    seen:{
        type:Boolean,
        default:false
    },
    sendBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Conversation",
        required:true
    }
},{timestamps:true})

export const Message = mongoose.model("Message",messageSchema)