import { db } from "../db";
import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";

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
  try {
    let id = uuid();
    let plansid = id;
    let queryString =
      "INSERT INTO plans (id,plan_names, button_value, order_limit) VALUES ($1, $2, $3, $4)";
    let result = await db.query(queryString, [
      id,
      plan_names,
      button_value,
      order_limit,
    ]);
    console.log(result);
    if (original_pricing != null && billings != null) {
      id = uuid();
      queryString =
        "INSERT INTO pricing (id,plans_id, original_pricing, reduced_pricing, billing) VALUES ($1, $2, $3, $4, $5)";
      await db.query(queryString, [
        id,
        plansid,
        original_pricing,
        reduced_price,
        billings,
      ]);
    }
    if (features.length > 0) {
      for (let i = 0; i < features.length; i++) {
        id = uuid();
        queryString =
          "INSERT INTO features (id,plans_id, features) VALUES ($1, $2, $3)";
        await db.query(queryString, [id, plansid, features[i]]);
        console.log(result);
      }
    }
  } catch (err) {
    res.send(err);
    throw err;
  }
};
export const getplans = async (req: Request, res: Response) => {
  try {
    let queryString = "SELECT plan_names from plans";
    let result = await db.query(queryString);
    console.log(result);
    res.send(result.rows);
  } catch (err) {
    res.send(err);
    throw err;
  }
};

export const getplaninfobyname = async (
  plan_names: string,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let queryString = "SELECT id FROM plans WHERE plan_names=$1";
    let result1 = await db.query(queryString, [plan_names]);
    let planid = result1.rows[0]["id"];
    queryString =
      "SELECT id, plan_names, button_value, order_limit, created_on FROM plans WHERE id=$1";
    let result2 = await db.query(queryString, [planid]);
    queryString =
      'SELECT id as "pricing_id", original_pricing, reduced_pricing, billing FROM pricing WHERE plans_id=$1';
    let result3 = await db.query(queryString, [planid]);
    queryString =
      'SELECT id as "feature_id", features FROM features WHERE plans_id=$1';
    let result4 = await db.query(queryString, [planid]);
    let final_result = {
      plans: result2.rows,
      pricing: result3.rows,
      features: result4.rows,
    };
    res.status(200);
    res.send(final_result);
  } catch (e) {
    res.send(e);
    next(e);
  }
};

export const deleteplan = async (
  plan_names: string,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
};
