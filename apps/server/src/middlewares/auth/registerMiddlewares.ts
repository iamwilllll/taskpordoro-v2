import { body } from 'express-validator';

const registerMiddlewares = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid'),
    body('password').notEmpty().withMessage('Password is required'),
    body('repeat_password')
        .notEmpty()
        .withMessage('Repeat password is required')
        .custom((value, { req }) => {
            const { password } = req.body;

            if (value !== password) throw new Error('The passwords do not match');
            if (password.length < 8) throw new Error('The password is very short');
            return true;
        }),
];
export default registerMiddlewares;
