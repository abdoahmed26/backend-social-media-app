import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { getUserLikesComment, getUserLikesPost, toggleLikeComment, toggleLikePost } from "../controllers/likesControllers";

export const likesRouter = express.Router()

likesRouter.route("/post/:id")
.get(verifyToken,getUserLikesPost)
.put(verifyToken,toggleLikePost)

likesRouter.route("/comment/:id")
.get(verifyToken,getUserLikesComment)
.put(verifyToken,toggleLikeComment)