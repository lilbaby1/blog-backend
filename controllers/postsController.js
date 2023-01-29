const { ObjectId } = require('bson')
const Post = require('../model/Post')
const ROLES_LIST = require('../config/roles_list')

const getAllPosts = async (req, res) => {
    const posts = await Post.find()
    if (!posts) return res.status(204).json({ "message": "No posts found." })
    res.status(200).json(posts)
}

const getPostsWithPagination = async (req, res) => {
    const { page, limit, sort } = req.query
    const count = await Post.countDocuments()

    if (!page) page = 1
    if (!limit) limit = 5
    let sortOrder = { date: -1 }
    if (sort === 'oldest') sortOrder = { date: 1 } 

    const posts = await Post.find()
        .sort(sortOrder)
        .skip((page - 1) * limit)
        .limit(limit)
    if (!posts) return res.status(204).json({ "message": "No posts found." })
    res.status(200).json({ posts, count })
}

const createNewPost = async (req, res) => {

    if (!req?.body?.title || !req?.body?.content) {
        // 400 Bad Request response status code indicates that the server cannot 
        // or will not process the request due to something that is perceived to 
        // be a client error
        return res.status(400).json({ "message": "Title, content and author are required." })
    }

    try {
        const result = await Post.create({
            title: req.body.title,
            content: req.body.content,
            author: req.user,
            date: new Date(),
            edited: null
        })
        res.sendStatus(201)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}

const updatePost = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ "message": `ID parameter is required` })
    }
    const post = await Post.findOne({ _id: req.body.id }).exec()
    if (!post) return res.status(204).json({ "message": `No post matches ID ${req.body.id}.` })
    if (!req.roles.includes(ROLES_LIST.Admin) && post.author !== req.user) {
        return res.sendStatus(403)
    }
    if (req.body?.title) post.title = req.body.title
    if (req.body?.content) post.content = req.body.content
    post.edited = new Date()
    const result = await post.save()
    res.status(200).json(result)
}

const deletePost = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": `Post ID parameter is required` })
    const post = await Post.findOne({ _id: req.params.id }).exec()
    if (!post) return res.status(204).json({ "message": `No post matches ID ${req.params.id}.` })

    if (req.roles.includes(ROLES_LIST.Admin) || post.author === req.user) {
        const result = await post.deleteOne({ _id: req.params.id })
        res.status(204).json(result)
    } else {
        return res.sendStatus(403)
    }
}

const getPostById = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": `Post ID parameter is required` })
    try {
        const post = await Post.findOne({ _id: ObjectId(req.params.id) }).exec()
        if (!post) return res.status(204).json({ "message": `No post matches ID ${req.params.id}.` })
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { getAllPosts, createNewPost, updatePost, deletePost, getPostById, getPostsWithPagination }