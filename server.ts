import express, { NextFunction, Router,Request,Response } from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { database_intilization } from './db';
import {router} from './routes/plansRouter';

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.get('/',async (req: Request, res: Response, next: NextFunction)=>{
  res.send('Hello from express.');
})

database_intilization();
app.use('/plans',router);
app.use(async (res: Request, req: Response, next: NextFunction)=>{
  const error = new Error("Not found");
  error.status = 404;
  next(error);
})

app.use((err: Error,req: Request,res: Response,next: NextFunction)=>{
  res.status(err.status||500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
})

app.listen(process.env.PORT, () => {
        console.log("Node server started running ",process.env.PORT);
    });