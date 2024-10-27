import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now,
        expires:86400*7
    }
})

export const Notification = mongoose.model("Notification",notificationSchema)