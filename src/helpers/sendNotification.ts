import { io } from "../chat/server"
import { Notification } from "../models/notificationModel"

export const sendNotification = async(message:string,userId:string)=>{
    try{
        const notification = new Notification({
            message:message,
            userId,
        })

        await notification.save()

        io.to(userId).emit("notification",notification)

    }catch(err:any){
        console.log(err);
    }
}