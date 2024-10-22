import express from "express"
import { verifyToken } from "../middlewares/verifyToken"
import { addCommentToPost, addCommentToStatus, addReplyComment, deleteComment, getCommentsPost, getCommentsStatus, getRepliesComment, updateComment } from "../controllers/commentsControllers"
import { validationComment } from "../utils/validators/validationComment"
import { errorValidation } from "../utils/validators/errorValidation"

export const commentRouter = express.Router()

// /:id => post id
commentRouter.route("/post/:id")
.get(verifyToken,getCommentsPost)
.post(verifyToken,validationComment,errorValidation,addCommentToPost)

commentRouter.route("/status/:id")
.get(verifyToken,getCommentsStatus)
.post(verifyToken,validationComment,errorValidation,addCommentToStatus)

// /:id => comment id
commentRouter.route("/:id")
.put(verifyToken,validationComment,errorValidation,updateComment)
.delete(verifyToken,deleteComment)

// /:id => comment id
commentRouter.route("/reply/:id")
.post(verifyToken,validationComment,errorValidation,addReplyComment)
.get(verifyToken,getRepliesComment)