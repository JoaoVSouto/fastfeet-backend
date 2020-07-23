import 'reflect-metadata';
import express from 'express';

import './database';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('Server listening on 3333...'));
