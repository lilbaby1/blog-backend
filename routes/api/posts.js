const express = require('express')
const router = express.Router()
const postsController = require('../../controllers/postsController')
const verifyJWT = require('../../middleware/verifyJWT')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(postsController.getPostsWithPagination)
    .put(verifyJWT, verifyRoles(ROLES_LIST.User), postsController.updatePost)
    .post(verifyJWT, verifyRoles(ROLES_LIST.User), postsController.createNewPost)

router.route('all').get(postsController.getAllPosts)

router.route('/:id')
    .get(postsController.getPostById)
    .delete(verifyJWT, verifyRoles(ROLES_LIST.User), postsController.deletePost)

module.exports = router