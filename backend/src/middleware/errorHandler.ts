import { Request, Response, NextFunction } from 'express';
import { DatabaseError } from 'pg';
import { createErrorResponse, ErrorResponse } from '../utils/errorUtils';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

interface DatabaseErrorResponse extends ErrorResponse {
  error: ErrorResponse['error'] & {
    details?: string;
  };
}

const handleDatabaseError = (
  err: DatabaseError,
  req: Request,
): DatabaseErrorResponse => {
  const errorMap: Record<
    string,
    { status: number; code: string; message: string }
  > = {
    '23505': {
      status: 409,
      code: 'DUPLICATE_ERROR',
      message: 'Resource already exists',
    },
    '23503': {
      status: 400,
      code: 'FOREIGN_KEY_ERROR',
      message: 'Related resource not found',
    },
    '23502': {
      status: 400,
      code: 'INVALID_DATA',
      message: 'Required field missing',
    },
  };

  const defaultError = {
    status: 500,
    code: 'DATABASE_ERROR',
    message: 'Database operation failed',
  };
  const errorInfo = err.code ? errorMap[err.code] : defaultError;
  const { status, code, message } = errorInfo;

  return {
    error: {
      code,
      message,
      ...(process.env.NODE_ENV === 'development' && { details: err.detail }),
    },
  };
};

const getErrorStatus = (err: DatabaseError): number => {
  if (!err.code) return 500;

  const statusMap: Record<string, number> = {
    '23505': 409, // unique violation
    '23503': 400, // foreign key violation
    '23502': 400, // not null violation
  };

  return statusMap[err.code] || 500;
};

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Handle our custom application errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(createErrorResponse(err, req));
  }

  // Handle PostgreSQL errors
  if (err instanceof DatabaseError) {
    const response = handleDatabaseError(err, req);
    const status = getErrorStatus(err);
    return res.status(status).json(response);
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json(createErrorResponse(err, req));
  }

  // Handle JWT errors (commented out for now)
  // if (err.name === 'JsonWebTokenError') {
  //   return res.status(401).json(createErrorResponse(err, req, { code: 'INVALID_TOKEN' }));
  // }
  //
  // if (err.name === 'TokenExpiredError') {
  //   return res.status(401).json(createErrorResponse(err, req, { code: 'TOKEN_EXPIRED' }));
  // }

  // Default error
  res.status(500).json(createErrorResponse(err, req));
}
