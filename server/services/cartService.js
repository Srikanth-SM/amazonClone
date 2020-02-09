import Cart from '../models/cart';

const addToCart = (user, productsToAdd) => {
  Cart.find({ userId: user._id });
  return Promise.resolve('success');
};
