import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
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
    ]
},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}})

postSchema.virtual("likesCount").get(function(){
    return this.likes.length
})

postSchema.virtual("commentsCount").get(function(){
    return this.comments.length
})

export const Post = mongoose.model("Post",postSchema)