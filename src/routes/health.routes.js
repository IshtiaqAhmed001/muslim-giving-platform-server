import { Router } from 'express';
import { getDatabaseStatus } from '../config/db.js';
import { env } from '../config/env.js';

const router = Router();

// GET /api/health — confirms the API process is running. Database status
// is reported separately and never causes this endpoint to fail, since
// MongoDB isn't required for the app to run yet.
router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'muslim-giving-platform-api',
    environment: env.nodeEnv,
    database: getDatabaseStatus(),
  });
});

export default router;
