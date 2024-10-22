import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
    text:{
        type:String,
    },
    media:{
        type:String
    },
    userId:{
        type:String,
        required:true,
        ref:"User"
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    createAt:{
        type:Date,
        default:Date.now,
        expires:86400
    }
},{toJSON:{virtuals:true},toObject:{virtuals:true}})

statusSchema.virtual("likesCount").get(function(){
    return this.likes ? this.likes.length : 0;
})

statusSchema.virtual("commentsCount").get(function(){
    return this.comments ? this.comments.length : 0;
})

export const Status = mongoose.model("Status",statusSchema)