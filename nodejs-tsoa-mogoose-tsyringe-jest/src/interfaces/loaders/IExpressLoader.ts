import express from 'express';

export default interface IExpressLoader {
  LoadApp(app: express.Application): void;
}