import 'reflect-metadata';
import express from 'express';

import './database';

const app = express();

app.get('/', (req, res) => {
  return res.json({ ok: true });
});

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('Server listening on 3333...'));
