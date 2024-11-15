import mongoose from "mongoose";

const groupRequest = new mongoose.Schema({
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group",
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
})

export const GroupRequest = mongoose.model("GroupRequest", groupRequest)