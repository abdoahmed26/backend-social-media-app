import { Comment } from "../models/commentModel"
import { Post } from "../models/postModel"

export const createPost = async(req,res)=>{
    try{
        const newPost = new Post({...req.body,media:req.file?.path,userId:req.user.id})
        await newPost.save()
        res.status(200).json({status:"success",message:"Post created successfully"})
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}
export const getPosts = async(req,res)=>{
    try{
        const limit = req.query.limit || 10
        const page = req.query.page || 1
        const posts = await Post.find({},{"__v":false}).limit(limit).skip((page-1)*limit).populate("userId")
        const data = posts.map((ele:any)=>{
            return {
                _id:ele._id,
                text:ele.text,
                media:ele.media,
                userId:{
                    _id:ele.userId._id,
                    username:ele.userId.username,
                    profilePic:ele.userId.profilePic
                },
                likesCount:ele.likesCount,
                commentsCount:ele.commentsCount,
                createdAt:ele.createdAt,
                updatedAt:ele.updatedAt
            }
        })
        res.status(200).json({status:"success",data})
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const getMyPosts = async(req,res)=>{
    try{
        const posts = await Post.find({userId:req.user.id})
        res.status(200).json({status:"success",data:posts})
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const updatePost = async(req,res)=>{
    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,{...req.body,media:req.file?.path},{new:true,select:{"__v":false}})
        res.status(200).json({status:"success",data:updatedPost})
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const deletePost = async(req,res)=>{
    try{
        const post = await Post.findByIdAndDelete(req.params.id)
        if(!post){
            res.status(404).json({status:"error",message:"post not found"})
        }
        else{
            await Comment.deleteMany({postId:post._id})
            res.status(200).json({status:"success",message:"Post deleted successfully"})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}
