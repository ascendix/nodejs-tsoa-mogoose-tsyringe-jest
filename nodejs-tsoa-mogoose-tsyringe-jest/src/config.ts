import dotenv from 'dotenv';

dotenv.config();

export interface IConfig {
  jwtSecret: string;
  nodeEnv: string;
  port: number;
  virtualPath: string;
  mongoDbConnectionString: string;
}

export const Config: IConfig = {
  port: Number.parseInt(process.env.PORT || '3000', 10),
  jwtSecret: process.env.JWT_SECRET || '',
  nodeEnv: process.env.NODE_ENV || 'development',
  virtualPath: process.env.VIRTUAL_PATH || '',
  mongoDbConnectionString: process.env.MONGODB_CONNECTION_STRING || '',
};
