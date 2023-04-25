const router = require('express').Router();
const Groups = require('../../models/Groups.js')
const Schema = require("../../models/NotesModels.js");

router.route("/posts/create").post(async (req, res) => {

});

router.route("/posts/get").get(async (req, res) => {
    const posts = await Schema.find().then(notes => notes);
    res.status(200).json({
        post: posts
    });
});

router.route("/posts/group/get").get(async(req, res) => {
    const userID = req.query.userID
    try{
        if(userID != undefined){
            
            const group = await Groups.findOne({ owner: String(userID) });
            if(group == null){
                const groups_plear = await Groups.find({ "players.id": userID })
                res.status(200).json({
                    groups: groups_plear
                })
            }
            res.status(200).json({
                groups: group
            })
        }
    }catch(err){
        res.status(500).json(err);
    }
})

router.route("/posts/edit").put(async (req, res) => {

});

router.route("/posts/delete").delete(async (req, res) => {

});

module.exports = router;