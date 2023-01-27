const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const tokenTypeEnum = require('../enum/tokenType');
const tokenAction = require('../enum/tokenActionType');
const ApiError = require("../error/ApiError");
const {
    ACCESS_SECRET,
    REFRESH_SECRET,
    CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET,
    FORGOT_ACCOUNT_ACTION_TOKEN_SECRET
} = require("../config/config");

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (password, hashPassword) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordsSame) {
            throw new ApiError('Wrong email or password', 400);
        }
    },

    compareOldPasswords: (password, hashPassword) => bcrypt.compare(password, hashPassword),


    generateAccessTokenPair: (dataToSign = {}) => {
        const accessToken = jwt.sign(dataToSign, ACCESS_SECRET, '15m');
        const refreshToken = jwt.sign(dataToSign, REFRESH_SECRET, '3d');

        return {
            accessToken,
            refreshToken
        }
    },

    generateActionToken: (dataToSign = {}, actionType) => {
        let secret = '';

        switch (actionType) {
            case tokenAction.CONFIRM_ACCOUNT:
                secret = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET;
                break;
            case tokenAction.FORGOT_PASSWORD:
                secret = FORGOT_ACCOUNT_ACTION_TOKEN_SECRET;
                break;
        }

        return jwt.sign(dataToSign, secret, '7d');
    },

    verifyToken: (token, tokenType = tokenTypeEnum.ACCESS_TOKEN) => {
        try {
            let secret = '';

            if (tokenType === tokenTypeEnum.ACCESS_TOKEN) secret = ACCESS_SECRET;
            else if (tokenType === tokenTypeEnum.REFRESH_TOKEN) secret = REFRESH_SECRET;

            return jwt.verify(token, secret);
        } catch (e) {
            throw new ApiError('Token not valid', 401)
        }
    },

    verifyActionToken: (token, actionType) => {
        try {
            let secret = '';

            switch (actionType) {
                case tokenAction.CONFIRM_ACCOUNT:
                    secret = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET;
                    break;
                case tokenAction.FORGOT_PASSWORD:
                    secret = FORGOT_ACCOUNT_ACTION_TOKEN_SECRET;
                    break;
            }

            return jwt.verify(token, secret)
        } catch (e) {
            throw new ApiError('Token not valid', 401);
        }
    }
}