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
    request: [{
        id: { type: Schema.Types.ObjectId  },
        userID: {type: String },
        userNames: { type: String  },
        avatars: { type: String },
    }],
    friends: [{
        id: { type: Schema.Types.ObjectId },
        userID: {type: String },
        userNames: { type: String },
        avatars: { type: String },
	}],
    elo: { type: String },
    ID: {type: String },
    desc: { type: String, max: 50}
 });

const user_auth = mongoose.model('user_auth', userSchema, 'user_auth');
const SITE = mongoose.model("site", site_db, "site");

const UserSchema = {
    'user_auth': user_auth,
    'site': SITE
}

module.exports = UserSchema;