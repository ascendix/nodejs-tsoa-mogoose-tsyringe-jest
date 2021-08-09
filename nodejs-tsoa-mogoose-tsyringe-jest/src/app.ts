import express, { Application } from "express";
import IExpressLoader from './interfaces/loaders/IExpressLoader';
import { IMongoLoader } from './interfaces/loaders/IMongoLoader';
import { container } from './ioc';

function loadModules(app: Application) {
  container.resolve<IMongoLoader>('IMongoLoader').ConnectWithRetry();
  container.resolve<IExpressLoader>('IExpressLoader').LoadApp(app);
}

export default function CreateApp(): express.Application {
  const app: Application = express();

  loadModules(app);

  return app;
}