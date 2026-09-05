import mongoose from 'mongoose';
import { env } from './env.js';

// Connects to MongoDB if a connection string has been configured.
//
// IMPORTANT: this deliberately does NOT throw or exit the process when
// MONGODB_URI is missing or the connection fails. At this stage nothing
// in the API actually needs persistence yet, so the server should still
// come up in a usable (mock-data) state. Once real models/routes depend
// on the database, that will need to change — but that's a decision for
// the phase that introduces them, not this one.
export async function connectDB() {
  if (!env.mongodbUri) {
    console.warn(
      '[db] MONGODB_URI is not set — starting without a database connection. ' +
        'Copy server/.env.example to server/.env and set MONGODB_URI to enable MongoDB.'
    );
    return;
  }

  try {
    await mongoose.connect(env.mongodbUri, { serverSelectionTimeoutMS: 5000 });
    console.log('[db] Connected to MongoDB');
  } catch (error) {
    console.error('[db] Failed to connect to MongoDB:', error.message);
    console.warn('[db] Continuing to run without a database connection.');
  }
}

// Human-readable connection status for the health endpoint. Reports
// "not configured" (rather than "disconnected") when no URI was ever
// provided, so the two situations aren't conflated.
export function getDatabaseStatus() {
  if (!env.mongodbUri) return 'not configured';

  const stateNames = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  return stateNames[mongoose.connection.readyState] ?? 'unknown';
}

export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    console.log('[db] MongoDB connection closed');
  }
}
