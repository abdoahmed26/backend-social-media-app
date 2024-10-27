import express from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { getMessages, getUserChat,updateMessage,deleteMessage } from '../controllers/conversationControllers';

export const conversationRouter = express.Router()

conversationRouter.get("/user-chat",verifyToken,getUserChat)
conversationRouter.get("/messages/:id",verifyToken,getMessages)


conversationRouter.route("/messages/:id")
.put(verifyToken,updateMessage)
.delete(verifyToken,deleteMessage)