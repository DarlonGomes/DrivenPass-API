import Joi from "joi";

export const cardSchema = Joi.object({
    title: Joi.string().min(1).max(50).required(),
    cardNumber: Joi.string().min(1).required(),
    cardholderName: Joi.string().min(1).required(),
    securityCode: Joi.string().min(1).required(),
    password: Joi.string().min(4).max(6).required(),
    expirationDate: Joi.string().min(4).max(7).required(),
    type: Joi.string().valid('credit', 'debit', 'both').required(),
});