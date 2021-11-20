import { db } from "../db";
import { NextFunction, Request, Response } from "express";
import { nextTick } from "process";
import { QueryResult } from "pg";

export const addplan = async (
  plan_names: string,
  button_value: string,
  order_limit: Number,
  original_pricing: Number,
  reduced_price: Number,
  billings: string,
  features: Array<string>,
  req: Request,
  res: Response
) => {
  let queryString =
    "INSERT INTO plans (plan_names, button_value, order_limit) VALUES ($1, $2, $3)";
  await db.query(
    queryString,
    [plan_names, button_value, order_limit],
    (err, result) => {
      if (err) {
        console.log("error in plans insertion.....", err);
        const obj = {
          statusCode: 400,
          message: "unsuccessfull",
        };
        res.send(obj);
      }
      console.log(result);
    }
  );
  if (original_pricing != null && billings != null) {
    queryString =
      "INSERT INTO pricing (plan_names, original_pricing, reduced_pricing, billing) VALUES ($1, $2, $3, $4)";
    await db.query(
      queryString,
      [plan_names, original_pricing, reduced_price, billings],
      (err, result) => {
        if (err) {
          console.log("Error in pricing insertion....", err);
          const obj = {
            statusCode: 400,
            message: "Unsucessfull",
          };
          res.send(obj);
        }
        console.log(result);
      }
    );
  }
  if (features.length > 0) {
    for (let i = 0; i < features.length; i++) {
      queryString =
        "INSERT INTO features (plan_names, features) VALUES ($1, $2)";
      await db.query(queryString, [plan_names, features[i]], (err, result) => {
        if (err) {
          console.log("Error in features insertion......", err);
          const obj = {
            statusCode: 400,
            message: "Unsucessfull",
          };
          res.send(obj);
        }
        console.log(result);
      });
    }
  }
};
export const getplans = async (req: Request, res: Response) => {
  let queryString = "SELECT plan_names from plans";
  await db.query(queryString, (err, result) => {
    if (err) {
      console.log("Error in fetching from database", err);
      const obj = {
        statusCode: 500,
        message: "Unsucessfull",
      };
      res.send(obj);
    }
    console.log(result);
    res.send(result.rows);
  });
};

export const getplaninfo = async (
  plan_names: string,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let queryString =
      "SELECT plan_names from pricing WHERE pricing.plan_names=$1";
    let pricing_plans: Number = 0
    let features_plans: Number = 0
    const result1 = await db.query(queryString, [plan_names]);
    pricing_plans = result1.rowCount
    queryString =
      "SELECT plan_names from features WHERE features.plan_names=$1";
    const result2 = await db.query(queryString, [plan_names]);
    features_plans = result2.rowCount
    await console.log("feature length.................. ", features_plans);
    await console.log("pricing_length................... ", pricing_plans);

    if (features_plans > 0 && pricing_plans > 0) {
      queryString =
        "SELECT plans.plan_names, plans.button_value,plans.order_limit,pricing.original_pricing,pricing.reduced_pricing,pricing.billing,features.features FROM ((plans INNER JOIN pricing ON plans.plan_names = pricing.plan_names)INNER JOIN features ON features.plan_names = plans.plan_names) WHERE plans.plan_names=$1;";
      const result3 = await db.query(queryString, [plan_names]);
      res.send(result3.rows)
    } else if (features_plans > 0 && pricing_plans == 0) {
      queryString =
        "SELECT plans.plan_names, plans.button_value,plans.order_limit,features.features FROM (plans INNER JOIN pricing ON plans.plan_names = features.plan_names) WHERE plans.plan_names=$1;";
      const result4 = await db.query(queryString, [plan_names]);
      res.send(result4.rows);
    } else if (features_plans == 0 && pricing_plans > 0) {
      queryString =
        "SELECT plans.plan_names, plans.button_value,plans.order_limit,pricing.original_pricing,pricing.reduced_pricing,pricing.billing FROM (plans INNER JOIN pricing ON plans.plan_names = pricing.plan_names) WHERE plans.plan_names=$1;";
      await db.query(queryString, [plan_names], (err, result) => {
        if (err) {
          console.log(err);
          const obj = {
            statusCode: 500,
            message: "Unsucessfull",
          };
          res.send(obj);
          next(err);
        }
        console.log(result);
        res.send(result.rows);
      });
    } else {
      queryString = "SELECT * from plans WHERE plans.plan_names = $1";
      await db.query(queryString, [plan_names], (err, result) => {
        if (err) {
          console.log("Error in fetching from database", err);
          const obj = {
            statusCode: 500,
            message: "Unsucessfull",
          };
          res.send(obj);
        }
        console.log(result);
        res.send(result.rows);
      });
    }
  } catch (e) {
    throw e;
  }
};

export const isplanactive = async (
  plan_names: string,
  req: Request,
  res: Response
) => {
  let queryString = "SELECT * FROM plans WHERE plans.plan_names= &1";
  await db.query(queryString, [plan_names], (err, result) => {
    if (err) {
      console.log("Error in features insertion......", err);
      const obj = {
        statusCode: 500,
        message: "Unsucessfull",
      };
      res.send(obj);
    }
    console.log(result);
    res.send(result.rows);
  });
};
