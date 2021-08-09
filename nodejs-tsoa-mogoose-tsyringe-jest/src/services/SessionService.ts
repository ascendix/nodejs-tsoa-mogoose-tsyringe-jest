import { log } from 'console';
import { sign, verify } from 'jsonwebtoken';
import { UserSession } from 'src/api/dto/session';
import { Config } from '../config';
import { ISessionService } from 'src/interfaces/services/ISessionService';
import { DebugNamespaces } from '../logger';
import { Roles } from '../models/Roles';
import { injectable } from 'tsyringe';

const createToken = (session: UserSession) => {
  return sign(session, Config.jwtSecret);
};

@injectable()
export class SessionService implements ISessionService {
  constructor() {
    log(DebugNamespaces.APP, 'Created Session Service instance');
  }
  getAdminToken(): string {
    return createToken({
      id: 'admin_id',
      email: 'admin_email',
      firstName: 'admin',
      lastName: 'admin',
      roles: [Roles.ADMIN],
    });
  }
  getUserToken(): string {
    return createToken({
      id: 'user_id',
      email: 'user_email',
      firstName: 'user',
      lastName: 'user',
      roles: [Roles.USER],
    });
  }
  getSession(token: string): UserSession {
    return verify(token, Config.jwtSecret) as UserSession;
  }
}
