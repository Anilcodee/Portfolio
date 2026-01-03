import express, { Router } from 'express';
import { checkAuth } from '../middlewares/checkAuth.js';
import { getStats, getVisitAnalytics } from '../controllers/analyticsController.js';

const analyticsRouter = express(Router());

analyticsRouter.get('/admin/analytics', checkAuth, getVisitAnalytics)
analyticsRouter.get('/admin/stats', checkAuth, getStats)

export default analyticsRouter;