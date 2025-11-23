import { body } from 'express-validator';

const loginMiddlewares = [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid'),
    body('password').notEmpty().withMessage('Password is required'),
];

export default loginMiddlewares;
