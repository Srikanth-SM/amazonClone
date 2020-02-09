import faker from 'faker';
// var faker = require("faker");
import Product from '../models/products';
import Category from '../models/category';
import productService from '../services/productService';
import productRoute from '../routes/productRoute';

const productsLength = 30;

// const category = new Category();
// category.name = faker.commerce.department();
// category.save(cb);

// function cb() {
//   for (let i = 0; i < productsLength; i++) {
//     const product = new Product();
//     product.productName = `${faker.commerce.productName()}${i}`;
//     product.product = faker.commerce.product();
//     product.imageurl = faker.image.image();
//     product.price = faker.commerce.price();
//     product.category.push(category._id);
//     product.save();
//   }
// }
// cb();

const get = (req, res) => {
  productService.getAllProducts()
    .then(results => res.send(results))
    .catch(err => res.send(err))
}

const getProduct = (req, res) => {
  const { id } = req.params;
  productService.getProduct(id)
    .then(result => res.send(result))
    .catch(err => res.send(err))
};

const addProduct = async (req, res) => {
  productService
    .addProduct(req.body)
    .then((result) => res.send(result))
    .catch((err) => res.status(500).send(err))
};

export default {
  get,
  getProduct,
  addProduct,
};
