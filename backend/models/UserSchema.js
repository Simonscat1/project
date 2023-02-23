const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    roles:{ type: String },
    userID: { type: String },
    userName: { type: String },
    avatar: { type: String }
});

const site_db = new Schema({
    discord: { type:Schema.Types.ObjectId, ref:'user_auth' },
    friends: { type: Array },
    elo: { type: String },
 });

const user_auth = mongoose.model('user_auth', userSchema, 'user_auth');
const SITE = mongoose.model("site", site_db, "site");

const UserSchema = {
    'user_auth': user_auth,
    'site': SITE
}

module.exports = UserSchema;