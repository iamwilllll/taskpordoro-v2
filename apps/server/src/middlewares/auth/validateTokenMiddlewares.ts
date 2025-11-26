import { body } from 'express-validator';
import handleInputsErrors from '../handleInputsErrors.js';

const validateTokenMiddlewares = [
    body('email').notEmpty().withMessage('email is required'),
    body('token').notEmpty().withMessage('token is required'),
    handleInputsErrors,
];
export default validateTokenMiddlewares;
