import 'reflect-metadata';
import 'express-async-errors';

import path from 'path';

import express, { Express, Request, Response, NextFunction } from 'express';
import { errors as celebrateErrors } from 'celebrate';

import './database';

import AppError from '@errors/AppError';

import { uploadsDir } from '@config/upload';

import routes from './routes';

class App {
  public readonly server: Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  private middlewares() {
    this.server.use(express.json());
    this.server.use('/files', express.static(path.resolve(uploadsDir)));
  }

  private routes() {
    this.server.use(routes);
  }

  private exceptionHandler() {
    this.server.use(celebrateErrors());

    this.server.use(
      (err: Error, req: Request, res: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
          });
        }

        return res.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
      },
    );
  }
}

export default new App().server;
