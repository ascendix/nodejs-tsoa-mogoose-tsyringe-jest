import { log } from 'console';
import { sign, verify } from 'jsonwebtoken';
import { UserSession } from 'src/api/dto/session';
import { ISessionService } from 'src/interfaces/services/ISessionService';
import { injectable } from 'tsyringe';
import { Config } from '../config';
import { DebugNamespaces } from '../logger';
import { Roles } from '../models/Roles';

const createToken = (session: UserSession) => sign(session, Config.jwtSecret);

@injectable()
export default class SessionService implements ISessionService {
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
