import handleInputsErrors from '../handleInputsErrors.js'
import { body } from 'express-validator'

const forgotPasswordMiddlewares  = [
       body('email').notEmpty().withMessage('email is required'),
        handleInputsErrors,
]

export default  forgotPasswordMiddlewares
