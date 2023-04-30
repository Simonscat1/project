const router = require('express').Router();
const Groups = require('../../models/Groups.js')
const { Note, Notes } = require("../../models/notesModels.js");

router.route("/posts/create").post(async (req, res) => {
    const { title } = req.body
    // const context_desc = content.split(".")[0]
    const newNote = new Notes({
        title,
        // content,
        // context_desc,
        // data_start,
        // data_end,
    });
    newNote.save();
});

router.route("/posts/req/get").get(async(req,res) => {
    const postes = await Notes.find().then(notes => notes);
    postes.forEach((post) =>{
        res.status(200).json({
            post_req: post
        });
    })
    

})

router.route("/posts/get").get(async (req, res) => {
    const posts = await Note.find().then(notes => notes);
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
                groups_plear.forEach( async (group) =>{
                    res.status(200).json({
                        groups: group
                    })
                })
            }else{
                res.status(200).json({
                    groups: group
                })
            }
        }
    }catch(err){
        console.log(err)
    }
})

router.route("/posts/edit").put(async (req, res) => {

});

router.route("/posts/delete").delete(async (req, res) => {

});

module.exports = router;