const Joi = require('joi');

const {EMAIL, PASSWORD} = require("../enum/regexp");

module.exports = {
    loginValidator: Joi.object({
        email: Joi.string().regex(EMAIL).trim().lowercase().required(),
        password: Joi.string().regex(PASSWORD).required()
    })
};