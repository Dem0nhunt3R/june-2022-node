const Joi = require('joi');

const {MONGO_ID, PASSWORD} = require("../config/reqexp.enum");

module.exports = {
    idValidator: Joi.string().regex(MONGO_ID),
    passwordValidator: Joi.string().required().regex(PASSWORD)
}