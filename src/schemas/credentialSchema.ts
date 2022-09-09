import Joi from "joi";

export const credentialSchema = Joi.object({
    title: Joi.string().min(1).max(50).required(),
    url: Joi.string().uri().trim().required(),
    username: Joi.string().min(1).required(),
    password: Joi.string().min(1).required()
});