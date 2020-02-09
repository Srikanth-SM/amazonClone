import express from 'express';
import products from '../controllers/productController';

const { Router } = express;

const productRoute = new Router();

productRoute.get('/', products.get);

productRoute.post('/', products.addProduct);

productRoute.get('/:id', products.getProduct);

export default productRoute;
