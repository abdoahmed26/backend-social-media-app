import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { upload } from "../middlewares/uploadFile";
import { createStatus, deleteStatus, getMyStatus, getStatusFriends } from "../controllers/statusControllers";

export const statusRouter = Router()

statusRouter.route('/')
.get(verifyToken,getMyStatus)
.post(verifyToken,upload.single('media'),createStatus)

statusRouter.get("/friends",verifyToken,getStatusFriends)

statusRouter.delete('/:id',verifyToken,deleteStatus)