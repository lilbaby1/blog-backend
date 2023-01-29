const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    edited: {
        type: Date
    }
});

module.exports = mongoose.model('Comment', commentSchema)