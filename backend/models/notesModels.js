const mongoose = require("mongoose");

const notesSchema = ({
    title: { type: String },
    context_desc: { type: String },
    content: { type: String },
    data_start: { type: String },
    data_end: { type: String },
});
const notesSchemaCreate = ({
    title:{ type: String },
    // context_desc: { type: String },
    // content: { type: String },
    avatars: { type: String },
    // data_start: { type: String },
    // data_end: { type: String },
});

const Notes = mongoose.model("reqnotes", notesSchemaCreate);

const Note = mongoose.model("Note", notesSchema);

module.exports = {
    Notes,
    Note
};