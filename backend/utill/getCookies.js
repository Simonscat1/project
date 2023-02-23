const Schemas = require('../models/UserSchema.js');
class getCookies{
    static async getsInfo(discord){
        if(discord != ""){
            const users = await Schemas.site.findOne({ discord: discord });
            if(users.discord != null){
                const userInfoDiscord = await Schemas.user_auth.findById(users.discord);
                return userInfoDiscord;
            };
        };
    };
};
module.exports = getCookies