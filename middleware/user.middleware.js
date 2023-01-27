const User = require('../dataBase/User');
const commonValidator = require('../validator/common.validator');
const userValidator = require('../validator/user.validator');
const ApiError = require("../error/ApiError");

module.exports = {
    getUserDynamically: (fieldName, from = 'body', dbField = fieldName) => async (req, res, next) => {
        try {
            const fieldToSearch = req[from][dbField];

            const user = await User.findOne({[fieldName]: fieldToSearch});

            if (!user) {
                throw new ApiError('User not found', 404);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsEmailUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await User.findOne(email);

            if (user) {
                throw new ApiError('This email is already using');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isNewUserValid: async (req, res, next) => {
        try {
            const validate = userValidator.newUserValidator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            req.body = validate.value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isEditUserValid: async (req, res, next) => {
        try {
            const validate = userValidator.editUserValidator.validate(req.body);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            req.body = validate.value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserIdValid: async (req, res, next) => {
            try {
                const validate = commonValidator.idValidator.validate(req.params.userId);

                if(validate.error){
                    throw new ApiError(validate.error.message,400);
                }

                next();
            } catch (e) {
                next(e);
            }
        }
}
