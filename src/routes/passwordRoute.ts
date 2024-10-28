import express from "express"
import { verifyToken } from "../middlewares/verifyToken"
import { forgotPassword, resetPassword, updatePassword } from "../controllers/passwordControllers"

export const passwordRouter = express.Router()

passwordRouter.put("/update",verifyToken,updatePassword)

passwordRouter.post("/forgot-password",forgotPassword)
passwordRouter.post("/reset-password",resetPassword)