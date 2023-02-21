const router = require('express').Router()
const passport = require('passport')
const { client_url } = require('../../config.js');

router.get("/login/success", async (req, res) => {
    if(req.user){
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
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
    res.redirect(client_url);
})

router.get("/discord", 
    passport.authenticate("discord", {
        scope: ['identify'] 
    })
);

router.get("/discord/callback", 
    passport.authenticate("discord", {
        successRedirect: client_url,
        failureRedirect: "/login/failed"
    })
)

module.exports = router;