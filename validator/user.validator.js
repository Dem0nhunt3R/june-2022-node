const Joi = require('joi');

const {EMAIL, PASSWORD} = require("../config/reqexp.enum");

module.exports = {
    newUserValidator: Joi.object({
        name:Joi.string().min(2).max(100).required(),
        age:Joi.number().integer().min(1).max(150).required(),
        email:Joi.string().regex(EMAIL).lowercase().required().trim(),
        password:Joi.string().regex(PASSWORD).required()
    }),

    editedUserValidator:Joi.object({
        name:Joi.string().min(2).max(100).optional(),
        age:Joi.number().integer().min(1).max(150).optional(),
        email:Joi.string().regex(EMAIL).trim().lowercase().optional()
    })
}