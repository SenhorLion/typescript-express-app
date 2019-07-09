import express, { Request, Response } from 'express';
import { router } from './routes/loginRouter';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ name: 'session', keys: ['keySign'] }));
app.use(router);

app.listen(PORT, () => {
  console.log('Express listening on port', PORT);
});
