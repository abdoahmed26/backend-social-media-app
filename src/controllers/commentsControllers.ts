import { Comment } from "../models/commentModel";
import { Post } from "../models/postModel";
import { Status } from "../models/statusModel";

export const addCommentToPost = async(req,res)=>{
    try{
        const {id} = req.params;
        const post = await Post.findById(id)
        if(!post){
            res.status(404).json({status:"error",message:"post not found"})
        }
        else{
            const newComment = new Comment({
                ...req.body,
                postId:id,
                userId:req.user.id
            })
            await newComment.save();
            post.comments.push(newComment._id)
            await post.save()
            res.status(200).json({status:"success",data:newComment})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message:err.message})
    }
}

export const addCommentToStatus = async(req,res)=>{
    try{
        const {id} = req.params;
        const status = await Status.findById(id)
        if(!status){
            res.status(404).json({status:"error",message:"status not found"})
        }
        else{
            const newComment = new Comment({
                ...req.body,
                postId:id,
                userId:req.user.id
            })
            await newComment.save();
            status.comments.push(newComment._id)
            await status.save()
            res.status(200).json({status:"success",data:newComment})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message:err.message})
    }
}
export const getCommentsPost = async(req,res)=>{
    try{
        const {id} = req.params;
        const post = await Post.findById(id).populate("comments")
        // console.log(post);
        if(!post){
            res.status(404).json({status:"error",message:"post not found"})
        }
        else{
            const comments = post.comments
            const postComments = await Comment.find({_id:comments.map(ele=>ele._id)},{"__v":false}).populate("userId")
            const data = postComments.map((ele:any)=>{
                return {
                    _id:ele._id,
                    text:ele.text,
                    userId:{
                        _id:ele.userId._id,
                        username:ele.userId.username,
                        profilePic:ele.userId.profilePic
                    },
                    postId:ele.postId,
                    parentId:ele.parentId,
                    likesCount:ele.likesCount,
                    repliesCount:ele.repliesCount,
                    createdAt:ele.createdAt,
                    updatedAt:ele.updatedAt
                }
            })
            res.status(200).json({status:"success",data})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message:err.message})
    }
}

export const getCommentsStatus = async(req,res)=>{
    try{
        const {id} = req.params;
        const status = await Status.findById(id).populate("comments")
        // console.log(post);
        if(!status){
            res.status(404).json({status:"error",message:"post not found"})
        }
        else{
            const comments = status.comments
            const statusComments = await Comment.find({_id:comments.map(ele=>ele._id)},{"__v":false}).populate("userId")
            const data = statusComments.map((ele:any)=>{
                return {
                    _id:ele._id,
                    text:ele.text,
                    userId:{
                        _id:ele.userId._id,
                        username:ele.userId.username,
                        profilePic:ele.userId.profilePic
                    },
                    postId:ele.postId,
                    parentId:ele.parentId,
                    likesCount:ele.likesCount,
                    repliesCount:ele.repliesCount,
                    createdAt:ele.createdAt,
                    updatedAt:ele.updatedAt
                }
            })
            res.status(200).json({status:"success",data})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message:err.message})
    }
}

export const addReplyComment = async(req,res)=>{
    try{
        const {id} = req.params;
        const comment = await Comment.findById(id)
        if(!comment){
            res.status(404).json({status:"error",message:"comment not found"})
        }
        else{
            const reply = new Comment({
                ...req.body,
                userId:req.user.id,
                postId:comment.postId,
                parentId:comment._id
            })
            await reply.save();
            comment.replies.push(reply._id)
            await comment.save()
            res.status(200).json({status:"success",data:reply})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message:err.message})
    }
}

export const getRepliesComment = async(req,res)=>{
    try{
        const {id} = req.params;
        const comment = await Comment.findById(id)
        if(!comment){
            res.status(404).json({status:"error",message:"comment not found"})
        }
        else{
            const replies = comment.replies
            const commentReplies = await Comment.find({_id:replies.map(id=>id)},{"__v":false}).populate("userId")
            const data = commentReplies.map((ele:any)=>{
                return {
                    _id:ele._id,
                    text:ele.text,
                    userId:{
                        _id:ele.userId._id,
                        username:ele.userId.username,
                        profilePic:ele.userId.profilePic
                    },
                    postId:ele.postId,
                    parentId:ele.parentId,
                    likesCount:ele.likesCount,
                    repliesCount:ele.repliesCount,
                    createdAt:ele.createdAt,
                    updatedAt:ele.updatedAt
                }
            })
            res.status(200).json({status:"success",data})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message:err.message})
    }
}

export const updateComment = async(req,res)=>{
    try{
        const {id} = req.params;
        const comment = await Comment.findByIdAndUpdate(id,req.body,{new:true,select:{"__v":false}})
        if(!comment){
            res.status(404).json({status:"error",message:"comment not found"})
        }
        else{
            res.status(200).json({status:"success",data:comment})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message:err.message})
    }
}

export const deleteComment = async(req,res)=>{
    try{
        const {id} = req.params;
        const comment = await Comment.findByIdAndDelete(id)
        if(!comment){
            res.status(404).json({status:"error",message:"comment not found"})
        }
        else{
            await Comment.deleteMany({_id:comment.replies.map(id=>id)})
            if(comment.parentId){
                const parentComment = await Comment.findById(comment.parentId)
                const updateParentReplies  = parentComment?.replies.filter(id=>id.toString()!==comment._id.toString())
                await Comment.findByIdAndUpdate(comment.parentId,{replies:updateParentReplies})
                res.status(200).json({status:"success",message:"comment deleted successfully"})
            }
            else{
                const post = await Post.findById(comment.postId)
                if(post){
                    const updatePostComments = post.comments.filter(id=>id.toString()!==comment._id.toString())
                    await Post.findByIdAndUpdate(comment.postId,{comments:updatePostComments})
                    res.status(200).json({status:"success",message:"comment deleted successfully"})
                }
                else{
                    const status = await Status.findById(comment.postId)
                    const updateStatusComments = status?.comments.filter(id=>id.toString()!==comment._id.toString())
                    await Status.findByIdAndUpdate(comment.postId,{comments:updateStatusComments})
                    res.status(200).json({status:"success",message:"comment deleted successfully"})
                }
            }
        }
    }catch(err:any){
        res.status(404).json({status:"error",message:err.message})
    }
}