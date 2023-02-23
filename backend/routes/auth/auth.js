const router = require('express').Router();
const passport = require('passport');

const Schema = require('../../models/UserSchema.js')
const {scope_discord, options } = require("../../utill/scope.js");
const getCookies = require("../../utill/getCookies.js");
const { client_url } = require('../../config.js');

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
                    });
                    await createUserSite.save();
                };
            }catch(err){
                console.log(err);
            };
        };
        const user = await getCookies.getsInfo(req.cookies["auth"])
        res.status(200).json({
            user: user,
        });
    };
});
//сделать так чтоб ошибки были перенаправлины на клинскую часть и новр ошибки передовать как и надпись
//с помощью res.redirect(`${client_url}/${тут номер ошибки}`)
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
        const id = req.user._id;
        res.cookie("auth", id, options);
        res.redirect(client_url);
    }
);

module.exports = router;