import {
  NextFunction,
  Request,
  Response,
} from 'express';
import mongoose from 'mongoose';
import { ValidateError } from 'tsoa';
import { DebugNamespaces, log } from '../../logger';
import { ServerError } from '../errors';

export const errorHandlingMiddleware = (
  err: ServerError,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof ValidateError) {
    log(
      DebugNamespaces.WARN,
      `Caught Validation Error for ${req.path}:`,
      err.fields,
    );
    res.status(400).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
    return;
  }
  if (err instanceof mongoose.Error.ValidationError) {
    log(
      DebugNamespaces.WARN,
      `Caught Validation Error for ${req.path}:`,
      err.errors,
    );
    res.status(400).json({
      message: 'Validation Failed',
      details: err?.errors,
    });
    return;
  }
  log(DebugNamespaces.ERROR, 'error on route %s:\n%s', req.path, err.message);
  res.status(err.status || 500);
  res.json({ message: err.message });
};

export default { errorHandlingMiddleware };
