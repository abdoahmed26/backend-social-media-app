import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { upload } from "../middlewares/uploadFile";
import { createPost, deletePost, getMyPosts, getPosts, updatePost } from "../controllers/postControllers";

export const postRouter = express.Router()

postRouter.route("/")
.get(verifyToken,getPosts)
.post(verifyToken,upload.single("media"),createPost)

postRouter.get("/my",verifyToken,getMyPosts)

postRouter.route("/:id")
.put(verifyToken,upload.single("media"),updatePost)
.delete(verifyToken,deletePost)