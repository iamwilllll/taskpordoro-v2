import { body } from 'express-validator';

const registerMiddleware = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid'),
    body('password').notEmpty().withMessage('Password is required'),
    body('repeat_password')
        .notEmpty()
        .withMessage('Repeat password is required')
        .custom((value, { req }) => {
            const { password } = req.body;

            if (value !== password) throw new Error('The passwords do not match');
            return true;
        }),
];
export default registerMiddleware;
