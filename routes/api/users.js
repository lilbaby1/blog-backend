const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/usersController')
const verifyJWT = require('../../middleware/verifyJWT')
const verifyRoles = require('../../middleware/verifyRoles')
const ROLES_LIST = require('../../config/roles_list')

router.route('/')
    .get(verifyJWT, verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)

module.exports = router