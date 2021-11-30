import supertest from 'supertest';
import { RecordCreateRequest, RecordResponse } from 'src/api/dto/record';
import auth from '../../mocks/auth';
import { Config } from '../../../config';
import mocks from '../../mocks';

describe('Record API tests', (): void => {
  let request: supertest.SuperTest<supertest.Test>;
  const token = auth.createJwt();
  beforeAll((done) => {
    request = mocks.startTestServer(false, done);
  });
  it('get - /api/v1/record - success', async (): Promise<void> => {
    const result = await request
      .get(`${Config.virtualPath}/api/v1/record`)
      .set('Authorization', token);
    const content = result.body as [];
    expect(content.length).toEqual(0);
  });
  it('post - /api/v1/record - success', async (): Promise<void> => {
    const record: RecordCreateRequest = {
      numericField: 1,
      stringField: '1',
    };
    const result = await request
      .post(`${Config.virtualPath}/api/v1/record`)
      .send(record)
      .set('Authorization', token);
    const response = result.body as RecordResponse;
    expect(response.numericField).toEqual(record.numericField);
    expect(response.stringField).toEqual(record.stringField);
    expect(response.id).toBeDefined();
  });
  it('get - /api/v1/record - success', async (): Promise<void> => {
    const result = await request
      .get(`${Config.virtualPath}/api/v1/record`)
      .set('Authorization', token);
    const content = result.body as [];
    expect(content.length).toEqual(1);
  });
  afterAll((done) => {
    mocks.closeTestServer(done);
  });
});
