const {register,login,logout,getUser,getMe, updateUser, updatePass, deleteUser} = require('../services/user')
const joiValidation = require('../middleware/joiValidation');
const {loginValidation,registerValidation} = require('../joiValidation/index');
const {ensureSignedIn,ensureSignedOut,currentUser} = require('../middleware/authentication');

const express = require('express')
const router = express.Router()

router.get('/me', currentUser, async (req, res) => {
    const { currentUser } = req
    const result = await getMe(currentUser.email)
    
    return res.json(result)
})

router.post('/register', ensureSignedOut, joiValidation(registerValidation), async (req, res) => {
    const parameter = req.body
    console.log(parameter);
    const result = await register(parameter)
    res.json(result)
})

router.post('/login', ensureSignedOut, joiValidation(loginValidation), async (req, res) => {
    const param = req.body
    const result = await login(param.email, param.password)
    // console.log("result: ", result.data.token)
    req.session.jwtToken = result.data.token
    res.json(result)
})

module.exports = router;