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
    res.status(200).json({
        post_req: postes
    });
    

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
            const ArrayGrope = []
            const group = await Groups.find({ "owner": userID});
            group.forEach(async (groups) =>{
                ArrayGrope.push(groups)
            })
            const groups_plear = await Groups.find({ "players.id": userID })
            groups_plear.forEach( async (group) =>{
                if(group.owner != userID){
                    ArrayGrope.push(group)
                }  
            })
            res.status(200).json({
                groups: ArrayGrope
            })
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