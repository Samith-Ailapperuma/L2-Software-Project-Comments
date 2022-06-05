const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    commentAuthor: {
        type: Schema.Types.ObjectId,
        required: false,
    },
    postId: {
        type: Schema.Types.ObjectId,
        required: false,
    },
    responseTo: {
        type: String,
        default: null
    },
    comment: {
        type: String,
        required: true
    },
    isVisible: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        required: false
    },
    time: {
        type: String,
        required: false
    },
    isEdited: {
        type: Boolean,
        default: null
    }
});

module.exports = CommentsModule = mongoose.model("comments", CommentSchema);