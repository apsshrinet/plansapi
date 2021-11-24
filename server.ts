import express, {
  NextFunction,
  Router,
  Request,
  Response,
  response,
} from "express";
import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import { db } from "./db";
import { router } from "./routes/plansRouter";

const app = express();
dotenv.config();

//databaseinitilization
async function database_intilization(res: Response) {
  try {
    await db.connect();

    console.log("Successfully connected to database...");

    let checkcreatetable =
      "SELECT EXISTS(SELECT * FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'plans');";
    let existsplantab = await db.query(checkcreatetable);
    if (existsplantab.rows[0]["exists"] == true) {
      console.log("Table plans already exists in database");
    } else {
      let createtable =
        "CREATE TABLE plans (id uuid PRIMARY KEY,plan_names VARCHAR(255) UNIQUE,button_value VARCHAR(255) NOT NULL, order_limit INTEGER, created_on TIMESTAMPTZ NOT NULL DEFAULT NOW());";
      db.query(createtable);
      console.log("Created table plans");
    }
    checkcreatetable =
      "SELECT EXISTS(SELECT * FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'features');";
    let existsfeaturetab = await db.query(checkcreatetable);
    if (existsfeaturetab.rows[0]["exists"] == true) {
      console.log("Table features already exists in database");
    } else {
      let createtable =
        "CREATE TABLE features (id uuid PRIMARY KEY,plans_id uuid NOT NULL,features VARCHAR(255) NOT NULL);";
      await db.query(createtable);
      console.log("Created table features");
    }
    checkcreatetable =
      "SELECT EXISTS(SELECT * FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'pricing');";
    let existspricingtab = await db.query(checkcreatetable);
    if (existspricingtab.rows[0]["exists"] == true) {
      console.log("Table pricing already exists in database");
    } else {
      let createtable =
        "CREATE TABLE pricing (id uuid PRIMARY KEY,plans_id uuid NOT NULL,original_pricing INT NOT NULL,reduced_pricing INT, billing VARCHAR(100) NOT NULL);";
      await db.query(createtable);
      console.log("Created table pricing");
    }
  } catch (err) {
    res.send(err);
  }
}

database_intilization(response);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello from express.");
});

app.use("/plans", router);
app.use(async (res: Request, req: Response, next: NextFunction) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(process.env.PORT, () => {
  console.log("Node server started running ", process.env.PORT);
});
