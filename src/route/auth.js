const {register,login,logout,getUser,getMe, updateUser, updatePass, deleteUser} = require('../services/user')
const joiValidation = require('../middleware/joiValidation');
const {loginValidation,registerValidation} = require('../joiValidation/index');
const {ensureSignedIn,ensureSignedOut,currentUser} = require('../middleware/authentication');

const express = require('express')
const router = express.Router()

router.get('/me', ensureSignedIn, currentUser, async (req, res) => {
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
    console.log(param);

    const result = await login(param.email, param.password)

    req.session.jwtToken = result.data.token
    res.json(result)
})

router.put('/update/:id', ensureSignedIn, currentUser, async (req, res) => {
    const newInfo = req.body
    const user = req.user

    const result = await updateUser(user, newInfo)
    res.json(result)
})

router.put('/changepassword/:id', ensureSignedIn, currentUser, async (req, res) => {
    const newPassword = req.body
    const user = req.user

    const result = await updatePass(user, newPassword)
    res.json(result)
})

router.post('/logout', ensureSignedIn, function (req, res, next) {
    console.log("session: ", req.session)
    const result = logout(req.session)
    // console.log('cookie: ', req.cookies)
    // res.clearCookie('token')
    res.json(result)
})
module.exports = router;