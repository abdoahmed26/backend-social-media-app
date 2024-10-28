import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import compression from "compression"
import helmet from "helmet";
import { rateLimit } from 'express-rate-limit'
import path from "path"
import { authRouter } from "./routes/authRoute"
import mongoose from "mongoose"
import { userRouter } from "./routes/userRoute"
import { postRouter } from "./routes/postRoute"
import { likesRouter } from "./routes/likesRoute"
import { commentRouter } from "./routes/commentsRoute"
import { statusRouter } from "./routes/statusRoute"
import { searchRouter } from "./routes/searchRoute"
import { friendsRequest } from "./routes/friendsRequestRoute"
import { app, server } from "./chat/server"
import { conversationRouter } from "./routes/conversationRoute"
import { ErrorHandler } from "./middlewares/ErrorHander"
import { notificationRouter } from "./routes/notificationRoute"
import { passwordRouter } from "./routes/passwordRoute";

dotenv.config()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message:"Many requests in few time. please try again in anther time"
})

// const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(compression())
app.use(helmet({xFrameOptions: { action: "deny" }}));
app.use(limiter)
app.use(ErrorHandler)

mongoose.connect(process.env.DATABASE_URL as string).then(()=>{
    console.log("database connected");
}).catch((err)=>{
    console.log("database disconnected");
    console.log(err);
    process.exit(1)
})

app.use("/src",express.static(path.join(__dirname)))

app.use("/api/v1/auth",authRouter)

app.use("/api/v1/user",userRouter)

app.use("/api/v1/password",passwordRouter)

app.use("/api/v1/posts",postRouter)

app.use("/api/v1/comments",commentRouter)

app.use("/api/v1/friends-request",friendsRequest)

app.use("/api/v1/status",statusRouter)

app.use("/api/v1/likes",likesRouter)

app.use("/api/v1/chats",conversationRouter)

app.use("/api/v1/notification",notificationRouter)

app.use("/api/v1/search",searchRouter)

app.all("*", (req, res) => {
    res.status(404).json({status:"error",message: "this resource is not available"})
})

server.listen(process.env.PORT,()=>{
    console.log(`this server is running at http://localhost:${process.env.PORT}`);
})