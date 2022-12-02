const {userService} = require("../service");
const ApiError = require("../error/ApiError");
const {userNormalizator} = require("../helper");

module.exports = {
    checkIsUserExists: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await userService.findOneByParams({_id: userId});

            if (!user) {
                throw new ApiError('User not found', 404);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyValidCreate: async (req, res, next) => {
        try {
            const {name, age, email} = req.body;

            if (!name || name.length < 2 || typeof name !== 'string') {
                throw new ApiError('Name is not valid', 400);
            }

            if (!age || age < 0 || Number.isNaN(+age)) {
                throw new ApiError('Age is not valid', 400);
            }

            if (!email || !email.includes('@')) {
                throw new ApiError('Email is not valid', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isBodyValidUpdate: async (req, res, next) => {
        try {
            const {name, age, email} = req.body;

            if (name && (name.length < 2 || typeof name !== 'string')) {
                throw new ApiError('Name is not valid', 400);
            }

            if (age && (age < 0 || Number.isNaN(+age))) {
                throw new ApiError('Age is not valid', 400);
            }

            if (email && !email.includes('@')) {
                throw new ApiError('Email is not valid', 400)
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsEmailUnique: async (req, res, next) => {
        try {
            const {email} = req.body;

            if (!email) {
                throw new ApiError('Email is missing');
            }

            const user = await userService.findOneByParams({email});

            if (user) {
                throw new ApiError('Email is already exists', 409);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    normalizator: async (req, res, next) => {
        try {
            const {name, email} = req.body;

            if (name) userNormalizator.name(name);

            if (email) email.toLowerCase();

            next();
        } catch (e) {
            next(e);
        }
    }
}