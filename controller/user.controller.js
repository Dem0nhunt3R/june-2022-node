const {userService} = require("../service");

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.findByParams();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await userService.findOneByParams({_id: userId});

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const newUser = await userService.create(req.body);
            res.status(201).json(newUser);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const user = await userService.updateOne(req.params.userId, req.body);
            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            userService.deleteOne({_id: req.params.userId});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
}