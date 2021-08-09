import supertest from 'supertest';
import auth from '../../mocks/auth';
import { Config } from '../../../config';
import mocks from '../../mocks';

describe('Session API tests', (): void => {
  let request: supertest.SuperTest<supertest.Test>;
  const token = auth.createJwt();
  beforeAll((done) => {
    request = mocks.startTestServer(false, done);
  });
  it('get - /api/v1/session - error', async (): Promise<void> => {
    const result = await request.get(`${Config.virtualPath}/api/v1/session`);
    expect(result.status).toEqual(401);
  });
  it('get - /api/v1/session - success', async (): Promise<void> => {
    const result = await request
      .get(`${Config.virtualPath}/api/v1/session`)
      .set('Authorization', token);
    expect(result.status).toEqual(200);
  });
  afterAll((done) => {
    mocks.closeTestServer(done);
  });
});
