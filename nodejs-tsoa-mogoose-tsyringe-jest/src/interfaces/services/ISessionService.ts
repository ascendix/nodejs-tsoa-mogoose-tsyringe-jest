import { UserSession } from 'src/api/dto/session';

export interface ISessionService {
  getAdminToken(): string;
  getUserToken(): string;
  getSession(token: string): UserSession;
}
