import mongoose from 'mongoose';
import { IMongoLoader } from 'src/interfaces/loaders/IMongoLoader';
import { DebugNamespaces, log } from '../../logger';
import { Config } from '../../config';
import { ConnectOptions } from 'mongoose';

export class MongoLoader implements IMongoLoader {
  private count = 0;

  private mongooseOptions: ConnectOptions = {
    serverSelectionTimeoutMS: 10000,
    autoIndex: true,
    autoCreate: true,
    tlsInsecure: true,
  };

  private dbConnectionString = Config.mongoDbConnectionString;
  
  ConnectWithRetry(): void {
    log(DebugNamespaces.DB, 'Attempting MongoDB connection (will retry if needed)');
    mongoose
      .connect(this.dbConnectionString, this.mongooseOptions)
      .then(() => {
        log(DebugNamespaces.DB, 'MongoDB is connected');
      })
      .catch((err: unknown) => {
        const retrySeconds = 5;

        log(
          DebugNamespaces.DB,
          `MongoDB connection unsuccessful (will retry #${this.count} after ${retrySeconds} seconds):`,
          err,
        );
        this.count += 1;
        setTimeout(this.ConnectWithRetry, retrySeconds * 1000);
      });
  }
}