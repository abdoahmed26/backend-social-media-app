import express from 'express';
import { login, register } from '../controllers/authControllers';
import { validationLogin } from '../utils/validators/validationLogin';
import { errorValidation } from '../utils/validators/errorValidation';
import { upload } from '../middlewares/uploadFile';
import { errorUploadFile } from '../middlewares/ErrorUploadFile';
import { validationRegister } from '../utils/validators/validationRegister';

export const authRouter = express.Router();

authRouter.post("/login",validationLogin,errorValidation,login)
authRouter.post("/register",upload.single("profilePic"),errorUploadFile,validationRegister,errorValidation,register)