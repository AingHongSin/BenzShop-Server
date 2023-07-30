const cart = require('../models/cart')

const listProductsInCart = async (userId) => {
    try {
      // Find the user's cart based on the userId
      const cartDB = await cart.findOne({ userId }).populate('items.productId', 'name price');
  
      if (!cartDB) {
        createCart
      }
  
      // Return the list of products in the cart
      return cartDB.items;
    } catch (error) {
      console.error('Error listing products in cart:', error);
      throw error;
    }
  }

const createCart = async (userID) => {
    const newCart = new Cart(
        {
            userID,
            items: []
        }
    )
}
  
const addProductToCart = async (userId, productId, quantity = 1) => {
    try {
      const cartDB = await cart.findOne({ userId });
  
      if (!cartDB) {
        const newCart = new Cart({
          userId,
          items: [{ productId, quantity }],
        });
        await newCart.save();
        
      } else {
        const existingProductIndex = cart.items.findIndex(item => item.productId.equals(productId));
  
        if (existingProductIndex !== -1) cartDB.items[existingProductIndex].quantity += quantity;
        else cartDB.items.push({ productId, quantity });
        
  
        await cartDB.save();
      }
  
      return true;
    } catch (error) {
      console.error('Error adding product to cart:', error);
      throw error;
    }
  }
  


const removeProductFromCart = async (userId, productId) => {
    try {
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        throw new Error('Cart not found');
      }
  
      const productIndex = cart.items.findIndex(item => item.productId.equals(productId));
  
      if (productIndex !== -1) {
        cart.items.splice(productIndex, 1);
        await cart.save();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
      throw error;
    }
  }
  
module.exports = {listProductsInCart, addProductToCart, removeProductFromCart}