const mongoose = require("mongoose");

const Team = ({
    title: { type: String },
    content: { type: String },
    image: { type: String },
    elo: { type: String },
    owner: {type: Boolean},
    players: { type: Array },
});

const Teams = mongoose.model("Teams", Team);

module.exports = Teams;