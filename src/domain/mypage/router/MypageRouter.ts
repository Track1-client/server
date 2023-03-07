import { Router } from "express";
import { authJWT, checkPaginationValue } from '../../../global/middlewares';
import MypageController from '../controller/MypageController';


const router: Router = Router();


router.get('/',
            checkPaginationValue,
            authJWT,
            MypageController.getUserInfo);

            
export default router;