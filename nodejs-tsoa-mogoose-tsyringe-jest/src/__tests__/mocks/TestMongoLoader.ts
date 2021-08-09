import { IMongoLoader } from 'src/interfaces/loaders/IMongoLoader';

export class TestMongoLoader implements IMongoLoader {
  ConnectWithRetry = (): void => {};
}

export default TestMongoLoader;
