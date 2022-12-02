const User = require('../dataBase/User');

module.exports = {
    findByParams: async (filter = {}) => {
        return User.find(filter);

    },

    findOneByParams: async (filter = {}) => {
        return User.findOne(filter);
    },

    create: async (userInfo) => {
        return User.create(userInfo);
    },

    updateOne: async (userId, userInfo) => {
        return User.findByIdAndUpdate(userId, userInfo, {new: true})
    },

    deleteOne: async (userId) => {
        return User.deleteOne({_id: userId});
    }
}