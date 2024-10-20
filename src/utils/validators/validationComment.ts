import { body } from "express-validator";

export const validationComment = [
    body("text")
        .notEmpty()
        .withMessage("text is required"),
]