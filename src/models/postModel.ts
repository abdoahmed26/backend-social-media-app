import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    text:{
        type:String,
    },
    media:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
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
    return this.likes ? this.likes.length : 0;
})

postSchema.virtual("commentsCount").get(function(){
    return this.comments ? this.comments.length : 0;
})

export const Post = mongoose.model("Post",postSchema)