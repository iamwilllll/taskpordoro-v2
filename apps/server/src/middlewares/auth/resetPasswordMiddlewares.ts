import { body } from "express-validator";
import handleInputsErrors from "../handleInputsErrors.js";

const resetPasswordMiddlewares = [     body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid'),
    body('newPassword').notEmpty().withMessage('Password is required'),
    body('repeat_password')
        .notEmpty()
        .withMessage('Repeat password is required')
        .custom((value, { req }) => {
            const { newPassword } = req.body;

            if (value !== newPassword) throw new Error('The password do not match');
            if (newPassword.length < 8) throw new Error('The password is very short');
            return true;
        }),
    handleInputsErrors,]
    
    
    export default  resetPasswordMiddlewares