import supertest from 'supertest';
import mocks from '../mocks/index';

describe('Backend tests', (): void => {
  let request: supertest.SuperTest<supertest.Test>;
  beforeAll((done) => {
    request = mocks.startTestServer(false, done);
  });
  it('Health endpoint', async (): Promise<void> => {
    const result = await request.get('/health');
    expect(result.text).toEqual('healthy');
    expect(result.status).toEqual(200);
  });
  afterAll((done) => {
    mocks.closeTestServer(done);
  });
});
