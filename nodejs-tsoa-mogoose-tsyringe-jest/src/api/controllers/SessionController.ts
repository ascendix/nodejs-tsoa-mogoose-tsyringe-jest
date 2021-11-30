import { inject, injectable } from 'tsyringe';
import {
  Controller,
  Get,
  Request,
  Route,
  Security,
  Tags,
} from 'tsoa';
import { ISessionService } from 'src/interfaces/services/ISessionService';
import { AuthRequest, UserSession } from '../dto/session';

@injectable()
@Route('/api/v1/session')
@Tags('SessionController')
export class SessionController extends Controller {
  constructor(
    @inject('ISessionService') private sessionService: ISessionService,
  ) {
    super();
  }

  /**
   * Get session by token
   */
  @Get()
  @Security('jwt')
  getSession(@Request() request: AuthRequest): UserSession {
    return request.user;
  }

  /**
   * Get test admin token
   */
  @Get('/admin')
  getAdmin(): string {
    return this.sessionService.getAdminToken();
  }

  /**
   * Get test user token
   */
  @Get('/user')
  getUser(): string {
    return this.sessionService.getUserToken();
  }
}

export default { SessionController };
