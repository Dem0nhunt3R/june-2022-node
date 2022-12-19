const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
        name: {type: String, required: true},
        age: {type: Number, default: 18},
        email: {type: String, required: true, trim: true, unique: true, lowercase: true},
        password: {type: String, required: true}
    }, {
        timestamps: true
    }
);

module.exports = model('User', UserSchema);