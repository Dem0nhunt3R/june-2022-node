const {Schema, model} = require('mongoose');

const OldPasswordSchema = new Schema({
    _user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    password: {type: String}
}, {
    timestamps: true
});

module.exports = model('OldPassword', OldPasswordSchema);