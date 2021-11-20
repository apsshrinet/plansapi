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
  try{
  let id = uuid();
  let plansid=id;
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
      "INSERT INTO pricing (id,plansid, original_pricing, reduced_pricing, billing) VALUES ($1, $2, $3, $4)";
    await db.query(queryString,[id,plansid,plan_names, original_pricing, reduced_price, billings])
  }
  if (features.length > 0) {
    for (let i = 0; i < features.length; i++) {
      id=uuid();
      queryString =
        "INSERT INTO features (id,plansid,plan_names, features) VALUES ($1, $2, $3, $4)";
      await db.query(queryString, [id,plansid,plan_names, features[i]])
        console.log(result);
    }
  }
}catch(err){
  res.send(err);
  throw err;
}
}
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
    let queryString =
      "SELECT plan_names from pricing WHERE pricing.plan_names=$1";
    let pricing_plans: Number = 0;
    let features_plans: Number = 0;
    const result1 = await db.query(queryString, [plan_names]);
    pricing_plans = result1.rowCount;
    queryString =
      "SELECT plan_names from features WHERE features.plan_names=$1";
    const result2 = await db.query(queryString, [plan_names]);
    features_plans = result2.rowCount;

    if (features_plans > 0 && pricing_plans > 0) {
      queryString =
        "SELECT plans.id,plans.plan_names, plans.button_value,plans.order_limit,pricing.original_pricing,pricing.reduced_pricing,pricing.billing,features.features FROM ((plans INNER JOIN pricing ON plans.plan_names = pricing.plan_names)INNER JOIN features ON features.plan_names = plans.plan_names) WHERE plans.plan_names=$1;";
      const result3 = await db.query(queryString, [plan_names]);
      res.send(result3.rows);
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
      let result =await db.query(queryString, [plan_names]);
        console.log(result);
        const pricing = {};
        const features = {};
        const finalresult = [result.rows,pricing,features]
        res.send(result.rows);
    }
  } catch (e) {
    res.send(e);
    throw e;
  }
}

