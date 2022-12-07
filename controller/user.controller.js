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
            const user = await User.findOne({_id: req.params.userId});

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hash = await oauthService.hashPassword(req.body.password);
            const newUser = await User.create({...req.body, password: hash});

            res.status(201).json(newUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {new: true});

            res.status(201).json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            await User.deleteOne({_id: req.params.userId});

            res.status(204).send('Deleted');
        } catch (e) {
            next(e);
        }
    }
}