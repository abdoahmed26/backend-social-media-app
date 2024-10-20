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
        const {page,limit} = req.query;
        const posts = await Post.find({},{"__v":false}).limit(limit).skip((page-1)*limit).populate("userId","username profilePic")
        res.status(200).json({status:"success",data:posts})
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
        await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({status:"success",message:"Post deleted successfully"})
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}
