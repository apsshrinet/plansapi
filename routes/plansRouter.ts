import { NextFunction, Request, Response } from "express";
import { add_plans_schema } from "../validation";
import { Router } from "express";
import { addplan, deleteplan, getplaninfobyname, getplans, updatepricing } from "../controller/plans_controller";
import * as Joi from "joi";


const router = Router();

router.post(
  "/addplan",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Inside addplan");
    try {
      let plan_names = req.body.plan_names;
      let button_value = req.body.button_value;
      let order_limit = req.body.order_limit;
      let original_pricing = req.body.original_pricing || null;
      let reduced_price = req.body.reduced_price || null;
      let billings = req.body.billings || null;
      let features = req.body.features || [];
      try {
        const result = await add_plans_schema.validateAsync(req.body);
      } catch (err: any) {
        console.log(err);
        const obj = {
          statusCode: 400,
          message: err.message,
        };
        res.status(obj.statusCode);
        res.send(obj);
      }
      console.log("Validated the data");
      const a = await addplan(
        plan_names,
        button_value,
        order_limit,
        original_pricing,
        reduced_price,
        billings,
        features,
        req,
        res
      );
      console.log("Sending the response");
      const obj = {
        statusCode: 200,
        message: "Successfull",
        body: a,
      };
      res.send(obj);
    } catch (err) {
      res.send(err);
    }
  }
);
router.get(
  "/getplans",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Inside getplans");
    try {
      await getplans(req, res);
      res.status(200);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
);

router.get(
  "/getplaninfobyname",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Inside getplaninfobyname router");
    try {
      let plan_names = req.body.plan_names;
      try {
        const result = await Joi.string().validateAsync(req.body.plan_names);
      } catch (err: any) {
        console.log(err);
        const obj = {
          statusCode: 400,
          message: err.message,
        };
        res.status(obj.statusCode);
        res.send(obj);
      }
      console.log("Validated the search data");
      await getplaninfobyname(plan_names, req, res, next);
      res.status(200);
    } catch (err) {
      res.send(err);
    }
  }
);

router.delete(
  "/deleteplan",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Inside deleteplan router");
    try {
      let plan_names = req.body.plan_names;
      try {
        const result = await Joi.string().validateAsync(req.body.plan_names);
      } catch (err: any) {
        console.log(err);
        const obj = {
          statusCode: 400,
          message: err.message,
        };
        res.status(obj.statusCode);
        res.send(obj);
      }
      console.log("Validated the deletion data");
      await deleteplan(plan_names, req, res, next);
      res.status(200);
    } catch (err) {
      res.send(err);
    }
  }
);

router.put(
  "/updatepricing",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Inside updatepricing router");
    try {
      let pricing_id = req.body.id;
      let original_pricing = req.body.original_pricing||null;
      let reduced_pricing = req.body.reduced_pricing||null;
      let billing = req.body.billing||null;
      try {
        await Joi.string().guid().validateAsync(req.body.pricing_id);
        await Joi.string().validateAsync(req.body.original_pricing);
        await Joi.string().validateAsync(req.body.reduced_pricing);
        await Joi.string().validateAsync(req.body.billing);
      } catch (err: any) {
        console.log(err);
        const obj = {
          statusCode: 400,
          message: err.message,
        };
        res.status(obj.statusCode);
        res.send(obj);
      }
      console.log("Validated the sent data");
      await updatepricing(pricing_id,original_pricing,reduced_pricing,billing, req, res, next);
      res.status(200);
    } catch (err) {
      res.send(err);
    }
  }
);

export { router };
