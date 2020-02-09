import cartService from '../services/cartService';
import cartRoute from '../routes/cartRoute';

const addToCart = async (req, res, error) => {
  try {
    const { productId } = req.body;
    const cart = await cartService.addToCart(req.user, productId);
    res.json({ result: cart });
  } catch (e) {
    next(error);
  }
};

export default {
  addToCart,
};
