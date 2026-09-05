import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/index.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

// Express app for the backend foundation phase.
// Still no database models, authentication, or business routes — those
// arrive in later phases as they're actually needed. This file exists to
// give the app a clean, scalable shape: routes mount here, 404s and
// errors are handled centrally, and nothing else has to change when new
// resource routes are added to routes/index.js.
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

// Anything under /api that didn't match a real route -> 404 JSON.
app.use('/api', notFound);

// Must be registered last: catches errors passed via next(err) from any
// route/middleware above.
app.use(errorHandler);

export default app;
