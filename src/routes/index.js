import { Router } from 'express';
import healthRoutes from './health.routes.js';

// Central place to mount every API route as the backend grows. Future
// resource routers (e.g. campaigns, organisations, donations) get added
// here — nothing else in app.js needs to change when that happens.
const router = Router();

router.use('/health', healthRoutes);

export default router;
