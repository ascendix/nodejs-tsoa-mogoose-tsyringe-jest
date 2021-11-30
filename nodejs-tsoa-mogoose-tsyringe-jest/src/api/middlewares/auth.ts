import { Request } from 'express';
import { JsonWebTokenError, verify } from 'jsonwebtoken';
import { Roles } from 'src/models/Roles';
import { Config } from '../../config';
import { UserSession } from '../dto/session';
import { ErrorType, ServerError } from '../errors';

export type Res = { status: number; message: string };

function parseJwtData(token: string) {
  return verify(token, Config.jwtSecret) as UserSession;
}

export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[],
): Promise<UserSession | null> {
  switch (securityName) {
    case 'jwt':
      try {
        const claims = parseJwtData(
          request.headers.authorization?.replace('Bearer ', '') || '',
        );
        scopes?.forEach((scope) => {
          if (!claims.roles.includes(scope as Roles)) {
            throw new ServerError('User has not enough permissions', 403);
          }
        });
        return await Promise.resolve(claims);
      } catch (e) {
        if (e instanceof JsonWebTokenError) {
          throw new ServerError(
            'JWT token is absent or invalid',
            401,
            ErrorType.AuthenticationFailed,
          );
        }
        throw e;
      }
    default:
      return null;
  }
}
