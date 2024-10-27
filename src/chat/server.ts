import express from "express"
import http from "http"
import { Server } from "socket.io"
import { getUserFromToken } from "../helpers/getUserFromToken"
import dotenv from "dotenv"
import { Conversation } from "../models/conversation"
import { Message } from "../models/messagesModel"
dotenv.config()

export const app = express()

export const server = http.createServer(app)

export const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST","PUT","DELETE"],
        credentials:true
    }
})

const onlineUsers = new Set()

io.on("connection",async(socket)=>{
    console.log(socket.handshake.auth.token);
    console.log(socket.id);

    const user = await getUserFromToken(socket.handshake.auth.token as string)
    onlineUsers.add(user.id)

    // online users
    io.emit("onlineUsers",Array.from(onlineUsers))

    // new message
    socket.on("newMessage",async(data)=>{
        const conversation = await Conversation.findOne(
        {$or:
            [
                {sender:data.sender,receiver:data.receiver},
                {sender:data.receiver,receiver:data.sender}
            ]
        })
        if(conversation){
            const newMessage = new Message({
                text:data.text,
                sendBy:data.sender,
                conversationId:conversation._id
            })
            await newMessage.save()
            conversation.messages.push(newMessage._id)
            await conversation.save()
            io.to(data.receiver).emit("receiveMessage",newMessage)
            io.to(data.sender).emit("receiveMessage",newMessage)
        }
        else{
            const newMessage = new Message({
                text:data.text,
                sendBy:data.sender
            })
            await newMessage.save()
            const newConversation = new Conversation({
                sender:data.sender,
                receiver:data.receiver,
                messages:[newMessage._id]
            })
            await newConversation.save()
            newMessage.conversationId = newConversation._id
            await newMessage.save()
            io.to(data.receiver).emit("receiveMessage",newMessage)
            io.to(data.sender).emit("receiveMessage",newMessage)
        }
    })

    // typing
    socket.on("typing",(data)=>{
        io.to(data.receiver).emit("typing")
    })

    // stop typing
    socket.on("stopTyping",(data)=>{
        io.to(data.receiver).emit("stopTyping")
    })

    socket.on("disconnect",()=>{
        console.log("Uer disconnected",user.id);
        onlineUsers.delete(user.id)
        io.emit("onlineUsers",Array.from(onlineUsers))
    })
})