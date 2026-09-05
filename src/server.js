import app from './app.js';
import { env } from './config/env.js';
import { connectDB, disconnectDB } from './config/db.js';

async function start() {
  // connectDB() never throws — it logs and continues if MongoDB isn't
  // configured or isn't reachable, so a missing/broken DB never prevents
  // the API itself from starting.
  await connectDB();

  const server = app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
  });

  async function shutdown(signal) {
    console.log(`\n[server] Received ${signal}, shutting down...`);
    server.close(async () => {
      await disconnectDB();
      console.log('[server] HTTP server closed');
      process.exit(0);
    });
  }

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

start();
