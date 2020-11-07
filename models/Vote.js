const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
    president: {
        type: String,
        required: true
    },
    points: {
        type: String,
        required: true
    },
});

 
//Create collections and add schema
const Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;