import  { NextFunction, Request,Response } from 'express'
import { add_plans_schema } from '../validation';
import { Router } from 'express';
import { addplan, getplaninfo, getplans } from '../controller/plans_controller';
import * as Joi from 'joi'

const router = Router();

router.post('/addplan', async (req: Request,res: Response,next: NextFunction)=>{
    console.log("Inside addplan");
    try{
        let plan_names = req.body.plan_names;
        let button_value = req.body.button_value;
        let order_limit = req.body.order_limit;
        let original_pricing = req.body.original_pricing||null;
        let reduced_price = req.body.reduced_price||null;
        let billings = req.body.billings||null;
        let features = req.body.features||[];
        try{
        const result =  await add_plans_schema.validateAsync(req.body);
        }
        catch(err:any){
            console.log(err);
            const obj = {
                statusCode: 400,
                message: err.message
            }
            res.status(obj.statusCode);
            res.send(obj)
        }
        console.log("Validated the data");
        const a = await addplan(plan_names,button_value,order_limit,original_pricing,reduced_price,billings,features,req,res);
        console.log("Sending the response");
        const obj = {
            statusCode: 200,
            message: "Successfull",
            body: a
        }
        res.send(obj)
    }
    catch(err){
        res.send(err);
        next(err);
    }
});
router.get('/getplans', async(req: Request,res: Response,next: NextFunction)=>{
    console.log("Inside getplans");
    try{
        await getplans(req,res);
        res.status(200);
    }
    catch(err){
        console.log(err);
        next(err);
    }
    
})

router.get('/getplaninfo', async(req:Request,res: Response,next: NextFunction)=>{
    console.log("Inside getplaninfo");
    try{
        let plan_names = req.body.plan_names;
        try
        {
            const result = await Joi.string().validateAsync(req.body.plan_names);
        }
        catch(err:any){
            console.log(err);
            const obj = {
                statusCode: 400,
                message: err.message
            }
            res.status(obj.statusCode);
            res.send(obj)
        }
        console.log("Validated the search data");
        await getplaninfo(plan_names,req,res,next);
        res.status(200);
    }
    catch(err){
        console.log(err);
        next(err);
    }
})

export {router};