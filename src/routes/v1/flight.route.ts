import { Router } from 'express';
import { flightController } from '../../controllers';
import auth from '../../middlewares/authMiddleware';
import permit from '../../middlewares/permissionMiddleware';
import { RoleType } from '../../utils/enums';

//FLIGHT ROUTES//
const _router: Router = Router({
    mergeParams: true,
});

// USER FLIGHT UPDATE
_router
    .route('/update-user-flight')
    .put(
        auth,
        permit([RoleType.ADMIN, RoleType.USER]),
        flightController.createNewFlight
    );

// GET FLIGHT BY FLIGHT_ID AND CREATE/UPDATE THE USER FLIGHT DATA
_router
    .route('/get-flight/:flightId')
    .get(
        auth,
        permit([RoleType.ADMIN, RoleType.USER]),
        flightController.getFlightOfUser
    );

//EXPORT
export const router = _router;
