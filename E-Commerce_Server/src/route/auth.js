const {register,login,logout,getUser,getMe, updateUser, updatePass, deleteUser} = require('../services/user')
const joiValidation = require('../middleware/joiValidation');
const {loginValidation,registerValidation} = require('../joiValidation/index');
// const {ensureSignedIn,ensureSignedOut,currentUser} = require('../middleware/authentication');

const express = require('express')
const router = express.Router()

router.get('/me', (req, res) => {
    res.send("Me")
})

router.post('/register', (req, res) => {
    const parameter = req.body
    console.log(parameter);
    const result = register(parameter)
    res.send(result)
})

module.exports = router;