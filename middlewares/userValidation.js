const joi = require("joi");
const asyncHandler = require("express-async-handler");

const registerValidation = asyncHandler(async (req, res, next) => {
    const registerSchema = joi.object({
        userName: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        age: joi.number().required()
    });
    const { error } = registerSchema.validate(req?.body);
    if (error)
    {
        
        return res.status(400).send(error.details[0].message);
    }
    next();
});

const loginValidation = asyncHandler(async (req, res, next) => {
    const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    const { error } = loginSchema.validate(req?.body);
    if (error)
    {
        return res.status(400).send(error.details[0].message);
    }
    next();
});

module.exports = { registerValidation, loginValidation };
