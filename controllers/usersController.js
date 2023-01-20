const User = require('../model/User')
const ROLES_LIST = require('../config/roles_list')

const getAllUsers = async (req, res) => {
    const users = await User.find()
    if (!users) return res.status(204).json({ "message": "No users found." })
    const usersList = users.map(user => {
        const userInfo = {
            id: user._id,
            username: user.username,
            roles: user.roles
        }
        return userInfo
    })
    res.status(200).json(usersList)
}

module.exports = { getAllUsers }