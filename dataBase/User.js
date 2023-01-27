const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, trim: true, lowercase: true, unique: true},
    password: {type: String, required: true},
    age: {type: Number, default: 18}
}, {
    timestamps: true
});

module.exports = model('User', UserSchema);