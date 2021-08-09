import { sign } from 'jsonwebtoken';
import { UserSession } from 'src/api/dto/session';
import { Roles } from '../../models/Roles';
import { Config } from '../../config';

const dummyUser: UserSession = {
  firstName: 'test',
  email: 'test',
  id: 'test',
  lastName: 'test',
  roles: [Roles.ADMIN],
};

const createJwt = (): string => sign(dummyUser, Config.jwtSecret);

export default { createJwt };
