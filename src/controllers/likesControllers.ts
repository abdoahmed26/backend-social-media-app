import { sendNotification } from "../helpers/sendNotification"
import { Comment } from "../models/commentModel"
import { Post } from "../models/postModel"
import { Status } from "../models/statusModel"
import { User } from "../models/usersModel"

export const toggleLikePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        if(!post){
            res.status(404).json({status:"error",message: "post not found"})
        }else{
            if(post.likes.includes(req.user.id)){
                const deleteLike = post.likes.filter((id)=>id.toString()!==req.user.id)
                const updatePost = await Post.findByIdAndUpdate(req.params.id,{likes:deleteLike},{new:true,select:{"__v":false}})
                res.status(200).json({status:"success",message:"Post unliked",data:{likesCount:updatePost?.likes.length}})
            }else{
                const addLike = [...post.likes,req.user.id]
                const updatePost = await Post.findByIdAndUpdate(req.params.id,{likes:addLike},{new:true,select:{"__v":false}})
                const message = `${req.user.username} liked your post`
                await sendNotification(message,post.userId.toString())
                res.status(200).json({status:"success",message:"Post liked",data:{likesCount:updatePost?.likes.length}})
            }
        }
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const getUserLikesPost = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(!post){
            res.status(404).json({status:"error",message: "post not found"})
        }else{
            const likes = post.likes
            const userLikes = await User.find({_id:likes.map(id=>id)})
            const data = userLikes.map((ele:any)=>{
                return {
                    _id:ele._id,
                    username:ele.username,
                    profilePic:ele.profilePic
                }
            })
            res.status(200).json({status:"success",data})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const toggleLikeComment = async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.id)
        if(!comment){
            res.status(404).json({status:"error",message: "comment not found"})
        }else{
            if(comment.likes.includes(req.user.id)){
                const deleteLike = comment.likes.filter((id)=>id.toString()!==req.user.id)
                const updateComment = await Comment.findByIdAndUpdate(req.params.id,{likes:deleteLike},{new:true,select:{"__v":false}})
                res.status(200).json({status:"success",message:"Comment unliked",data:{likesCount:updateComment?.likes.length}})
            }else{
                const addLike = [...comment.likes,req.user.id]
                const updateComment = await Comment.findByIdAndUpdate(req.params.id,{likes:addLike},{new:true,select:{"__v":false}})
                const message = `${req.user.username} liked your comment`
                await sendNotification(message,comment.userId.toString())
                res.status(200).json({status:"success",message:"Comment liked",data:{likesCount:updateComment?.likes.length}})
            }
        }
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const getUserLikesComment = async(req,res)=>{
    try{
        const comment = await Comment.findById(req.params.id)
        if(!comment){
            res.status(404).json({status:"error",message: "comment not found"})
        }else{
            const likes = comment.likes;
            const userLikes = await User.find({_id:likes.map(id=>id)})
            const data = userLikes.map((ele:any)=>{
                return {
                    _id:ele._id,
                    username:ele.username,
                    profilePic:ele.profilePic
                }
            })
            res.status(200).json({status:"success",data})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const toggleLikeStatus = async (req, res) => {
    try{
        const status = await Status.findById(req.params.id)
        if(!status){
            res.status(404).json({status:"error",message: "post not found"})
        }else{
            if(status.likes.includes(req.user.id)){
                const deleteLike = status.likes.filter((id)=>id.toString()!==req.user.id)
                const updatePost = await Status.findByIdAndUpdate(req.params.id,{likes:deleteLike},{new:true,select:{"__v":false}})
                res.status(200).json({status:"success",message:"Status unliked",data:{likesCount:updatePost?.likes.length}})
            }else{
                const addLike = [...status.likes,req.user.id]
                const updatePost = await Status.findByIdAndUpdate(req.params.id,{likes:addLike},{new:true,select:{"__v":false}})
                const message = `${req.user.username} liked your status`
                await sendNotification(message,status.userId.toString())
                res.status(200).json({status:"success",message:"Status liked",data:{likesCount:updatePost?.likes.length}})
            }
        }
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}

export const getUserLikesStatus = async(req,res)=>{
    try{
        const status = await Status.findById(req.params.id)
        if(!status){
            res.status(404).json({status:"error",message: "Status not found"})
        }else{
            const likes = status.likes
            const userLikes = await User.find({_id:likes.map(id=>id)})
            const data = userLikes.map((ele:any)=>{
                return {
                    _id:ele._id,
                    username:ele.username,
                    profilePic:ele.profilePic
                }
            })
            res.status(200).json({status:"success",data})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}