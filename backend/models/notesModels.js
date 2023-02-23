const mongoose = require("mongoose");

const notesSchema = ({
    title: { type: String },
    context_desc: { type: String },
    content: { type: String },
    data_start: { type: String },
    data_end: { type: String },
});

const Note = mongoose.model("Note", notesSchema);

module.exports = Note;