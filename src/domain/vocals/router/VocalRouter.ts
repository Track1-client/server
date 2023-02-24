import { Router } from "express";
import { authJWT, checkPaginationValue } from '../../../global/middlewares';
import { VocalController } from '../controller';

const router: Router = Router();

router.get('/',
        checkPaginationValue,
        VocalController.getVocalList);

export default router;