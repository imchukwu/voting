const express = require('express');
const router = express.Router();

const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1102597",
    key: "523a5394bb28b6882a6e",
    secret: "811225cadb44ce912665",
    cluster: "eu",
    useTLS: true
  });

router.get('/', (req, res) => {
    res.send('VOTE');
});

router.post('/', (req, res) => {
    pusher.trigger("cdss-vote", "president-vote", {
        points: 1,
        president: req.body.president
    });
    return res.json({success: true, message: 'Thank you for voting'});  
});

module.exports = router;
