import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Pool } from 'pg';
import { userRoutes } from './routes/user/user.route';
import { errorHandler } from './middleware/errorHandler';
import * as dotenv from 'dotenv';
import { logger } from './utils/logger';

// Load environment variables
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

class Server {
  private app: express.Application;
  private pool: Pool;
  private server: any;

  constructor() {
    this.app = express();
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(helmet());
  }

  private setupRoutes() {
    this.app.use('/api/users', userRoutes);
    this.app.use(errorHandler);
  }

  public async start() {
    try {
      // Test database connection
      await this.pool.query('SELECT NOW()');
      logger.info('Database connection successful');

      const PORT = process.env.PORT || 3000;
      this.server = this.app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
      });

      this.server.on('error', async (err: NodeJS.ErrnoException) => {
        logger.error('Server error:', err);
        await this.stop();
        process.exit(1);
      });
    } catch (err) {
      logger.error('Failed to start server:', err);
      await this.stop();
      process.exit(1);
    }
  }

  public async stop() {
    try {
      if (this.server) {
        this.server.close();
      }
      if (this.pool) {
        logger.info('Closing database pool...');
        await this.pool.end();
        logger.info('Database pool has been closed');
      }
    } catch (err) {
      logger.error('Error during cleanup:', err);
    }
  }
}

const server = new Server();

// Handle cleanup on process termination
process.on('SIGINT', async () => {
  await server.stop();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await server.stop();
  process.exit(0);
});

server.start();
