const passport = require('passport');
const Discord = require("passport-discord").Strategy;
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();

const {
    discord_callback, 
    discord_client_secret, 
    discord_client_id 
} = require('../config.js')

const Schema = require('../models/UserSchema.js')

passport.use(new Discord({
    clientID: `${discord_client_id}`,
    clientSecret: `${discord_client_secret}`,
    callbackURL: `${discord_callback}`,
    
}, async (accessToken, refreshToken, profile, done) => {
    try{
        const user = await Schema.user_auth.findOne({userID: profile.id})
        if(user){
            await user.updateOne({
                userName: profile.username
            })
            done(null, user)
        }else{
            const newUser_discord = new Schema.user_auth({
                userID: profile.id,
                userName: profile.username,
                avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
            });
            const saveUser = await newUser_discord.save()
            done(null, saveUser);
        }
        
    }catch(err){
        console.log(err)
        done(err, null)
    }
}))
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    const user = await Schema.user_auth.findOne({ userID: id.userID })
    if(user){
        done(null, user);
    }
});