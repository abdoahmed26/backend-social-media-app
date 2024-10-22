import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { getUserLikesComment, getUserLikesPost, getUserLikesStatus, toggleLikeComment, toggleLikePost, toggleLikeStatus } from "../controllers/likesControllers";

export const likesRouter = express.Router()

likesRouter.route("/post/:id")
.get(verifyToken,getUserLikesPost)
.put(verifyToken,toggleLikePost)

likesRouter.route("/comment/:id")
.get(verifyToken,getUserLikesComment)
.put(verifyToken,toggleLikeComment)

likesRouter.route("/status/:id")
.get(verifyToken,getUserLikesStatus)
.put(verifyToken,toggleLikeStatus)