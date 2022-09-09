import Joi from "joi";

export const networkSchema = Joi.object({
    title: Joi.string().min(1).max(50).required(),
    network: Joi.string().min(1).required(),
    password: Joi.string().min(1).required()
});