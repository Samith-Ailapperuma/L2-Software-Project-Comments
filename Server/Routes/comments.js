const express = require('express');
const router = express.Router();
const CommentsModel = require('../Models/Comments');

router.post('/addComment', async(req, res) => {
    try {
        await CommentsModel.create({
            responseTo:req.body.responseTo,
            comment:req.body.comment
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error' });
        console.log(err);
    }
})

router.get('/getComments', (req, res) => {
    CommentsModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;
