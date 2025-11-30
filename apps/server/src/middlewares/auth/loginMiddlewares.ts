import { body } from 'express-validator';
import handleInputsErrors from '../handleInputsErrors.js';

const loginMiddlewares = [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid'),
    body('password').notEmpty().withMessage('Password is required'),
    handleInputsErrors,
];

export default loginMiddlewares;
