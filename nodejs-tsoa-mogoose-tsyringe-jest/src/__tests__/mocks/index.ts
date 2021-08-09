import 'reflect-metadata';
import supertest from 'supertest';
import http from 'http';
import createApp from '../../app';
import { container } from '../../ioc';
import { TestMongoLoader } from './TestMongoLoader';
import { DebugNamespaces, log } from '../../logger';
import { ExpressLoader } from '../../api/loaders/ExpressLoader';
import { TestRecordsRepository } from './repositories/TestRecordsRepository';

let server: http.Server;
let request: supertest.SuperTest<supertest.Test>;
let subsCount = 0;
function initMocks(): void {
  container.register('IMongoLoader', { useClass: TestMongoLoader });
  container.register('IExpressLoader', { useClass: ExpressLoader });
  container.register('IRecordsRepository', { useClass: TestRecordsRepository });
}

const startTestServer = (
  reset: boolean,
  done: jest.DoneCallback
): supertest.SuperTest<supertest.Test> => {
  if (reset || !server) {
    log(DebugNamespaces.DEBUG, 'Test server started');
    initMocks();
    server = http.createServer(createApp());
    server.listen(done);
    request = supertest(server);
  }
  subsCount += 1;
  return request;
};

const closeTestServer = (done: jest.DoneCallback): void => {
  subsCount -= 1;
  if (subsCount === 0) {
    log(DebugNamespaces.DEBUG, 'Test server closed');
    server.close(done);
  }
};

export default {
  startTestServer,
  closeTestServer,
};
