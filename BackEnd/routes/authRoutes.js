import express, { Router } from 'express';
import { createAdmin, getAdminProfile, loginAdmin, logoutAdmin} from '../controllers/authController.js';
import { checkAuth } from '../middlewares/checkAuth.js';

const authRouter = express(Router());

authRouter.post('/admin/signup', createAdmin);
authRouter.post('/admin/login', loginAdmin);
authRouter.post('/admin/logout', logoutAdmin);
authRouter.get('/admin/profile', checkAuth, getAdminProfile);

export default authRouter;