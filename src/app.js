import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.routes.js';

// Minimal Express app for Phase 1.
// No database connection, no models, no authentication, and no business
// APIs yet — those arrive in later phases as they're actually needed.
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/health', healthRoutes);

export default app;
