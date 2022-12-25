const Joi = require('joi');

const {EMAIL, PASSWORD} = require("../config/reqexp.enum");

module.exports = {
    loginValidator: Joi.object({
        email: Joi.string().regex(EMAIL).trim().lowercase().required(),
        password: Joi.string().regex(PASSWORD).required()
    })
}