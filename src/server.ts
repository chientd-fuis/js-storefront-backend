import { Request, Response } from 'express';
import express from 'express';
import userHandler from './handlers/userHandler';
import productHandler from './handlers/productHandler';
import orderHandler from './handlers/orderHandler';
import bodyParser from 'body-parser';

const app: express.Application = express();

let port = 3000;
if (process.env.ENV === 'test') {
  port = 3333;
}
const address: string = `http://localhost:${port}`;
app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

userHandler(app);
productHandler(app);
orderHandler(app);

app.get('/', function (_req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
