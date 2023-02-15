const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    roles:{ type: String },
    userID: { type: String },
    userName: { type: String },
    avatar: { type: String }
});

const user_auth = mongoose.model('user_auth', userSchema, 'user_auth')

const UserSchema = {
    'user_auth': user_auth
}

module.exports = UserSchema;