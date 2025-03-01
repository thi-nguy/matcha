import { Request } from 'express';
import { logger } from './logger';

export interface ErrorDetails {
  code: string;
  message: string;
  details?: any;
  stack?: string;
}

export interface ErrorResponse {
  error: ErrorDetails;
}

export const getErrorDetails = (
  err: Error,
  includeStack: boolean = process.env.NODE_ENV === 'development',
  additionalDetails?: Record<string, any>,
): ErrorDetails => {
  return {
    code: (err as any).code || 'INTERNAL_ERROR',
    message: err.message || 'An unexpected error occurred',
    ...(includeStack && { stack: err.stack }),
    ...(additionalDetails && { details: additionalDetails }),
  };
};

export const logError = (
  err: Error,
  req?: Request,
  additionalInfo?: Record<string, any>,
): void => {
  logger.error('Error:', {
    name: err.name,
    message: err.message,
    ...(req && {
      path: req.path,
      method: req.method,
    }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    ...additionalInfo,
  });
};

export const createErrorResponse = (
  err: Error,
  req?: Request,
  additionalDetails?: Record<string, any>,
): ErrorResponse => {
  logError(err, req, additionalDetails);
  return {
    error: getErrorDetails(
      err,
      process.env.NODE_ENV === 'development',
      additionalDetails,
    ),
  };
};
