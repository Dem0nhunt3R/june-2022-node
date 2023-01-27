const Joi = require("joi");
const {MONGO_ID} = require("../enum/regexp");

module.exports = {
    idValidator: Joi.string().regex(MONGO_ID).required()
}