import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { deleteFriend, deleteUser, getMyFriends, getUser, updateUser } from "../controllers/userControllers";
import { upload } from "../middlewares/uploadFile";
import { errorUploadFile } from "../middlewares/ErrorUploadFile";

export const userRouter = Router();

userRouter.route("/")
.get(verifyToken,getUser)
.put(verifyToken,upload.single("profilePic"),errorUploadFile,updateUser)
.delete(verifyToken,deleteUser)

userRouter.get("/friends",verifyToken,getMyFriends)
userRouter.delete("/friends/:id",verifyToken,deleteFriend)