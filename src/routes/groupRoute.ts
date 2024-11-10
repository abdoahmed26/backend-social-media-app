import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { upload } from '../middlewares/uploadFile';
import { errorUploadFile } from '../middlewares/ErrorUploadFile';
import { validationGroup } from '../utils/validators/validationGroup';
import { errorValidation } from '../utils/validators/errorValidation';
import { createGroup, getMyGroups } from '../controllers/groupControllers';

export const groupRouter = Router()

groupRouter.route("/")
.get(verifyToken,getMyGroups)
.post(verifyToken,
    upload.single("groupImage"),errorUploadFile,
    validationGroup,errorValidation,createGroup
)