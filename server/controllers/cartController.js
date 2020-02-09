import cartService from '../services/cartService';

const updateCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await cartService.updateCart(req.user, productId, quantity);
    console.log(cart);
    res.json({ result: cart });
  } catch (error) {
    console.log('update error catch')
    next(error);
  }
};

const placeOrder = async (req, res, next) => {
  if (!req.user) {
    return next(new Error('user not logged in '));
  }
  try {
    const { user } = req;
    const orderSummary = await cartService.placeOrder(req.user);
    res.json({ result: orderSummary })
  }
  catch (error) {
    next(error);
  }
}



export default {
  updateCart,
  placeOrder
};
