import { NextFunction, Request, Response } from "express";
import { add_plans_schema } from "../validation";
import { Router } from "express";
import { addfeature, addplan, deletefeature, deleteplan, getplaninfobyname, getplans, updatepricing } from "../controller/plans_controller";
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
      let place_holder = req.body.place_holder||null;
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
        place_holder,
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
        const result = await Joi.string().required().validateAsync(req.body.plan_names);
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
        const result = await Joi.string().required().validateAsync(req.body.plan_names);
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
      let original_pricing = req.body.original_pricing||-1;
      let reduced_pricing = req.body.reduced_pricing||-1;
      let billing = req.body.billing||'';
      try {
        await Joi.string().guid().required().validateAsync(req.body.id);
        await Joi.number().optional().validateAsync(req.body.original_pricing);
        await Joi.number().optional().validateAsync(req.body.reduced_pricing);
        await Joi.string().optional().validateAsync(req.body.billing);
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
      const result  = {
        statusCode: 200,
        message: "Succesfully updated pricing"
      }
      res.status(result.statusCode);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  }
);

router.delete(
  "/deletefeature",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Inside deletefeature router");
    try {
      let feature_id = req.body.feature_id;
      try {
        const result = await Joi.string().guid().required().validateAsync(req.body.feature_id);
      } catch (err: any) {
        console.log(err);
        const obj = {
          statusCode: 400,
          message: err.message,
        };
        res.status(obj.statusCode);
        res.send(obj);
      }
      console.log("Validated the feature data");
      await deletefeature(feature_id, req, res, next);
    } catch (err) {
      res.send(err);
    }
  }
);

router.post(
  "/addfeature", async (req: Request, res: Response, next: NextFunction) => {
    console.log("Inside addfeature router");
    try {
      let plan_name = req.body.plan_name;
      let feature = req.body.feature;
      try {
        await Joi.string().required().validateAsync(req.body.plan_name);
        await Joi.string().required().validateAsync(req.body.feature);
      } catch (err: any) {
        console.log(err);
        const obj = {
          statusCode: 400,
          message: err.message,
        };
        res.status(obj.statusCode);
        res.send(obj);
      }
      console.log("Validated the feature data");
      await addfeature(plan_name,feature , req, res, next);
    }catch(e){
      res.send(e);
    }
  }
);

export { router };
