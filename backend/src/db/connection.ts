import { Pool, PoolConfig, QueryResult, PoolClient, QueryResultRow } from 'pg';
import * as dotenv from 'dotenv';
import { logger } from '../utils/logger';

// Load environment variables from .env file
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Pool configuration
const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  max: parseInt(process.env.DB_POOL_MAX || '20', 10), // Maximum number of clients in the pool
  idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000', 10), // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: parseInt(
    process.env.DB_CONNECTION_TIMEOUT || '2000',
    10,
  ), // How long to wait for a connection
};

export const pool = new Pool(poolConfig);

// Error handling for the pool
pool.on('error', (err, client) => {
  logger.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Graceful shutdown
const closePool = async () => {
  try {
    await pool.end();
    logger.info('Database pool has been closed');
  } catch (error) {
    logger.error('Error closing database pool', error);
    process.exit(-1);
  }
};

// Handle process termination
process.on('SIGTERM', closePool);
process.on('SIGINT', closePool);

// Types for query parameters and results
export interface QueryOptions {
  name?: string;
  text: string;
  values?: any[];
}

export interface QueryConfig extends QueryOptions {
  rowMode?: string;
  types?: any;
}

// Enhanced query function with better typing and error handling
export const query = async <T extends QueryResultRow = any>(
  textOrConfig: string | QueryConfig,
  values?: any[],
): Promise<T[]> => {
  const start = Date.now();
  let queryConfig: QueryConfig;

  if (typeof textOrConfig === 'string') {
    queryConfig = {
      text: textOrConfig,
      values,
    };
  } else {
    queryConfig = textOrConfig;
  }

  try {
    const result = await pool.query<T>(queryConfig);
    const duration = Date.now() - start;

    // Log query execution details
    logger.debug('Query executed', {
      query: queryConfig.text,
      duration,
      rowCount: result.rowCount,
      // Don't log values in production for security
      ...(process.env.NODE_ENV !== 'production' && {
        values: queryConfig.values,
      }),
    });

    return result.rows;
  } catch (error) {
    logger.error('Database query error', {
      query: queryConfig.text,
      error,
      // Don't log values in production for security
      ...(process.env.NODE_ENV !== 'production' && {
        values: queryConfig.values,
      }),
    });
    throw error;
  }
};

// Transaction helper
export const transaction = async <T>(
  callback: (client: PoolClient) => Promise<T>,
): Promise<T> => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// Health check function
export const checkConnection = async (): Promise<boolean> => {
  try {
    await query('SELECT 1');
    return true;
  } catch (error) {
    logger.error('Database connection check failed', error);
    return false;
  }
};

// Export pool for direct access if needed
export default pool;
