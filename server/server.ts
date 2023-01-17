import express from 'express';

import routes from './routes';
import cookieParser from 'cookie-parser';
const app = express();

if (process.env.ENV === 'localhost') {
  app.use(cookieParser());
}
app.use(routes());

app.listen(8080);
