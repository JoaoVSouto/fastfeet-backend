import 'reflect-metadata';
import 'express-async-errors';

import path from 'path';

import express, { Express, Request, Response, NextFunction } from 'express';
import { errors as celebrateErrors } from 'celebrate';
import Youch from 'youch';
import PrettyError from 'pretty-error';

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
      async (err: Error, req: Request, res: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
          });
        }

        if (process.env.NODE_ENV === 'development') {
          const prettyError = new PrettyError();
          // eslint-disable-next-line no-console
          console.log(prettyError.render(err));

          const error = await new Youch(err, req).toJSON();

          return res.status(500).json(error);
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
