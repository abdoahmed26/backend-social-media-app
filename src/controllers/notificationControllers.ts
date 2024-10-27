import { Notification } from "../models/notificationModel"

export const getNotification = async(req,res)=>{
    try{
        const notification = await Notification.find({userId:req.user.id})
        res.status(200).json({status:"success",data:notification})
    }catch(err:any){
        res.status(404).json({status:"error",message: err.message})
    }
}