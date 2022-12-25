const oauthService = require('../service/oauth.service');
const ActionToken = require('../dataBase/ActionToken');
const User = require('../dataBase/User');
const OAuth = require('../dataBase/OAuth');
const {FORGOT_PASSWORD} = require("../config/tokenAction.enum");
const {FRONTEND_URL} = require("../config/config");
const emailService = require('../service/email.service');
const {FORGOT_PASS, WELCOME} = require("../config/emailAction.enum");
const commonValidator = require('../validator/common.validator');
const ApiError = require("../error/ApiError");

module.exports = {

    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await emailService.sendEmail(user.email, WELCOME, {
                userName: user.name,
                array: [{number: 1}, {number: 2}, {number: 3}],
                condition: false
            });

            await oauthService.comparePasswords(body.password, user.password);

            const tokenPair = oauthService.generateAccessTokenPair({id: user._id});

            await OAuth.create({...tokenPair, _user_id: user._id});

            res.json({
                user,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {refreshToken, _user_id} = req.tokenInfo;

            await OAuth.deleteOne({refreshToken});

            const tokenPair = oauthService.generateAccessTokenPair({id: _user_id});

            await OAuth.create({...tokenPair, _user_id});

            res.status(201).json(tokenPair);
        } catch (e) {
            next(e);
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            console.log(req.user)
            const {_id, email, name} = req.user;

            const actionToken = oauthService.generateActionToken(FORGOT_PASSWORD, {email});
            const forgotPassFEUrl = `${FRONTEND_URL}/password/new?token=${actionToken}`;

            await ActionToken.create({token: actionToken, tokenType: FORGOT_PASSWORD, _user_id: _id});
            await emailService.sendEmail(email, FORGOT_PASS, {url: forgotPassFEUrl, userName: name});

            res.json({actionToken});
        } catch (e) {
            next(e);
        }
    },

    changePasswordAfterForgot: async (req, res, next) => {
        try {
            const validate = commonValidator.passwordValidator.validate(req.body.password);

            if (validate.error) {
                throw new ApiError(validate.error.message, 400);
            }

            const hashPassword = await oauthService.hashPassword(validate.value);

            await ActionToken.deleteOne({token: req.get('Authorization')});
            await User.updateOne({_id: req.query.userId}, {password: hashPassword});

            res.json('ok');
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {accessToken} = req.tokenInfo;

            await OAuth.deleteOne({accessToken});

            res.json('Logout successful');
        } catch (e) {
            next(e);
        }
    },

    logoutAll: async (req, res, next) => {
        try {
            const {_user_id} = req.tokenInfo;
            await OAuth.deleteMany({_user_id});
            res.json('ok');
        } catch (e) {
            next(e);
        }
    }
}