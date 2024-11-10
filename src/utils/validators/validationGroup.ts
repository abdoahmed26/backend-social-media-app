import { body } from "express-validator";

export const validationGroup = [
    body("name")
        .notEmpty()
        .withMessage("name is required"),
    body("description")
        .notEmpty()
        .withMessage("description is required"),
]