const User = require('../dataBase/User');
const oauthService = require('../service/oauth.service');
const emailService = require("../service/email.service");
const {WELCOME} = require("../config/emailAction.enum");

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find({});

            return res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            return res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const hashPassword = await oauthService.hashPassword(req.body.password);

            const newUser = await User.create({...req.body, password: hashPassword});

            await emailService.sendEmail(
                'naumenko.mykyta@gmail.com',
                WELCOME,
                {userName: newUser.name, news:'google.com'}
            );

            return res.status(201).json(newUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const newUser = await User.findByIdAndUpdate(req.params.userId, req.body, {new: true});
            return res.json(newUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            await User.deleteOne({_id: req.params.userId});

            return res.status(204).send('Ok');
        } catch (e) {
            next(e);
        }
    }
}