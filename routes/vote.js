const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/Vote');

const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1102597",
    key: "523a5394bb28b6882a6e",
    secret: "811225cadb44ce912665",
    cluster: "eu",
    useTLS: true
  });

router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({success: true,
    votes: votes }));
});

router.post('/', (req, res) => {
    const newVote = {
        president: req.body.president,
        points: 1
    };

    new Vote(newVote).save().then(vote => {
        pusher.trigger("cdss-vote", "president-vote", {
          points: parseInt(vote.points),
          president: vote.president
        }); 
    
    return res.json({success: true, message: 'Thank you for voting'});  
    });
});

module.exports = router;
