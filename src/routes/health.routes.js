import { Router } from 'express';

const router = Router();

// GET /api/health — confirms the server is running.
// Exists purely as a plumbing check for this phase; no other business
// routes are mounted yet.
router.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

export default router;
