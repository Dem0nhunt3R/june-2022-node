const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require("../error/ApiError");
const {
    ACCESS_SECRET,
    REFRESH_SECRET,
    CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET,
    FORGOT_ACCOUNT_ACTION_TOKEN_SECRET
} = require("../config/config");
const tokenAction = require('../config/tokenAction.enum');
const {tokenTypeEnum} = require("../enum");
const tokenTypes = require('../config/tokenAction.enum');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (password, hashPassword) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordsSame) {
            throw new ApiError('Wrong email or password', 400);
        }
    },

    generateAccessTokenPair: (dataToSign = {}) => {
        const accessToken = jwt.sign(dataToSign, ACCESS_SECRET, {expiresIn:'15m'});
        const refreshToken = jwt.sign(dataToSign, REFRESH_SECRET, {expiresIn:'30d'});

        return {
            accessToken,
            refreshToken
        }
    },

    generateActionToken: (actionType, dataToSign = {}) => {
        let secretWord = '';

        switch (actionType) {
            case (tokenAction.CONFIRM_ACCOUNT):
                secretWord = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET;
                break;
            case (tokenAction.FORGOT_PASSWORD):
                secretWord = FORGOT_ACCOUNT_ACTION_TOKEN_SECRET;
                break;
        }

        return jwt.sign(dataToSign, secretWord, {expiresIn:'7d'});
    },

    checkToken: (token = '', tokenType = tokenTypeEnum.accessToken) => {
        try {
            let secret = '';

            if (tokenType === tokenTypeEnum.accessToken) secret = ACCESS_SECRET;
            else if (tokenType === tokenTypeEnum.refreshToken) secret = REFRESH_SECRET;

            return jwt.verify(token, secret);
        } catch (e) {
            throw new ApiError('Token not valid', 401);
        }
    },

    checkActionToken: (token, actionType) => {
        try {
            let secret = '';

            switch (actionType) {
                case tokenTypes.CONFIRM_ACCOUNT:
                    secret = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET;
                    break;
                case tokenTypes.FORGOT_PASSWORD:
                    secret = FORGOT_ACCOUNT_ACTION_TOKEN_SECRET;
                    break;
            }

            return jwt.verify(token, secret);
        } catch (e) {
            throw new ApiError('Token not valid', 401);
        }
    }
}