import { Router } from 'express';
import { emailAddress } from '../../validators/authValidator';
import validate from '../../middlewares/validationMiddleware';
import { password } from '../../validators/userValidator';
import { requiredTextField } from '../../validators/commonValidator';
import { userController } from '../../controllers';

//USER ROUTES//
const _router: Router = Router({
    mergeParams: true,
});

//USER SIGNUP
_router
    .route('/sign-up')
    .post(
        validate([
            emailAddress(),
            password('password'),
            password('confirmPassword'),
        ]),
        userController.createUser
    );

//USER VERFIY THERE EMAIL
_router
    .route('/verify-email')
    .post(
        validate([
            emailAddress(),
            requiredTextField('otp', 'Otp', { min: 2, max: 255 }),
        ]),
        userController.verifyEmail
    );

//EXPORT
export const router = _router;
