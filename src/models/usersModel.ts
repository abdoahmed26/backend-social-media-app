import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:"uploads/avatar.png"
    },
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}})

userSchema.virtual("friendsCount").get(function(){
    return this.friends.length
})

export const User = mongoose.model("User",userSchema)