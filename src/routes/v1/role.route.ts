import { Router } from 'express';
import { roleController } from '../../controllers';

//ROLE ROUTES//
const _router: Router = Router({
    mergeParams: true,
});


export const router = _router;
