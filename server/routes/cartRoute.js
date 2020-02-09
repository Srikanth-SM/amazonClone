import express from 'express';
import cart from '../controllers/cartController';

const { Router } = express;

const cartRoute = new Router();

cartRoute.post('/', cart.updateCart);
cartRoute.get('/buy', cart.placeOrder);

export default cartRoute;