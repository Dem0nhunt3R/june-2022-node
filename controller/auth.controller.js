const oauthService = require('../service/oauth.service');
const Oauth = require('../dataBase/OAuth');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {user, body} = req;

            await oauthService.comparePasswords(user.password, body.password);

            const tokenPair = oauthService.generateAccessTokenPair({id: user._id});

            await Oauth.create({...tokenPair, _user_id: user._id});

            res.json({
                user,
                ...tokenPair
            })

            next();
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {refreshToken, _user_id} = req.tokenInfo;

            await Oauth.deleteOne({refreshToken})

            const tokenPair = oauthService.generateAccessTokenPair({id: _user_id});

            await Oauth.create({...tokenPair, _user_id});

            res.status(201).json(tokenPair);
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {accessToken} = req.tokenInfo;

            await Oauth.deleteOne({accessToken});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

    logoutAllDevices: async (req, res, next) => {
        try {
            const {_user_id} = req.tokenInfo;

            await Oauth.deleteMany({_user_id});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
}