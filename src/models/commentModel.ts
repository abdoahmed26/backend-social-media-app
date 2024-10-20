import mongoose from "mongoose";

const commentModel = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Post"
    },
    parentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
        default:null
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    replies:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}})

commentModel.virtual("likesCount").get(function(){
    return this.likes ? this.likes.length : 0
})

commentModel.virtual("repliesCount").get(function(){
    return this.replies ? this.replies.length : 0
})

export const Comment = mongoose.model("Comment",commentModel)