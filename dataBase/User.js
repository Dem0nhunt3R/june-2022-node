const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, unique: true, trim: true, lowercase: true}
}, {
    timestamps: true
});

module.exports = model('User', userSchema);

