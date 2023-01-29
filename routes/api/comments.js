const express = require('express')
const router = express.Router()
const commentsController = require('../../controllers/commentsController')
const verifyJWT = require('../../middleware/verifyJWT')
const ROLES_LIST = require('../../config/roles_list')
const verifyRoles = require('../../middleware/verifyRoles')

router.route('/')
    .get(commentsController.getAllComments)
    .post(verifyJWT, verifyRoles(ROLES_LIST.User), commentsController.createComment)

router.route('/:id')
    .get(commentsController.getCommentByPost)
    .delete(verifyJWT, verifyRoles(ROLES_LIST.User), commentsController.deleteComment)

module.exports = router