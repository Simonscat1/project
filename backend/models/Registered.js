const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Team = ({
    id:{type: Schema.Types.ObjectId},
    title: { type: String },
    players: { type: Array },
});

const Teams = mongoose.model("reg_teams", Team, 'reg_teams');

module.exports = Teams;