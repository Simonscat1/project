const router = require('express').Router();
const passport = require('passport');

const Schema = require('../../models/UserSchema.js')
const { scope_discord, options } = require("../../utill/scope.js");
const getCookies = require("../../utill/getCookies.js");
const { client_url } = require('../../config.js');

router.route("/").get(async(req,res) => {
    const user_id = req.query.userid;
    const username = req.query.username
    try{
        if(user_id != undefined){
            const user = await Schema.site.findOne({ ID: user_id });
            if(user != null){
                const { discord, _id, ...other } = user._doc;
                const user_in_discord = await Schema.user_auth.findById(discord);
    
                res.status(200).json({
                    discord: user_in_discord,
                    user: other
                });
            }
        }else{
            const user = await Schema.user_auth.find({ userName: { $regex: `${username}` }})
            let discord = []
            user.forEach( async (users) => {
                const user_in_discord = await Schema.site.findOne({ ID: users.userID });
                if(user_in_discord != null){
                    discord.push(user_in_discord)
                }
            })
            res.status(200).json({
                discord: discord,
                user: user
            });
        }
    }catch(err){
        res.status(500).json(err);
    };
});

router.get("/login/success", async (req, res) => {
    if(req.user){
        if(req.cookies["auth"] != undefined){
            try{
                const user = await Schema.site.findOne({ discord: req.cookies["auth"] });
                if(user == null){
                    const createUserSite = new Schema.site({
                        discord: req.cookies["auth"],
                        friend:null,
                        elo: 0,
                        ID: null
                    });
                    await createUserSite.save();
                };
            }catch(err){
                console.log(err);
            };
            const user_disocrd = await getCookies.getsInfo(req.cookies["auth"])
            const users = await Schema.site.findOne({ discord: req.cookies["auth"] })
            await users.updateOne({
                ID: user_disocrd.userID
            })
            res.status(200).json({
                discord: user_disocrd,
                user: users,
            });
        };

    };
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

router.get("/logout", (req, res) => {
    req.logout();
    res.clearCookie("auth");
    res.redirect(client_url);
})

router.get("/discord", 
    passport.authenticate("discord", {
        scope: scope_discord
    })
);

router.get("/discord/callback", 
    passport.authenticate("discord", {
        failureRedirect: "/login/failed"
    }), async function(req, res){
        const _id = req.user._id;
        res.cookie("auth", _id, options);
        res.redirect(`${client_url}/`);
    }
);

module.exports = router;