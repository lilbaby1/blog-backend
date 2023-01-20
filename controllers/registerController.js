const User = require('../model/User')
const bcrypt = require('bcrypt')

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' })

    // checking for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user }).exec()
    if (duplicate) return res.status(409).json({ 'message': 'This username is already taken. Please choose a new one.' })

    try {
        // encrypting the password
        const hashedPwd = await bcrypt.hash(pwd, 10)
        // creating and storing the new user with hashed password
        const result = await User.create({
            "username": user,
            "password": hashedPwd
        })
        res.status(201).json({ 'success': `New user ${user} created!` })
    } catch (err) {
        res.status(500).json({ 'message': err.message })
    }
}

module.exports = { handleNewUser }