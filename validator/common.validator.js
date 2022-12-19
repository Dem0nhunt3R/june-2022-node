const Joi = require("joi");

const {MONGO_ID} = require("../config/regexp");

module.exports = {
    idValidator:Joi.string().regex(MONGO_ID)
}