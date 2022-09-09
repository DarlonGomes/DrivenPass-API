import Joi from "joi";

export const noteSchema = Joi.object({
    title: Joi.string().min(1).max(50).required(),
    text: Joi.string().min(1).max(1000).required()
});