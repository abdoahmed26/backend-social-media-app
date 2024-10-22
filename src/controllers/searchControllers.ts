import { User } from "../models/usersModel";

export const search = async(req,res)=>{
    try{
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page-1)*limit;
        const q = req.query.q
        if(!q){
            const allUsers = await User.find({})
            const users = await User.find({}).limit(limit).skip(skip)
            const data = users.map((ele:any)=>{
                return {
                    _id:ele._id,
                    username:ele.username,
                    profilePic:ele.profilePic
                }
            })
            const paginationData = pagination(allUsers.length, limit, page)
            res.status(200).json({status:"success",data:{data,pagination:paginationData}})
        }
        else{
            const allUsers = await User.find({username:new RegExp(q, 'i')})
            const users = await User.find({username:new RegExp(q, 'i')}).limit(limit).skip(skip)
            const data = users.map((ele:any)=>{
                return {
                    _id:ele._id,
                    username:ele.username,
                    profilePic:ele.profilePic
                }
            })
            const paginationData = pagination(allUsers.length, limit, page)
            res.status(200).json({status:"success",data:{data,pagination:paginationData}})
        }
    }catch(err:any){
        res.status(404).json({status:"error",message:err.message})
    }
}

const pagination = (all:number,limit:number,page:number)=>{
    const totalPage = Math.ceil(all/limit)
    const currentPage = page;
    const prevPage = currentPage > 1 ? +currentPage-1 : null;
    const nextPage = currentPage < totalPage? +currentPage+1 : null;
    return {
        prevPage,
        currentPage,
        nextPage,
        totalPage
    }
}