const OAuth = require('../dataBase/OAuth');
const oauthService = require('../service/oauth.service');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {body, user} = req;

            await oauthService.comparePasswords(user.password, body.password);

            const tokenPair = oauthService.generateAccessTokenPair({_id: user._id});

            await OAuth.create({...tokenPair, _user_id: user._id});

            res.status(201).json({_user_id: user._id, ...tokenPair})
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {refreshToken, user} = req.tokenInfo;

            await OAuth.deleteOne({refreshToken});

            const tokenPair = oauthService.generateAccessTokenPair({_id: user._id});

            await OAuth.create({...tokenPair, _user_id: user._id});

            res.status(201).json(tokenPair);
            next();
        } catch (e) {
            next(e);
        }
    }
}