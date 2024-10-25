import mongoose from "mongoose";

const requests = new mongoose.Schema({
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
})

export const FriendsRequest = mongoose.model("FriendsRequest",requests)