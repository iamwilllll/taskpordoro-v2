import handleInputsErrors from './handleInputsErrors.js';

import registerMiddlewares from './auth/registerMiddlewares.js';
import loginMiddlewares from './auth/loginMiddlewares.js';
import validateToken from './auth/validateToken.js';
import forgotPasswordMiddlewares from './auth/forgotPasswordMiddlewares.js';
import validateTokenMiddlewares from './auth/validateTokenMiddlewares.js';
import resetPasswordMiddlewares from './auth/resetPasswordMiddlewares.js';



export { handleInputsErrors, registerMiddlewares, loginMiddlewares, validateToken,forgotPasswordMiddlewares,validateTokenMiddlewares ,resetPasswordMiddlewares};
