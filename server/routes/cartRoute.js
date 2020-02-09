import express from 'express';
import cart from '../controllers/cartController';

const { Router } = express;

const cartRoute = new Router();

// cartRoute.get('/', cart.get);

cartRoute.post('/', cart.addToCart);

export default cartRoute;
