const Comment = require('../model/Comment');
const ROLES_LIST = require('../config/roles_list')

const createComment = async (req, res) => {
    try {
        const comment = await Comment.create({
            content: req.body.content,
            author: req.user,
            post: req.body.postId,
            date: new Date()
        });
        res.status(201).json({ comment });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCommentByPost = async (req, res) => {
    try {
        const comment = await Comment.find({ post: req.params.id });
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteComment = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": "Comment ID parameter is required" })
    const comment = await Comment.findOne({ _id: req.params.id }).exec()
    if (!comment) return res.status(204).json({ "message": `No comment matches ID ${req.params.id}.` })

    if (req.roles.includes(ROLES_LIST.Admin) || comment.author === req.user) {
        try {
            const comment = await Comment.findByIdAndDelete(req.params.id);
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else {
        return res.sendStatus(403)
    }
}

module.exports = { createComment, getAllComments, getCommentByPost, deleteComment }