const express = require('express');
const router = express.Router();
const CommentsModel = require('../Models/Comments');

// Post comment
router.post('/addComment', async (req, res) => {
    try {
        await CommentsModel.create({
            responseTo: req.body.responseTo,
            comment: req.body.comment,
            time: req.body.commentTime
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
        (err, updatedComment) => {
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

// Edit a comment
router.put('/editComment/:id', (req,res) => {
    CommentsModel.findByIdAndUpdate(
        req.params.id,
        {
            isEdited: true,
            comment:req.body.comment
        },
        (err, updatedComment) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ error: err });
            }

            return res.status(200).json({
                success: "Updated succesfully"
            });
        }
    )
})

// Retrieve specific comment
router.get("/getComment/:id", (req,res) => {
    
    let commentId = req.params.id;

    CommentsModel.findById(commentId,(err,comment) => {
        if(err){
            return res.status(400).json({success:false, err});
        }
        return res.status(200).json({
            success:true,
            comment
        });
    });
});

// Delete a comment
router.delete('/deleteComment/:id',(req,res) => {
    CommentsModel.findByIdAndRemove(req.params.id).exec((err,deletedComment) => {
        if(err) return res.status(400).json({
            message:"Delete unsuccessful",err
        });

        return res.json({
            message:"Delete successful",deletedComment
        });
    });
});

module.exports = router;