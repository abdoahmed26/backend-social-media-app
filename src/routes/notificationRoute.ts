import express from "express"
import { verifyToken } from "../middlewares/verifyToken"
import { getNotification } from "../controllers/notificationControllers"

export const notificationRouter = express.Router()

notificationRouter.get("/",verifyToken,getNotification)