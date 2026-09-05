import dotenv from 'dotenv';

dotenv.config();

// Centralised environment configuration. Reads process.env once and
// provides sensible defaults. Deliberately does NOT throw or validate
// MONGODB_URI as required — see config/db.js for why the app must still
// be able to start without it.
export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  mongodbUri: process.env.MONGODB_URI || '',
};
