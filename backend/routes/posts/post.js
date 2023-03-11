const router = require('express').Router();
const Schema = require("../../models/NotesModels.js");

router.route("/posts/create").post(async (req, res) => {

});

router.route("/posts/get").get(async (req, res) => {
    const posts = await Schema.find().then(notes => notes);
    res.status(200).json({
        post: posts
    });
});

router.route("/posts/edit").put(async (req, res) => {

});

router.route("/posts/delete").delete(async (req, res) => {

});

module.exports = router;