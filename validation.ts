import * as Joi from 'joi'

export const add_plans_schema = Joi.object().keys({
     plan_names: Joi.string().required(),
     button_value: Joi.string().required(),
     order_limit: Joi.number(),
     original_pricing: Joi.number(),
     reduced_price: Joi.number(),
     billings: Joi.string(),
     features: Joi.array().items(Joi.string())
 });