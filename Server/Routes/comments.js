const express = require('express');
const router = express.Router();
const CommentsModel = require('../Models/Comments');

// Post comment
router.post('/addComment', async (req, res) => {
    try {
        await CommentsModel.create({
            responseTo: req.body.responseTo,
            comment: req.body.comment
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error' });
        console.log(err);
    }
})

// Retrieve comments
router.get('/getComments', (req, res) => {
    CommentsModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// Report a comment
router.put('/addReport/:id', (req, res) => {
    CommentsModel.findByIdAndUpdate(
        req.params.id,
        {
            description: req.body.description,
            isVisible: false
        },
        (err, updatedEvent) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: err });
            }

            return res.status(200).json({
                success: "Updated succesfully"
            });
        }
    );
});

module.exports = router;
