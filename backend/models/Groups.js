const mongoose = require("mongoose");

const Team = ({
    title: { type: String },
    content: { type: String },
    image: { type: String },
    elo: { type: String },
    owner: {type: String},
    players: { type: Array },
});

const Teams = mongoose.model("teams", Team, 'teams');

module.exports = Teams;