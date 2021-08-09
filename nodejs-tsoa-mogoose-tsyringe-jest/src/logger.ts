import { Config } from './config';
import debug from 'debug';

export enum DebugNamespaces {
  APP = 'app',
  ROUTER = 'router',
  AUTH = 'auth',
  ERROR = 'error',
  INFO = 'info',
  DB = 'db',
  DEBUG = 'debug',
  WARN = 'warn',
}

const devNamespaces = [
  DebugNamespaces.APP,
  DebugNamespaces.ROUTER,
  DebugNamespaces.AUTH,
  DebugNamespaces.ERROR,
  DebugNamespaces.INFO,
  DebugNamespaces.DB,
  DebugNamespaces.DEBUG,
  DebugNamespaces.WARN,
];

if (Config.nodeEnv === 'development') {
  debug.enable(devNamespaces.join(','));
}

const storage: { [key: string]: debug.IDebugger } = {};

export const log = (category: DebugNamespaces, content: unknown, ...args: unknown[]): void => {
  let logger = storage[category];
  if (!logger) {
    logger = debug(category);
    storage[category] = logger;
  }
  logger(content, ...args);
};
