import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            required:true
        }
    ]
})

export const Conversation = mongoose.model("Conversation",conversationSchema)