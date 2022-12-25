const User = require('../dataBase/User');
const oauthService = require('../service/oauth.service');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find({});

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hash = await oauthService.hashPassword(req.body.password);

            const newUser = await User.create({...req.user, password: hash});

            res.status(201).json(newUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const newUserInfo = req.body;
            const {userId} = req.params;

            const updatedUser = await User.findByIdAndUpdate(userId, newUserInfo, {new: true});

            res.status(201).json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            await User.findOneAndDelete(req.params.userId);

            res.status(204).json('Deleted');
        } catch (e) {
            next(e);
        }
    }
}