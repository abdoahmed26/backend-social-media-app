import { body } from "express-validator";

export const validationRegister = [
    body("username")
        .notEmpty()
        .withMessage("Username is required"),
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("invalid email"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6,max: 20 })
        .withMessage("password must be at least 6 characters and at most 20 characters")
]