import { IocContainer } from '@tsoa/runtime';
import { container } from 'tsyringe';
import ExpressLoader from '../api/loaders/ExpressLoader';
import MongoLoader from '../api/loaders/MongoLoader';
import RecordsService from '../services/RecordsService';
import SessionService from '../services/SessionService';
import RecordsRepository from '../repositories/record/RecordsRepository';

container.register('IRecordsService', { useClass: RecordsService });
container.register('IMongoLoader', { useClass: MongoLoader });
container.register('IExpressLoader', { useClass: ExpressLoader });
container.register('ISessionService', { useClass: SessionService });
container.register('IRecordsRepository', { useClass: RecordsRepository });

export const iocContainer: IocContainer = { get: <T>(controller: { prototype: T }): T => container.resolve<T>(controller as never) };
export { container };
export default iocContainer;
