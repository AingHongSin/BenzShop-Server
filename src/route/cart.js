const express = require('express')
const { ensureSignedIn, currentUser } = require('../middleware/authentication');
const { listProductsInCart, addProductToCart, removeProductFromCart } = require('../services/cart');
const { getMe } = require('../services/user');
const router = express. Router()

router.get('/', ensureSignedIn,  currentUser, async (req, res) => {
    const { currentUser } = req;
    const user = await getMe(currentUser.email)

    const result = await listProductsInCart(user.data._id)
    res.send(result)
})

router.post('/addtocart', ensureSignedIn, currentUser, async (req, res) => {
    const { currentUser } = req;
    const user = await getMe(currentUser.email)

    const { product, quantity } = req.body

    const result = await addProductToCart(user.data._id, product._id, quantity)
    res.send(result)
})

router.delete('/delete/:id', ensureSignedIn, currentUser, async (req, res)=> {
    const { currentUser } = req;
    const user = await getMe(currentUser.email)

    const product = req.body
    const result = await removeProductFromCart(user.data._id, product.id)

    res.send(result)
})


module.exports = router