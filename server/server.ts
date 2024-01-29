import express from 'express';

import routes from './routes';
import cookieParser from 'cookie-parser';
import {cspString} from './csp';
const app = express();

app.use((_req, res, next) => {

  res.header(
      'Content-Security-Policy',
      cspString()
  );
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  next();
});

if (process.env.ENV === 'localhost') {
  app.use(cookieParser());
}
app.use(routes());

app.listen(8080);
